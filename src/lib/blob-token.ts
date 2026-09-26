import "server-only";

/**
 * Vercel Blob admite dos formas de conexión:
 *  - clásica: una clave fija BLOB_READ_WRITE_TOKEN (o con otro prefijo);
 *  - nueva (OIDC): BLOB_STORE_ID + un token temporal que Vercel inyecta en cada petición.
 * Estas utilidades detectan cuál hay configurada.
 */
export function getBlobToken(): string | undefined {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  const entry = Object.entries(process.env).find(
    ([key, value]) => key.endsWith("READ_WRITE_TOKEN") && value?.startsWith("vercel_blob_rw_"),
  );
  return entry?.[1];
}

export type BlobMode = "token" | "oidc" | null;

export function getBlobMode(): BlobMode {
  if (getBlobToken()) return "token";
  if (process.env.BLOB_STORE_ID) return "oidc";
  return null;
}

/** Nombres (nunca valores) de variables que parecen de Blob, para el diagnóstico. */
export function blobVariableNames(): string[] {
  return Object.keys(process.env).filter((k) => /BLOB|READ_WRITE_TOKEN/i.test(k));
}
