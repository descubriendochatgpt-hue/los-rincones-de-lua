"use client";

import Image from "next/image";
import { useState } from "react";
import { PROJECTS_SECTION } from "@/content/home";
import { PROJECTS } from "@/content/projects";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";
import { cn } from "@/lib/cn";

export function Projects() {
  const [open, setOpen] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="section-y">
      <div className="container-page flex flex-col gap-12 md:gap-20">
        <Reveal className="flex flex-col gap-4 md:items-center md:text-center">
          <p className="eyebrow">{PROJECTS_SECTION.eyebrow}</p>
          <h2 id="proyectos-title" className="h2">
            <Rich text={PROJECTS_SECTION.title} />
          </h2>
          <p className="text-[17px] text-tinta-suave">{PROJECTS_SECTION.subtitle}</p>
        </Reveal>

        {PROJECTS.map((p, i) => (
          <article key={p.number} aria-labelledby={`proyecto-${p.number}`} className="grid items-start gap-8 lg:grid-cols-12 lg:gap-16">
            <Reveal className={cn("flex flex-col gap-4 lg:col-span-7", i % 2 === 1 && "lg:order-2")}>
              <BeforeAfterSlider before={p.before} after={p.after} alt={p.alt} />
              {p.process.length ? (
                <div>
                  <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-tinta-suave uppercase">Proceso</p>
                  <ul className="grid grid-cols-3 gap-3">
                    {p.process.map((img) => (
                      <li key={img.src}>
                        <button
                          type="button"
                          onClick={() => setOpen(img)}
                          className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-lino"
                          aria-label={`Ampliar: ${img.alt}`}
                        >
                          <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 18vw, 30vw" className="object-cover transition-transform duration-400 ease-suave group-hover:scale-[1.03]" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col gap-6 lg:col-span-5 lg:pt-4">
              <p className="font-serif text-[64px] leading-none text-terracota" aria-hidden>
                {p.number}
              </p>
              <h3 id={`proyecto-${p.number}`} className="font-serif text-4xl leading-tight md:text-[44px]">
                <span className="sr-only">Proyecto {p.number}: </span>
                {p.title}
              </h3>
              <p className="text-[17px] leading-relaxed text-tinta-suave">{p.story}</p>
              <dl className="grid gap-4 rounded-2xl border border-arena bg-blanco p-6 text-[15px] sm:grid-cols-2">
                <div className={p.facts.budgetIncludes ? "sm:col-span-2" : undefined}>
                  <dt className="text-tinta-suave">
                    Presupuesto aproximado
                    {p.facts.budgetIncludes ? <span className="mt-0.5 block text-[13px] leading-snug">({p.facts.budgetIncludes})</span> : null}
                  </dt>
                  <dd className="mt-1 font-serif text-3xl">{p.facts.budget}</dd>
                </div>
                <div>
                  <dt className="text-tinta-suave">Superficie</dt>
                  <dd className="mt-1 font-serif text-3xl">{p.facts.surface}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-tinta-suave">Qué hicimos</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {p.facts.whatWeDid.map((w) => (
                      <span key={w} className="rounded-full bg-salvia-tinte px-3 py-1 text-sm font-medium text-salvia-texto">
                        {w}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
              {p.closing ? <p className="font-serif text-2xl italic">{p.closing}</p> : null}
            </Reveal>
          </article>
        ))}
      </div>
      <Lightbox image={open} onClose={() => setOpen(null)} />
    </section>
  );
}
