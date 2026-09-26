"use client";

import { useEffect, useRef, useState } from "react";
import { SERVICE_CHANGED_EVENT } from "@/lib/events";
import { SERVICES } from "@/content/home";
import { CURRENCY, PLANS, type Plan } from "@/content/pricing";
import { Icon } from "@/components/ui/Icon";
import { PlanCta } from "@/components/ui/PlanCta";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";
import { TONE } from "@/components/ui/tones";
import { cn } from "@/lib/cn";

const fmt = new Intl.NumberFormat("es-ES", { useGrouping: "always" });

function PlanCard({ plan, selected, anySelected }: { plan: Plan; selected: boolean; anySelected: boolean }) {
  // La tarjeta recomendada solo se destaca mientras no se ha elegido ninguna
  const emphasized = selected || (plan.highlighted && !anySelected);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const price =
    plan.price === "custom" ? null : plan.price === null ? "X" : fmt.format(plan.price);
  return (
    // Pulsar en cualquier parte de la tarjeta equivale a pulsar su botón
    <div
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest("a")) ctaRef.current?.click();
      }}
      className={cn(
        "lift relative flex h-full cursor-pointer flex-col gap-7 rounded-2xl bg-blanco px-6 py-10 sm:px-9",
        emphasized ? "border-2 border-terracota shadow-[0_28px_56px_-24px_rgb(46_42_38/0.22)]" : "border border-arena",
        plan.highlighted && "pt-12",
        selected && "ring-4 ring-terracota-tinte",
      )}
    >
      {selected ? (
        <span className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-terracota px-3 py-1 text-[13px] font-semibold text-blanco">
          <Icon name="check" size={14} strokeWidth={2.5} /> Elegido
        </span>
      ) : null}
      {plan.highlighted ? (
        <span className="absolute -top-[17px] left-6 rounded-full bg-salvia-texto px-[18px] py-2 text-[13px] font-semibold tracking-[0.04em] whitespace-nowrap text-blanco md:left-1/2 md:-translate-x-1/2">
          {SERVICES.recommended}
        </span>
      ) : null}
      <div className="flex flex-col gap-2.5">
        <span aria-hidden className={cn("flex h-16 w-14 items-center justify-center rounded-[999px_999px_10px_10px] text-[26px]", TONE[plan.tone])}>
          {plan.emoji}
        </span>
        <h3 className="font-serif text-4xl">{plan.name}</h3>
        <p className="text-base leading-normal text-tinta-suave">{plan.description}</p>
      </div>
      <p className="flex min-h-12 items-baseline gap-2">
        {price === null ? (
          <span className="font-serif text-[32px] leading-tight">{plan.customPriceLabel}</span>
        ) : (
          <>
            {plan.from ? <span className="text-sm text-tinta-suave">desde</span> : null}
            <span className="font-serif text-5xl leading-none">
              {price} {CURRENCY}
            </span>
          </>
        )}
      </p>
      <div className="flex grow flex-col gap-3.5">
        <p className="text-sm font-semibold">{plan.featuresTitle}:</p>
        <ul className="flex flex-col gap-3 text-base leading-snug">
          {plan.features.map((f) => (
            <li key={f} className="flex gap-3">
              {/^\p{Extended_Pictographic}/u.test(f) ? null : <Icon name="check" strokeWidth={2} className="mt-px shrink-0 text-salvia-texto" />}
              {f}
            </li>
          ))}
        </ul>
      </div>
      <PlanCta ref={ctaRef} planId={plan.id} className={cn("w-full text-base", emphasized ? "btn-primary" : "btn-outline")}>
        {plan.cta}
      </PlanCta>
    </div>
  );
}

export function Services() {
  const initial = Math.max(0, PLANS.findIndex((p) => p.highlighted));
  const [active, setActive] = useState(initial);
  const [selected, setSelected] = useState<string | null>(null);

  // Marca la tarjeta del servicio elegido (desde aquí o desde el formulario)
  useEffect(() => {
    const onChange = (e: Event) => setSelected((e as CustomEvent<string>).detail || null);
    window.addEventListener(SERVICE_CHANGED_EVENT, onChange);
    return () => window.removeEventListener(SERVICE_CHANGED_EVENT, onChange);
  }, []);

  return (
    <section id="servicios" aria-labelledby="servicios-title" className="section-y bg-lino">
      <div className="container-page flex flex-col gap-10 md:gap-16">
        <Reveal className="flex flex-col gap-4 md:items-center md:text-center">
          <p className="eyebrow">{SERVICES.eyebrow}</p>
          <h2 id="servicios-title" className="h2">
            <Rich text={SERVICES.title} />
          </h2>
          <p className="hidden max-w-[560px] text-[17px] leading-relaxed text-tinta-suave md:block">{SERVICES.subtitle}</p>
        </Reveal>

        {/* Móvil: selector segmentado + una tarjeta */}
        <div className="md:hidden">
          <div role="tablist" aria-label="Servicios" className="flex rounded-full bg-arena/60 p-1.5">
            {PLANS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                id={`tab-${p.id}`}
                aria-selected={active === i}
                aria-controls={`panel-${p.id}`}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") setActive((active + 1) % PLANS.length);
                  if (e.key === "ArrowLeft") setActive((active - 1 + PLANS.length) % PLANS.length);
                }}
                tabIndex={active === i ? 0 : -1}
                className={cn(
                  "min-h-11 flex-1 rounded-full px-1 text-[13px] leading-tight font-semibold transition-colors sm:text-[15px]",
                  active === i ? "bg-blanco text-tinta shadow-(--shadow-sm)" : "text-tinta-suave",
                )}
              >
                {p.name}
              </button>
            ))}
          </div>
          <div id={`panel-${PLANS[active].id}`} role="tabpanel" aria-labelledby={`tab-${PLANS[active].id}`} className="mt-8">
            <PlanCard plan={PLANS[active]} selected={selected === PLANS[active].id} anySelected={selected !== null} />
          </div>
        </div>

        {/* Escritorio: tres tarjetas */}
        <ul className="hidden items-stretch gap-6 pt-4 md:grid md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal as="li" key={plan.id} delay={i * 0.08}>
              <PlanCard plan={plan} selected={selected === plan.id} anySelected={selected !== null} />
            </Reveal>
          ))}
        </ul>

        <p className="text-center text-[15px] text-tinta-suave">{SERVICES.footnote}</p>
      </div>
    </section>
  );
}
