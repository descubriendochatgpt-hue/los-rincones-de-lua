import { issueSignedToken } from "@vercel/blob";
import { handleUpload, handleUploadPresigned, type HandleUploadBody, type HandleUploadPresignedBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { PHOTO_RULES } from "@/content/form";
import { getBlobMode, getBlobToken } from "@/lib/blob-token";

const RULES = {
  allowedContentTypes: Object.keys(PHOTO_RULES.accept),
  maximumSizeInBytes: PHOTO_RULES.maxSizeMB * 1024 * 1024,
};

/** Indica al formulario si la subida está configurada y con qué sistema. */
export async function GET() {
  const mode = getBlobMode();
  return NextResponse.json({ configured: mode !== null, mode });
}

/**
 * Autoriza al navegador a subir las fotos directamente a Vercel Blob
 * (así no pasan por la función y no hay límite de 4,5 MB por petición).
 */
export async function POST(request: Request) {
  const mode = getBlobMode();
  if (!mode) {
    return NextResponse.json({ error: "La subida de fotos no está configurada (falta conectar Vercel Blob)." }, { status: 503 });
  }

  const body = (await request.json()) as HandleUploadBody | HandleUploadPresignedBody;
  try {
    // Sistema nuevo (OIDC): URL firmada por foto
    if (body.type === "blob.generate-presigned-url") {
      const result = await handleUploadPresigned({
        body: body as HandleUploadPresignedBody,
        request,
        getSignedToken: async (pathname) => {
          if (!pathname.startsWith("leads/")) throw new Error("Ruta no permitida");
          const validUntil = Date.now() + 10 * 60 * 1000;
          const token = await issueSignedToken({ pathname, operations: ["put"], validUntil, ...RULES });
          return { token, urlOptions: { validUntil, ...RULES } };
        },
      });
      return NextResponse.json(result);
    }

    // Sistema clásico: token de cliente firmado con BLOB_READ_WRITE_TOKEN
    const result = await handleUpload({
      token: getBlobToken(),
      body: body as HandleUploadBody,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("leads/")) throw new Error("Ruta no permitida");
        return { ...RULES, addRandomSuffix: true, validUntil: Date.now() + 10 * 60 * 1000 };
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("[upload]", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
