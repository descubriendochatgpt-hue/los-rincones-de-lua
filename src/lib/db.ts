import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Lead } from "./lead-schema";

/**
 * Guarda el lead en Supabase (tabla `leads`, ver supabase/schema.sql).
 * Usa la clave service_role: solo en el servidor, nunca en el navegador.
 * Si Supabase no está configurado, no hace nada y devuelve null.
 */
export const isDbConfigured = () => Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function saveLead(lead: Lead): Promise<string | null> {
  if (!isDbConfigured()) return null;
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase
    .from("leads")
    .insert({
      name: lead.name,
      email: lead.email,
      phone: lead.contact.phone || null,
      contact_preference: lead.contact.preference,
      child_age: lead.childAge,
      space_type: lead.spaceType,
      room_length: lead.room.length || null,
      room_width: lead.room.width || null,
      room_height: lead.room.height || null,
      service: lead.service,
      budget: lead.budget,
      postal_code: lead.postalCode,
      town: lead.town,
      message: lead.message || null,
      photos: lead.photos,
      privacy_accepted_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (error) throw new Error(`Supabase: ${error.message}`);
  return data.id as string;
}
