# Sistema de Formularios de Cumplimiento y KYC (Res. 020-2021)

Aplicación interactiva y lista para producción para el llenado, gestión, exportación PDF y persistencia de fichas de registro (Proveedores y Clientes, Naturales y Jurídicos).

---

## ⚡ Cómo conectar a Supabase

Tienes **3 formas sencillas** de configurar tus credenciales de Supabase en este repositorio:

---

### Opción 1: Mediante archivo `.env` (Recomendada para desarrollo local y servidores)

1. En la raíz de tu proyecto, crea un archivo llamado `.env` o `.env.local` (puedes guiarte con `.env.example`).
2. Agrega las siguientes dos líneas con los datos de tu proyecto de Supabase:

```bash
VITE_SUPABASE_URL=https://tu-id-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_publica_aqui
VITE_SUPABASE_TABLE_NAME=registros_cumplimiento
```

> **¿Dónde conseguir estos datos en Supabase?**
> 1. Entra a tu proyecto en [supabase.com](https://supabase.com).
> 2. Ve a **Project Settings** (ícono de engranaje) -> **API**.
> 3. Copia **Project URL** (para `VITE_SUPABASE_URL`).
> 4. Copia **Project API keys** -> clave `anon` / `public` (para `VITE_SUPABASE_ANON_KEY`).

---

### Opción 2: Directamente en el código fuente (`src/services/supabaseClient.ts`)

Si deseas que la aplicación web ya traiga las credenciales precargadas para cualquier usuario o para subirla directamente a GitHub Pages / Vercel sin configurar variables:

1. Abre el archivo `src/services/supabaseClient.ts`.
2. En las líneas 7 a 9, reemplaza las comillas vacías con tus credenciales:

```typescript
// src/services/supabaseClient.ts
const DEFAULT_SUPABASE_URL = 'https://tu-id-proyecto.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const DEFAULT_TABLE_NAME = 'registros_cumplimiento';
```

---

### Opción 3: Desde la interfaz de la aplicación (Sin editar código)

1. Inicia la aplicación (`npm run dev` o abre tu sitio publicado).
2. Haz clic en el botón **⚡ Supabase** en la esquina superior derecha del encabezado.
3. Pega tu **Supabase Project URL** y tu **Anon / Public Key**.
4. Haz clic en **Probar Conexión**.
5. Haz clic en **Guardar y Conectar**.
*(Las credenciales se guardan de forma persistente en el navegador en LocalStorage).*

---

## 🛠️ Creación de la Tabla en Supabase (SQL)

Para que Supabase pueda guardar los registros, ejecuta este script en el **SQL Editor** de tu consola de Supabase:

```sql
CREATE TABLE IF NOT EXISTS public.registros_cumplimiento (
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

-- Índices de búsqueda
CREATE INDEX IF NOT EXISTS idx_reg_form_type ON public.registros_cumplimiento (form_type);
CREATE INDEX IF NOT EXISTS idx_reg_identification ON public.registros_cumplimiento (identification);
CREATE INDEX IF NOT EXISTS idx_reg_created_at ON public.registros_cumplimiento (created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.registros_cumplimiento ENABLE ROW LEVEL SECURITY;

-- Políticas de acceso para clave anónima pública
CREATE POLICY "Permitir lectura publica" 
ON public.registros_cumplimiento FOR SELECT 
USING (true);

CREATE POLICY "Permitir insercion publica" 
ON public.registros_cumplimiento FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Permitir actualizacion publica" 
ON public.registros_cumplimiento FOR UPDATE 
USING (true);

CREATE POLICY "Permitir eliminacion publica" 
ON public.registros_cumplimiento FOR DELETE 
USING (true);
```

---

## 🚀 Despliegue en Plataformas Cloud (Vercel / Netlify)

Si conectas tu repositorio de GitHub a **Vercel** o **Netlify**:
1. Ve a **Settings** -> **Environment Variables**.
2. Añade:
   - `VITE_SUPABASE_URL`: `https://tu-proyecto.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `tu_clave_anon`
3. ¡Listo! Al compilar la aplicación, Vite integrará automáticamente las variables.
