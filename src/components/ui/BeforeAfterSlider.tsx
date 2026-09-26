"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { Icon } from "./Icon";

/**
 * Comparador antes/después. Arrastre 1:1 con el dedo (sin easing), teclado con flechas
 * gracias al <input type="range"> accesible superpuesto.
 */
export function BeforeAfterSlider({ before, after, alt, priority = false }: { before: string; after: string; alt: string; priority?: boolean }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  const moveTo = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <div
      ref={ref}
      className="group relative aspect-[4/3] w-full touch-pan-y overflow-hidden rounded-3xl bg-lino shadow-[0_28px_56px_-28px_rgb(46_42_38/0.3)] select-none md:aspect-video"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        moveTo(e.clientX);
      }}
      onPointerMove={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) moveTo(e.clientX);
      }}
    >
      <Image src={before} alt={`Antes: ${alt}`} fill priority={priority} sizes="(min-width: 1440px) 1200px, 100vw" className="object-cover" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        <Image src={after} alt={`Después: ${alt}`} fill priority={priority} sizes="(min-width: 1440px) 1200px, 100vw" className="object-cover" draggable={false} />
      </div>

      <span
        className="pointer-events-none absolute top-4 left-4 rounded-full bg-tinta/70 px-4 py-2 text-[13px] font-semibold tracking-[0.08em] text-blanco uppercase transition-opacity duration-300 md:top-6 md:left-6"
        style={{ opacity: pos < 12 ? 0 : 1 }}
      >
        Antes
      </span>
      <span
        className="pointer-events-none absolute top-4 right-4 rounded-full bg-blanco/90 px-4 py-2 text-[13px] font-semibold tracking-[0.08em] text-tinta uppercase transition-opacity duration-300 md:top-6 md:right-6"
        style={{ opacity: pos > 88 ? 0 : 1 }}
      >
        Después
      </span>

      <label htmlFor={id} className="sr-only">
        Comparar antes y después: {alt}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-valuetext={`${Math.round(pos)}% antes`}
        className="peer absolute inset-0 z-10 m-0 h-full w-full cursor-ew-resize opacity-0"
      />

      <div className="pointer-events-none absolute inset-y-0 z-[5] w-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -left-[1.5px] w-[3px] bg-blanco shadow-[0_0_12px_rgb(46_42_38/0.25)]" />
        <div className="absolute top-1/2 left-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blanco text-tinta shadow-[0_8px_24px_rgb(46_42_38/0.25)] transition-transform duration-200 group-hover:scale-110 md:h-16 md:w-16">
          <Icon name="chevrons" size={24} strokeWidth={1.8} />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-terracota peer-focus-visible:ring-4" />
    </div>
  );
}
