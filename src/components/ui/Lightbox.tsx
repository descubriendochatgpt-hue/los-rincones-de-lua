"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Icon } from "./Icon";

/** Visor de foto a pantalla completa con <dialog> nativo (Esc para cerrar, foco atrapado). */
export function Lightbox({ image, onClose }: { image: { src: string; alt: string } | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (image && !d.open) d.showModal();
    if (!image && d.open) d.close();
  }, [image]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-label={image?.alt}
      className="m-auto max-h-[90vh] w-[min(92vw,1100px)] overflow-visible bg-transparent p-0 backdrop:bg-tinta/80"
    >
      {image ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-lino">
          <Image src={image.src} alt={image.alt} fill sizes="92vw" className="object-contain" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            autoFocus
            className="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-blanco text-tinta shadow-(--shadow-md)"
          >
            <Icon name="x" size={18} strokeWidth={2} />
          </button>
        </div>
      ) : null}
    </dialog>
  );
}
