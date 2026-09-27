"use client";

/* eslint-disable @next/next/no-img-element -- previsualización local (blob:) que next/image no puede optimizar */
import Link from "next/link";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FORM_TEXT, PHOTO_RULES } from "@/content/form";
import type { LeadInput } from "@/lib/lead-schema";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { describedBy, FieldError } from "./Field";
import type { usePhotoUploads } from "./usePhotoUploads";

export function StepPhotos({ uploads, error }: { uploads: ReturnType<typeof usePhotoUploads>; error?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const {
    register,
    formState: { errors: e },
  } = useFormContext<LeadInput>();
  const { items, rejections, addFiles, remove, retry } = uploads;
  const full = items.length >= PHOTO_RULES.max;
  const accept = [...Object.keys(PHOTO_RULES.accept), ...Object.values(PHOTO_RULES.accept).flat()].join(",");
  const done = items.filter((i) => i.status === "done").length;

  return (
    <div className="flex flex-col gap-6">
      <div
        onDragOver={(ev) => {
          ev.preventDefault();
          if (!full) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(ev) => {
          ev.preventDefault();
          setDragging(false);
          if (!full && ev.dataTransfer.files.length) addFiles(ev.dataTransfer.files);
        }}
        className={cn(
          "relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors md:min-h-[220px]",
          dragging ? "border-terracota bg-terracota-tinte" : "border-arena bg-crema hover:border-terracota hover:bg-terracota-tinte",
          full && "pointer-events-none opacity-60",
          error && "border-error",
        )}
      >
        <Icon name="upload" size={32} strokeWidth={1.4} className="text-terracota" />
        <button
          type="button"
          disabled={full}
          onClick={() => inputRef.current?.click()}
          className="text-[17px] font-semibold after:absolute after:inset-0 after:content-['']"
          aria-describedby="photos-formats photos-help"
        >
          {full ? (
            `Has llegado al máximo de ${PHOTO_RULES.max} fotos`
          ) : (
            <>
              <span className="hidden md:inline">{FORM_TEXT.photosDrop} </span>
              <span className="text-terracota underline underline-offset-4">
                <span className="md:hidden">Elige tus fotos</span>
                <span className="hidden md:inline">{FORM_TEXT.photosPick}</span>
              </span>
            </>
          )}
        </button>
        <p id="photos-formats" className="text-sm text-tinta-suave">
          {FORM_TEXT.photosFormats}
        </p>
        <p id="photos-help" className="sr-only">
          {FORM_TEXT.photosHelp}
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          className="sr-only"
          tabIndex={-1}
          aria-hidden
          onChange={(ev) => {
            if (ev.target.files?.length) addFiles(ev.target.files);
            ev.target.value = "";
          }}
        />
      </div>

      {rejections.length ? (
        <ul role="alert" className="space-y-1 text-sm font-medium text-error">
          {rejections.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      ) : null}
      <FieldError id="photos-error" message={error} />

      {items.length ? (
        <div>
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4" aria-label="Fotos seleccionadas">
            {items.map((it, i) => (
              <li key={it.id} className="relative aspect-square overflow-hidden rounded-xl border border-arena bg-lino">
                {it.previewUrl ? (
                  <img src={it.previewUrl} alt={`Foto ${i + 1}: ${it.file.name}`} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-1 p-2 text-center text-xs text-tinta-suave">
                    <Icon name="camera" size={24} />
                    <span className="line-clamp-2 break-all">{it.file.name}</span>
                  </div>
                )}

                {it.status === "uploading" ? (
                  <div className="absolute inset-x-2 bottom-2">
                    <div
                      className="h-1.5 overflow-hidden rounded-full bg-blanco/80"
                      role="progressbar"
                      aria-label={`Subiendo ${it.file.name}`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={Math.round(it.progress)}
                    >
                      <div className="h-full bg-terracota transition-[width]" style={{ width: `${it.progress}%` }} />
                    </div>
                  </div>
                ) : it.status === "error" ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-blanco/90 p-2 text-center text-xs">
                    <span className="font-medium text-error">{it.error}</span>
                    <button type="button" onClick={() => retry(it.id)} className="font-semibold text-terracota underline">
                      Reintentar
                    </button>
                  </div>
                ) : (
                  <span className="absolute bottom-2 left-2 flex h-6 w-6 items-center justify-center rounded-full bg-salvia-texto text-blanco" aria-label="Subida">
                    <Icon name="check" size={14} strokeWidth={2.5} />
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => remove(it.id)}
                  className="absolute top-1.5 right-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-tinta/75 text-blanco hover:bg-tinta"
                  aria-label={`Eliminar foto ${i + 1}`}
                >
                  <Icon name="x" size={14} strokeWidth={2.5} />
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-tinta-suave" aria-live="polite">
            {done} de {PHOTO_RULES.max} fotos subidas{done < PHOTO_RULES.min ? ` · mínimo ${PHOTO_RULES.min}` : ""}
          </p>
        </div>
      ) : null}

      <ol className="grid gap-3 text-sm leading-snug text-tinta-suave sm:grid-cols-3">
        {FORM_TEXT.photoTips.map((tip, i) => (
          <li key={tip} className="flex items-start gap-2.5">
            <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lino text-xs font-semibold text-verde">
              {i + 1}
            </span>
            {tip}
          </li>
        ))}
      </ol>

      <div>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-0.5 h-5 w-5 shrink-0 accent-terracota"
            {...describedBy("privacy", { error: e.privacy?.message })}
            {...register("privacy")}
          />
          <label htmlFor="privacy" className="text-sm leading-normal text-tinta-suave">
            {FORM_TEXT.privacyBefore}{" "}
            <Link href="/privacidad" target="_blank" className="text-terracota underline underline-offset-2 hover:text-terracota-hover">
              {FORM_TEXT.privacyLink}
            </Link>
            {FORM_TEXT.privacyAfter}
          </label>
        </div>
        <FieldError id="privacy-error" message={e.privacy?.message} />
      </div>
    </div>
  );
}
