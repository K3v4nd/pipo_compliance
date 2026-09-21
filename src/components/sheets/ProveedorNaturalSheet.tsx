import React from 'react';
import { CompanyConfig, ProveedorNaturalData } from '../../types';
import { SheetHeader } from './SheetHeader';

interface Props {
  data: ProveedorNaturalData;
  company: CompanyConfig;
}

export const ProveedorNaturalSheet: React.FC<Props> = ({ data, company }) => {
  return (
    <div 
      id="printable-sheet-prov-natural" 
      className="bg-white text-black font-sans w-full max-w-[215.9mm] mx-auto p-4 border border-gray-300 shadow-lg print:shadow-none print:border-0 print:p-0 print:m-0 text-[10px] leading-tight"
      style={{ boxSizing: 'border-box' }}
    >
      {/* 1. Encabezado */}
      <SheetHeader 
        company={company}
        title="REGISTRO DE PROVEEDOR PERSONA NATURAL"
        dia={data.fechaElaboracion.dia}
        mes={data.fechaElaboracion.mes}
        anio={data.fechaElaboracion.anio}
      />

      {/* 2. Información del Proveedor */}
      <div className="mt-1 border-2 border-black">
        <div className="bg-[#0284c7] text-white font-extrabold text-center py-0.5 text-[9.5px] uppercase tracking-wider border-b border-black">
          INFORMACIÓN DEL PROVEEDOR
        </div>
        
        <div className="grid grid-cols-12 border-b border-black">
          <div className="col-span-8 p-1 border-r border-black">
            <span className="font-bold text-[8px] uppercase text-gray-700 block">NOMBRES Y APELLIDOS</span>
            <span className="font-bold text-[10px] uppercase block">{data.nombresApellidos || '\u00A0'}</span>
          </div>
          <div className="col-span-4 p-1">
            <span className="font-bold text-[8px] uppercase text-gray-700 block">CÉDULA DE IDENTIDAD</span>
            <span className="font-bold text-[10px] uppercase block">{data.cedula || '\u00A0'}</span>
          </div>
        </div>

        <div className="p-1 border-b border-black">
          <span className="font-bold text-[8px] uppercase text-gray-700 block">DESCRIPCIÓN DE ACTIVIDAD ECONÓMICA / PROFESIÓN U OFICIO:</span>
          <span className="font-semibold text-[9.5px] block">{data.actividadEconomica || '\u00A0'}</span>
        </div>

        <div className="grid grid-cols-12 border-b border-black">
          <div className="col-span-6 p-1 border-r border-black">
            <span className="font-bold text-[8px] uppercase text-gray-700 block">NACIONALIDAD:</span>
            <span className="font-semibold text-[9.5px] uppercase">{data.nacionalidad || '\u00A0'}</span>
          </div>
          <div className="col-span-6 p-1">
            <span className="font-bold text-[8px] uppercase text-gray-700 block">ESTADO CIVIL:</span>
            <span className="font-semibold text-[9.5px] uppercase">{data.estadoCivil || '\u00A0'}</span>
          </div>
        </div>

        <div className="p-1 border-b border-black">
          <span className="font-bold text-[8px] uppercase text-gray-700 block">DIRECCIÓN FISCAL:</span>
          <span className="font-semibold text-[9.5px] block">{data.direccionFiscal || '\u00A0'}</span>
        </div>

        <div className="grid grid-cols-12 border-b border-black">
          <div className="col-span-4 p-1 border-r border-black">
            <span className="font-bold text-[8px] uppercase text-gray-700 block">CIUDAD:</span>
            <span className="font-semibold text-[9.5px]">{data.ciudadFiscal || '\u00A0'}</span>
          </div>
          <div className="col-span-4 p-1 border-r border-black">
            <span className="font-bold text-[8px] uppercase text-gray-700 block">ESTADO:</span>
            <span className="font-semibold text-[9.5px]">{data.estadoFiscal || '\u00A0'}</span>
          </div>
          <div className="col-span-4 p-1">
            <span className="font-bold text-[8px] uppercase text-gray-700 block">TELÉFONO DE CONTACTO:</span>
            <span className="font-semibold text-[9.5px]">{data.telefonoFiscal || '\u00A0'}</span>
          </div>
        </div>

        <div className="p-1 border-b border-black bg-gray-50/50">
          <span className="font-bold text-[8px] uppercase text-gray-700 block">DIRECCIÓN FÍSICA (EN CASO QUE SEA DIFERENTE A LA DIRECCIÓN FISCAL):</span>
          <span className="font-semibold text-[9.5px] block">{data.direccionFisica || '\u00A0'}</span>
        </div>

        <div className="grid grid-cols-12 border-b border-black">
          <div className="col-span-4 p-1 border-r border-black">
            <span className="font-bold text-[8px] uppercase text-gray-700 block">CIUDAD:</span>
            <span className="font-semibold text-[9.5px]">{data.ciudadFisica || '\u00A0'}</span>
          </div>
          <div className="col-span-4 p-1 border-r border-black">
            <span className="font-bold text-[8px] uppercase text-gray-700 block">ESTADO:</span>
            <span className="font-semibold text-[9.5px]">{data.estadoFisica || '\u00A0'}</span>
          </div>
          <div className="col-span-4 p-1">
            <span className="font-bold text-[8px] uppercase text-gray-700 block">TELÉFONO DE CONTACTO:</span>
            <span className="font-semibold text-[9.5px]">{data.telefonoFisico || '\u00A0'}</span>
          </div>
        </div>

        <div className="p-1 border-b border-black">
          <span className="font-bold text-[8px] uppercase text-gray-700 block">CORREO ELECTRÓNICO:</span>
          <span className="font-semibold text-[9.5px]">{data.correo || '\u00A0'}</span>
        </div>

        <div className="p-1 min-h-[30px]">
          <span className="font-bold text-[8px] text-gray-800 block leading-tight">
            ¿Conoce Usted a alguien dentro del {company.commercialName || company.name}? Si su respuesta es afirmativa, especifique:
          </span>
          <div className="text-[9.5px] font-semibold mt-0.5">
            {data.conoceAlguienEmpresa ? `${data.conoceAlguienEmpresa}. ` : ''}
            {data.conoceAlguienDetalle || (data.conoceAlguienEmpresa === 'NO' ? 'Ninguno' : 'No especifica')}
          </div>
        </div>
      </div>

      {/* 3. Información Bancaria */}
      <div className="mt-1 border-2 border-black">
        <div className="bg-[#0284c7] text-white font-extrabold text-center py-0.5 text-[9.5px] uppercase tracking-wider border-b border-black">
          INFORMACIÓN BANCARIA DEL PROVEEDOR
        </div>
        <div className="bg-gray-100 p-1 text-[7.5px] text-gray-800 border-b border-black italic leading-tight text-center">
          Los datos suministrados en esta sección serán los considerados para el pago de facturas; cualquier cambio debe ser notificado al departamento de administración de {company.commercialName || company.name} y a la Oficina de Cumplimiento.
        </div>

        <div className="grid grid-cols-12 border-b border-black">
          <div className="col-span-7 p-1 border-r border-black">
            <span className="font-bold text-[8px] uppercase text-gray-700 block">NÚMERO DE CUENTA (20 DÍGITOS):</span>
            <span className="font-mono font-bold text-[10.5px]">{data.cuentaNumero || '\u00A0'}</span>
          </div>
          <div className="col-span-5 p-1">
            <span className="font-bold text-[8px] uppercase text-gray-700 block">BANCO:</span>
            <span className="font-semibold text-[9.5px] uppercase">{data.banco || '\u00A0'}</span>
          </div>
        </div>

        <div className="grid grid-cols-12 border-b border-black">
          <div className="col-span-7 p-1 border-r border-black">
            <span className="font-bold text-[8px] uppercase text-gray-700 block">NOMBRE DEL TITULAR DE LA CUENTA:</span>
            <span className="font-semibold text-[9.5px] uppercase">{data.titularNombre || '\u00A0'}</span>
          </div>
          <div className="col-span-5 p-1">
            <span className="font-bold text-[8px] uppercase text-gray-700 block">C.I. O RIF DEL TITULAR DE LA CUENTA:</span>
            <span className="font-semibold text-[9.5px] uppercase">{data.titularCiRif || '\u00A0'}</span>
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-2 p-1 border-r border-black">
            <span className="font-bold text-[7.5px] uppercase text-gray-700 block">SWIFT:</span>
            <span className="font-mono text-[9px]">{data.swift || '-'}</span>
          </div>
          <div className="col-span-2 p-1 border-r border-black">
            <span className="font-bold text-[7.5px] uppercase text-gray-700 block">ABA:</span>
            <span className="font-mono text-[9px]">{data.aba || '-'}</span>
          </div>
          <div className="col-span-4 p-1 border-r border-black">
            <span className="font-bold text-[7.5px] uppercase text-gray-700 block">CORREO ZELLE:</span>
            <span className="text-[9px]">{data.correoZelle || '-'}</span>
          </div>
          <div className="col-span-4 p-1">
            <span className="font-bold text-[7.5px] uppercase text-gray-700 block">DIRECCIÓN BANCO:</span>
            <span className="text-[9px] truncate block">{data.direccionBanco || '-'}</span>
          </div>
        </div>
      </div>

      {/* 4. Declaración Jurada y Firma / Huella */}
      <div className="mt-1 border-2 border-black">
        <div className="bg-[#0284c7] text-white font-extrabold text-center py-0.5 text-[9px] uppercase tracking-wider border-b border-black">
          DECLARACIÓN JURADA DE INFORMACIÓN Y DOCUMENTACIÓN
        </div>
        <div className="p-1 text-[8.5px] text-justify leading-snug border-b border-black">
          Declaro que la información descrita en este formulario son obtenidas de manera lícita y autorizo la verificación de la misma y de los documentos entregados.
        </div>

        <div className="grid grid-cols-12 p-1.5 items-end">
          {/* Firma */}
          <div className="col-span-8 pr-4 text-center">
            <div className="h-16 flex items-center justify-center">
              {data.firmaUrl ? (
                <img src={data.firmaUrl} alt="Firma" className="max-h-14 max-w-full object-contain" />
              ) : (
                <div className="text-gray-300 italic text-[9px]">Espacio para Firma</div>
              )}
            </div>
            <div className="border-t border-black pt-0.5 text-[8.5px] font-bold uppercase tracking-wider">
              FIRMA Y HUELLA
            </div>
          </div>

          {/* Recuadro de huella dactilar */}
          <div className="col-span-4 flex flex-col items-center justify-center">
            <div className="w-20 h-20 border-2 border-black flex flex-col items-center justify-center p-0.5 bg-gray-50/70">
              {data.huellaUrl ? (
                <img src={data.huellaUrl} alt="Huella" className="max-h-18 max-w-full object-contain" />
              ) : (
                <div className="text-[7.5px] text-gray-400 text-center uppercase font-bold leading-tight">
                  RECUADRO<br />HUELLA DACTILAR
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Documentación Requerida */}
      <div className="mt-1 border-2 border-black">
        <div className="grid grid-cols-12 bg-[#0284c7] text-white font-extrabold text-[9px] uppercase tracking-wider border-b border-black">
          <div className="col-span-9 py-0.5 px-2">DOCUMENTACIÓN REQUERIDA</div>
          <div className="col-span-3 text-center py-0.5 border-l border-black">ENTREGADOS</div>
        </div>
        <div className="grid grid-cols-12 border-b border-black text-[8px] bg-gray-100 font-bold">
          <div className="col-span-9 px-2 py-0.5">RECAUDO SOLICITADO</div>
          <div className="col-span-1.5 text-center border-l border-black py-0.5">SÍ</div>
          <div className="col-span-1.5 text-center border-l border-black py-0.5">NO</div>
        </div>

        {/* Item 1 */}
        <div className="grid grid-cols-12 border-b border-black text-[8.5px] items-center">
          <div className="col-span-9 px-2 py-0.5">Fotocopias del Registro Fiscal y Cédula de identidad</div>
          <div className="col-span-1.5 text-center border-l border-black font-bold py-0.5">
            {data.docFiscalCi ? 'X' : ''}
          </div>
          <div className="col-span-1.5 text-center border-l border-black font-bold py-0.5">
            {!data.docFiscalCi ? 'X' : ''}
          </div>
        </div>

        {/* Item 2 */}
        <div className="grid grid-cols-12 border-b border-black text-[8.5px] items-center">
          <div className="col-span-9 px-2 py-0.5">Pasaporte vigente - Solo para personas extranjeras no residentes</div>
          <div className="col-span-1.5 text-center border-l border-black font-bold py-0.5">
            {data.docPasaporte ? 'X' : ''}
          </div>
          <div className="col-span-1.5 text-center border-l border-black font-bold py-0.5">
            {!data.docPasaporte ? 'X' : ''}
          </div>
        </div>

        {/* Item 3 */}
        <div className="grid grid-cols-12 border-b border-black text-[8.5px] items-center">
          <div className="col-span-9 px-2 py-0.5">Constancia que certifique el número de cuenta bancaria</div>
          <div className="col-span-1.5 text-center border-l border-black font-bold py-0.5">
            {data.docCertCuenta ? 'X' : ''}
          </div>
          <div className="col-span-1.5 text-center border-l border-black font-bold py-0.5">
            {!data.docCertCuenta ? 'X' : ''}
          </div>
        </div>

        {/* Item 4 */}
        <div className="grid grid-cols-12 border-b border-black text-[8.5px] items-center">
          <div className="col-span-9 px-2 py-0.5">
            Otros: {data.docOtrosDetalle || '___________________________'}
          </div>
          <div className="col-span-1.5 text-center border-l border-black font-bold py-0.5">
            {data.docOtros ? 'X' : ''}
          </div>
          <div className="col-span-1.5 text-center border-l border-black font-bold py-0.5">
            {!data.docOtros ? 'X' : ''}
          </div>
        </div>

        <div className="p-1 min-h-[22px]">
          <span className="font-bold text-[8px] text-gray-700 block">OBSERVACIONES:</span>
          <span className="text-[8.5px] italic text-gray-800">{data.observaciones || 'Sin observaciones.'}</span>
        </div>
      </div>

      {/* 6. Revisión y Aprobación */}
      <div className="mt-1 border-2 border-black">
        <div className="bg-[#0284c7] text-white font-extrabold text-center py-0.5 text-[9px] uppercase tracking-wider border-b border-black">
          REVISIÓN
        </div>
        <div className="p-1 text-[8px] text-justify leading-tight border-b border-black">
          Declaro que los datos entregados por el proveedor fueron verificados de acuerdo a lo establecido en el Manual de Normas, Políticas y Procedimientos de Administración de Riesgos (MNPPAR) de Prevención de Legitimación de Capitales, Financiamiento al Terrorismo y Financiación a la Proliferación de Armas de Destrucción Masiva y Otros Ilícitos.
        </div>

        <div className="grid grid-cols-2 gap-4 p-2">
          <div className="text-center">
            <div className="h-10 flex items-center justify-center">
              {data.deptoResponsableFirma ? (
                <img src={data.deptoResponsableFirma} alt="Firma" className="max-h-9 object-contain" />
              ) : (
                <div className="text-gray-300 italic text-[8px]">Firma / Sello</div>
              )}
            </div>
            <div className="border-t border-black pt-1">
              <div className="font-bold text-[8.5px] uppercase">
                {company.defaultDeptResp || 'Departamento Responsable'}
              </div>
              <div className="text-[8px] text-gray-700">{data.deptoResponsableNombre || ''}</div>
            </div>
          </div>

          <div className="text-center">
            <div className="h-10 flex items-center justify-center">
              {data.oficialCumplimientoFirma ? (
                <img src={data.oficialCumplimientoFirma} alt="Firma" className="max-h-9 object-contain" />
              ) : (
                <div className="text-gray-300 italic text-[8px]">Firma / Sello</div>
              )}
            </div>
            <div className="border-t border-black pt-1">
              <div className="font-bold text-[8.5px] uppercase">
                {company.defaultOfficer || 'Oficial de Cumplimiento'}
              </div>
              <div className="text-[8px] text-gray-700">{data.oficialCumplimientoNombre || ''}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
