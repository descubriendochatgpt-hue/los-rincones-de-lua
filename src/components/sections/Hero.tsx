import Image from "next/image";
import { HERO } from "@/content/home";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";

const TRUST_ICON: Record<string, IconName> = { clock: "clock", check: "check-circle", lock: "lock", heart: "heart" };

export function Hero() {
  return (
    <section id="inicio" className="container-page grid items-center gap-12 pt-24 pb-[72px] md:pt-32 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:pt-36 xl:pb-32">
      <div className="flex flex-col gap-6 md:gap-8">
        <Reveal className="eyebrow">{HERO.eyebrow}</Reveal>
        <Reveal delay={0.08}>
          <h1 className="font-serif text-[46px] leading-[0.98] font-normal tracking-[-0.015em] text-balance sm:text-6xl xl:text-[84px]">
            <Rich text={HERO.title} emClassName="text-terracota" />
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="max-w-[540px] text-[17px] leading-relaxed text-tinta-suave md:text-[19px]">
            {HERO.subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.24} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <a href="#contacto" className="btn-primary h-[60px] px-[34px]">
            {HERO.primaryCta}
            <Icon name="arrow-right" size={18} strokeWidth={1.8} />
          </a>
          <a href="#proyectos" className="btn-outline h-[60px] px-[34px]">
            {HERO.secondaryCta}
          </a>
        </Reveal>
        <Reveal delay={0.32}>
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2 text-sm text-tinta-suave sm:justify-start sm:pt-2">
            {HERO.trust.map((t) => (
              <li key={t.text} className="flex items-center gap-2">
                <span className="hidden text-salvia-texto sm:inline">
                  <Icon name={TRUST_ICON[t.icon]} />
                </span>
                {t.text}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal delay={0.16} className="relative mx-auto aspect-[4/5] w-full max-w-[560px] lg:aspect-auto lg:h-[660px] lg:max-w-none">
        <div aria-hidden className="absolute -top-6 -right-4 hidden h-[220px] w-[220px] rounded-full bg-mostaza-tinte lg:-right-10 lg:block" />
        <div className="absolute inset-0 overflow-hidden rounded-[999px_999px_24px_24px] bg-lino shadow-[0_28px_56px_-28px_rgb(46_42_38/0.3)] lg:left-10">
          <Image src={HERO.image.src} alt={HERO.image.alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        </div>
        <div className="absolute bottom-14 left-0 hidden w-[260px] flex-col gap-1.5 rounded-2xl bg-blanco px-[22px] py-5 shadow-(--shadow-md) lg:flex">
          <p className="flex items-center gap-2 text-[15px] font-semibold">
            <span aria-hidden className="h-2 w-2 rounded-full bg-salvia" />
            {HERO.card.title}
          </p>
          <p className="text-sm leading-normal text-tinta-suave">{HERO.card.text}</p>
        </div>
      </Reveal>
    </section>
  );
}
