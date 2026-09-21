import React from 'react';
import { CompanyConfig } from '../../types';

interface SheetHeaderProps {
  company: CompanyConfig;
  title: string;
  subTitle?: string;
  dia: string;
  mes: string;
  anio: string;
  clientCheckboxes?: {
    tipoRegistro: 'INICIAL' | 'USUAL';
  };
}

export const SheetHeader: React.FC<SheetHeaderProps> = ({
  company,
  title,
  subTitle,
  dia,
  mes,
  anio,
  clientCheckboxes
}) => {
  return (
    <table className="w-full border-2 border-black border-collapse text-xs">
      <tbody>
        <tr>
          {/* Logo & Company info */}
          <td className="w-1/4 border-2 border-black p-1 text-center align-middle bg-white">
            <div className="flex flex-col items-center justify-center min-h-[58px]">
              {company.logoUrl ? (
                <img 
                  src={company.logoUrl} 
                  alt={company.name} 
                  className="max-h-12 max-w-[130px] object-contain mb-0.5" 
                />
              ) : (
                <div className="flex items-center space-x-1 border border-black px-2 py-1 mb-0.5">
                  <div className="font-serif font-black text-xl tracking-tighter text-blue-900 leading-none">H</div>
                  <div className="text-[7.5px] font-bold tracking-widest text-gray-800 leading-tight">
                    {company.commercialName || 'HESPERIA'}
                  </div>
                </div>
              )}
              <div className="text-[7.5px] font-extrabold uppercase text-gray-900 tracking-tight leading-none mt-0.5">
                {company.name}
              </div>
              <div className="text-[7px] font-semibold text-gray-700 leading-none">
                RIF: {company.rif}
              </div>
            </div>
          </td>

          {/* Form Title */}
          <td className="border-2 border-black text-center align-middle p-2 bg-[#0284c7] text-white">
            <div className="font-black text-sm uppercase tracking-wide leading-tight">
              {title}
            </div>
            {subTitle && (
              <div className="text-[9px] font-semibold tracking-normal mt-0.5">
                {subTitle}
              </div>
            )}
            {clientCheckboxes && (
              <div className="flex items-center justify-center space-x-6 mt-1 text-[10px] font-bold text-white">
                <span className="flex items-center space-x-1.5">
                  <span>2. INICIAL</span>
                  <span className="inline-block w-4 h-4 border-2 border-white bg-white text-black text-center leading-3 font-black text-[11px]">
                    {clientCheckboxes.tipoRegistro === 'INICIAL' ? 'X' : ''}
                  </span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span>USUAL</span>
                  <span className="inline-block w-4 h-4 border-2 border-white bg-white text-black text-center leading-3 font-black text-[11px]">
                    {clientCheckboxes.tipoRegistro === 'USUAL' ? 'X' : ''}
                  </span>
                </span>
              </div>
            )}
          </td>

          {/* Date table */}
          <td className="w-1/4 border-2 border-black p-0 align-top bg-white">
            <div className="text-center font-bold text-[9px] border-b border-black py-0.5 uppercase bg-gray-100">
              1. FECHA DE ELABORACIÓN
            </div>
            <table className="w-full border-collapse text-center text-[9px]">
              <thead>
                <tr className="border-b border-black bg-gray-50">
                  <th className="border-r border-black py-0.5 font-bold w-1/3">DÍA</th>
                  <th className="border-r border-black py-0.5 font-bold w-1/3">MES</th>
                  <th className="py-0.5 font-bold w-1/3">AÑO</th>
                </tr>
              </thead>
              <tbody>
                <tr className="h-7 text-xs font-bold text-gray-900">
                  <td className="border-r border-black">{dia || '-'}</td>
                  <td className="border-r border-black">{mes || '-'}</td>
                  <td>{anio || '-'}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
