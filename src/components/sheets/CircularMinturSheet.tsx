import React from 'react';
import { CompanyConfig } from '../../types';

interface Props {
  company: CompanyConfig;
}

export const CircularMinturSheet: React.FC<Props> = ({ company }) => {
  return (
    <div 
      id="printable-sheet-circular-mintur"
      className="bg-white text-black font-serif w-full max-w-[215.9mm] mx-auto p-10 border border-gray-300 shadow-lg print:shadow-none print:border-0 print:p-8 print:m-0 text-[12px] leading-relaxed flex flex-col justify-between"
      style={{ minHeight: '279.4mm', boxSizing: 'border-box' }}
    >
      <div>
        {/* Header Membrete */}
        <div className="flex items-center space-x-3 mb-8">
          {company.logoUrl ? (
            <img src={company.logoUrl} alt={company.name} className="h-12 object-contain" />
          ) : (
            <div className="flex items-center space-x-2">
              <span className="font-serif font-black text-3xl tracking-tighter text-blue-950 border-r-2 border-blue-950 pr-2">H</span>
              <div className="text-left font-sans">
                <div className="font-bold text-sm tracking-widest text-gray-900 leading-none">
                  {company.commercialName || 'HESPERIA MARACAY'}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6 font-sans text-xs">
          <div className="font-bold uppercase text-gray-900">{company.name}</div>
          <div className="font-semibold text-gray-700">RIF: {company.rif}</div>
        </div>

        {/* Carta Circular */}
        <h3 className="font-sans font-bold text-sm mb-4 text-gray-900">
          Apreciados proveedores y clientes.
        </h3>

        <p className="text-justify mb-4 indent-8">
          En cumplimiento a lo establecido en la <strong>Resolución No. 020-2021 MINTUR</strong> de fecha 14 de abril de 2021, referida a la Administración y Fiscalización de los Riesgos relacionados con los Delitos de Legitimación de Capitales, Financiamiento al Terrorismo, Financiamiento a la Proliferación de Armas de Destrucción Masiva (LC/FT/FPDADM) y otros Ilícitos aplicables a los prestadores de servicios Turísticos, publicada en la <strong>Gaceta Oficial de la República Bolivariana de Venezuela No. 42.106</strong> de fecha 14 abril de 2021.
        </p>

        <p className="text-justify mb-4 indent-8">
          De acuerdo a lo descrito en <strong>artículos 24 al 27 sobre la Política Conozca su Cliente</strong> y el <strong>artículo 33 Política Conozca su Proveedor</strong>, además del Manual interno sobre la misma materia, le solicitamos respetuosamente por favor remitir en un archivo PDF los siguientes documentos:
        </p>

        <div className="space-y-3 pl-4 mb-5 text-[11.5px]">
          <div>
            <strong>1. Personas naturales venezolanas y extranjeras residentes en el país, a través de:</strong>
            <ul className="list-disc pl-6 mt-1 space-y-0.5">
              <li>a) La cédula de identidad laminada.</li>
              <li>b) El Registro de Información Fiscal (RIF) actualizado.</li>
            </ul>
          </div>

          <div>
            <strong>2. Personas naturales extranjeras no residentes mediante el pasaporte vigente.</strong>
          </div>

          <div>
            <strong>3. Personas jurídicas domiciliadas en el país a través de:</strong>
            <ul className="list-disc pl-6 mt-1 space-y-0.5">
              <li>a) El Registro de Información Fiscal (RIF) actualizado.</li>
              <li>b) Copias de los documentos constitutivos de la empresa, sus estatutos sociales y modificaciones posteriores, debidamente protocolizadas.</li>
              <li>c) Copias del Registro de Información Fiscal (RIF) actualizado de cada socio y Representante.</li>
            </ul>
          </div>

          <div>
            <strong>4. Personas jurídicas no domiciliadas en el país, mediante:</strong>
            <ul className="list-disc pl-6 mt-1 space-y-0.5">
              <li>a) El Registro de Información Fiscal (RIF) actualizado o su equivalente.</li>
              <li>b) Copias de los documentos constitutivos de la empresa, sus estatutos sociales y modificaciones posteriores, debidamente protocolizadas.</li>
              <li>c) Copias de los pasaportes de cada uno de los socios y representantes.</li>
            </ul>
          </div>

          <div>
            <strong>5. Completar planilla adjunta con los datos correspondientes.</strong>
          </div>
        </div>

        <p className="text-justify mb-5 indent-8">
          Según recomendación de nuestros auditores externos en materia de cumplimiento de la mencionada resolución, le enviamos esta comunicación y de esta manera manifestar la necesidad imperante en el cumplimiento de la <strong>“Política Conozca a su Cliente”</strong> y <strong>“Conozca su Proveedor”</strong> dispuesto en los artículos antes mencionados.
        </p>

        <div className="mt-4 font-sans text-xs">
          <p className="mb-1">Enviar información a los correos:</p>
          <p className="font-bold text-blue-900">{company.email || 'cumplimiento@hesperiamaracay.com'}</p>
        </div>

        <div className="mt-8 font-sans">
          <p className="mb-4">Atentamente;</p>
          <div className="text-xs text-gray-500 italic">AS/as</div>
        </div>
      </div>

      {/* Footer Membrete */}
      <div className="border-t border-gray-400 pt-4 mt-8 font-sans text-center">
        <div className="italic text-gray-600 text-xs mb-0.5">Make it exceptional</div>
        <div className="font-bold tracking-widest text-[9px] text-gray-800 uppercase mb-1">
          {company.website || 'HOTELESHESPERIA.COM.VE'}
        </div>
        <div className="text-[9px] text-gray-600">
          {company.address} — {company.phones}
        </div>
      </div>
    </div>
  );
};
