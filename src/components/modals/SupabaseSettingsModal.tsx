import React, { useState } from 'react';
import { SupabaseConfig } from '../../types';
import { 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Copy, 
  Check, 
  ExternalLink,
  Code2,
  PlugZap
} from 'lucide-react';
import { generateSupabaseSQL, testSupabaseConnection, cleanSupabaseUrl } from '../../services/supabaseClient';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  config: SupabaseConfig;
  onSave: (updated: SupabaseConfig) => void;
}

export const SupabaseSettingsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  config,
  onSave
}) => {
  const [formData, setFormData] = useState<SupabaseConfig>({ ...config });
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success?: boolean; message: string } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [showSql, setShowSql] = useState(false);

  if (!isOpen) return null;

  const sqlCode = generateSupabaseSQL(formData.tableName || 'registros_cumplimiento');

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    const cleanedUrl = cleanSupabaseUrl(formData.url);
    const cleanedKey = formData.anonKey.trim();
    if (cleanedUrl !== formData.url || cleanedKey !== formData.anonKey) {
      setFormData(prev => ({ ...prev, url: cleanedUrl, anonKey: cleanedKey }));
    }

    try {
      const res = await testSupabaseConnection(cleanedUrl, cleanedKey, formData.tableName);
      setTestResult(res);
      if (res.success) {
        setFormData(prev => ({ ...prev, url: cleanedUrl, anonKey: cleanedKey, isConnected: true, isDemoMode: false }));
      }
    } finally {
      setTesting(false);
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedUrl = cleanSupabaseUrl(formData.url);
    const cleanedKey = formData.anonKey.trim();
    onSave({
      ...formData,
      url: cleanedUrl,
      anonKey: cleanedKey,
      isConnected: cleanedUrl && cleanedKey ? true : false,
      isDemoMode: !cleanedUrl || !cleanedKey
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-emerald-50/70">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Conexión a Supabase Database</h2>
              <p className="text-xs text-gray-600">Almacenamiento en la nube de registros y expedientes KYC</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Status info box */}
          <div className={`p-3 rounded-lg border flex items-start space-x-3 ${
            formData.url && formData.anonKey
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            {formData.url && formData.anonKey ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <div className="font-bold">
                {formData.url && formData.anonKey
                  ? 'Configuración de Supabase activa'
                  : 'Modo Local Activo (Sin credenciales de Supabase aún)'}
              </div>
              <p className="text-[11px] leading-relaxed text-gray-700">
                La aplicación funciona completamente en modo local de inmediato. Al ingresar tus claves de Supabase, los formularios se sincronizarán directamente con tu tabla en la nube.
              </p>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Project URL de Supabase (Project URL)
            </label>
            <input 
              type="url"
              value={formData.url}
              onChange={e => setFormData({ ...formData, url: e.target.value })}
              onBlur={() => setFormData(prev => ({ ...prev, url: cleanSupabaseUrl(prev.url) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-mono text-[11px]"
              placeholder="https://dvolmksjjegflkzztvjq.supabase.co"
            />
            <span className="text-[10px] text-gray-500 mt-1 block">
              Copia el <strong>Project URL</strong> exacto (ej. <code>https://tu-id.supabase.co</code>). <em>Nota: no agregues <code>/rest/v1/</code> al final.</em>
            </span>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Anon / Public API Key (anon public)
            </label>
            <input 
              type="password"
              value={formData.anonKey}
              onChange={e => setFormData({ ...formData, anonKey: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-mono text-[11px]"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            />
            <span className="text-[10px] text-gray-500 mt-1 block">
              Disponible en Supabase &rarr; Project Settings &rarr; API &rarr; Project API keys (anon public)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Nombre de la Tabla en Supabase
              </label>
              <input 
                type="text"
                value={formData.tableName}
                onChange={e => setFormData({ ...formData, tableName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-mono text-[11px]"
                placeholder="registros_cumplimiento"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleTest}
                disabled={testing || !formData.url || !formData.anonKey}
                className="w-full px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 disabled:opacity-50 rounded-lg border border-emerald-300 flex items-center justify-center space-x-1.5 transition-colors"
              >
                <PlugZap className="w-4 h-4" />
                <span>{testing ? 'Probando conexión...' : 'Probar Conexión Ahora'}</span>
              </button>
            </div>
          </div>

          {testResult && (
            <div className={`p-3 rounded-lg border text-[11.5px] ${
              testResult.success 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                : 'bg-red-50 border-red-300 text-red-900'
            }`}>
              <strong>{testResult.success ? '✓ Éxito:' : '⚠ Atención:'}</strong> {testResult.message}
            </div>
          )}

          {/* SQL Generator Section */}
          <div className="border border-gray-200 rounded-lg overflow-hidden mt-4">
            <button
              type="button"
              onClick={() => setShowSql(!showSql)}
              className="w-full px-4 py-2.5 bg-gray-50 flex items-center justify-between text-xs font-bold text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center space-x-2">
                <Code2 className="w-4 h-4 text-emerald-600" />
                <span>Script SQL para crear la tabla en Supabase (1-Clic)</span>
              </div>
              <span className="text-[11px] text-emerald-700">{showSql ? 'Ocultar SQL ▲' : 'Ver SQL ▼'}</span>
            </button>
            
            {showSql && (
              <div className="p-4 bg-slate-900 text-slate-100 text-[11px] space-y-2">
                <div className="flex items-center justify-between text-gray-400">
                  <span>Copia y pega este script en el SQL Editor de tu proyecto Supabase:</span>
                  <button
                    type="button"
                    onClick={handleCopySql}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-xs text-white"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? '¡Copiado!' : 'Copiar SQL'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-black/50 rounded overflow-x-auto text-[10px] font-mono text-emerald-400 leading-tight">
                  {sqlCode}
                </pre>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
            <a 
              href="https://supabase.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-gray-500 hover:text-gray-800 flex items-center space-x-1 text-[11px]"
            >
              <span>Ir a consola de Supabase</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm flex items-center space-x-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Guardar Credenciales</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
