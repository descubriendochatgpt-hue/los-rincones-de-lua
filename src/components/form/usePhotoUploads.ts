"use client";

import { upload } from "@vercel/blob/client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PHOTO_RULES } from "@/content/form";
import type { UploadedPhoto } from "@/lib/lead-schema";

export type PhotoItem = {
  id: string;
  file: File;
  previewUrl: string | null; // null si el navegador no puede mostrarla (HEIC)
  progress: number;
  status: "uploading" | "done" | "error";
  error?: string;
  result?: UploadedPhoto;
};

const EXT_TO_TYPE: Record<string, string> = Object.fromEntries(
  Object.entries(PHOTO_RULES.accept).flatMap(([type, exts]) => exts.map((e) => [e, type])),
);

/** Tipo MIME fiable: algunos navegadores dejan vacío el tipo de las fotos HEIC. */
export function detectType(file: File) {
  if (file.type && PHOTO_RULES.accept[file.type]) return file.type;
  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  return EXT_TO_TYPE[ext] ?? null;
}

const safeName = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .slice(-80) || "foto.jpg";

const uid = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

/**
 * Gestiona las fotos del formulario: validación, subida directa a Vercel Blob
 * con progreso, reintento y borrado. `onChange` recibe las fotos ya subidas.
 */
export function usePhotoUploads(onChange: (photos: UploadedPhoto[]) => void) {
  const [items, setItems] = useState<PhotoItem[]>([]);
  const [rejections, setRejections] = useState<string[]>([]);
  const folder = useRef<string>("");
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const patch = useCallback((id: string, p: Partial<PhotoItem>) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...p } : it)));
  }, []);

  const start = useCallback(
    async (item: PhotoItem) => {
      folder.current ||= uid();
      const contentType = detectType(item.file)!;
      patch(item.id, { status: "uploading", progress: 0, error: undefined });
      try {
        const blob = await upload(`leads/${folder.current}/${safeName(item.file.name)}`, item.file, {
          access: "public",
          handleUploadUrl: "/api/upload",
          contentType,
          onUploadProgress: ({ percentage }) => patch(item.id, { progress: percentage }),
        });
        patch(item.id, {
          status: "done",
          progress: 100,
          result: { url: blob.url, pathname: blob.pathname, name: item.file.name, size: item.file.size, contentType },
        });
      } catch (e) {
        console.error(e);
        let msg = "Error al subir la foto. Revisa tu conexión e inténtalo de nuevo.";
        // Si el servidor no está configurado, dilo claramente en lugar de pedir reintentar
        try {
          const res = await fetch("/api/upload", { method: "GET" });
          const status = await res.json();
          if (!status.configured) msg = "La subida de fotos no está disponible ahora mismo. Escríbenos por WhatsApp o email.";
        } catch {}
        patch(item.id, { status: "error", error: msg });
      }
    },
    [patch],
  );

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const errs: string[] = [];
      const room = PHOTO_RULES.max - itemsRef.current.length;
      const accepted: PhotoItem[] = [];
      for (const file of Array.from(files)) {
        const type = detectType(file);
        if (!type) errs.push(`«${file.name}»: formato no admitido (usa JPG, PNG o HEIC).`);
        else if (file.size > PHOTO_RULES.maxSizeMB * 1024 * 1024)
          errs.push(`«${file.name}»: pesa más de ${PHOTO_RULES.maxSizeMB} MB.`);
        else if (accepted.length >= room) {
          errs.push(`Solo se admiten ${PHOTO_RULES.max} fotos.`);
          break;
        } else
          accepted.push({
            id: uid(),
            file,
            previewUrl: type.includes("hei") ? null : URL.createObjectURL(file),
            progress: 0,
            status: "uploading",
          });
      }
      setRejections(errs);
      if (accepted.length) {
        setItems((prev) => [...prev, ...accepted]);
        accepted.forEach(start);
      }
    },
    [start],
  );

  const remove = useCallback((id: string) => {
    setItems((prev) => {
      const it = prev.find((p) => p.id === id);
      if (it?.previewUrl) URL.revokeObjectURL(it.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  }, []);

  const retry = useCallback((id: string) => {
    const it = itemsRef.current.find((p) => p.id === id);
    if (it) start(it);
  }, [start]);

  const reset = useCallback(() => {
    itemsRef.current.forEach((it) => it.previewUrl && URL.revokeObjectURL(it.previewUrl));
    setItems([]);
    setRejections([]);
    folder.current = "";
  }, []);

  // Sincroniza con el formulario las fotos que ya están subidas.
  const done = useMemo(() => items.filter((i) => i.status === "done" && i.result).map((i) => i.result!), [items]);
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  useEffect(() => {
    onChangeRef.current(done);
  }, [done]);

  useEffect(() => () => itemsRef.current.forEach((it) => it.previewUrl && URL.revokeObjectURL(it.previewUrl)), []);

  return {
    items,
    rejections,
    isUploading: items.some((i) => i.status === "uploading"),
    hasErrors: items.some((i) => i.status === "error"),
    addFiles,
    remove,
    retry,
    reset,
  };
}
