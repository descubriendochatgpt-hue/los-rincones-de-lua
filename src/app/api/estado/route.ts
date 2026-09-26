import { del, put } from "@vercel/blob";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { blobVariableNames, getBlobMode, getBlobToken } from "@/lib/blob-token";

export const dynamic = "force-dynamic";

/**
 * Diagnóstico de la configuración: abre /api/estado en el navegador.
 * Prueba de verdad cada servicio y dice qué falta (nunca muestra claves).
 */
export async function GET() {
  const result: Record<string, { ok: boolean; detalle: string }> = {};

  // Vercel Blob: sube y borra un archivo de prueba público
  const token = getBlobToken();
  const mode = getBlobMode();
  if (!mode) {
    const names = blobVariableNames();
    result.fotos = {
      ok: false,
      detalle:
        "Esta versión publicada no tiene la clave de Vercel Blob. Conecta el Blob Store al proyecto marcando Production y después haz Redeploy. " +
        (names.length ? `Variables parecidas encontradas: ${names.join(", ")}.` : "No hay ninguna variable de Blob en este despliegue."),
    };
  } else {
    try {
      const blob = await put("diagnostico/prueba.txt", "ok", { access: "public", addRandomSuffix: true, token });
      await del(blob.url, { token });
      result.fotos = { ok: true, detalle: `Vercel Blob funciona (conexión ${mode === "oidc" ? "OIDC" : "con clave"}).` };
    } catch (e) {
      const msg = (e as Error).message;
      result.fotos = {
        ok: false,
        detalle: /private|access/i.test(msg)
          ? `El Blob Store parece ser PRIVADO. Crea uno nuevo como Public y conéctalo. (${msg})`
          : `Error de Vercel Blob: ${msg}`,
      };
    }
  }

  // Supabase: comprueba que existe la tabla leads
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    result.baseDeDatos = { ok: false, detalle: "Faltan SUPABASE_URL y/o SUPABASE_SERVICE_ROLE_KEY." };
  } else {
    try {
      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
      const { error } = await supabase.from("leads").select("id", { count: "exact", head: true });
      result.baseDeDatos = error
        ? { ok: false, detalle: `Supabase responde con error: ${error.message}. ¿Ejecutaste supabase/schema.sql en el SQL Editor?` }
        : { ok: true, detalle: "Supabase y la tabla leads funcionan." };
    } catch (e) {
      result.baseDeDatos = { ok: false, detalle: `No se puede conectar con Supabase: ${(e as Error).message}. Revisa SUPABASE_URL.` };
    }
  }

  // Resend
  result.email = process.env.RESEND_API_KEY
    ? { ok: true, detalle: "RESEND_API_KEY configurada." }
    : { ok: false, detalle: "Falta RESEND_API_KEY." };

  return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
}
