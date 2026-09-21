import React, { useState } from 'react';
import { CompanyConfig } from '../../types';
import { Building2, Upload, X, Check, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { PIPO_DEFAULT_LOGO_SVG } from '../../data/pipoLogo';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  company: CompanyConfig;
  onSave: (updated: CompanyConfig) => void;
}

export const CompanySettingsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  company,
  onSave
}) => {
  const [formData, setFormData] = useState<CompanyConfig>({ ...company });

  if (!isOpen) return null;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          // If svg or small image, store directly
          if (file.type.includes('svg') || file.size < 50000) {
            setFormData(prev => ({ ...prev, logoUrl: result }));
            return;
          }
          // Compress via canvas to prevent storage quota issues and ensure fast sync
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const maxDim = 400;
            let width = img.width;
            let height = img.height;
            if (width > height && width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              const compressed = canvas.toDataURL('image/png', 0.85);
              setFormData(prev => ({ ...prev, logoUrl: compressed }));
            } else {
              setFormData(prev => ({ ...prev, logoUrl: result }));
            }
          };
          img.src = result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Personalizar Empresa y Membrete</h2>
              <p className="text-xs text-gray-500">Configura el logo, razón social, RIF y membretes (se sincroniza con Supabase)</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Logo Section */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label className="block text-xs font-bold text-gray-800 mb-2">Logo de la Empresa (Se aplica en todos los documentos y dispositivos)</label>
            <div className="flex items-center space-x-4">
              <div className="w-32 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-white overflow-hidden p-2 shadow-inner">
                {formData.logoUrl ? (
                  <img src={formData.logoUrl} alt="Logo preview" className="max-h-full max-w-full object-contain" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap gap-2">
                  <label className="cursor-pointer inline-flex items-center space-x-2 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 shadow-2xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Subir imagen (PNG, JPG, SVG)</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleLogoUpload} 
                      className="hidden" 
                    />
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setFormData(prev => ({ ...prev, logoUrl: PIPO_DEFAULT_LOGO_SVG }))}
                    className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Logo Pipo por defecto</span>
                  </button>
                </div>
                <p className="text-[11px] text-gray-500">
                  Las imágenes se optimizan automáticamente para un envío ultrarrápido a Supabase.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Nombre Comercial (Encabezado)</label>
              <input 
                type="text"
                value={formData.commercialName}
                onChange={e => setFormData({ ...formData, commercialName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                placeholder="Ej. HOTEL PIPO INTERNACIONAL"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Razón Social Legal</label>
              <input 
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                placeholder="Ej. HOTEL PIPO INTERNACIONAL C.A."
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Registro de Información Fiscal (RIF)</label>
              <input 
                type="text"
                value={formData.rif}
                onChange={e => setFormData({ ...formData, rif: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-mono"
                placeholder="Ej. J-07513364-1"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Teléfonos de Contacto</label>
              <input 
                type="text"
                value={formData.phones}
                onChange={e => setFormData({ ...formData, phones: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                placeholder="Ej. 0243-2413111 / 0243-2411990"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-gray-700 mb-1">Dirección Fiscal / Sede Principal</label>
              <input 
                type="text"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                placeholder="Ej. Av. Principal El Castaño / Maracay Edo. Aragua"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Correo Electrónico de Cumplimiento</label>
              <input 
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                placeholder="cumplimiento@hotelpipo.com"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Página Web o Portal</label>
              <input 
                type="text"
                value={formData.website}
                onChange={e => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                placeholder="WWW.HOTELPIPO.COM"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Título Departamento Responsable</label>
              <input 
                type="text"
                value={formData.defaultDeptResp}
                onChange={e => setFormData({ ...formData, defaultDeptResp: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                placeholder="Departamento Responsable"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Título Oficial de Cumplimiento</label>
              <input 
                type="text"
                value={formData.defaultOfficer}
                onChange={e => setFormData({ ...formData, defaultOfficer: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                placeholder="Oficial de Cumplimiento"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm flex items-center space-x-1.5 transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Guardar Cambios de Empresa</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
