import React from 'react';
import { ClienteNaturalData } from '../../types';
import { PenTool, Fingerprint } from 'lucide-react';

interface Props {
  data: ClienteNaturalData;
  onChange: (updated: ClienteNaturalData) => void;
  onOpenSignature: (type: 'firma' | 'huella_der' | 'huella_izq') => void;
}

export const ClienteNaturalEditor: React.FC<Props> = ({ data, onChange, onOpenSignature }) => {
  const updateField = (field: keyof ClienteNaturalData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateFecha = (part: 'dia' | 'mes' | 'anio', value: string) => {
    onChange({
      ...data,
      fechaElaboracion: { ...data.fechaElaboracion, [part]: value }
    });
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Fecha & Tipo */}
      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-bold text-gray-800">Fecha de Elaboración</label>
          <div className="flex items-center space-x-3 text-xs font-semibold">
            <span>Tipo:</span>
            <label className="inline-flex items-center space-x-1 cursor-pointer">
              <input
                type="radio"
                name="cn_tipo"
                checked={data.tipoRegistro === 'INICIAL'}
                onChange={() => updateField('tipoRegistro', 'INICIAL')}
              />
              <span>Inicial</span>
            </label>
            <label className="inline-flex items-center space-x-1 cursor-pointer">
              <input
                type="radio"
                name="cn_tipo"
                checked={data.tipoRegistro === 'USUAL'}
                onChange={() => updateField('tipoRegistro', 'USUAL')}
              />
              <span>Usual</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <span className="text-[10px] text-gray-500 block">Día</span>
            <input
              type="text"
              maxLength={2}
              value={data.fechaElaboracion.dia}
              onChange={e => updateFecha('dia', e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded bg-white text-center font-bold"
            />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 block">Mes</span>
            <input
              type="text"
              maxLength={2}
              value={data.fechaElaboracion.mes}
              onChange={e => updateFecha('mes', e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded bg-white text-center font-bold"
            />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 block">Año</span>
            <input
              type="text"
              maxLength={4}
              value={data.fechaElaboracion.anio}
              onChange={e => updateFecha('anio', e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded bg-white text-center font-bold"
            />
          </div>
        </div>
      </div>

      {/* Información General */}
      <div className="space-y-3">
        <h3 className="font-bold text-gray-900 border-b pb-1 text-xs uppercase tracking-wide text-blue-900">
          Información General
        </h3>

        <div>
          <label className="block font-semibold text-gray-700 mb-0.5">2. Nombres y Apellidos</label>
          <input
            type="text"
            value={data.nombresApellidos}
            onChange={e => updateField('nombresApellidos', e.target.value)}
            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg uppercase"
            placeholder="GABRIELA SOFÍA HERNÁNDEZ"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-semibold text-gray-700 mb-0.5">3. Denominación Comercial</label>
            <input
              type="text"
              value={data.denominacionComercial}
              onChange={e => updateField('denominacionComercial', e.target.value)}
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg uppercase"
              placeholder="PRODUCCIONES GABRIELA HERNÁNDEZ"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-0.5">5. Documento / C.I.</label>
            <input
              type="text"
              value={data.docNumero}
              onChange={e => updateField('docNumero', e.target.value)}
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg font-mono uppercase"
              placeholder="V-18.765.432"
            />
          </div>
        </div>

        <div className="bg-gray-50 p-2 rounded-lg border border-gray-200 flex items-center justify-between">
          <span className="font-bold text-gray-700">6. Residencia:</span>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center space-x-1 cursor-pointer">
              <input
                type="radio"
                name="cn_residencia"
                checked={data.residencia === 'RESIDENCIADO'}
                onChange={() => updateField('residencia', 'RESIDENCIADO')}
              />
              <span>Residenciado en el país</span>
            </label>
            <label className="inline-flex items-center space-x-1 cursor-pointer">
              <input
                type="radio"
                name="cn_residencia"
                checked={data.residencia === 'NO_RESIDENCIADO'}
                onChange={() => updateField('residencia', 'NO_RESIDENCIADO')}
              />
              <span>No residenciado</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-0.5">7. País y Ciudad de Procedencia</label>
          <input
            type="text"
            value={data.paisCiudadProcedencia}
            onChange={e => updateField('paisCiudadProcedencia', e.target.value)}
            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg uppercase"
            placeholder="VENEZUELA / VALENCIA"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-0.5">8. Dirección de Domicilio</label>
          <input
            type="text"
            value={data.direccionDomicilio}
            onChange={e => updateField('direccionDomicilio', e.target.value)}
            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg"
            placeholder="Urb. El Viñedo, Av. Monseñor Adams..."
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-semibold text-gray-700 mb-0.5">9. Correo / Instagram</label>
            <input
              type="text"
              value={data.correoInstagram}
              onChange={e => updateField('correoInstagram', e.target.value)}
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg"
              placeholder="cliente@gmail.com / @instagram"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-0.5">10. Teléfono Móvil</label>
            <input
              type="text"
              value={data.telefonoMovil}
              onChange={e => updateField('telefonoMovil', e.target.value)}
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg"
              placeholder="0414-4321987"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-0.5">11. Descripción de la Actividad Económica</label>
          <input
            type="text"
            value={data.actividadEconomica}
            onChange={e => updateField('actividadEconomica', e.target.value)}
            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg"
            placeholder="Producción audiovisual, eventos..."
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-0.5">12. Beneficiarios</label>
          <input
            type="text"
            value={data.beneficiarios}
            onChange={e => updateField('beneficiarios', e.target.value)}
            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg"
            placeholder="Titular directa..."
          />
        </div>
      </div>

      {/* Huellas y Firmas */}
      <div className="space-y-3 pt-2">
        <h3 className="font-bold text-gray-900 border-b pb-1 text-xs uppercase tracking-wide text-blue-900">
          14. Firma y Huellas Dactilares
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => onOpenSignature('huella_der')}
            className="p-2 border border-gray-300 hover:border-blue-500 rounded-lg bg-white flex flex-col items-center justify-center text-center space-y-1"
          >
            <Fingerprint className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-[10px]">Pulgar Derecho</span>
            {data.huellaPulgarDerechoUrl && <span className="text-[9px] text-emerald-600 font-bold">✓ Listo</span>}
          </button>

          <button
            type="button"
            onClick={() => onOpenSignature('huella_izq')}
            className="p-2 border border-gray-300 hover:border-blue-500 rounded-lg bg-white flex flex-col items-center justify-center text-center space-y-1"
          >
            <Fingerprint className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold text-[10px]">Pulgar Izquierdo</span>
            {data.huellaPulgarIzquierdoUrl && <span className="text-[9px] text-emerald-600 font-bold">✓ Listo</span>}
          </button>

          <button
            type="button"
            onClick={() => onOpenSignature('firma')}
            className="p-2 border border-gray-300 hover:border-blue-500 rounded-lg bg-white flex flex-col items-center justify-center text-center space-y-1"
          >
            <PenTool className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-[10px]">Firma Cliente</span>
            {data.firmaClienteUrl && <span className="text-[9px] text-emerald-600 font-bold">✓ Listo</span>}
          </button>
        </div>
      </div>

      {/* Documentación Requerida */}
      <div className="space-y-2 pt-2">
        <h3 className="font-bold text-gray-900 border-b pb-1 text-xs uppercase tracking-wide text-blue-900">
          15. Documentación Requerida
        </h3>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={data.docCedulaPasaporte}
            onChange={e => updateField('docCedulaPasaporte', e.target.checked)}
          />
          <span>Fotocopia de Cédula de Identidad o Pasaporte</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={data.docRif}
            onChange={e => updateField('docRif', e.target.checked)}
          />
          <span>Fotocopia del Registro Fiscal (RIF) vigente</span>
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
