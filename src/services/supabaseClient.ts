import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { FormType, StoredRecord, SupabaseConfig } from '../types';

const STORAGE_KEY_SUPABASE = 'hesperia_supabase_config_v1';
const STORAGE_KEY_RECORDS = 'hesperia_local_records_v1';

// Credenciales por defecto (puedes editarlas aquí directamente o usar variables de entorno .env)
const DEFAULT_SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const DEFAULT_SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';
const DEFAULT_TABLE_NAME = (import.meta as any).env?.VITE_SUPABASE_TABLE_NAME || 'registros_cumplimiento';

let cachedClient: SupabaseClient | null = null;
let currentConfig: SupabaseConfig = getStoredSupabaseConfig();

export function getStoredSupabaseConfig(): SupabaseConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_SUPABASE);
    if (saved) {
      const parsed = JSON.parse(saved);
      const url = parsed.url || DEFAULT_SUPABASE_URL;
      const anonKey = parsed.anonKey || DEFAULT_SUPABASE_ANON_KEY;
      const tableName = parsed.tableName || DEFAULT_TABLE_NAME;
      const hasCreds = Boolean(url && anonKey);

      return {
        url,
        anonKey,
        tableName,
        isConnected: parsed.isConnected !== undefined ? parsed.isConnected : hasCreds,
        isDemoMode: parsed.isDemoMode !== undefined ? parsed.isDemoMode : !hasCreds
      };
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
  currentConfig = { ...config };
  cachedClient = null;
  try {
    localStorage.setItem(STORAGE_KEY_SUPABASE, JSON.stringify(currentConfig));
  } catch (e) {
    console.error('Error saving Supabase config', e);
  }
}

export function getSupabaseClient(): SupabaseClient | null {
  if (cachedClient) return cachedClient;
  if (!currentConfig.url || !currentConfig.anonKey) return null;

  try {
    cachedClient = createClient(currentConfig.url.trim(), currentConfig.anonKey.trim(), {
      auth: { persistSession: true, autoRefreshToken: true }
    });
    return cachedClient;
  } catch (err) {
    console.error('Failed to create Supabase client', err);
    return null;
  }
}

export async function testSupabaseConnection(url: string, anonKey: string, tableName = 'registros_cumplimiento'): Promise<{ success: boolean; message: string }> {
  if (!url || !anonKey) {
    return { success: false, message: 'La URL y la Anon Key son requeridas.' };
  }

  try {
    const client = createClient(url.trim(), anonKey.trim());
    // Try a simple select with limit 0 to check credentials & table access
    const { error } = await client.from(tableName).select('id').limit(1);
    
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
  let records: StoredRecord[] = getFromLocalStorage();

  const client = getSupabaseClient();
  if (client && !currentConfig.isDemoMode) {
    try {
      let query = client.from(currentConfig.tableName || 'registros_cumplimiento').select('*').order('created_at', { ascending: false });
      if (formType) {
        query = query.eq('form_type', formType);
      }
      const { data, error } = await query;
      if (!error && data) {
        const supabaseRecords: StoredRecord[] = data.map((d: any) => ({
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
    id TEXT PRIMARY KEY,
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
