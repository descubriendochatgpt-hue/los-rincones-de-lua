"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Icon } from "./Icon";

/**
 * Visor de foto a pantalla completa con <dialog> nativo (Esc para cerrar, foco atrapado).
 * La foto se ajusta al ancho y al alto de la pantalla: siempre se ve entera y centrada.
 */
export function Lightbox({ image, onClose }: { image: { src: string; alt: string } | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (image && !d.open) d.showModal();
    if (!image && d.open) d.close();
    // Evita que la página de fondo se desplace mientras la foto está abierta
    document.documentElement.style.overflow = image ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [image]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={onClose}
      aria-label={image?.alt}
      className="fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none cursor-zoom-out items-center justify-center bg-transparent p-4 backdrop:bg-tinta/90 open:flex sm:p-10"
    >
      {image ? (
        <>
          <div className="relative h-full w-full">
            <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-contain" />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            autoFocus
            className="fixed top-4 right-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-blanco text-verde shadow-(--shadow-md)"
          >
            <Icon name="x" size={18} strokeWidth={2} />
          </button>
        </>
      ) : null}
    </dialog>
  );
}
