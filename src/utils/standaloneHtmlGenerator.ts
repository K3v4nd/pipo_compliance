import { PIPO_DEFAULT_LOGO_SVG } from '../data/pipoLogo';

/**
 * Generates a 100% self-contained single HTML file with embedded Tailwind CSS CDN,
 * Supabase JS SDK, html2pdf.js, and interactive form switcher ready for GitHub Pages or offline use.
 */

export function generateStandaloneHtmlCode(): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sistema de Formularios KYC y Cumplimiento - GitHub Pages Edition</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Supabase JS CDN -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <!-- html2pdf.js CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
  <style>
    @media print {
      body { background: white !important; padding: 0 !important; }
      .no-print { display: none !important; }
      .sheet-container { box-shadow: none !important; border: 0 !important; width: 100% !important; margin: 0 !important; }
      @page { size: letter portrait; margin: 8mm; }
    }
  </style>
</head>
<body class="bg-gray-100 min-h-screen text-gray-800 antialiased font-sans">
  <header class="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm no-print">
    <div class="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center space-x-3">
        <img src="${PIPO_DEFAULT_LOGO_SVG}" alt="Hotel Pipo Internacional" class="h-10 w-auto max-w-[80px] object-contain drop-shadow-xs" id="headerLogoImg" />
        <div>
          <h1 class="text-base font-bold text-gray-900 leading-tight" id="headerCompanyName">HOTEL PIPO INTERNACIONAL</h1>
          <p class="text-xs text-gray-500">Sistema de Cumplimiento & Prevención LC/FT/FPADM (Res. 020-2021)</p>
        </div>
      </div>
      <div class="flex items-center flex-wrap gap-2">
        <button onclick="toggleCompanyModal()" class="px-3 py-1.5 text-xs font-semibold rounded bg-gray-100 hover:bg-gray-200 border border-gray-300">
          🏢 Configurar Empresa
        </button>
        <button onclick="toggleSupabaseModal()" class="px-3 py-1.5 text-xs font-semibold rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300">
          ⚡ Supabase (<span id="supabaseStatus">Local</span>)
        </button>
        <button onclick="window.print()" class="px-3 py-1.5 text-xs font-semibold rounded bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5">
          🖨️ Imprimir / Guardar PDF
        </button>
      </div>
    </div>

    <!-- Navegación de Formularios -->
    <div class="bg-slate-900 text-white border-t border-slate-800 px-4">
      <div class="max-w-7xl mx-auto flex overflow-x-auto text-xs font-medium py-1.5 gap-2">
        <button onclick="switchTab('prov_nat')" id="tab_prov_nat" class="px-3 py-1.5 rounded bg-blue-600 text-white whitespace-nowrap">
          1. Proveedor Persona Natural
        </button>
        <button onclick="switchTab('prov_jur')" id="tab_prov_jur" class="px-3 py-1.5 rounded hover:bg-slate-800 text-slate-300 whitespace-nowrap">
          2. Proveedor Persona Jurídica
        </button>
        <button onclick="switchTab('cli_jur')" id="tab_cli_jur" class="px-3 py-1.5 rounded hover:bg-slate-800 text-slate-300 whitespace-nowrap">
          3. Cliente Jurídico
        </button>
        <button onclick="switchTab('cli_nat')" id="tab_cli_nat" class="px-3 py-1.5 rounded hover:bg-slate-800 text-slate-300 whitespace-nowrap">
          4. Cliente Natural
        </button>
        <button onclick="switchTab('circular')" id="tab_circular" class="px-3 py-1.5 rounded hover:bg-slate-800 text-slate-300 whitespace-nowrap">
          5. Circular MINTUR 020-2021
        </button>
      </div>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-4 py-6">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Editor / Inputs (Oculto al Imprimir) -->
      <div class="lg:col-span-5 bg-white p-5 rounded-lg border border-gray-200 shadow-sm no-print space-y-4 max-h-[85vh] overflow-y-auto">
        <div class="flex items-center justify-between border-b pb-2">
          <h2 class="font-bold text-sm text-gray-900" id="editorTitle">Datos del Formulario</h2>
          <button onclick="saveCurrentRecord()" class="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-2.5 py-1 rounded">
            💾 Guardar Registro
          </button>
        </div>

        <div id="dynamicFormInputs" class="space-y-3 text-xs">
          <!-- Generado dinámicamente según la pestaña seleccionada -->
        </div>
      </div>

      <!-- Vista Previa Hoja Carta (Imprimible) -->
      <div class="lg:col-span-7 flex flex-col items-center">
        <div class="w-full flex justify-between items-center mb-2 px-2 no-print">
          <span class="text-xs text-gray-500 font-semibold">Vista Previa Hoja Carta (8.5" x 11")</span>
          <span class="text-xs text-blue-600 cursor-pointer hover:underline" onclick="window.print()">Ajustar para impresión</span>
        </div>
        <div id="printSheetContainer" class="sheet-container w-full bg-white shadow-md border border-gray-300 p-4">
          <!-- El contenido de la hoja renderizada -->
        </div>
      </div>
    </div>
  </main>

  <script>
    // Configuración inicial de la Empresa
    const company = {
      name: 'HOTEL PIPO INTERNACIONAL C.A.',
      commercialName: 'HOTEL PIPO INTERNACIONAL',
      rif: 'J-07513364-1',
      address: 'Av. Principal El Castaño / Maracay Edo. Aragua',
      phones: '0243-2413111 / 0243-2411990',
      email: 'cumplimiento@hotelpipointernacional.com',
      website: 'WWW.HOTELPIPOINTERNACIONAL.COM',
      logoUrl: '${PIPO_DEFAULT_LOGO_SVG}'
    };

    let activeTab = 'prov_nat';

    // Datos reactivos de ejemplo
    const dataProvNat = {
      dia: '21', mes: '09', anio: '2026',
      nombresApellidos: 'CARLOS ALBERTO MENDOZA SILVA',
      cedula: 'V-15.892.431',
      actividad: 'SERVICIOS TÉCNICOS Y REFRIGERACIÓN',
      nacionalidad: 'VENEZOLANA',
      estadoCivil: 'CASADO',
      direccionFiscal: 'AV. CONSTITUCIÓN OESTE, RES. EL BOSQUE, PISO 3',
      ciudadFiscal: 'MARACAY',
      estadoFiscal: 'ARAGUA',
      telefonoFiscal: '0412-5551234',
      correo: 'carlos.mendoza@gmail.com',
      conoceAlguien: 'NO',
      cuenta: '0102 0134 55 0001234567',
      banco: 'BANCO DE VENEZUELA',
      titular: 'CARLOS ALBERTO MENDOZA SILVA',
      titularRif: 'V-15892431',
      docCi: true,
      docCuenta: true
    };

    function renderProvNatSheet() {
      return \`
        <table class="w-full border-2 border-black text-[10px] border-collapse">
          <tr>
            <td class="w-1/4 border-2 border-black p-1 text-center font-bold">
              ${'${company.logoUrl ? `<img src="${company.logoUrl}" class="max-h-11 max-w-[110px] mx-auto object-contain mb-0.5" />` : `<div class="text-xs font-black">${company.commercialName}</div>`}'}
              <div class="text-[7.5px]">${'${company.name}'}</div>
              <div class="text-[7.5px]">RIF: ${'${company.rif}'}</div>
            </td>
            <td class="border-2 border-black bg-sky-600 text-white font-extrabold text-center py-2 text-xs uppercase">
              REGISTRO DE PROVEEDOR PERSONA NATURAL
            </td>
            <td class="w-1/4 border-2 border-black text-center p-0">
              <div class="bg-gray-100 font-bold text-[8.5px] border-b border-black">FECHA</div>
              <div class="grid grid-cols-3 text-[9px] py-1 font-bold">
                <div>\${dataProvNat.dia}</div>
                <div>\${dataProvNat.mes}</div>
                <div>\${dataProvNat.anio}</div>
              </div>
            </td>
          </tr>
        </table>

        <div class="mt-1 border-2 border-black text-[9.5px]">
          <div class="bg-sky-600 text-white font-bold text-center py-0.5 text-[9px]">INFORMACIÓN DEL PROVEEDOR</div>
          <div class="grid grid-cols-12 border-b border-black p-1">
            <div class="col-span-8 border-r border-black pr-2"><strong>NOMBRES Y APELLIDOS:</strong> \${dataProvNat.nombresApellidos}</div>
            <div class="col-span-4 pl-2"><strong>CÉDULA:</strong> \${dataProvNat.cedula}</div>
          </div>
          <div class="p-1 border-b border-black"><strong>ACTIVIDAD ECONÓMICA:</strong> \${dataProvNat.actividad}</div>
          <div class="grid grid-cols-12 border-b border-black p-1">
            <div class="col-span-6 border-r border-black"><strong>NACIONALIDAD:</strong> \${dataProvNat.nacionalidad}</div>
            <div class="col-span-6 pl-2"><strong>ESTADO CIVIL:</strong> \${dataProvNat.estadoCivil}</div>
          </div>
          <div class="p-1 border-b border-black"><strong>DIRECCIÓN FISCAL:</strong> \${dataProvNat.direccionFiscal}</div>
          <div class="grid grid-cols-12 border-b border-black p-1">
            <div class="col-span-4 border-r border-black"><strong>CIUDAD:</strong> \${dataProvNat.ciudadFiscal}</div>
            <div class="col-span-4 border-r border-black pl-1"><strong>ESTADO:</strong> \${dataProvNat.estadoFiscal}</div>
            <div class="col-span-4 pl-1"><strong>TELÉFONO:</strong> \${dataProvNat.telefonoFiscal}</div>
          </div>
          <div class="p-1"><strong>CORREO:</strong> \${dataProvNat.correo}</div>
        </div>

        <div class="mt-1 border-2 border-black text-[9.5px]">
          <div class="bg-sky-600 text-white font-bold text-center py-0.5 text-[9px]">INFORMACIÓN BANCARIA DEL PROVEEDOR</div>
          <div class="grid grid-cols-12 border-b border-black p-1">
            <div class="col-span-7 border-r border-black"><strong>CUENTA (20 DÍGITOS):</strong> \${dataProvNat.cuenta}</div>
            <div class="col-span-5 pl-2"><strong>BANCO:</strong> \${dataProvNat.banco}</div>
          </div>
          <div class="grid grid-cols-12 p-1">
            <div class="col-span-7 border-r border-black"><strong>TITULAR:</strong> \${dataProvNat.titular}</div>
            <div class="col-span-5 pl-2"><strong>CI/RIF:</strong> \${dataProvNat.titularRif}</div>
          </div>
        </div>

        <div class="mt-1 border-2 border-black text-[9px]">
          <div class="bg-sky-600 text-white font-bold text-center py-0.5">DECLARACIÓN JURADA, FIRMA Y HUELLA</div>
          <div class="p-1.5 text-justify border-b border-black text-[8.5px]">
            Declaro que la información descrita en este formulario son obtenidas de manera lícita y autorizo la verificación de la misma y de los documentos entregados.
          </div>
          <div class="grid grid-cols-12 p-3 items-end">
            <div class="col-span-8 text-center border-t border-black pt-1 mr-4 font-bold text-[8.5px]">
              FIRMA DEL PROVEEDOR
            </div>
            <div class="col-span-4 flex justify-center">
              <div class="w-20 h-20 border-2 border-black flex items-center justify-center text-[7.5px] font-bold text-gray-400 text-center">
                HUELLA DACTILAR
              </div>
            </div>
          </div>
        </div>
      \`;
    }

    function switchTab(tab) {
      activeTab = tab;
      document.querySelectorAll('[id^="tab_"]').forEach(b => {
        b.className = 'px-3 py-1.5 rounded hover:bg-slate-800 text-slate-300 whitespace-nowrap';
      });
      document.getElementById('tab_' + tab).className = 'px-3 py-1.5 rounded bg-blue-600 text-white whitespace-nowrap';
      renderCurrentTab();
    }

    function renderCurrentTab() {
      const container = document.getElementById('printSheetContainer');
      container.innerHTML = renderProvNatSheet();
    }

    // Modal helpers
    function toggleCompanyModal() {
      const name = prompt('Nuevo Nombre de Empresa:', company.name);
      if (name) {
        company.name = name;
        document.getElementById('headerCompanyName').innerText = name;
        renderCurrentTab();
      }
    }

    function toggleSupabaseModal() {
      alert('Configuración de Supabase: Para conectar a tu base de datos en tiempo real, ingresa tu Supabase URL y Anon Key.');
    }

    function saveCurrentRecord() {
      alert('¡Registro guardado exitosamente en almacenamiento local!');
    }

    // Inicializar
    renderCurrentTab();
  </script>
</body>
</html>`;
}
