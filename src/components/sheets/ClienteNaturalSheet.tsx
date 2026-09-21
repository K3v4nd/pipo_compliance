import React from 'react';
import { ClienteNaturalData, CompanyConfig } from '../../types';
import { SheetHeader } from './SheetHeader';

interface Props {
  data: ClienteNaturalData;
  company: CompanyConfig;
}

export const ClienteNaturalSheet: React.FC<Props> = ({ data, company }) => {
  return (
    <div 
      id="printable-sheet-cliente-natural" 
      className="bg-white text-black font-sans w-full max-w-[215.9mm] mx-auto p-4 border border-gray-300 shadow-lg print:shadow-none print:border-0 print:p-0 print:m-0 text-[10px] leading-tight"
      style={{ boxSizing: 'border-box' }}
    >
      {/* 1. Header */}
      <SheetHeader 
        company={company}
        title="REGISTRO CLIENTES NATURALES"
        dia={data.fechaElaboracion.dia}
        mes={data.fechaElaboracion.mes}
        anio={data.fechaElaboracion.anio}
        clientCheckboxes={{ tipoRegistro: data.tipoRegistro }}
      />

      {/* 2. Información General */}
      <div className="mt-1 border-2 border-black">
        <div className="bg-[#0b386b] text-white font-extrabold text-center py-0.5 text-[9.5px] uppercase tracking-wider border-b border-black">
          INFORMACION GENERAL
        </div>

        <div className="grid grid-cols-12 border-b border-black">
          <div className="col-span-5 p-1 border-r border-black">
            <span className="font-bold text-[7.5px] uppercase text-gray-700 block">2. NOMBRES Y APELLIDOS (RAZON SOCIAL):</span>
            <span className="font-bold text-[9.5px] uppercase block">{data.nombresApellidos || '\u00A0'}</span>
          </div>
          <div className="col-span-4 p-1 border-r border-black">
            <span className="font-bold text-[7.5px] uppercase text-gray-700 block">3. DENOMINACION COMERCIAL:</span>
            <span className="font-semibold text-[9.5px] uppercase block">{data.denominacionComercial || '\u00A0'}</span>
          </div>
          <div className="col-span-1 p-1 border-r border-black text-center">
            <span className="font-bold text-[7.5px] uppercase text-gray-700 block">5. DOC</span>
            <span className="font-bold text-[9px] block">{data.docTipo || 'C.I.'}</span>
          </div>
          <div className="col-span-2 p-1">
            <span className="font-bold text-[7.5px] uppercase text-gray-700 block">NUMERO:</span>
            <span className="font-bold text-[9.5px] block">{data.docNumero || '\u00A0'}</span>
          </div>
        </div>

        <div className="grid grid-cols-12 border-b border-black">
          <div className="col-span-12 p-1 flex items-center justify-between">
            <span className="font-bold text-[8px] uppercase text-gray-700">6. RESIDENCIA:</span>
            <div className="flex items-center space-x-6 text-[8.5px]">
              <span className="flex items-center space-x-1.5">
                <span>Residenciado en el país</span>
                <span className="inline-block w-4 h-4 border border-black text-center font-black leading-3 text-[10px]">
                  {data.residencia === 'RESIDENCIADO' ? 'X' : ''}
                </span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span>No residenciado en el país</span>
                <span className="inline-block w-4 h-4 border border-black text-center font-black leading-3 text-[10px]">
                  {data.residencia === 'NO_RESIDENCIADO' ? 'X' : ''}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="p-1 border-b border-black">
          <span className="font-bold text-[7.5px] uppercase text-gray-700 block">7. PAIS Y CIUDAD DE PROCEDENCIA:</span>
          <span className="font-semibold text-[9.5px] uppercase">{data.paisCiudadProcedencia || '\u00A0'}</span>
        </div>

        <div className="grid grid-cols-12 border-b border-black">
          <div className="col-span-7 p-1 border-r border-black">
            <span className="font-bold text-[7.5px] uppercase text-gray-700 block">8. DIRECCION DE DOMICILIO:</span>
            <span className="text-[9px]">{data.direccionDomicilio || '\u00A0'}</span>
          </div>
          <div className="col-span-5 p-1">
            <span className="font-bold text-[7.5px] uppercase text-gray-700 block">9. CORREO ELECTRONICO / INSTAGRAM:</span>
            <span className="text-[9px] truncate block">{data.correoInstagram || '\u00A0'}</span>
          </div>
        </div>

        <div className="grid grid-cols-12 border-b border-black">
          <div className="col-span-6 p-1 border-r border-black">
            <span className="font-bold text-[7.5px] uppercase text-gray-700 block">10. NUMEROS DE TELEFONO (FIJO):</span>
            <span className="font-semibold text-[9px]">{data.telefonoFijo || '\u00A0'}</span>
          </div>
          <div className="col-span-6 p-1">
            <span className="font-bold text-[7.5px] uppercase text-gray-700 block">MOVIL:</span>
            <span className="font-semibold text-[9px]">{data.telefonoMovil || '\u00A0'}</span>
          </div>
        </div>

        <div className="p-1 border-b border-black">
          <span className="font-bold text-[7.5px] uppercase text-gray-700 block">11. DESCRIPCION DE LA ACTIVIDAD ECONÓMICA:</span>
          <span className="font-semibold text-[9.5px]">{data.actividadEconomica || '\u00A0'}</span>
        </div>

        <div className="p-1 min-h-[26px]">
          <span className="font-bold text-[7.5px] uppercase text-gray-700 block">12. BENEFICIARIOS:</span>
          <span className="text-[9px]">{data.beneficiarios || '\u00A0'}</span>
        </div>
      </div>

      {/* 3. Representante Legal (si aplica) */}
      <div className="mt-1 border-2 border-black">
        <div className="bg-[#0b386b] text-white font-extrabold text-center py-0.5 text-[9.5px] uppercase tracking-wider border-b border-black">
          13. REPRESENTANTE LEGAL / APODERADO (EN CASO DE APLICAR)
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-5 p-1 border-r border-black">
            <span className="font-bold text-[7.5px] uppercase text-gray-700 block">NOMBRE Y APELLIDO:</span>
            <span className="font-semibold text-[9.5px] uppercase">{data.repLegalNombre || '-'}</span>
          </div>
          <div className="col-span-4 p-1 border-r border-black">
            <span className="font-bold text-[7.5px] uppercase text-gray-700 block">CI/NRO.DE PASAPORTE:</span>
            <span className="font-semibold text-[9.5px]">{data.repLegalCiPasaporte || '-'}</span>
          </div>
          <div className="col-span-3 p-1">
            <span className="font-bold text-[7.5px] uppercase text-gray-700 block">TELEFONO:</span>
            <span className="font-semibold text-[9.5px]">{data.repLegalTelefono || '-'}</span>
          </div>
        </div>
      </div>

      {/* 4. Declaración Jurada de Fondos */}
      <div className="mt-1 border-2 border-black">
        <div className="bg-[#0b386b] text-white font-extrabold text-center py-0.5 text-[9.5px] uppercase tracking-wider border-b border-black">
          14. DECLARACION JURADA DE FONDOS
        </div>
        <div className="p-1.5 text-[8.5px] text-justify leading-snug border-b border-black">
          Declaro que los productos y servicios ofrecidos por nuestra persona / empresa provienen de capital lícito obtenido, por lo que autorizo de manera expresa a las autoridades competentes a la verificación de la información entregada en este formulario.
        </div>

        <div className="grid grid-cols-12 p-2 items-end">
          {/* Huellas dactilares */}
          <div className="col-span-6 flex items-center justify-around pr-4 border-r border-black">
            <div className="flex flex-col items-center">
              <div className="w-16 h-18 border border-black flex items-center justify-center p-0.5 bg-gray-50 mb-0.5">
                {data.huellaPulgarDerechoUrl ? (
                  <img src={data.huellaPulgarDerechoUrl} alt="Pulgar Derecho" className="max-h-16 object-contain" />
                ) : (
                  <span className="text-[6.5px] text-gray-400 text-center uppercase leading-tight font-bold">PULGAR<br/>DERECHO</span>
                )}
              </div>
              <span className="text-[7.5px] font-bold uppercase text-gray-700">PULGAR DERECHO</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-18 border border-black flex items-center justify-center p-0.5 bg-gray-50 mb-0.5">
                {data.huellaPulgarIzquierdoUrl ? (
                  <img src={data.huellaPulgarIzquierdoUrl} alt="Pulgar Izquierdo" className="max-h-16 object-contain" />
                ) : (
                  <span className="text-[6.5px] text-gray-400 text-center uppercase leading-tight font-bold">PULGAR<br/>IZQUIERDO</span>
                )}
              </div>
              <span className="text-[7.5px] font-bold uppercase text-gray-700">PULGAR IZQUIERDO</span>
            </div>
          </div>

          {/* Firma del Cliente */}
          <div className="col-span-6 pl-4 text-center">
            <div className="h-16 flex items-center justify-center">
              {data.firmaClienteUrl ? (
                <img src={data.firmaClienteUrl} alt="Firma" className="max-h-14 object-contain" />
              ) : (
                <span className="text-gray-300 italic text-[8.5px]">Espacio para Firma</span>
              )}
            </div>
            <div className="border-t border-black pt-0.5 text-[8.5px] font-bold uppercase tracking-wider">
              FIRMA DEL CLIENTE
            </div>
          </div>
        </div>
      </div>

      {/* 5. Documentación Requerida */}
      <div className="mt-1 border-2 border-black">
        <div className="grid grid-cols-12 bg-[#0b386b] text-white font-extrabold text-[9px] uppercase tracking-wider border-b border-black">
          <div className="col-span-9 py-0.5 px-2">DOCUMENTACION REQUERIDA</div>
          <div className="col-span-3 text-center py-0.5 border-l border-black">ENTREGADOS</div>
        </div>
        <div className="grid grid-cols-12 border-b border-black text-[8px] bg-gray-100 font-bold">
          <div className="col-span-9 px-2 py-0.5">15. DOCUMENTO</div>
          <div className="col-span-1.5 text-center border-l border-black py-0.5">SI</div>
          <div className="col-span-1.5 text-center border-l border-black py-0.5">NO</div>
        </div>

        <div className="grid grid-cols-12 border-b border-black text-[8.5px] items-center">
          <div className="col-span-9 px-2 py-0.5">Fotocopia de la cédula de Identidad venezolana vigente y/o pasaporte</div>
          <div className="col-span-1.5 text-center border-l border-black font-bold py-0.5">{data.docCedulaPasaporte ? 'X' : ''}</div>
          <div className="col-span-1.5 text-center border-l border-black font-bold py-0.5">{!data.docCedulaPasaporte ? 'X' : ''}</div>
        </div>

        <div className="grid grid-cols-12 border-b border-black text-[8.5px] items-center">
          <div className="col-span-9 px-2 py-0.5">Fotocopia del RIF vigente</div>
          <div className="col-span-1.5 text-center border-l border-black font-bold py-0.5">{data.docRif ? 'X' : ''}</div>
          <div className="col-span-1.5 text-center border-l border-black font-bold py-0.5">{!data.docRif ? 'X' : ''}</div>
        </div>

        <div className="p-1 min-h-[22px]">
          <span className="font-bold text-[7.5px] uppercase text-gray-700 block">OBSERVACIONES:</span>
          <span className="text-[8.5px] italic text-gray-800">{data.observaciones || 'Sin observaciones.'}</span>
        </div>
      </div>

      {/* 6. Revisión */}
      <div className="mt-1 border-2 border-black">
        <div className="bg-[#0b386b] text-white font-extrabold text-center py-0.5 text-[9px] uppercase tracking-wider border-b border-black">
          16. REVISION
        </div>
        <div className="p-1 text-[7.5px] text-justify leading-tight border-b border-black">
          Declaro que los datos entregados por el cliente fueron verificados de acuerdo a lo establecido en el manual de Normas, Políticas y Procedimientos de Administracion y Control de LC/FT/FPADM y otros ilícitos vigente de {company.commercialName || company.name} ({company.name})
        </div>

        <div className="p-1 border-b border-black">
          <div className="font-bold text-[8px] text-gray-800">
            Responsable Departamento Administrativo: Nombre y Apellidos / Cédula de identidad / Firma
          </div>
          <div className="flex items-center justify-between mt-1 px-4">
            <span className="font-semibold text-[8.5px]">{data.deptoAdminNombre || 'Departamento Administrativo'}</span>
            <div className="h-6 flex items-center">
              {data.deptoAdminFirma ? (
                <img src={data.deptoAdminFirma} alt="Firma" className="max-h-5 object-contain" />
              ) : (
                <span className="text-gray-300 text-[8px] italic">Firma responsable</span>
              )}
            </div>
          </div>
        </div>

        <div className="p-1">
          <div className="font-bold text-[8px] text-gray-800">
            Responsable de Cumplimiento: Nombre y Apellidos / Cédula de identidad / Firma
          </div>
          <div className="flex items-center justify-between mt-1 px-4">
            <span className="font-semibold text-[8.5px]">{data.oficialCumplimientoNombre || company.defaultOfficer || 'Oficial de Cumplimiento'}</span>
            <div className="h-6 flex items-center">
              {data.oficialCumplimientoFirma ? (
                <img src={data.oficialCumplimientoFirma} alt="Firma" className="max-h-5 object-contain" />
              ) : (
                <span className="text-gray-300 text-[8px] italic">Firma oficial</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
