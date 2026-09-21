import React, { useState, useEffect } from 'react';
import { 
  FormType, 
  CompanyConfig, 
  SupabaseConfig, 
  ProveedorNaturalData, 
  ProveedorJuridicoData, 
  ClienteJuridicoData, 
  ClienteNaturalData, 
  StoredRecord 
} from './types';
import { 
  DEFAULT_COMPANY, 
  DEFAULT_PROV_NATURAL, 
  DEFAULT_PROV_JURIDICO, 
  DEFAULT_CLIENTE_JURIDICO, 
  DEFAULT_CLIENTE_NATURAL 
} from './data/defaults';
import { 
  getStoredSupabaseConfig, 
  saveSupabaseConfig, 
  saveRecord, 
  getSupabaseClient,
  fetchCompanyConfigFromSupabase,
  saveCompanyConfigToSupabase
} from './services/supabaseClient';

// Sheet Views
import { ProveedorNaturalSheet } from './components/sheets/ProveedorNaturalSheet';
import { ProveedorJuridicoSheet } from './components/sheets/ProveedorJuridicoSheet';
import { ClienteJuridicoSheet } from './components/sheets/ClienteJuridicoSheet';
import { ClienteNaturalSheet } from './components/sheets/ClienteNaturalSheet';
import { CircularMinturSheet } from './components/sheets/CircularMinturSheet';

// Editors
import { ProveedorNaturalEditor } from './components/editors/ProveedorNaturalEditor';
import { ProveedorJuridicoEditor } from './components/editors/ProveedorJuridicoEditor';
import { ClienteJuridicoEditor } from './components/editors/ClienteJuridicoEditor';
import { ClienteNaturalEditor } from './components/editors/ClienteNaturalEditor';

// Modals
import { CompanySettingsModal } from './components/modals/CompanySettingsModal';
import { SupabaseSettingsModal } from './components/modals/SupabaseSettingsModal';
import { SavedRecordsModal } from './components/modals/SavedRecordsModal';
import { SignaturePadModal } from './components/modals/SignaturePadModal';

// Utilities
import { exportToPdf, triggerBrowserPrint } from './utils/pdfExport';
import { generateStandaloneHtmlCode } from './utils/standaloneHtmlGenerator';

import { 
  Printer, 
  Save, 
  Download, 
  Building, 
  Database, 
  FolderOpen, 
  RotateCcw, 
  FileCheck2, 
  Layers, 
  Eye, 
  Edit3, 
  CheckCircle2, 
  Globe,
  Lock,
  ShieldCheck,
  LogOut,
  Key
} from 'lucide-react';
import { AdminAuthModal } from './components/modals/AdminAuthModal';

const STORAGE_KEY_COMPANY = 'pipo_company_config_v2';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<FormType>('PROV_NATURAL');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  // Admin session state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('pipo_admin_session') === 'true' || 
             sessionStorage.getItem('pipo_admin_session') === 'true';
    } catch {
      return false;
    }
  });
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Company and Supabase state
  const [company, setCompany] = useState<CompanyConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COMPANY);
      return saved ? JSON.parse(saved) : DEFAULT_COMPANY;
    } catch {
      return DEFAULT_COMPANY;
    }
  });

  const [supabaseConfig, setSupabaseConfig] = useState<SupabaseConfig>(getStoredSupabaseConfig);

  // Form Data States
  const [provNatData, setProvNatData] = useState<ProveedorNaturalData>(DEFAULT_PROV_NATURAL);
  const [provJurData, setProvJurData] = useState<ProveedorJuridicoData>(DEFAULT_PROV_JURIDICO);
  const [cliJurData, setCliJurData] = useState<ClienteJuridicoData>(DEFAULT_CLIENTE_JURIDICO);
  const [cliNatData, setCliNatData] = useState<ClienteNaturalData>(DEFAULT_CLIENTE_NATURAL);

  // Modals state
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false);
  const [savedRecordsModalOpen, setSavedRecordsModalOpen] = useState(false);
  const [signatureModal, setSignatureModal] = useState<{
    isOpen: boolean;
    title: string;
    targetField: string;
    isFingerprint?: boolean;
  }>({
    isOpen: false,
    title: '',
    targetField: '',
    isFingerprint: false
  });

  // Notifications
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Sincronizar automáticamente la configuración de la empresa desde Supabase si está disponible
  useEffect(() => {
    fetchCompanyConfigFromSupabase().then(remoteCompany => {
      if (remoteCompany && remoteCompany.name) {
        setCompany(remoteCompany);
        try {
          localStorage.setItem(STORAGE_KEY_COMPANY, JSON.stringify(remoteCompany));
        } catch (e) {
          console.error(e);
        }
      }
    });
  }, [supabaseConfig.isConnected, supabaseConfig.url]);

  const handleAdminLogout = () => {
    localStorage.removeItem('pipo_admin_session');
    sessionStorage.removeItem('pipo_admin_session');
    setIsAdmin(false);
    setCompanyModalOpen(false);
    setSupabaseModalOpen(false);
    setSavedRecordsModalOpen(false);
    showToast('Sesión de administrador cerrada.', 'info');
  };

  const handleSaveCompany = async (updated: CompanyConfig) => {
    setCompany(updated);
    try {
      localStorage.setItem(STORAGE_KEY_COMPANY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    // Persistir en Supabase para que todos los usuarios y clientes vean la empresa actualizada
    const synced = await saveCompanyConfigToSupabase(updated);
    if (synced) {
      showToast('Empresa guardada en Supabase y visible para todos los usuarios.');
    } else {
      showToast('Datos y logotipo de empresa actualizados.');
    }
  };

  const handleSaveSupabaseConfig = (updated: SupabaseConfig) => {
    setSupabaseConfig(updated);
    saveSupabaseConfig(updated);
    showToast(updated.url && updated.anonKey ? 'Supabase configurado y activo.' : 'Guardado en modo local.');
  };

  // Open Signature Pad
  const handleOpenSignature = (type: 'firma' | 'huella' | 'huella_der' | 'huella_izq') => {
    let title = 'Dibujar o Subir Firma Digital';
    let isFingerprint = false;

    if (type === 'huella' || type === 'huella_der' || type === 'huella_izq') {
      isFingerprint = true;
      title = type === 'huella_der' 
        ? 'Registrar Huella Dactilar (Pulgar Derecho)' 
        : type === 'huella_izq'
        ? 'Registrar Huella Dactilar (Pulgar Izquierdo)'
        : 'Registrar Huella Dactilar';
    }

    setSignatureModal({
      isOpen: true,
      title,
      targetField: type,
      isFingerprint
    });
  };

  const handleSaveSignature = (dataUrl: string) => {
    const target = signatureModal.targetField;
    if (activeTab === 'PROV_NATURAL') {
      if (target === 'firma') setProvNatData(prev => ({ ...prev, firmaUrl: dataUrl }));
      if (target === 'huella') setProvNatData(prev => ({ ...prev, huellaUrl: dataUrl }));
    } else if (activeTab === 'PROV_JURIDICO') {
      if (target === 'firma') setProvJurData(prev => ({ ...prev, firmaRepresentanteUrl: dataUrl }));
      if (target === 'huella') setProvJurData(prev => ({ ...prev, huellaRepresentanteUrl: dataUrl }));
    } else if (activeTab === 'CLIENTE_JURIDICO') {
      if (target === 'firma') setCliJurData(prev => ({ ...prev, firmaClienteUrl: dataUrl }));
      if (target === 'huella_der') setCliJurData(prev => ({ ...prev, huellaPulgarDerechoUrl: dataUrl }));
      if (target === 'huella_izq') setCliJurData(prev => ({ ...prev, huellaPulgarIzquierdoUrl: dataUrl }));
    } else if (activeTab === 'CLIENTE_NATURAL') {
      if (target === 'firma') setCliNatData(prev => ({ ...prev, firmaClienteUrl: dataUrl }));
      if (target === 'huella_der') setCliNatData(prev => ({ ...prev, huellaPulgarDerechoUrl: dataUrl }));
      if (target === 'huella_izq') setCliNatData(prev => ({ ...prev, huellaPulgarIzquierdoUrl: dataUrl }));
    }
    showToast('Firma / Huella registrada en el documento.');
  };

  // Save Record to Supabase & Local
  const handleSaveRecord = async () => {
    let title = '';
    let name = '';
    let idDoc = '';
    let payload: any = null;

    if (activeTab === 'PROV_NATURAL') {
      title = `Proveedor Natural - ${provNatData.nombresApellidos}`;
      name = provNatData.nombresApellidos;
      idDoc = provNatData.cedula;
      payload = provNatData;
    } else if (activeTab === 'PROV_JURIDICO') {
      title = `Proveedor Jurídico - ${provJurData.razonSocial}`;
      name = provJurData.razonSocial;
      idDoc = provJurData.registroFiscal;
      payload = provJurData;
    } else if (activeTab === 'CLIENTE_JURIDICO') {
      title = `Cliente Jurídico - ${cliJurData.razonSocial}`;
      name = cliJurData.razonSocial;
      idDoc = cliJurData.docNumero;
      payload = cliJurData;
    } else if (activeTab === 'CLIENTE_NATURAL') {
      title = `Cliente Natural - ${cliNatData.nombresApellidos}`;
      name = cliNatData.nombresApellidos;
      idDoc = cliNatData.docNumero;
      payload = cliNatData;
    } else {
      showToast('La circular es de consulta y no requiere guardado en base de datos.', 'info');
      return;
    }

    const res = await saveRecord(activeTab, title, name, idDoc, payload, company.name);
    showToast(res.message, res.success ? 'success' : 'info');
  };

  // Load Record from History
  const handleLoadRecord = (record: StoredRecord) => {
    setActiveTab(record.form_type);
    if (record.form_type === 'PROV_NATURAL') {
      setProvNatData(record.payload);
    } else if (record.form_type === 'PROV_JURIDICO') {
      setProvJurData(record.payload);
    } else if (record.form_type === 'CLIENTE_JURIDICO') {
      setCliJurData(record.payload);
    } else if (record.form_type === 'CLIENTE_NATURAL') {
      setCliNatData(record.payload);
    }
    showToast(`Registro de "${record.client_or_provider_name}" cargado.`);
  };

  // Reset to default sample
  const handleResetSample = () => {
    if (confirm('¿Restablecer este formulario a los datos de ejemplo predeterminados?')) {
      if (activeTab === 'PROV_NATURAL') setProvNatData(DEFAULT_PROV_NATURAL);
      if (activeTab === 'PROV_JURIDICO') setProvJurData(DEFAULT_PROV_JURIDICO);
      if (activeTab === 'CLIENTE_JURIDICO') setCliJurData(DEFAULT_CLIENTE_JURIDICO);
      if (activeTab === 'CLIENTE_NATURAL') setCliNatData(DEFAULT_CLIENTE_NATURAL);
      showToast('Formulario restablecido con datos de ejemplo.');
    }
  };

  // Download Standalone HTML file for GitHub Pages or offline use
  const handleDownloadStandaloneHtml = () => {
    const htmlContent = generateStandaloneHtmlCode();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Archivo "index.html" descargado listo para GitHub Pages.');
  };

  // Direct PDF Download using html2pdf
  const handleDownloadPdf = async () => {
    let sheetId = 'printable-sheet-prov-natural';
    let filename = `Formulario_Registro_Proveedor_${provNatData.cedula || 'Natural'}`;

    if (activeTab === 'PROV_JURIDICO') {
      sheetId = 'printable-sheet-prov-juridico';
      filename = `Formulario_Registro_Proveedor_Juridico_${provJurData.registroFiscal || 'Empresa'}`;
    } else if (activeTab === 'CLIENTE_JURIDICO') {
      sheetId = 'printable-sheet-cliente-juridico';
      filename = `Formulario_Cliente_Juridico_${cliJurData.docNumero || 'Empresa'}`;
    } else if (activeTab === 'CLIENTE_NATURAL') {
      sheetId = 'printable-sheet-cliente-natural';
      filename = `Formulario_Cliente_Natural_${cliNatData.docNumero || 'Natural'}`;
    } else if (activeTab === 'CIRCULAR_MINTUR') {
      sheetId = 'printable-sheet-circular-mintur';
      filename = `Circular_Informativa_Resolucion_020_2021_MINTUR`;
    }

    showToast('Generando documento PDF...', 'info');
    await exportToPdf(sheetId, filename);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans antialiased">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-lg shadow-xl text-xs font-semibold text-white flex items-center space-x-2 transition-all ${
          toast.type === 'success' ? 'bg-emerald-600' : toast.type === 'error' ? 'bg-rose-600' : 'bg-blue-600'
        }`}>
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main Top Header (No-print) */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Company Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-blue-900 text-white flex items-center justify-center font-serif font-black text-xl shadow-xs shrink-0 overflow-hidden">
              {company.logoUrl ? (
                <img src={company.logoUrl} alt={company.name} className="w-full h-full object-contain p-0.5 bg-white" />
              ) : (
                (company.commercialName || company.name || 'P')[0]?.toUpperCase()
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-extrabold text-sm sm:text-base text-gray-950 leading-tight">
                  {company.commercialName || 'HOTEL PIPO INTERNACIONAL'}
                </h1>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                  KYC / LC-FT-FPADM
                </span>
              </div>
              <p className="text-[11px] text-gray-500 truncate max-w-xs sm:max-w-md">
                {company.name} • RIF: {company.rif}
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center flex-wrap gap-2 text-xs">
            {isAdmin ? (
              <>
                {/* Admin Status Pill */}
                <div className="px-2.5 py-1 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 font-bold flex items-center space-x-1.5 shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span className="hidden md:inline">Panel Admin</span>
                </div>

                {/* 1. Empresa / Logo */}
                <button
                  onClick={() => setCompanyModalOpen(true)}
                  className="px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium flex items-center space-x-1.5 transition-colors"
                  title="Personalizar datos y logo de la empresa"
                >
                  <Building className="w-3.5 h-3.5 text-blue-600" />
                  <span className="hidden sm:inline">Empresa / Logo</span>
                </button>

                {/* 2. Supabase */}
                <button
                  onClick={() => setSupabaseModalOpen(true)}
                  className={`px-2.5 py-1.5 rounded-lg border font-medium flex items-center space-x-1.5 transition-colors ${
                    supabaseConfig.url && supabaseConfig.anonKey
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                      : 'border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100'
                  }`}
                  title="Configurar Supabase"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>
                    Supabase {supabaseConfig.url && supabaseConfig.anonKey ? '(Conectado)' : '(Local)'}
                  </span>
                </button>

                {/* 3. Expedientes */}
                <button
                  onClick={() => setSavedRecordsModalOpen(true)}
                  className="px-2.5 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium flex items-center space-x-1.5 transition-colors"
                  title="Ver expedientes registrados por clientes"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden sm:inline">Expedientes</span>
                </button>

                {/* 4. Exportar GitHub Pages */}
                <button
                  onClick={handleDownloadStandaloneHtml}
                  className="px-2.5 py-1.5 rounded-lg border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-800 font-medium flex items-center space-x-1.5 transition-colors"
                  title="Descarga la aplicación en un solo archivo index.html para GitHub Pages o uso sin internet"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">Exportar GitHub Pages</span>
                </button>

                {/* Clave / Opciones */}
                <button
                  onClick={() => setAdminModalOpen(true)}
                  className="px-2 py-1.5 rounded-lg border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold flex items-center space-x-1 transition-colors"
                  title="Opciones de seguridad y cambio de clave"
                >
                  <Key className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden sm:inline">Clave</span>
                </button>

                {/* Salir */}
                <button
                  onClick={handleAdminLogout}
                  className="px-2 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-semibold flex items-center space-x-1 transition-colors"
                  title="Cerrar sesión de administrador"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Salir</span>
                </button>
              </>
            ) : (
              <>
                {/* Public View: Acceso Admin */}
                <button
                  onClick={() => setAdminModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold flex items-center space-x-1.5 shadow-xs transition-colors"
                  title="Acceso exclusivo para el Oficial de Cumplimiento y personal administrativo"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Acceso Admin</span>
                </button>
              </>
            )}

            {/* Imprimir is always available */}
            <button
              onClick={triggerBrowserPrint}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center space-x-1.5 shadow-xs transition-colors"
              title="Imprimir o guardar en PDF mediante el cuadro de diálogo del navegador"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Imprimir Hoja Carta</span>
              <span className="sm:hidden">Imprimir</span>
            </button>
          </div>
        </div>

        {/* Tab Selector de Formularios */}
        <div className="bg-slate-900 text-white border-t border-slate-800 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto py-1.5 gap-2 text-xs font-semibold scrollbar-thin">
            <div className="flex items-center space-x-1.5 shrink-0">
              <button
                onClick={() => setActiveTab('PROV_NATURAL')}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                  activeTab === 'PROV_NATURAL'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                1. Proveedor Persona Natural
              </button>

              <button
                onClick={() => setActiveTab('PROV_JURIDICO')}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                  activeTab === 'PROV_JURIDICO'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                2. Proveedor Persona Jurídica
              </button>

              <button
                onClick={() => setActiveTab('CLIENTE_JURIDICO')}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                  activeTab === 'CLIENTE_JURIDICO'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                3. Cliente Jurídico
              </button>

              <button
                onClick={() => setActiveTab('CLIENTE_NATURAL')}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                  activeTab === 'CLIENTE_NATURAL'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                4. Cliente Natural
              </button>

              <button
                onClick={() => setActiveTab('CIRCULAR_MINTUR')}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                  activeTab === 'CIRCULAR_MINTUR'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                5. Circular MINTUR Res. 020-2021
              </button>
            </div>

            {/* Mobile View Toggle */}
            <div className="lg:hidden flex items-center bg-slate-800 p-0.5 rounded-md shrink-0">
              <button
                onClick={() => setMobileView('editor')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center space-x-1 ${
                  mobileView === 'editor' ? 'bg-blue-600 text-white' : 'text-slate-300'
                }`}
              >
                <Edit3 className="w-3 h-3" />
                <span>Editar</span>
              </button>
              <button
                onClick={() => setMobileView('preview')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center space-x-1 ${
                  mobileView === 'preview' ? 'bg-blue-600 text-white' : 'text-slate-300'
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>Hoja Carta</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive Form Editor (no-print) */}
          <section className={`lg:col-span-5 space-y-4 no-print ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-200">
                <div>
                  <h2 className="font-bold text-sm text-gray-900 flex items-center space-x-1.5">
                    <Edit3 className="w-4 h-4 text-blue-600" />
                    <span>
                      {activeTab === 'PROV_NATURAL' && 'Formulario Proveedor Natural'}
                      {activeTab === 'PROV_JURIDICO' && 'Formulario Proveedor Jurídico'}
                      {activeTab === 'CLIENTE_JURIDICO' && 'Formulario Cliente Jurídico'}
                      {activeTab === 'CLIENTE_NATURAL' && 'Formulario Cliente Natural'}
                      {activeTab === 'CIRCULAR_MINTUR' && 'Información Circular MINTUR'}
                    </span>
                  </h2>
                  <p className="text-[11px] text-gray-500">Edición en tiempo real reflejada en la hoja carta</p>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={handleResetSample}
                    className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Restablecer a ejemplo"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  {activeTab !== 'CIRCULAR_MINTUR' && (
                    <button
                      onClick={handleSaveRecord}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs flex items-center space-x-1 shadow-2xs transition-colors"
                      title="Guardar registro en Supabase y local"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Guardar</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Form Input Body */}
              <div className="max-h-[75vh] overflow-y-auto pr-1">
                {activeTab === 'PROV_NATURAL' && (
                  <ProveedorNaturalEditor 
                    data={provNatData} 
                    onChange={setProvNatData} 
                    onOpenSignature={handleOpenSignature} 
                  />
                )}

                {activeTab === 'PROV_JURIDICO' && (
                  <ProveedorJuridicoEditor 
                    data={provJurData} 
                    onChange={setProvJurData} 
                    onOpenSignature={handleOpenSignature} 
                  />
                )}

                {activeTab === 'CLIENTE_JURIDICO' && (
                  <ClienteJuridicoEditor 
                    data={cliJurData} 
                    onChange={setCliJurData} 
                    onOpenSignature={handleOpenSignature} 
                  />
                )}

                {activeTab === 'CLIENTE_NATURAL' && (
                  <ClienteNaturalEditor 
                    data={cliNatData} 
                    onChange={setCliNatData} 
                    onOpenSignature={handleOpenSignature} 
                  />
                )}

                {activeTab === 'CIRCULAR_MINTUR' && (
                  <div className="space-y-4 text-xs text-gray-600 leading-relaxed">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900">
                      <strong>Resolución No. 020-2021 MINTUR (Gaceta Oficial No. 42.106)</strong>
                      <p className="mt-1 text-[11.5px]">
                        Norma sobre prevención y administración de riesgos de Legitimación de Capitales, Financiamiento al Terrorismo y Financiamiento a la Proliferación de Armas de Destrucción Masiva.
                      </p>
                    </div>
                    <p>
                      Esta circular es el documento legal oficial enviado a todos los clientes y proveedores para sustentar la recolección de los datos y documentos adjuntos.
                    </p>
                    <p>
                      Puedes imprimirla junto con cualquiera de los formularios de registro para enviarla al cliente o proveedor.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Right Column: Live Printable Sheet Preview */}
          <section className={`lg:col-span-7 flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            {/* Sheet Sub-toolbar */}
            <div className="w-full max-w-[215.9mm] flex items-center justify-between mb-2.5 px-2 no-print text-xs">
              <div className="flex items-center space-x-2 text-gray-600">
                <FileCheck2 className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-gray-800">Vista Previa Hoja Carta (8.5" x 11")</span>
                <span className="text-[11px] text-gray-400">| Tabulado oficial</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDownloadPdf}
                  className="px-2.5 py-1 bg-white border border-gray-300 hover:bg-gray-50 rounded text-xs font-medium text-gray-700 flex items-center space-x-1"
                  title="Descargar archivo PDF directo"
                >
                  <Download className="w-3 h-3" />
                  <span>Descargar .PDF</span>
                </button>
                <button
                  onClick={triggerBrowserPrint}
                  className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs font-semibold text-white flex items-center space-x-1"
                >
                  <Printer className="w-3 h-3" />
                  <span>Imprimir</span>
                </button>
              </div>
            </div>

            {/* Render Sheet based on active tab */}
            <div className="w-full flex justify-center overflow-x-auto pb-12">
              {activeTab === 'PROV_NATURAL' && (
                <ProveedorNaturalSheet data={provNatData} company={company} />
              )}
              {activeTab === 'PROV_JURIDICO' && (
                <ProveedorJuridicoSheet data={provJurData} company={company} />
              )}
              {activeTab === 'CLIENTE_JURIDICO' && (
                <ClienteJuridicoSheet data={cliJurData} company={company} />
              )}
              {activeTab === 'CLIENTE_NATURAL' && (
                <ClienteNaturalSheet data={cliNatData} company={company} />
              )}
              {activeTab === 'CIRCULAR_MINTUR' && (
                <CircularMinturSheet company={company} />
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Modals */}
      <CompanySettingsModal
        isOpen={companyModalOpen}
        onClose={() => setCompanyModalOpen(false)}
        company={company}
        onSave={handleSaveCompany}
      />

      <SupabaseSettingsModal
        isOpen={supabaseModalOpen}
        onClose={() => setSupabaseModalOpen(false)}
        config={supabaseConfig}
        onSave={handleSaveSupabaseConfig}
      />

      <SavedRecordsModal
        isOpen={savedRecordsModalOpen}
        onClose={() => setSavedRecordsModalOpen(false)}
        onLoadRecord={handleLoadRecord}
        activeFormType={activeTab}
      />

      <SignaturePadModal
        isOpen={signatureModal.isOpen}
        onClose={() => setSignatureModal(prev => ({ ...prev, isOpen: false }))}
        title={signatureModal.title}
        isFingerprint={signatureModal.isFingerprint}
        onSaveSignature={handleSaveSignature}
      />

      <AdminAuthModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        isAdmin={isAdmin}
        onLogin={() => setIsAdmin(true)}
        onLogout={handleAdminLogout}
        showToast={showToast}
      />
    </div>
  );
}
