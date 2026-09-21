import React from 'react';
import { ProveedorNaturalData } from '../../types';
import { PenTool, Fingerprint } from 'lucide-react';

interface Props {
  data: ProveedorNaturalData;
  onChange: (updated: ProveedorNaturalData) => void;
  onOpenSignature: (type: 'firma' | 'huella') => void;
}

export const ProveedorNaturalEditor: React.FC<Props> = ({ data, onChange, onOpenSignature }) => {
  const updateField = (field: keyof ProveedorNaturalData, value: any) => {
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

      {/* Información del Proveedor */}
      <div className="space-y-3">
        <h3 className="font-bold text-gray-900 border-b pb-1 text-xs uppercase tracking-wide text-blue-800">
          Información del Proveedor
        </h3>

        <div>
          <label className="block font-semibold text-gray-700 mb-0.5">Nombres y Apellidos</label>
          <input
            type="text"
            value={data.nombresApellidos}
            onChange={e => updateField('nombresApellidos', e.target.value)}
            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 uppercase"
            placeholder="Ej. CARLOS ALBERTO MENDOZA SILVA"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-semibold text-gray-700 mb-0.5">Cédula de Identidad</label>
            <input
              type="text"
              value={data.cedula}
              onChange={e => updateField('cedula', e.target.value)}
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 font-mono"
              placeholder="V-15.892.431"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-0.5">Nacionalidad</label>
            <input
              type="text"
              value={data.nacionalidad}
              onChange={e => updateField('nacionalidad', e.target.value)}
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg uppercase"
              placeholder="VENEZOLANA"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-semibold text-gray-700 mb-0.5">Estado Civil</label>
            <select
              value={data.estadoCivil}
              onChange={e => updateField('estadoCivil', e.target.value)}
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg bg-white uppercase"
            >
              <option value="SOLTERO">SOLTERO(A)</option>
              <option value="CASADO">CASADO(A)</option>
              <option value="DIVORCIADO">DIVORCIADO(A)</option>
              <option value="VIUDO">VIUDO(A)</option>
              <option value="CONCUBINATO">CONCUBINATO</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-0.5">Teléfono de Contacto</label>
            <input
              type="text"
              value={data.telefonoFiscal}
              onChange={e => updateField('telefonoFiscal', e.target.value)}
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg"
              placeholder="0412-5551234"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-0.5">Actividad Económica / Profesión u Oficio</label>
          <input
            type="text"
            value={data.actividadEconomica}
            onChange={e => updateField('actividadEconomica', e.target.value)}
            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg"
            placeholder="Ej. Servicios de refrigeración y climatización"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-0.5">Dirección Fiscal</label>
          <input
            type="text"
            value={data.direccionFiscal}
            onChange={e => updateField('direccionFiscal', e.target.value)}
            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg"
            placeholder="Av. Principal, Edificio, Piso, Local..."
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-semibold text-gray-700 mb-0.5">Ciudad Fiscal</label>
            <input
              type="text"
              value={data.ciudadFiscal}
              onChange={e => updateField('ciudadFiscal', e.target.value)}
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg"
              placeholder="Maracay"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-0.5">Estado Fiscal</label>
            <input
              type="text"
              value={data.estadoFiscal}
              onChange={e => updateField('estadoFiscal', e.target.value)}
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg"
              placeholder="Aragua"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-0.5">Dirección Física (Si difiere de la fiscal)</label>
          <input
            type="text"
            value={data.direccionFisica}
            onChange={e => updateField('direccionFisica', e.target.value)}
            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg"
            placeholder="Dirección del taller o sede operativa"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-0.5">Correo Electrónico</label>
          <input
            type="email"
            value={data.correo}
            onChange={e => updateField('correo', e.target.value)}
            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg"
            placeholder="proveedor@empresa.com"
          />
        </div>

        <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200">
          <label className="block font-semibold text-amber-900 mb-1">
            ¿Conoce a alguien dentro de la Empresa?
          </label>
          <div className="flex items-center space-x-4 mb-1.5">
            <label className="inline-flex items-center space-x-1.5">
              <input
                type="radio"
                name="prov_conoce"
                checked={data.conoceAlguienEmpresa === 'NO'}
                onChange={() => updateField('conoceAlguienEmpresa', 'NO')}
              />
              <span>NO</span>
            </label>
            <label className="inline-flex items-center space-x-1.5">
              <input
                type="radio"
                name="prov_conoce"
                checked={data.conoceAlguienEmpresa === 'SI'}
                onChange={() => updateField('conoceAlguienEmpresa', 'SI')}
              />
              <span>SÍ (especificar)</span>
            </label>
          </div>
          {data.conoceAlguienEmpresa === 'SI' && (
            <input
              type="text"
              value={data.conoceAlguienDetalle}
              onChange={e => updateField('conoceAlguienDetalle', e.target.value)}
              className="w-full px-2 py-1 border border-amber-300 rounded bg-white text-xs"
              placeholder="Indica nombre, cargo o parentesco..."
            />
          )}
        </div>
      </div>

      {/* Información Bancaria */}
      <div className="space-y-3 pt-2">
        <h3 className="font-bold text-gray-900 border-b pb-1 text-xs uppercase tracking-wide text-blue-800">
          Información Bancaria
        </h3>

        <div>
          <label className="block font-semibold text-gray-700 mb-0.5">Número de Cuenta (20 Dígitos)</label>
          <input
            type="text"
            value={data.cuentaNumero}
            onChange={e => updateField('cuentaNumero', e.target.value)}
            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg font-mono"
            placeholder="0102 0123 45 0000123456"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-semibold text-gray-700 mb-0.5">Banco</label>
            <input
              type="text"
              value={data.banco}
              onChange={e => updateField('banco', e.target.value)}
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg uppercase"
              placeholder="BANCO DE VENEZUELA"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-0.5">CI o RIF Titular</label>
            <input
              type="text"
              value={data.titularCiRif}
              onChange={e => updateField('titularCiRif', e.target.value)}
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg"
              placeholder="V-15892431"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-0.5">Nombre del Titular de la Cuenta</label>
          <input
            type="text"
            value={data.titularNombre}
            onChange={e => updateField('titularNombre', e.target.value)}
            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg uppercase"
            placeholder="CARLOS ALBERTO MENDOZA SILVA"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-semibold text-gray-700 mb-0.5">SWIFT / ABA</label>
            <input
              type="text"
              value={data.swift || data.aba}
              onChange={e => updateField('swift', e.target.value)}
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg font-mono"
              placeholder="SWIFT o ABA"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-0.5">Correo Zelle</label>
            <input
              type="text"
              value={data.correoZelle}
              onChange={e => updateField('correoZelle', e.target.value)}
              className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg"
              placeholder="zelle@correo.com"
            />
          </div>
        </div>
      </div>

      {/* Firmas y Huella Digital */}
      <div className="space-y-3 pt-2">
        <h3 className="font-bold text-gray-900 border-b pb-1 text-xs uppercase tracking-wide text-blue-800">
          Firma y Huella Digital
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onOpenSignature('firma')}
            className="p-2 border border-gray-300 hover:border-blue-500 rounded-lg bg-white flex flex-col items-center justify-center text-center space-y-1"
          >
            <PenTool className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-[11px]">
              {data.firmaUrl ? 'Cambiar Firma Digital' : 'Dibujar / Subir Firma'}
            </span>
            {data.firmaUrl && <span className="text-[10px] text-emerald-600 font-bold">✓ Firma cargada</span>}
          </button>

          <button
            type="button"
            onClick={() => onOpenSignature('huella')}
            className="p-2 border border-gray-300 hover:border-blue-500 rounded-lg bg-white flex flex-col items-center justify-center text-center space-y-1"
          >
            <Fingerprint className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold text-[11px]">
              {data.huellaUrl ? 'Cambiar Huella Digital' : 'Registrar Huella'}
            </span>
            {data.huellaUrl && <span className="text-[10px] text-emerald-600 font-bold">✓ Huella registrada</span>}
          </button>
        </div>
      </div>

      {/* Recaudos y Documentos */}
      <div className="space-y-2 pt-2">
        <h3 className="font-bold text-gray-900 border-b pb-1 text-xs uppercase tracking-wide text-blue-800">
          Documentación Requerida (Entregados)
        </h3>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={data.docFiscalCi}
            onChange={e => updateField('docFiscalCi', e.target.checked)}
          />
          <span>Fotocopias del Registro Fiscal (RIF) y Cédula de Identidad</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={data.docPasaporte}
            onChange={e => updateField('docPasaporte', e.target.checked)}
          />
          <span>Pasaporte vigente (extranjeros no residentes)</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={data.docCertCuenta}
            onChange={e => updateField('docCertCuenta', e.target.checked)}
          />
          <span>Constancia bancaria que certifique el número de cuenta</span>
        </label>
      </div>

      <div>
        <label className="block font-semibold text-gray-700 mb-0.5">Observaciones</label>
        <textarea
          rows={2}
          value={data.observaciones}
          onChange={e => updateField('observaciones', e.target.value)}
          className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs"
          placeholder="Observaciones de la verificación..."
        />
      </div>
    </div>
  );
};
