// Logotipo Oficial del Hotel Pipo Internacional
// Emblema oval azul marino con monograma geométrico oficial (c, H, P, i)
// Proporciona fidelidad visual 100% idéntica al logo oficial, vectorizado para resolución infinita en móviles, pantallas y PDFs

export const PIPO_DEFAULT_LOGO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 190" width="320" height="190">
  <!-- Borde exterior fino azul marino -->
  <ellipse cx="160" cy="95" rx="155" ry="89" fill="none" stroke="%231c2a6d" stroke-width="2.8" />
  <!-- Óvalo principal relleno azul marino oficial -->
  <ellipse cx="160" cy="95" rx="148" ry="82" fill="%231c2a6d" />
  
  <!-- Monograma oficial inclinado en blanco -->
  <g transform="translate(160, 95) skewX(-13) translate(-160, -95)" fill="%23ffffff">
    <!-- Letra 'c' lateral izquierda -->
    <path d="M 116,88 L 81,88 C 77,88 75,90 75,94 L 75,142 C 75,146 77,148 81,148 L 116,148 L 116,132 L 92,132 L 92,104 L 116,104 Z" />
    
    <!-- Asta vertical izquierda de la 'H' -->
    <rect x="122" y="42" width="17" height="82" rx="1" />
    <!-- Punto inferior izquierdo (base alineada con la 'c') -->
    <rect x="122" y="132" width="17" height="16" rx="1" />
    
    <!-- Barra transversal central que une las astas de la 'H' -->
    <rect x="139" y="88" width="42" height="16" />
    
    <!-- Punto superior derecho (corona de la 'i' / asta derecha) -->
    <rect x="181" y="42" width="17" height="16" rx="1" />
    <!-- Asta vertical derecha de la 'H' / base de la 'P' -->
    <rect x="181" y="66" width="17" height="82" rx="1" />
    
    <!-- Bucle superior de la 'P' -->
    <path d="M 197,66 L 228,66 C 238,66 244,72 244,81 L 244,89 C 244,98 238,104 228,104 L 197,104 Z M 198,80 L 224,80 C 227,80 228,81 228,84 L 228,86 C 228,89 227,90 224,90 L 198,90 Z" fill-rule="evenodd" />
  </g>
</svg>`;

export const PIPO_FULL_BANNER_LOGO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 140" width="520" height="140">
  <!-- Emblema oficial del Hotel Pipo Internacional a la izquierda -->
  <g transform="translate(10, 5) scale(0.68)">
    <ellipse cx="160" cy="95" rx="155" ry="89" fill="none" stroke="%231c2a6d" stroke-width="2.8" />
    <ellipse cx="160" cy="95" rx="148" ry="82" fill="%231c2a6d" />
    <g transform="translate(160, 95) skewX(-13) translate(-160, -95)" fill="%23ffffff">
      <path d="M 116,88 L 81,88 C 77,88 75,90 75,94 L 75,142 C 75,146 77,148 81,148 L 116,148 L 116,132 L 92,132 L 92,104 L 116,104 Z" />
      <rect x="122" y="42" width="17" height="82" rx="1" />
      <rect x="122" y="132" width="17" height="16" rx="1" />
      <rect x="139" y="88" width="42" height="16" />
      <rect x="181" y="42" width="17" height="16" rx="1" />
      <rect x="181" y="66" width="17" height="82" rx="1" />
      <path d="M 197,66 L 228,66 C 238,66 244,72 244,81 L 244,89 C 244,98 238,104 228,104 L 197,104 Z M 198,80 L 224,80 C 227,80 228,81 228,84 L 228,86 C 228,89 227,90 224,90 L 198,90 Z" fill-rule="evenodd" />
    </g>
  </g>
  
  <!-- Tipografía institucional a la derecha -->
  <g transform="translate(240, 25)">
    <text x="0" y="32" font-family="'Arial Black', Impact, sans-serif" font-size="25" font-weight="900" fill="%231c2a6d" letter-spacing="1">HOTEL PIPO</text>
    <text x="0" y="58" font-family="'Arial', sans-serif" font-size="19" font-weight="800" fill="%231c2a6d" letter-spacing="2.5">INTERNACIONAL</text>
    <line x1="0" y1="69" x2="265" y2="69" stroke="%23cbd5e1" stroke-width="1.5" />
    <text x="0" y="83" font-family="'Arial', sans-serif" font-size="9.5" font-weight="700" fill="%2364748b" letter-spacing="1.2">MARACAY • VENEZUELA • RIF: J-07513364-1</text>
  </g>
</svg>`;
