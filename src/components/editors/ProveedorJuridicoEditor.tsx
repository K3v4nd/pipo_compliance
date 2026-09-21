import React from 'react';
import { ProveedorJuridicoData, RepresentanteLegal, BancoInfo } from '../../types';
import { PenTool, Fingerprint } from 'lucide-react';

interface Props {
  data: ProveedorJuridicoData;
  onChange: (updated: ProveedorJuridicoData) => void;
  onOpenSignature: (type: 'firma' | 'huella') => void;
}

export const ProveedorJuridicoEditor: React.FC<Props> = ({ data, onChange, onOpenSignature }) => {
  const updateField = (field: keyof ProveedorJuridicoData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateFecha = (part: 'dia' | 'mes' | 'anio', value: string) => {
    onChange({
      ...data,
      fechaElaboracion: { ...data.fechaElaboracion, [part]: value }
    });
  };

  const updateRep = (repKey: 'representante1' | 'representante2', field: keyof RepresentanteLegal, val: any) => {
    onChange({
      ...data,
      [repKey]: { ...data[repKey], [field]: val }
    });
  };

  const updateBanco = (bancoKey: 'bancoLocal1' | 'bancoLocal2' | 'bancoInternacional', field: keyof BancoInfo, val: any) => {
    onChange({
      ...data,
      [bancoKey]: { ...data[bancoKey], [field]: val }
    });
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Fecha */}
      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
        <label className="block font-bold text-gray-800 mb-1.5">Fecha de Elaboración</label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <span className="text-[10px] text-gray-500 block">Día</span>
            <input
              type="text"
              maxLength={2}
              value={data.fechaElaboracion.dia}
              onChange={e => updateFecha('dia', e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 rounded bg-white text-center font-bold"
            />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 block">Mes</span>
            <input
              type="text"
              maxLength={2}
              value={data.fechaElaboracion.mes}
              onChange={e => updateFecha('mes', e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 rounded bg-white text-center font-bold"
            />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 block">Año</span>
            <input
              type="text"
              maxLength={4}
              value={data.fechaElaboracion.anio}
              onChange={e => updateFecha('anio', e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 rounded bg-white text-center font-bold"
            />
          </div>
        </div>
      </div>

      {/* Información del Proveedor Jurídico */}
      <div className="space-y-3">
        <h3 className="font-bold text-gray-900 border-b pb-1 text-xs uppercase tracking-wide text-blue-800">
          Información de la Empresa (Proveedor)
        </h3>

        <div>
          <label className="block font-semibold text-gray-700 mb-0.5">Razón Social</label>
          <input
            type="text"
            value={data.razonSocial}
            onChange={e => updateField('razonSocial', e.target.value)}
            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg uppercase"
            placeholder="DISTRIBUIDORA DE ALIMENTOS Y VÍVERES C.A."
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-semibold text-gray-700 mb-0.5">Registro Fiscal (RIF)</label>
            <input
              type="text"
              value={data.registroFiscal}
              onChange={e => updateField('registroFiscal', e.target.value)}
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg font-mono uppercase"
              placeholder="J-31245678-9"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-0.5">Teléfono</label>
            <input
              type="text"
              value={data.telefono}
              onChange={e => updateField('telefono', e.target.value)}
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg"
              placeholder="0243-5518900"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-0.5">Descripción de Actividad Económica</label>
          <input
            type="text"
            value={data.actividadEconomica}
            onChange={e => updateField('actividadEconomica', e.target.value)}
            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg"
            placeholder="Comercialización y distribución de víveres..."
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-semibold text-gray-700 mb-0.5">Dirección Fiscal</label>
            <input
              type="text"
              value={data.direccionFiscal}
              onChange={e => updateField('direccionFiscal', e.target.value)}
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg"
              placeholder="Zona Industrial San Vicente..."
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-0.5">Correo Electrónico</label>
            <input
              type="email"
              value={data.correo}
              onChange={e => updateField('correo', e.target.value)}
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg"
              placeholder="admin@empresa.com"
            />
          </div>
        </div>
      </div>

      {/* Representante Legal 1 */}
      <div className="bg-slate-50 p-3 rounded-lg border border-gray-200 space-y-2">
        <h4 className="font-bold text-gray-900 text-[11px] uppercase">Representante Legal 1</h4>
        <div>
          <label className="block text-[10.5px] font-semibold text-gray-600 mb-0.5">Nombre y Apellido</label>
          <input
            type="text"
            value={data.representante1?.nombreApellido || ''}
            onChange={e => updateRep('representante1', 'nombreApellido', e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded bg-white uppercase"
            placeholder="ALEJANDRO JOSÉ PARRA GÓMEZ"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10.5px] font-semibold text-gray-600 mb-0.5">Número de Cédula</label>
            <input
              type="text"
              value={data.representante1?.cedula || ''}
              onChange={e => updateRep('representante1', 'cedula', e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 rounded bg-white"
              placeholder="V-12.456.789"
            />
          </div>
          <div>
            <label className="block text-[10.5px] font-semibold text-gray-600 mb-0.5">Cargo</label>
            <input
              type="text"
              value={data.representante1?.cargo || ''}
              onChange={e => updateRep('representante1', 'cargo', e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 rounded bg-white uppercase"
              placeholder="PRESIDENTE"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10.5px] font-semibold text-gray-600 mb-0.5">Teléfono</label>
            <input
              type="text"
              value={data.representante1?.telefono || ''}
              onChange={e => updateRep('representante1', 'telefono', e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 rounded bg-white"
              placeholder="0414-3456789"
            />
          </div>
          <div>
            <label className="block text-[10.5px] font-semibold text-gray-600 mb-0.5">Correo</label>
            <input
              type="email"
              value={data.representante1?.correo || ''}
              onChange={e => updateRep('representante1', 'correo', e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 rounded bg-white"
              placeholder="rep1@empresa.com"
            />
          </div>
        </div>
      </div>

      {/* Representante Legal 2 */}
      <div className="bg-slate-50 p-3 rounded-lg border border-gray-200 space-y-2">
        <h4 className="font-bold text-gray-900 text-[11px] uppercase">Representante Legal 2</h4>
        <div>
          <label className="block text-[10.5px] font-semibold text-gray-600 mb-0.5">Nombre y Apellido</label>
          <input
            type="text"
            value={data.representante2?.nombreApellido || ''}
            onChange={e => updateRep('representante2', 'nombreApellido', e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded bg-white uppercase"
            placeholder="ELENA BEATRIZ SUÁREZ"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10.5px] font-semibold text-gray-600 mb-0.5">Cédula</label>
            <input
              type="text"
              value={data.representante2?.cedula || ''}
              onChange={e => updateRep('representante2', 'cedula', e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 rounded bg-white"
              placeholder="V-14.890.123"
            />
          </div>
          <div>
            <label className="block text-[10.5px] font-semibold text-gray-600 mb-0.5">Cargo</label>
            <input
              type="text"
              value={data.representante2?.cargo || ''}
              onChange={e => updateRep('representante2', 'cargo', e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 rounded bg-white uppercase"
              placeholder="DIRECTORA FINANCIERA"
            />
          </div>
        </div>
      </div>

      {/* Bancos Locales */}
      <div className="space-y-3 pt-2">
        <h3 className="font-bold text-gray-900 border-b pb-1 text-xs uppercase tracking-wide text-blue-800">
          Información Bancaria (Banco Local 1)
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-semibold text-gray-700 mb-0.5">Nombre del Banco</label>
            <input
              type="text"
              value={data.bancoLocal1?.nombre || ''}
              onChange={e => updateBanco('bancoLocal1', 'nombre', e.target.value)}
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg uppercase"
              placeholder="BANCO MERCANTIL"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-0.5">Tipo de Cuenta</label>
            <input
              type="text"
              value={data.bancoLocal1?.tipoCuenta || ''}
              onChange={e => updateBanco('bancoLocal1', 'tipoCuenta', e.target.value)}
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg uppercase"
              placeholder="CORRIENTE"
            />
          </div>
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-0.5">Número de Cuenta (20 Dígitos)</label>
          <input
            type="text"
            value={data.bancoLocal1?.numeroCuenta || ''}
            onChange={e => updateBanco('bancoLocal1', 'numeroCuenta', e.target.value)}
            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg font-mono"
            placeholder="0105 0023 44 0123456789"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-0.5">Beneficiarios</label>
          <input
            type="text"
            value={data.bancoLocal1?.beneficiarios || ''}
            onChange={e => updateBanco('bancoLocal1', 'beneficiarios', e.target.value)}
            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg uppercase"
            placeholder="DISTRIBUIDORA DE ALIMENTOS DEL CENTRO C.A."
          />
        </div>
      </div>

      {/* Firmas */}
      <div className="space-y-3 pt-2">
        <h3 className="font-bold text-gray-900 border-b pb-1 text-xs uppercase tracking-wide text-blue-800">
          Firma y Huella del Representante Legal
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onOpenSignature('firma')}
            className="p-2 border border-gray-300 hover:border-blue-500 rounded-lg bg-white flex flex-col items-center justify-center text-center space-y-1"
          >
            <PenTool className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-[11px]">
              {data.firmaRepresentanteUrl ? 'Cambiar Firma' : 'Dibujar / Subir Firma'}
            </span>
            {data.firmaRepresentanteUrl && <span className="text-[10px] text-emerald-600 font-bold">✓ Cargada</span>}
          </button>

          <button
            type="button"
            onClick={() => onOpenSignature('huella')}
            className="p-2 border border-gray-300 hover:border-blue-500 rounded-lg bg-white flex flex-col items-center justify-center text-center space-y-1"
          >
            <Fingerprint className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold text-[11px]">
              {data.huellaRepresentanteUrl ? 'Cambiar Huella' : 'Registrar Huella'}
            </span>
            {data.huellaRepresentanteUrl && <span className="text-[10px] text-emerald-600 font-bold">✓ Registrada</span>}
          </button>
        </div>
      </div>

      {/* Recaudos */}
      <div className="space-y-2 pt-2">
        <h3 className="font-bold text-gray-900 border-b pb-1 text-xs uppercase tracking-wide text-blue-800">
          Documentos Entregados
        </h3>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={data.docRif}
            onChange={e => updateField('docRif', e.target.checked)}
          />
          <span>Fotocopia del Registro de Información Fiscal (RIF)</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={data.docConstitutivo}
            onChange={e => updateField('docConstitutivo', e.target.checked)}
          />
          <span>Documento constitutivo y estatutos protocolizados</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={data.docRifCiSocios}
            onChange={e => updateField('docRifCiSocios', e.target.checked)}
          />
          <span>RIF y Cédulas de identidad de socios y representantes</span>
        </label>
      </div>

      <div>
        <label className="block font-semibold text-gray-700 mb-0.5">Observaciones</label>
        <textarea
          rows={2}
          value={data.observaciones}
          onChange={e => updateField('observaciones', e.target.value)}
          className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs"
        />
      </div>
    </div>
  );
};
