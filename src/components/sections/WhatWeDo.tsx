import { WHAT_WE_DO } from "@/content/home";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";
import { TONE } from "@/components/ui/tones";
import { cn } from "@/lib/cn";

export function WhatWeDo() {
  return (
    <section id="que-hacemos" aria-labelledby="que-hacemos-title" className="section-y bg-lino">
      <div className="container-page flex flex-col gap-12 md:gap-16">
        <Reveal className="flex flex-col gap-4">
          <p className="eyebrow">{WHAT_WE_DO.eyebrow}</p>
          <h2 id="que-hacemos-title" className="h2 max-w-[820px]">
            <Rich text={WHAT_WE_DO.title} />
          </h2>
        </Reveal>
        <ul className="grid gap-6 md:grid-cols-3">
          {WHAT_WE_DO.blocks.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 0.08} className="lift flex flex-col gap-5 rounded-2xl bg-blanco px-8 py-10 md:px-9">
              <span aria-hidden className={cn("flex h-16 w-14 items-center justify-center rounded-[999px_999px_10px_10px]", TONE[b.tone])}>
                <Icon name={b.icon} size={26} strokeWidth={1.5} />
              </span>
              <h3 className="font-serif text-4xl">{b.title}</h3>
              <p className="text-[17px] leading-relaxed text-tinta-suave">{b.text}</p>
              {"location" in b && b.location ? (
                <p className="flex items-start gap-2 text-[15px] font-medium text-salvia-texto">
                  <Icon name="pin" size={18} className="mt-0.5 shrink-0 text-terracota" />
                  {b.location}
                </p>
              ) : null}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
