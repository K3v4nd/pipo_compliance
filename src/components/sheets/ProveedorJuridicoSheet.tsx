import React from 'react';
import { CompanyConfig, ProveedorJuridicoData } from '../../types';
import { SheetHeader } from './SheetHeader';

interface Props {
  data: ProveedorJuridicoData;
  company: CompanyConfig;
}

export const ProveedorJuridicoSheet: React.FC<Props> = ({ data, company }) => {
  return (
    <div 
      id="printable-sheet-prov-juridico" 
      className="bg-white text-black font-sans w-full max-w-[215.9mm] mx-auto space-y-6 print:space-y-0"
    >
      {/* ================= PÁGINA 1 ================= */}
      <div 
        className="p-4 border border-gray-300 shadow-lg print:shadow-none print:border-0 print:p-0 print:m-0 text-[10px] leading-tight print:page-break-after-always"
        style={{ boxSizing: 'border-box', minHeight: '265mm' }}
      >
        {/* Encabezado */}
        <SheetHeader 
          company={company}
          title="REGISTRO DE PROVEEDOR PERSONA JURÍDICA"
          dia={data.fechaElaboracion.dia}
          mes={data.fechaElaboracion.mes}
          anio={data.fechaElaboracion.anio}
        />

        {/* 1. Información del Proveedor */}
        <div className="mt-1 border-2 border-black">
          <div className="bg-[#0284c7] text-white font-extrabold text-center py-0.5 text-[9.5px] uppercase tracking-wider border-b border-black">
            INFORMACIÓN DEL PROVEEDOR
          </div>
          
          <div className="grid grid-cols-12 border-b border-black">
            <div className="col-span-8 p-1 border-r border-black">
              <span className="font-bold text-[8px] uppercase text-gray-700 block">RAZÓN SOCIAL:</span>
              <span className="font-bold text-[10px] uppercase block">{data.razonSocial || '\u00A0'}</span>
            </div>
            <div className="col-span-4 p-1">
              <span className="font-bold text-[8px] uppercase text-gray-700 block">REGISTRO FISCAL (RIF):</span>
              <span className="font-bold text-[10px] uppercase block">{data.registroFiscal || '\u00A0'}</span>
            </div>
          </div>

          <div className="p-1 border-b border-black">
            <span className="font-bold text-[8px] uppercase text-gray-700 block">DESCRIPCIÓN DE ACTIVIDAD ECONÓMICA:</span>
            <span className="font-semibold text-[9.5px] block">{data.actividadEconomica || '\u00A0'}</span>
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-6 p-1 border-r border-black">
              <span className="font-bold text-[8px] uppercase text-gray-700 block">DIRECCIÓN FISCAL:</span>
              <span className="font-semibold text-[9.5px]">{data.direccionFiscal || '\u00A0'}</span>
            </div>
            <div className="col-span-3 p-1 border-r border-black">
              <span className="font-bold text-[8px] uppercase text-gray-700 block">TELÉFONO:</span>
              <span className="font-semibold text-[9.5px]">{data.telefono || '\u00A0'}</span>
            </div>
            <div className="col-span-3 p-1">
              <span className="font-bold text-[8px] uppercase text-gray-700 block">CORREO:</span>
              <span className="font-semibold text-[9.5px] truncate block">{data.correo || '\u00A0'}</span>
            </div>
          </div>
        </div>

        {/* 2. Representante Legal 1 */}
        <div className="mt-1 border-2 border-black">
          <div className="bg-gray-200 text-gray-900 font-extrabold text-center py-0.5 text-[9px] uppercase tracking-wider border-b border-black">
            REPRESENTANTE LEGAL 1
          </div>

          <div className="grid grid-cols-12 border-b border-black">
            <div className="col-span-5 p-1 border-r border-black">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">NOMBRE Y APELLIDO:</span>
              <span className="font-semibold text-[9.5px] uppercase">{data.representante1?.nombreApellido || '\u00A0'}</span>
            </div>
            <div className="col-span-4 p-1 border-r border-black">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">NÚMERO DE CÉDULA:</span>
              <span className="font-semibold text-[9.5px]">{data.representante1?.cedula || '\u00A0'}</span>
            </div>
            <div className="col-span-3 p-1">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">CARGO:</span>
              <span className="font-semibold text-[9.5px] uppercase">{data.representante1?.cargo || '\u00A0'}</span>
            </div>
          </div>

          <div className="grid grid-cols-12 border-b border-black">
            <div className="col-span-6 p-1 border-r border-black">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">DIRECCIÓN:</span>
              <span className="text-[9px]">{data.representante1?.direccion || '\u00A0'}</span>
            </div>
            <div className="col-span-3 p-1 border-r border-black">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">TELÉFONO:</span>
              <span className="text-[9px]">{data.representante1?.telefono || '\u00A0'}</span>
            </div>
            <div className="col-span-3 p-1">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">CORREO:</span>
              <span className="text-[9px] truncate block">{data.representante1?.correo || '\u00A0'}</span>
            </div>
          </div>

          <div className="p-1 text-[8px]">
            <span className="font-bold text-gray-700 block">
              ¿Conoce Usted a alguien dentro del {company.commercialName || company.name}? Si su respuesta es afirmativa, especifique:
            </span>
            <span className="font-medium text-[9px]">
              {data.representante1?.conoceAlguienEmpresa ? `${data.representante1.conoceAlguienEmpresa}. ` : ''}
              {data.representante1?.conoceAlguienDetalle || (data.representante1?.conoceAlguienEmpresa === 'NO' ? 'Ninguno' : 'No')}
            </span>
          </div>
        </div>

        {/* 3. Representante Legal 2 */}
        <div className="mt-1 border-2 border-black">
          <div className="bg-gray-200 text-gray-900 font-extrabold text-center py-0.5 text-[9px] uppercase tracking-wider border-b border-black">
            REPRESENTANTE LEGAL 2
          </div>

          <div className="grid grid-cols-12 border-b border-black">
            <div className="col-span-5 p-1 border-r border-black">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">NOMBRE Y APELLIDO:</span>
              <span className="font-semibold text-[9.5px] uppercase">{data.representante2?.nombreApellido || '-'}</span>
            </div>
            <div className="col-span-4 p-1 border-r border-black">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">NÚMERO DE CÉDULA:</span>
              <span className="font-semibold text-[9.5px]">{data.representante2?.cedula || '-'}</span>
            </div>
            <div className="col-span-3 p-1">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">CARGO:</span>
              <span className="font-semibold text-[9.5px] uppercase">{data.representante2?.cargo || '-'}</span>
            </div>
          </div>

          <div className="grid grid-cols-12 border-b border-black">
            <div className="col-span-6 p-1 border-r border-black">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">DIRECCIÓN:</span>
              <span className="text-[9px]">{data.representante2?.direccion || '-'}</span>
            </div>
            <div className="col-span-3 p-1 border-r border-black">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">TELÉFONO:</span>
              <span className="text-[9px]">{data.representante2?.telefono || '-'}</span>
            </div>
            <div className="col-span-3 p-1">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">CORREO:</span>
              <span className="text-[9px] truncate block">{data.representante2?.correo || '-'}</span>
            </div>
          </div>

          <div className="p-1 text-[8px]">
            <span className="font-bold text-gray-700 block">
              ¿Conoce Usted a alguien dentro del {company.commercialName || company.name}? Si su respuesta es afirmativa, especifique:
            </span>
            <span className="font-medium text-[9px]">
              {data.representante2?.conoceAlguienEmpresa ? `${data.representante2.conoceAlguienEmpresa}. ` : ''}
              {data.representante2?.conoceAlguienDetalle || (data.representante2?.conoceAlguienEmpresa === 'NO' ? 'Ninguno' : '-')}
            </span>
          </div>
        </div>

        {/* 4. Información Bancaria del Proveedor */}
        <div className="mt-1 border-2 border-black">
          <div className="bg-[#0284c7] text-white font-extrabold text-center py-0.5 text-[9.5px] uppercase tracking-wider border-b border-black">
            INFORMACIÓN BANCARIA DEL PROVEEDOR
          </div>

          {/* Banco Local 1 */}
          <div className="bg-gray-100 px-2 py-0.5 font-bold text-[8.5px] border-b border-black">
            BANCO LOCAL 1
          </div>
          <div className="grid grid-cols-12 border-b border-black">
            <div className="col-span-4 p-1 border-r border-black">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">NOMBRE DEL BANCO:</span>
              <span className="font-semibold text-[9px] uppercase">{data.bancoLocal1?.nombre || '\u00A0'}</span>
            </div>
            <div className="col-span-3 p-1 border-r border-black">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">TIPO DE CUENTA:</span>
              <span className="font-semibold text-[9px] uppercase">{data.bancoLocal1?.tipoCuenta || '\u00A0'}</span>
            </div>
            <div className="col-span-5 p-1">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">NÚMERO DE CUENTA (20 DÍGITOS):</span>
              <span className="font-mono font-bold text-[9.5px]">{data.bancoLocal1?.numeroCuenta || '\u00A0'}</span>
            </div>
          </div>
          <div className="grid grid-cols-12 border-b border-black">
            <div className="col-span-6 p-1 border-r border-black">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">SUCURSAL DEL BANCO:</span>
              <span className="text-[9px]">{data.bancoLocal1?.sucursal || '\u00A0'}</span>
            </div>
            <div className="col-span-6 p-1">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">BENEFICIARIOS:</span>
              <span className="text-[9px] uppercase">{data.bancoLocal1?.beneficiarios || '\u00A0'}</span>
            </div>
          </div>

          {/* Banco Local 2 */}
          <div className="bg-gray-100 px-2 py-0.5 font-bold text-[8.5px] border-b border-black">
            BANCO LOCAL 2
          </div>
          <div className="grid grid-cols-12 border-b border-black">
            <div className="col-span-4 p-1 border-r border-black">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">NOMBRE DEL BANCO:</span>
              <span className="font-semibold text-[9px] uppercase">{data.bancoLocal2?.nombre || '-'}</span>
            </div>
            <div className="col-span-3 p-1 border-r border-black">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">TIPO DE CUENTA:</span>
              <span className="font-semibold text-[9px] uppercase">{data.bancoLocal2?.tipoCuenta || '-'}</span>
            </div>
            <div className="col-span-5 p-1">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">NÚMERO DE CUENTA (20 DÍGITOS):</span>
              <span className="font-mono font-bold text-[9.5px]">{data.bancoLocal2?.numeroCuenta || '-'}</span>
            </div>
          </div>
          <div className="grid grid-cols-12 border-b border-black">
            <div className="col-span-6 p-1 border-r border-black">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">SUCURSAL DEL BANCO:</span>
              <span className="text-[9px]">{data.bancoLocal2?.sucursal || '-'}</span>
            </div>
            <div className="col-span-6 p-1">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">BENEFICIARIOS:</span>
              <span className="text-[9px] uppercase">{data.bancoLocal2?.beneficiarios || '-'}</span>
            </div>
          </div>

          {/* Banco Internacional */}
          <div className="bg-gray-100 px-2 py-0.5 font-bold text-[8.5px] border-b border-black">
            BANCO INTERNACIONAL (EN CASO DE QUE APLIQUE)
          </div>
          <div className="grid grid-cols-12 border-b border-black">
            <div className="col-span-4 p-1 border-r border-black">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">NOMBRE DEL BANCO:</span>
              <span className="text-[9px] uppercase">{data.bancoInternacional?.nombre || '-'}</span>
            </div>
            <div className="col-span-4 p-1 border-r border-black">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">DIRECCIÓN:</span>
              <span className="text-[9px]">{data.bancoInternacional?.direccion || '-'}</span>
            </div>
            <div className="col-span-4 p-1">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">NÚMERO DE CUENTA:</span>
              <span className="font-mono text-[9px]">{data.bancoInternacional?.numeroCuenta || '-'}</span>
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-6 p-1 border-r border-black">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">SWIFT (BIC):</span>
              <span className="font-mono text-[9px]">{data.bancoInternacional?.swift || '-'}</span>
            </div>
            <div className="col-span-6 p-1">
              <span className="font-bold text-[7.5px] uppercase text-gray-700 block">BENEFICIARIOS:</span>
              <span className="text-[9px] uppercase">{data.bancoInternacional?.beneficiarios || '-'}</span>
            </div>
          </div>
        </div>

        <div className="mt-2 text-right text-[8px] text-gray-500 font-semibold">
          Página 1 de 2
        </div>
      </div>

      {/* ================= PÁGINA 2 ================= */}
      <div 
        className="p-4 border border-gray-300 shadow-lg print:shadow-none print:border-0 print:p-0 print:m-0 text-[10px] leading-tight"
        style={{ boxSizing: 'border-box', minHeight: '265mm' }}
      >
        {/* Declaración Jurada */}
        <div className="border-2 border-black">
          <div className="bg-[#0284c7] text-white font-extrabold text-center py-0.5 text-[9.5px] uppercase tracking-wider border-b border-black">
            DECLARACIÓN JURADA DE INFORMACIÓN Y DOCUMENTACIÓN
          </div>
          <div className="p-2 text-[9px] text-justify leading-snug border-b border-black">
            Declaro que la información descrita en este formulario son obtenidas de manera lícita y autorizo la verificación de la misma y de los documentos entregados.
          </div>

          <div className="grid grid-cols-12 p-3 items-end">
            <div className="col-span-8 pr-6 text-center">
              <div className="h-20 flex items-center justify-center">
                {data.firmaRepresentanteUrl ? (
                  <img src={data.firmaRepresentanteUrl} alt="Firma" className="max-h-16 max-w-full object-contain" />
                ) : (
                  <div className="text-gray-300 italic text-[9.5px]">Espacio para Firma del Representante</div>
                )}
              </div>
              <div className="border-t border-black pt-1 text-[9px] font-bold uppercase tracking-wider">
                FIRMA Y HUELLA DEL REPRESENTANTE LEGAL
              </div>
            </div>

            <div className="col-span-4 flex flex-col items-center justify-center">
              <div className="w-24 h-24 border-2 border-black flex flex-col items-center justify-center p-1 bg-gray-50">
                {data.huellaRepresentanteUrl ? (
                  <img src={data.huellaRepresentanteUrl} alt="Huella" className="max-h-20 max-w-full object-contain" />
                ) : (
                  <div className="text-[8px] text-gray-400 text-center uppercase font-bold leading-tight">
                    HUELLA DACTILAR<br />PULGAR
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Documentación Requerida */}
        <div className="mt-3 border-2 border-black">
          <div className="grid grid-cols-12 bg-[#0284c7] text-white font-extrabold text-[9.5px] uppercase tracking-wider border-b border-black">
            <div className="col-span-9 py-0.5 px-2">DOCUMENTACIÓN REQUERIDA</div>
            <div className="col-span-3 text-center py-0.5 border-l border-black">ENTREGADOS</div>
          </div>
          <div className="grid grid-cols-12 border-b border-black text-[8.5px] bg-gray-100 font-bold">
            <div className="col-span-9 px-2 py-0.5">RECAUDO SOLICITADO</div>
            <div className="col-span-1.5 text-center border-l border-black py-0.5">SÍ</div>
            <div className="col-span-1.5 text-center border-l border-black py-0.5">NO</div>
          </div>

          <div className="grid grid-cols-12 border-b border-black text-[9px] items-center">
            <div className="col-span-9 px-2 py-1">Fotocopia del Registro de Información Fiscal (RIF)</div>
            <div className="col-span-1.5 text-center border-l border-black font-bold py-1">{data.docRif ? 'X' : ''}</div>
            <div className="col-span-1.5 text-center border-l border-black font-bold py-1">{!data.docRif ? 'X' : ''}</div>
          </div>

          <div className="grid grid-cols-12 border-b border-black text-[9px] items-center">
            <div className="col-span-9 px-2 py-1">Fotocopia del documento constitutivo de la empresa/Estatutos sociales y modificaciones debidamente protocolizadas</div>
            <div className="col-span-1.5 text-center border-l border-black font-bold py-1">{data.docConstitutivo ? 'X' : ''}</div>
            <div className="col-span-1.5 text-center border-l border-black font-bold py-1">{!data.docConstitutivo ? 'X' : ''}</div>
          </div>

          <div className="grid grid-cols-12 border-b border-black text-[9px] items-center">
            <div className="col-span-9 px-2 py-1">Fotocopias del Registro Fiscal y Cédula de identidad de los socios y representantes</div>
            <div className="col-span-1.5 text-center border-l border-black font-bold py-1">{data.docRifCiSocios ? 'X' : ''}</div>
            <div className="col-span-1.5 text-center border-l border-black font-bold py-1">{!data.docRifCiSocios ? 'X' : ''}</div>
          </div>

          <div className="grid grid-cols-12 border-b border-black text-[9px] items-center">
            <div className="col-span-9 px-2 py-1">Pasaporte vigente-Solo para personas extranjeras no residentes</div>
            <div className="col-span-1.5 text-center border-l border-black font-bold py-1">{data.docPasaporteExtranjeros ? 'X' : ''}</div>
            <div className="col-span-1.5 text-center border-l border-black font-bold py-1">{!data.docPasaporteExtranjeros ? 'X' : ''}</div>
          </div>

          <div className="grid grid-cols-12 border-b border-black text-[9px] items-center">
            <div className="col-span-9 px-2 py-1">Constancia que certifique el número de cuenta bancaria</div>
            <div className="col-span-1.5 text-center border-l border-black font-bold py-1">{data.docCertCuenta ? 'X' : ''}</div>
            <div className="col-span-1.5 text-center border-l border-black font-bold py-1">{!data.docCertCuenta ? 'X' : ''}</div>
          </div>

          <div className="grid grid-cols-12 border-b border-black text-[9px] items-center">
            <div className="col-span-9 px-2 py-1">Otros: {data.docOtrosDetalle || '___________________________'}</div>
            <div className="col-span-1.5 text-center border-l border-black font-bold py-1">{data.docOtros ? 'X' : ''}</div>
            <div className="col-span-1.5 text-center border-l border-black font-bold py-1">{!data.docOtros ? 'X' : ''}</div>
          </div>

          <div className="p-2 min-h-[35px]">
            <span className="font-bold text-[8px] text-gray-700 block">OBSERVACIONES:</span>
            <span className="text-[9px] italic text-gray-800">{data.observaciones || 'Sin observaciones adicionales.'}</span>
          </div>
        </div>

        {/* Revisión */}
        <div className="mt-3 border-2 border-black">
          <div className="bg-[#0284c7] text-white font-extrabold text-center py-0.5 text-[9.5px] uppercase tracking-wider border-b border-black">
            REVISIÓN
          </div>
          <div className="p-2 text-[8.5px] text-justify leading-snug border-b border-black">
            Declaro que los datos entregados por el proveedor fueron verificados de acuerdo a lo establecido en el Manual de Normas, Políticas y Procedimientos de Administración de Riesgos (MNPPAR) de Prevención de Legitimación de Capitales, Financiamiento al Terrorismo y Financiación a la Proliferación de Armas de Destrucción Masiva y Otros Ilícitos.
          </div>

          <div className="grid grid-cols-2 gap-6 p-4">
            <div className="text-center">
              <div className="h-14 flex items-center justify-center">
                {data.deptoResponsableFirma ? (
                  <img src={data.deptoResponsableFirma} alt="Firma" className="max-h-12 object-contain" />
                ) : (
                  <div className="text-gray-300 italic text-[9px]">Firma / Sello</div>
                )}
              </div>
              <div className="border-t border-black pt-1">
                <div className="font-bold text-[9px] uppercase">
                  {company.defaultDeptResp || 'Departamento Responsable'}
                </div>
                <div className="text-[8.5px] text-gray-700">{data.deptoResponsableNombre || ''}</div>
              </div>
            </div>

            <div className="text-center">
              <div className="h-14 flex items-center justify-center">
                {data.oficialCumplimientoFirma ? (
                  <img src={data.oficialCumplimientoFirma} alt="Firma" className="max-h-12 object-contain" />
                ) : (
                  <div className="text-gray-300 italic text-[9px]">Firma / Sello</div>
                )}
              </div>
              <div className="border-t border-black pt-1">
                <div className="font-bold text-[9px] uppercase">
                  {company.defaultOfficer || 'Oficial de Cumplimiento'}
                </div>
                <div className="text-[8.5px] text-gray-700">{data.oficialCumplimientoNombre || ''}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 text-right text-[8px] text-gray-500 font-semibold">
          Página 2 de 2
        </div>
      </div>
    </div>
  );
};
