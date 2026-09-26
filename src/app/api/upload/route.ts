import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { PHOTO_RULES } from "@/content/form";

/** Indica si la subida de fotos está configurada (lo usa el formulario para mostrar un error claro). */
export async function GET() {
  return NextResponse.json({ configured: Boolean(process.env.BLOB_READ_WRITE_TOKEN) });
}

/**
 * Genera tokens para que el navegador suba las fotos directamente a Vercel Blob
 * (así no pasan por la función y no hay límite de 4,5 MB por petición).
 */
export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "La subida de fotos no está configurada (falta BLOB_READ_WRITE_TOKEN)." },
      { status: 503 },
    );
  }

  const body = (await request.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("leads/")) throw new Error("Ruta no permitida");
        return {
          allowedContentTypes: Object.keys(PHOTO_RULES.accept),
          maximumSizeInBytes: PHOTO_RULES.maxSizeMB * 1024 * 1024,
          addRandomSuffix: true,
          validUntil: Date.now() + 10 * 60 * 1000,
        };
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("[upload]", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
