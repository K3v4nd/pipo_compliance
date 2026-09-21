import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { CompanyConfig, FormType, StoredRecord, SupabaseConfig } from '../types';

const STORAGE_KEY_SUPABASE = 'pipo_compliance_supabase_config_v1';
const STORAGE_KEY_RECORDS = 'pipo_compliance_local_records_v1';

// Limpieza proactiva de claves antiguas que contenian datos de empresas anteriores
try {
  localStorage.removeItem('hesperia_company_config_v1');
  localStorage.removeItem('hesperia_supabase_config_v1');
  localStorage.removeItem('hesperia_local_records_v1');
} catch {
  // ignorar si no hay acceso a storage
}

// Función para limpiar y normalizar la URL de Supabase eliminando rutas extras como /rest/v1 o barras al final
export function cleanSupabaseUrl(rawUrl: string): string {
  if (!rawUrl) return '';
  let cleaned = rawUrl.trim();
  try {
    const parsed = new URL(cleaned);
    // Para dominios de supabase.co, la URL base del proyecto es únicamente el origen (https://xxx.supabase.co)
    if (parsed.hostname.endsWith('supabase.co')) {
      return parsed.origin;
    }
    cleaned = cleaned.replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '');
    return cleaned;
  } catch {
    cleaned = cleaned.replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '');
    return cleaned;
  }
}

// Credenciales por defecto (con el proyecto configurado por el usuario)
const DEFAULT_SUPABASE_URL = cleanSupabaseUrl((import.meta as any).env?.VITE_SUPABASE_URL || 'https://dvolmksjjegflkzztvjq.supabase.co');
const DEFAULT_SUPABASE_ANON_KEY = ((import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_dyJFmYSOxbtncw77N03IrA_vXcp2x2M').trim();
const DEFAULT_TABLE_NAME = ((import.meta as any).env?.VITE_SUPABASE_TABLE_NAME || 'registros_cumplimiento').trim();

let cachedClient: SupabaseClient | null = null;
let currentConfig: SupabaseConfig = getStoredSupabaseConfig();

export function getStoredSupabaseConfig(): SupabaseConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_SUPABASE);
    if (saved) {
      const parsed = JSON.parse(saved);
      const url = cleanSupabaseUrl(parsed.url || DEFAULT_SUPABASE_URL);
      // If previous config had empty anon key or old placeholder, auto-upgrade with user's official key
      const anonKey = (parsed.anonKey && parsed.anonKey.trim().length > 0 && !parsed.anonKey.includes('tu_anon_key')
        ? parsed.anonKey
        : DEFAULT_SUPABASE_ANON_KEY).trim();
      const tableName = (parsed.tableName || DEFAULT_TABLE_NAME).trim();
      const hasCreds = Boolean(url && anonKey);

      const upgradedConfig: SupabaseConfig = {
        url,
        anonKey,
        tableName,
        isConnected: parsed.isConnected !== undefined ? parsed.isConnected : hasCreds,
        isDemoMode: parsed.isDemoMode !== undefined ? parsed.isDemoMode : !hasCreds
      };

      if (!parsed.anonKey || parsed.anonKey !== anonKey) {
        try {
          localStorage.setItem(STORAGE_KEY_SUPABASE, JSON.stringify(upgradedConfig));
        } catch {}
      }

      return upgradedConfig;
    }
  } catch (e) {
    console.error('Error reading Supabase config', e);
  }

  const hasDefaultCreds = Boolean(DEFAULT_SUPABASE_URL && DEFAULT_SUPABASE_ANON_KEY);
  return {
    url: DEFAULT_SUPABASE_URL,
    anonKey: DEFAULT_SUPABASE_ANON_KEY,
    tableName: DEFAULT_TABLE_NAME,
    isConnected: hasDefaultCreds,
    isDemoMode: !hasDefaultCreds
  };
}

export function saveSupabaseConfig(config: SupabaseConfig): void {
  currentConfig = {
    ...config,
    url: cleanSupabaseUrl(config.url),
    anonKey: config.anonKey.trim(),
    tableName: (config.tableName || 'registros_cumplimiento').trim()
  };
  cachedClient = null;
  try {
    localStorage.setItem(STORAGE_KEY_SUPABASE, JSON.stringify(currentConfig));
  } catch (e) {
    console.error('Error saving Supabase config', e);
  }
}

export function getSupabaseClient(): SupabaseClient | null {
  if (cachedClient) return cachedClient;
  const sanitizedUrl = cleanSupabaseUrl(currentConfig.url);
  const sanitizedKey = currentConfig.anonKey.trim();
  if (!sanitizedUrl || !sanitizedKey) return null;

  try {
    cachedClient = createClient(sanitizedUrl, sanitizedKey, {
      auth: { persistSession: true, autoRefreshToken: true }
    });
    return cachedClient;
  } catch (err) {
    console.error('Failed to create Supabase client', err);
    return null;
  }
}

export async function testSupabaseConnection(url: string, anonKey: string, tableName = 'registros_cumplimiento'): Promise<{ success: boolean; message: string }> {
  const sanitizedUrl = cleanSupabaseUrl(url);
  const sanitizedKey = anonKey.trim();
  const sanitizedTable = (tableName || 'registros_cumplimiento').trim();

  if (!sanitizedUrl || !sanitizedKey) {
    return { success: false, message: 'La URL y la Anon Key son requeridas.' };
  }

  try {
    const client = createClient(sanitizedUrl, sanitizedKey);
    // Try a simple select with limit 0 to check credentials & table access
    const { error } = await client.from(sanitizedTable).select('id').limit(1);
    
    if (error) {
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return { 
          success: true, 
          message: `Conexión a Supabase exitosa, pero la tabla '${tableName}' aún no existe. Puedes crearla con 1 clic usando el script SQL incluido.` 
        };
      }
      return { success: false, message: `Error de Supabase: ${error.message}` };
    }

    return { success: true, message: `¡Conexión exitosa a Supabase! Tabla '${tableName}' lista y accesible.` };
  } catch (err: any) {
    return { success: false, message: `Error de conexión: ${err.message || String(err)}` };
  }
}

export async function saveRecord(
  formType: FormType, 
  title: string, 
  clientOrProviderName: string, 
  identification: string, 
  payload: any, 
  companyName: string
): Promise<{ success: boolean; record: StoredRecord; message: string }> {
  const newId = 'rec_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const now = new Date().toISOString();

  const record: StoredRecord = {
    id: newId,
    form_type: formType,
    title,
    client_or_provider_name: clientOrProviderName,
    identification,
    created_at: now,
    updated_at: now,
    payload,
    company_name: companyName,
    synced_to_supabase: false
  };

  // 1. Always persist to LocalStorage first
  saveToLocalStorage(record);

  // 2. Try persisting to Supabase if configured
  const client = getSupabaseClient();
  if (client && !currentConfig.isDemoMode) {
    try {
      const { error } = await client
        .from(currentConfig.tableName || 'registros_cumplimiento')
        .upsert({
          id: record.id,
          form_type: record.form_type,
          title: record.title,
          client_or_provider_name: record.client_or_provider_name,
          identification: record.identification,
          payload: record.payload,
          company_name: record.company_name,
          created_at: record.created_at,
          updated_at: record.updated_at
        });

      if (!error) {
        record.synced_to_supabase = true;
        updateInLocalStorage(record);
        return { 
          success: true, 
          record, 
          message: 'Registro guardado exitosamente en Supabase y respaldo local.' 
        };
      } else {
        console.warn('Supabase save error, keeping local fallback:', error);
        return { 
          success: true, 
          record, 
          message: `Guardado en almacenamiento local. Aviso Supabase: ${error.message}` 
        };
      }
    } catch (err: any) {
      console.warn('Network error pushing to Supabase:', err);
      return { 
        success: true, 
        record, 
        message: 'Guardado localmente (sin conexión a Supabase temporalmente).' 
      };
    }
  }

  return { 
    success: true, 
    record, 
    message: 'Registro guardado localmente en tu navegador.' 
  };
}

export async function fetchAllRecords(formType?: FormType): Promise<StoredRecord[]> {
  let records: StoredRecord[] = getFromLocalStorage().filter(r => (r.form_type as string) !== 'COMPANY_CONFIG');

  const client = getSupabaseClient();
  if (client && !currentConfig.isDemoMode) {
    try {
      let query = client.from(currentConfig.tableName || 'registros_cumplimiento').select('*').order('created_at', { ascending: false });
      if (formType) {
        query = query.eq('form_type', formType);
      } else {
        query = query.neq('form_type', 'COMPANY_CONFIG');
      }
      const { data, error } = await query;
      if (!error && data) {
        const supabaseRecords: StoredRecord[] = data
          .filter((d: any) => d.form_type !== 'COMPANY_CONFIG' && d.id !== 'config_global_company')
          .map((d: any) => ({
            id: d.id,
            form_type: d.form_type,
            title: d.title,
            client_or_provider_name: d.client_or_provider_name,
            identification: d.identification,
            created_at: d.created_at,
            updated_at: d.updated_at,
            payload: d.payload,
            company_name: d.company_name,
            synced_to_supabase: true
          }));

        // Merge with local records
        const map = new Map<string, StoredRecord>();
        supabaseRecords.forEach(r => map.set(r.id, r));
        records.forEach(r => {
          if (!map.has(r.id)) {
            map.set(r.id, r);
          }
        });
        return Array.from(map.values()).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
    } catch (err) {
      console.warn('Failed to fetch from Supabase, falling back to local', err);
    }
  }

  if (formType) {
    return records.filter(r => r.form_type === formType);
  }
  return records;
}

export async function deleteRecord(id: string): Promise<boolean> {
  removeFromLocalStorage(id);

  const client = getSupabaseClient();
  if (client && !currentConfig.isDemoMode) {
    try {
      await client.from(currentConfig.tableName || 'registros_cumplimiento').delete().eq('id', id);
    } catch (err) {
      console.error('Error deleting from Supabase', err);
    }
  }
  return true;
}

export async function saveCompanyConfigToSupabase(company: CompanyConfig): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client || currentConfig.isDemoMode) return false;
  try {
    const { error } = await client
      .from(currentConfig.tableName || 'registros_cumplimiento')
      .upsert({
        id: 'config_global_company',
        form_type: 'COMPANY_CONFIG',
        title: 'Configuración Global de Empresa',
        client_or_provider_name: company.name || company.commercialName || 'Empresa',
        identification: company.rif || '',
        payload: company,
        company_name: company.commercialName || company.name || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    return !error;
  } catch (e) {
    console.error('Error saving company config to Supabase:', e);
    return false;
  }
}

export async function fetchCompanyConfigFromSupabase(): Promise<CompanyConfig | null> {
  const client = getSupabaseClient();
  if (!client || currentConfig.isDemoMode) return null;
  try {
    const { data, error } = await client
      .from(currentConfig.tableName || 'registros_cumplimiento')
      .select('payload')
      .eq('id', 'config_global_company')
      .single();
    if (!error && data?.payload) {
      return data.payload as CompanyConfig;
    }
    return null;
  } catch (e) {
    console.warn('Could not load company config from Supabase:', e);
    return null;
  }
}

// Local Storage helpers
function getFromLocalStorage(): StoredRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RECORDS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToLocalStorage(record: StoredRecord) {
  const records = getFromLocalStorage();
  const existingIndex = records.findIndex(r => r.id === record.id);
  if (existingIndex >= 0) {
    records[existingIndex] = record;
  } else {
    records.unshift(record);
  }
  try {
    localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(records));
  } catch (e) {
    console.error('LocalStorage write error', e);
  }
}

function updateInLocalStorage(record: StoredRecord) {
  saveToLocalStorage(record);
}

function removeFromLocalStorage(id: string) {
  const records = getFromLocalStorage().filter(r => r.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(records));
  } catch (e) {
    console.error('LocalStorage delete error', e);
  }
}

export function generateSupabaseSQL(tableName = 'registros_cumplimiento'): string {
  return `-- =========================================================
-- SCRIPT DE INICIALIZACIÓN DE TABLA EN SUPABASE
-- Ejecuta este código en el "SQL Editor" de tu proyecto Supabase
-- =========================================================

CREATE TABLE IF NOT EXISTS public.${tableName} (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_type TEXT NOT NULL,
    title TEXT NOT NULL,
    client_or_provider_name TEXT NOT NULL,
    identification TEXT,
    payload JSONB NOT NULL,
    company_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_${tableName}_form_type ON public.${tableName} (form_type);
CREATE INDEX IF NOT EXISTS idx_${tableName}_identification ON public.${tableName} (identification);
CREATE INDEX IF NOT EXISTS idx_${tableName}_created_at ON public.${tableName} (created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.${tableName} ENABLE ROW LEVEL SECURITY;

-- Política de acceso público (o con anon key) para lectura, inserción y modificación
CREATE POLICY "Permitir lectura publica de registros" 
ON public.${tableName} FOR SELECT 
USING (true);

CREATE POLICY "Permitir insercion publica con anon key" 
ON public.${tableName} FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Permitir actualizacion con anon key" 
ON public.${tableName} FOR UPDATE 
USING (true);

CREATE POLICY "Permitir eliminacion con anon key" 
ON public.${tableName} FOR DELETE 
USING (true);
`;
}
