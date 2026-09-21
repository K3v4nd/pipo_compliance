import { 
  CompanyConfig, 
  ProveedorNaturalData, 
  ProveedorJuridicoData, 
  ClienteJuridicoData, 
  ClienteNaturalData 
} from '../types';
import { PIPO_DEFAULT_LOGO_SVG } from './pipoLogo';

const env = (import.meta as any).env || {};

export const DEFAULT_COMPANY: CompanyConfig = {
  name: env.VITE_COMPANY_NAME || 'HOTEL PIPO INTERNACIONAL C.A.',
  commercialName: env.VITE_COMPANY_COMMERCIAL_NAME || 'HOTEL PIPO INTERNACIONAL',
  rif: env.VITE_COMPANY_RIF || 'J-07513364-1',
  address: env.VITE_COMPANY_ADDRESS || 'Av. Principal El Castaño / Maracay, Edo. Aragua',
  phones: env.VITE_COMPANY_PHONES || '0243-2413111 / 0243-2411990',
  email: env.VITE_COMPANY_EMAIL || 'cumplimiento@hotelpipointernacional.com',
  website: env.VITE_COMPANY_WEBSITE || 'WWW.HOTELPIPOINTERNACIONAL.COM',
  logoUrl: env.VITE_COMPANY_LOGO_URL || PIPO_DEFAULT_LOGO_SVG,
  defaultDeptResp: env.VITE_COMPANY_DEPT || 'Departamento Responsable / Administración',
  defaultOfficer: env.VITE_COMPANY_OFFICER || 'Oficial de Cumplimiento',
  primaryColor: env.VITE_COMPANY_PRIMARY_COLOR || '#0f3a6e'
};

const today = new Date();
const currentD = String(today.getDate()).padStart(2, '0');
const currentM = String(today.getMonth() + 1).padStart(2, '0');
const currentY = String(today.getFullYear());

export const DEFAULT_PROV_NATURAL: ProveedorNaturalData = {
  fechaElaboracion: { dia: currentD, mes: currentM, anio: currentY },
  nombresApellidos: 'CARLOS ALBERTO MENDOZA SILVA',
  cedula: 'V-15.892.431',
  actividadEconomica: 'SERVICIOS TÉCNICOS Y MANTENIMIENTO DE SISTEMAS DE REFRIGERACIÓN',
  nacionalidad: 'VENEZOLANA',
  estadoCivil: 'CASADO',
  direccionFiscal: 'AV. CONSTITUCIÓN OESTE, RES. EL BOSQUE, PISO 3, APTO 3-B',
  ciudadFiscal: 'MARACAY',
  estadoFiscal: 'ARAGUA',
  telefonoFiscal: '0412-5551234',
  direccionFisica: 'CALLE BOYACÁ, LOCAL NRO. 14, SECTOR LA COROMOTO',
  ciudadFisica: 'MARACAY',
  estadoFisica: 'ARAGUA',
  telefonoFisico: '0243-2345678',
  correo: 'carlos.mendoza.servicios@gmail.com',
  conoceAlguienEmpresa: 'NO',
  conoceAlguienDetalle: '',
  
  cuentaNumero: '0102 0134 55 0001234567',
  banco: 'BANCO DE VENEZUELA',
  titularNombre: 'CARLOS ALBERTO MENDOZA SILVA',
  titularCiRif: 'V-15892431',
  swift: '',
  aba: '',
  correoZelle: '',
  direccionBanco: 'AGENCIA LAS DELICIAS, MARACAY',

  docFiscalCi: true,
  docPasaporte: false,
  docCertCuenta: true,
  docOtros: false,
  docOtrosDetalle: '',
  observaciones: 'Documentación verificada y completa. Proveedor activo para servicios técnicos.',

  deptoResponsableNombre: 'Lic. Mariana Rojas',
  oficialCumplimientoNombre: 'Abg. Roberto Morales'
};

export const DEFAULT_PROV_JURIDICO: ProveedorJuridicoData = {
  fechaElaboracion: { dia: currentD, mes: currentM, anio: currentY },
  razonSocial: 'DISTRIBUIDORA DE ALIMENTOS Y VÍVERES DEL CENTRO C.A.',
  registroFiscal: 'J-31245678-9',
  actividadEconomica: 'COMERCIALIZACIÓN Y DISTRIBUCIÓN AL MAYOR DE ALIMENTOS Y BEBIDAS PARA HOTELERÍA',
  direccionFiscal: 'ZONA INDUSTRIAL SAN VICENTE I, CALLE G, GALPÓN NRO. 12',
  telefono: '0243-5518900 / 0414-3456789',
  correo: 'administracion@alimentosdelcentro.com.ve',

  representante1: {
    nombreApellido: 'ALEJANDRO JOSÉ PARRA GÓMEZ',
    cedula: 'V-12.456.789',
    cargo: 'DIRECTOR GENERAL / PRESIDENTE',
    direccion: 'URB. LAS ACACIAS, CALLE PRINCIPAL, QUINTA LOS PINOS',
    telefono: '0414-3456789',
    correo: 'alejandro.parra@alimentosdelcentro.com.ve',
    conoceAlguienEmpresa: 'NO',
    conoceAlguienDetalle: ''
  },
  representante2: {
    nombreApellido: 'ELENA BEATRIZ SUÁREZ DE PARRA',
    cedula: 'V-14.890.123',
    cargo: 'VICEPRESIDENTE / DIRECTORA DE FINANZAS',
    direccion: 'URB. LAS ACACIAS, CALLE PRINCIPAL, QUINTA LOS PINOS',
    telefono: '0414-9876543',
    correo: 'elena.suarez@alimentosdelcentro.com.ve',
    conoceAlguienEmpresa: 'NO',
    conoceAlguienDetalle: ''
  },

  bancoLocal1: {
    nombre: 'BANCO MERCANTIL',
    tipoCuenta: 'CORRIENTE',
    numeroCuenta: '0105 0023 44 0123456789',
    sucursal: 'AV. BOLÍVAR ESTE, MARACAY',
    beneficiarios: 'DISTRIBUIDORA DE ALIMENTOS DEL CENTRO C.A.'
  },
  bancoLocal2: {
    nombre: 'BANESCO BANCO UNIVERSAL',
    tipoCuenta: 'CORRIENTE',
    numeroCuenta: '0134 0987 66 0987654321',
    sucursal: 'CENTRO COMERCIAL LAS AMÉRICAS, MARACAY',
    beneficiarios: 'DISTRIBUIDORA DE ALIMENTOS DEL CENTRO C.A.'
  },
  bancoInternacional: {
    nombre: 'Banesco Panamá S.A.',
    tipoCuenta: 'Checking Account',
    numeroCuenta: '0098 7654 3210 98',
    sucursal: 'Ciudad de Panamá',
    beneficiarios: 'DISTRIBUIDORA DEL CENTRO CORP',
    swift: 'BCOXPAPA',
    direccion: 'Calle 50 y Aquilino de la Guardia, Panamá'
  },

  docRif: true,
  docConstitutivo: true,
  docRifCiSocios: true,
  docPasaporteExtranjeros: false,
  docCertCuenta: true,
  docOtros: false,
  docOtrosDetalle: '',
  observaciones: 'Expediente mercantil y poderes vigentes revisados satisfactoriamente.',

  deptoResponsableNombre: 'Lic. Mariana Rojas',
  oficialCumplimientoNombre: 'Abg. Roberto Morales'
};

export const DEFAULT_CLIENTE_JURIDICO: ClienteJuridicoData = {
  fechaElaboracion: { dia: currentD, mes: currentM, anio: currentY },
  tipoRegistro: 'INICIAL',
  razonSocial: 'CONSORCIO MÉDICO Y FARMACÉUTICO DE VENEZUELA C.A.',
  denominacionComercial: 'CONFARMA',
  docTipo: 'RIF',
  docNumero: 'J-40987654-1',
  residencia: 'RESIDENCIADO',
  paisCiudadProcedencia: 'VENEZUELA / CARACAS',
  direccionDomicilio: 'TORRE DIGITEL, PISO 14, OFICINA 14-A, LA CASTELLANA, CARACAS',
  correoInstagram: 'eventos@confarma.com.ve / @confarmavzla',
  telefonoFijo: '0212-9998800',
  telefonoMovil: '0424-1122334',
  actividadEconomica: 'ORGANIZACIÓN DE CONGRESOS MÉDICOS, SIMPOSIOS Y HOSPEDAJE CORPORATIVO',
  beneficiarios: 'ACCIONISTAS REGISTRADOS EN ACTA CONSTITUTIVA (DR. JAVIER PEÑA 60%, DRA. LAURA DÍAZ 40%)',

  repLegalNombre: 'DR. JAVIER EDUARDO PEÑA SALAZAR',
  repLegalCiPasaporte: 'V-11.234.567',
  repLegalTelefono: '0424-1122334',

  docConstitutivo: true,
  docRifSocios: true,
  observaciones: 'Cliente corporativo para convención médica anual en salones y habitaciones del hotel.',

  deptoAdminNombre: 'Lic. Juan Carlos Vargas',
  oficialCumplimientoNombre: 'Abg. Roberto Morales'
};

export const DEFAULT_CLIENTE_NATURAL: ClienteNaturalData = {
  fechaElaboracion: { dia: currentD, mes: currentM, anio: currentY },
  tipoRegistro: 'INICIAL',
  nombresApellidos: 'GABRIELA SOFÍA HERNÁNDEZ CASTILLO',
  denominacionComercial: 'PRODUCCIONES GABRIELA HERNÁNDEZ',
  docTipo: 'C.I.',
  docNumero: 'V-18.765.432',
  residencia: 'RESIDENCIADO',
  paisCiudadProcedencia: 'VENEZUELA / VALENCIA',
  direccionDomicilio: 'URB. EL VIÑEDO, AV. MONSEÑOR ADAMS, CALLEJÓN 139, CASA NRO. 45',
  correoInstagram: 'gabriela.eventos@gmail.com / @gabrielaproducciones',
  telefonoFijo: '0241-8234500',
  telefonoMovil: '0414-4321987',
  actividadEconomica: 'PRODUCCIÓN AUDIOVISUAL, FOTOGRAFÍA CORPORATIVA Y EVENTOS SOCIALES',
  beneficiarios: 'PERSONA NATURAL - TITULAR DIRECTA',

  repLegalNombre: 'GABRIELA SOFÍA HERNÁNDEZ CASTILLO',
  repLegalCiPasaporte: 'V-18.765.432',
  repLegalTelefono: '0414-4321987',

  docCedulaPasaporte: true,
  docRif: true,
  observaciones: 'Registro para contratación de salones y eventos especiales.',

  deptoAdminNombre: 'Lic. Juan Carlos Vargas',
  oficialCumplimientoNombre: 'Abg. Roberto Morales'
};
