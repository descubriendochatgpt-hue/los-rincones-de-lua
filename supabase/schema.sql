-- Tabla de leads de Los Rincones de Lúa.
-- Ejecútalo una vez en Supabase → SQL Editor → New query → Run.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  -- Paso 1 · Vosotros
  name text not null,
  email text not null,
  phone text,
  contact_preference text not null,        -- whatsapp / llamada / email
  -- Paso 2 · El espacio
  child_age text not null,
  space_type text not null,                 -- habitacion / lectura / creativo / juego / cama / almacenamiento / otro
  service text not null,                    -- diseno / diseno-transformacion / rincon-especial / no-lo-se
  message text,                             -- ¿Qué te gustaría conseguir?
  -- Paso 3 · Detalles
  room_length text,                         -- metros aproximados, tal como los escribe el cliente
  room_width text,
  room_height text,
  budget text not null,
  postal_code text not null,
  town text not null,
  -- Paso 4 · Fotos
  photos jsonb not null default '[]'::jsonb, -- [{ url, pathname, name, size, contentType }]
  privacy_accepted_at timestamptz not null,
  -- Gestión interna
  status text not null default 'nuevo',     -- nuevo / contactado / propuesta enviada / ganado / perdido
  notes text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Seguridad: RLS activado y SIN políticas públicas.
-- Solo la web (con la clave service_role, en el servidor) puede insertar,
-- y tú ves los datos desde el panel de Supabase (Table Editor).
alter table public.leads enable row level security;
