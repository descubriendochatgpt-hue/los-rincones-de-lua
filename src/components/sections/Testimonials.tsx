import Image from "next/image";
import { TESTIMONIALS_SECTION } from "@/content/home";
import { TESTIMONIALS } from "@/content/testimonials";
import { QuoteMark } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";
import { Stars } from "@/components/ui/Stars";
import { TONE } from "@/components/ui/tones";
import { cn } from "@/lib/cn";

/** Carrusel con scroll-snap en móvil y rejilla de 3 columnas en escritorio. */
export function Testimonials() {
  if (!TESTIMONIALS.length) return null;
  return (
    <section id="familias" aria-labelledby="familias-title" className="section-y">
      <div className="container-page flex flex-col gap-10 md:gap-16">
        <Reveal className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="flex flex-col gap-4">
            <p className="eyebrow">{TESTIMONIALS_SECTION.eyebrow}</p>
            <h2 id="familias-title" className="h2">
              <Rich text={TESTIMONIALS_SECTION.title} />
            </h2>
          </div>
          <p className="max-w-[360px] text-[15px] leading-relaxed text-tinta-suave">{TESTIMONIALS_SECTION.intro}</p>
        </Reveal>

        <ul
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0"
          aria-label="Testimonios (desliza para ver más)"
        >
          {TESTIMONIALS.map((t, i) => (
            <Reveal as="li" key={i} delay={i * 0.08} className="w-[85%] shrink-0 snap-center md:w-auto">
              <figure className="lift flex h-full flex-col gap-7 rounded-2xl border border-arena bg-blanco p-7 md:p-9">
                <QuoteMark className="text-mostaza" />
                <blockquote className="grow font-serif text-[20px] leading-[1.35] md:text-[21px]">{t.quote}</blockquote>
                <figcaption className="flex items-center gap-4">
                  {t.photo ? (
                    <Image src={t.photo} alt="" width={56} height={64} className="h-16 w-14 shrink-0 rounded-[999px_999px_12px_12px] object-cover" />
                  ) : (
                    <span aria-hidden className={cn("flex h-16 w-14 shrink-0 items-center justify-center rounded-[999px_999px_12px_12px] font-serif text-2xl", TONE[t.tone])}>
                      {t.initial}
                    </span>
                  )}
                  <div className="flex flex-col gap-1">
                    <span className="text-base font-semibold">{t.name}</span>
                    <span className="text-sm text-tinta-suave">{t.detail}</span>
                    {t.rating ? <Stars rating={t.rating} /> : null}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
