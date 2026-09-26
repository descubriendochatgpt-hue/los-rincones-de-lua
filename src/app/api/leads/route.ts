import { NextResponse } from "next/server";
import { leadSchema, normalizePhone } from "@/lib/lead-schema";
import { isDbConfigured, saveLead } from "@/lib/db";
import { isEmailConfigured, sendLeadNotification } from "@/lib/email";

export const maxDuration = 30;

/** Solo aceptamos fotos alojadas en Vercel Blob, para que nadie cuele enlaces externos en el email. */
const isBlobUrl = (url: string) => {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && u.hostname.endsWith(".blob.vercel-storage.com");
  } catch {
    return false;
  }
};

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Petición no válida" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Revisa los datos del formulario", issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })) },
      { status: 422 },
    );
  }
  const lead = {
    ...parsed.data,
    contact: { ...parsed.data.contact, phone: parsed.data.contact.phone && normalizePhone(parsed.data.contact.phone) },
  };

  // Honeypot relleno => bot. Respondemos OK para no darle pistas.
  if (lead.website) return NextResponse.json({ ok: true });

  if (process.env.NODE_ENV === "production" && !lead.photos.every((p) => isBlobUrl(p.url))) {
    return NextResponse.json({ error: "Fotos no válidas" }, { status: 422 });
  }

  if (!isDbConfigured() && !isEmailConfigured()) {
    // Sin integraciones configuradas (p. ej. en local): lo mostramos en consola.
    console.warn("[lead] Ni Supabase ni RESEND_API_KEY configurados. Lead recibido:", lead);
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "El formulario no está configurado" }, { status: 500 });
    }
    return NextResponse.json({ ok: true, id: null });
  }

  let id: string | null = null;
  let saved = false;
  let emailed = false;

  try {
    id = await saveLead(lead);
    saved = id !== null;
  } catch (e) {
    console.error("[lead] error guardando en base de datos", e);
  }

  if (isEmailConfigured()) {
    try {
      await sendLeadNotification(lead, id);
      emailed = true;
    } catch (e) {
      console.error("[lead] error enviando email", e);
    }
  }

  // Con que se haya guardado O enviado, el lead no se pierde.
  if (!saved && !emailed) {
    return NextResponse.json({ error: "No hemos podido registrar tu solicitud" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, id });
}
