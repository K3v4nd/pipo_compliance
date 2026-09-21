// PDF Export helper using html2pdf.js and native print

export async function exportToPdf(elementId: string, filename: string): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id #${elementId} not found`);
    return false;
  }

  try {
    // Dynamic import to support SSR/bundler variations safely
    const html2pdfModule = await import('html2pdf.js');
    const html2pdf = (html2pdfModule as any).default || html2pdfModule;

    const opt = {
      margin: [4, 4, 4, 4] as [number, number, number, number], // mm margins
      filename: `${filename.replace(/[/\\?%*:|"<>]/g, '_')}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true,
        scrollX: 0,
        scrollY: 0
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'letter', 
        orientation: 'portrait' as const 
      },
      pagebreak: { mode: ['css', 'legacy'] }
    };

    await html2pdf().set(opt).from(element).save();
    return true;
  } catch (err) {
    console.error('Error generating PDF with html2pdf, falling back to triggerBrowserPrint', err);
    triggerBrowserPrint();
    return false;
  }
}

/**
 * Trigger clean browser print dialog.
 * Prepares the DOM so only the active letter sheet is sent to the printer/PDF dialogue.
 */
export function triggerBrowserPrint() {
  window.print();
}

