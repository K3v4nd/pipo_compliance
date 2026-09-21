export type FormType = 
  | 'PROV_NATURAL' 
  | 'PROV_JURIDICO' 
  | 'CLIENTE_NATURAL' 
  | 'CLIENTE_JURIDICO'
  | 'CIRCULAR_MINTUR';

export interface CompanyConfig {
  name: string;             // e.g. "BYBLOS DE VENEZUELA C.A."
  commercialName: string;   // e.g. "HOTEL HESPERIA MARACAY"
  rif: string;              // e.g. "J-07521462-5"
  address: string;          // e.g. "Final Av. Las Delicias Sector el Toro / Maracay Edo. Aragua"
  phones: string;           // e.g. "0243 – 4321300 / 0414 – 492 38 76"
  email: string;            // e.g. "cumplimiento@hesperiamaracay.com"
  website: string;          // e.g. "HOTELESHESPERIA.COM.VE"
  logoUrl: string;          // Base64 or image URL
  defaultDeptResp: string;  // e.g. "Departamento de Administración"
  defaultOfficer: string;   // e.g. "Oficial de Cumplimiento"
  primaryColor: string;     // e.g. "#0056b3"
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  tableName: string;
  isConnected: boolean;
  isDemoMode: boolean;
}

export interface ProveedorNaturalData {
  fechaElaboracion: { dia: string; mes: string; anio: string };
  nombresApellidos: string;
  cedula: string;
  actividadEconomica: string;
  nacionalidad: string;
  estadoCivil: string;
  direccionFiscal: string;
  ciudadFiscal: string;
  estadoFiscal: string;
  telefonoFiscal: string;
  direccionFisica: string;
  ciudadFisica: string;
  estadoFisica: string;
  telefonoFisico: string;
  correo: string;
  conoceAlguienEmpresa: 'SI' | 'NO' | '';
  conoceAlguienDetalle: string;
  
  // Bancario
  cuentaNumero: string;
  banco: string;
  titularNombre: string;
  titularCiRif: string;
  swift: string;
  aba: string;
  correoZelle: string;
  direccionBanco: string;

  // Declaracion y Firma
  firmaUrl?: string;
  huellaUrl?: string;

  // Documentacion
  docFiscalCi: boolean;
  docPasaporte: boolean;
  docCertCuenta: boolean;
  docOtros: boolean;
  docOtrosDetalle: string;
  observaciones: string;

  // Revision
  deptoResponsableNombre: string;
  deptoResponsableFirma?: string;
  oficialCumplimientoNombre: string;
  oficialCumplimientoFirma?: string;
}

export interface RepresentanteLegal {
  nombreApellido: string;
  cedula: string;
  cargo: string;
  direccion: string;
  telefono: string;
  correo: string;
  conoceAlguienEmpresa: 'SI' | 'NO' | '';
  conoceAlguienDetalle: string;
}

export interface BancoInfo {
  nombre: string;
  tipoCuenta: string;
  numeroCuenta: string;
  sucursal: string;
  beneficiarios: string;
  swift?: string;
  direccion?: string;
}

export interface ProveedorJuridicoData {
  fechaElaboracion: { dia: string; mes: string; anio: string };
  razonSocial: string;
  registroFiscal: string;
  actividadEconomica: string;
  direccionFiscal: string;
  telefono: string;
  correo: string;

  representante1: RepresentanteLegal;
  representante2: RepresentanteLegal;

  bancoLocal1: BancoInfo;
  bancoLocal2: BancoInfo;
  bancoInternacional: BancoInfo;

  firmaRepresentanteUrl?: string;
  huellaRepresentanteUrl?: string;

  docRif: boolean;
  docConstitutivo: boolean;
  docRifCiSocios: boolean;
  docPasaporteExtranjeros: boolean;
  docCertCuenta: boolean;
  docOtros: boolean;
  docOtrosDetalle: string;
  observaciones: string;

  deptoResponsableNombre: string;
  deptoResponsableFirma?: string;
  oficialCumplimientoNombre: string;
  oficialCumplimientoFirma?: string;
}

export interface ClienteJuridicoData {
  fechaElaboracion: { dia: string; mes: string; anio: string };
  tipoRegistro: 'INICIAL' | 'USUAL';
  razonSocial: string;
  denominacionComercial: string;
  docTipo: string;
  docNumero: string;
  residencia: 'RESIDENCIADO' | 'NO_RESIDENCIADO';
  paisCiudadProcedencia: string;
  direccionDomicilio: string;
  correoInstagram: string;
  telefonoFijo: string;
  telefonoMovil: string;
  actividadEconomica: string;
  beneficiarios: string;

  repLegalNombre: string;
  repLegalCiPasaporte: string;
  repLegalTelefono: string;

  firmaClienteUrl?: string;
  huellaPulgarDerechoUrl?: string;
  huellaPulgarIzquierdoUrl?: string;

  docConstitutivo: boolean;
  docRifSocios: boolean;
  observaciones: string;

  deptoAdminNombre: string;
  deptoAdminFirma?: string;
  oficialCumplimientoNombre: string;
  oficialCumplimientoFirma?: string;
}

export interface ClienteNaturalData {
  fechaElaboracion: { dia: string; mes: string; anio: string };
  tipoRegistro: 'INICIAL' | 'USUAL';
  nombresApellidos: string;
  denominacionComercial: string;
  docTipo: string;
  docNumero: string;
  residencia: 'RESIDENCIADO' | 'NO_RESIDENCIADO';
  paisCiudadProcedencia: string;
  direccionDomicilio: string;
  correoInstagram: string;
  telefonoFijo: string;
  telefonoMovil: string;
  actividadEconomica: string;
  beneficiarios: string;

  repLegalNombre: string;
  repLegalCiPasaporte: string;
  repLegalTelefono: string;

  firmaClienteUrl?: string;
  huellaPulgarDerechoUrl?: string;
  huellaPulgarIzquierdoUrl?: string;

  docCedulaPasaporte: boolean;
  docRif: boolean;
  observaciones: string;

  deptoAdminNombre: string;
  deptoAdminFirma?: string;
  oficialCumplimientoNombre: string;
  oficialCumplimientoFirma?: string;
}

export interface StoredRecord {
  id: string;
  form_type: FormType;
  title: string;
  client_or_provider_name: string;
  identification: string;
  created_at: string;
  updated_at: string;
  payload: any;
  company_name: string;
  synced_to_supabase: boolean;
}
