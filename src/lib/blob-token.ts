import "server-only";

/**
 * Clave de Vercel Blob. Normalmente es BLOB_READ_WRITE_TOKEN, pero si al conectar
 * el almacén se eligió otro prefijo (p. ej. FOTOS_READ_WRITE_TOKEN) también la encuentra.
 */
export function getBlobToken(): string | undefined {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  const entry = Object.entries(process.env).find(
    ([key, value]) => key.endsWith("READ_WRITE_TOKEN") && value?.startsWith("vercel_blob_rw_"),
  );
  return entry?.[1];
}

/** Nombres (nunca valores) de variables que parecen de Blob, para el diagnóstico. */
export function blobVariableNames(): string[] {
  return Object.keys(process.env).filter((k) => /BLOB|READ_WRITE_TOKEN/i.test(k));
}
