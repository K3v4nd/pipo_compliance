import React, { useState, useEffect } from 'react';
import { FormType, StoredRecord } from '../../types';
import { fetchAllRecords, deleteRecord } from '../../services/supabaseClient';
import { 
  FolderClock, 
  Trash2, 
  Download, 
  UploadCloud, 
  X, 
  Calendar, 
  UserCheck, 
  FileText,
  Search,
  ArrowRight
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLoadRecord: (record: StoredRecord) => void;
  activeFormType: FormType;
}

export const SavedRecordsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onLoadRecord,
  activeFormType
}) => {
  const [records, setRecords] = useState<StoredRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllRecords();
      setRecords(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = records.filter(r => {
    const matchesType = filterType === 'ALL' || r.form_type === filterType;
    const matchesSearch = 
      r.client_or_provider_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.identification.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`¿Estás seguro de eliminar el registro de "${name}"?`)) {
      await deleteRecord(id);
      await loadData();
    }
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(records, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registros_cumplimiento_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatFormTypeName = (type: FormType) => {
    switch (type) {
      case 'PROV_NATURAL': return 'Proveedor Natural';
      case 'PROV_JURIDICO': return 'Proveedor Jurídico';
      case 'CLIENTE_JURIDICO': return 'Cliente Jurídico';
      case 'CLIENTE_NATURAL': return 'Cliente Natural';
      default: return type;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
              <FolderClock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Expedientes & Registros Guardados</h2>
              <p className="text-xs text-gray-500">Historial de formularios guardados en Supabase y almacenamiento local</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 bg-gray-50/70 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 flex-1 min-w-[220px]">
            <div className="relative w-full max-w-sm">
              <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2.5" />
              <input 
                type="text" 
                placeholder="Buscar por nombre, RIF o cédula..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-xs"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <select 
              value={filterType} 
              onChange={e => setFilterType(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg bg-white text-xs font-medium text-gray-700 focus:outline-hidden"
            >
              <option value="ALL">Todos los tipos</option>
              <option value="PROV_NATURAL">Proveedor Natural</option>
              <option value="PROV_JURIDICO">Proveedor Jurídico</option>
              <option value="CLIENTE_JURIDICO">Cliente Jurídico</option>
              <option value="CLIENTE_NATURAL">Cliente Natural</option>
            </select>

            <button
              type="button"
              onClick={handleExportJson}
              className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg font-medium flex items-center space-x-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar JSON</span>
            </button>
          </div>
        </div>

        {/* Records List */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {loading ? (
            <div className="py-12 text-center text-gray-400">Cargando registros...</div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-gray-400 flex flex-col items-center">
              <FileText className="w-10 h-10 mb-2 opacity-40 text-gray-400" />
              <p className="font-semibold text-gray-600">No hay registros encontrados</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Guarda un formulario desde el editor para verlo aquí.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(record => (
                <div 
                  key={record.id}
                  className="p-3.5 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-xs transition-all bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-900 text-sm">{record.client_or_provider_name}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {formatFormTypeName(record.form_type)}
                      </span>
                      {record.synced_to_supabase ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1">
                          <UploadCloud className="w-3 h-3" />
                          <span>Supabase</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-600">
                          Local
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 text-gray-500 text-[11px]">
                      <span><strong>ID/Doc:</strong> {record.identification || 'N/A'}</span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(record.created_at).toLocaleDateString()}</span>
                      </span>
                      <span><strong>Empresa:</strong> {record.company_name}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => {
                        onLoadRecord(record);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center space-x-1 shadow-2xs"
                    >
                      <span>Cargar en Formulario</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(record.id, record.client_or_provider_name)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar registro"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
          <span>{filtered.length} registro(s) listados</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
