import Image from "next/image";
import { ABOUT } from "@/content/home";
import { LogoMark } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";

export function About() {
  return (
    <section id="sobre-lua" aria-labelledby="sobre-lua-title" className="section-y bg-lino">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <Reveal className="relative mx-auto w-full max-w-[440px]">
          <div aria-hidden className="absolute -bottom-6 -left-6 h-40 w-40 rounded-full bg-mostaza-tinte" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[999px_999px_24px_24px] bg-salvia-tinte shadow-[0_28px_56px_-28px_rgb(46_42_38/0.3)]">
            <Image src={ABOUT.image.src} alt={ABOUT.image.alt} fill sizes="(min-width: 1024px) 440px, 90vw" className="object-cover" />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-6">
          <p className="eyebrow">{ABOUT.eyebrow}</p>
          <h2 id="sobre-lua-title" className="h2">
            <Rich text={ABOUT.greeting} emClassName="text-terracota" />
          </h2>
          {ABOUT.paragraphs.map((p) => (
            <p key={p} className="text-[17px] leading-relaxed text-tinta-suave md:text-[19px]">
              {p}
            </p>
          ))}
          <blockquote className="border-l-2 border-terracota pl-5 font-serif text-2xl leading-snug italic md:text-[28px]">{ABOUT.question}</blockquote>
          <p className="flex items-center gap-3">
            <LogoMark className="h-9 w-auto" />
            <span className="font-script text-4xl">{ABOUT.signature}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
