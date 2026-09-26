import Image from "next/image";
import { LOW_BUDGET } from "@/content/home";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";

export function LowBudget() {
  return (
    <section id="poco-presupuesto" aria-labelledby="poco-presupuesto-title" className="section-y">
      <div className="container-page flex flex-col gap-12 md:gap-16">
        <Reveal className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="flex flex-col gap-4">
            <p className="eyebrow">{LOW_BUDGET.eyebrow}</p>
            <h2 id="poco-presupuesto-title" className="h2 max-w-[760px]">
              <Rich text={LOW_BUDGET.title} emClassName="text-terracota" />
            </h2>
          </div>
          <p className="max-w-[400px] text-[17px] leading-relaxed text-tinta-suave">{LOW_BUDGET.text}</p>
        </Reveal>

        <ul className="grid gap-10 lg:grid-cols-2 lg:gap-8">
          {LOW_BUDGET.examples.map((ex, i) => (
            <Reveal as="li" key={ex.after.src} delay={i * 0.08} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4">
              {[ex.before, null, ex.after].map((img, j) =>
                img ? (
                  <figure key={img.src} className="flex flex-col gap-3">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[999px_999px_16px_16px] bg-lino">
                      <Image src={img.src} alt={img.label} fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
                      <span
                        className={`absolute top-auto bottom-3 left-3 rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase ${
                          j === 0 ? "bg-tinta/70 text-blanco" : "bg-blanco/90 text-tinta"
                        }`}
                      >
                        {j === 0 ? "Antes" : "Después"}
                      </span>
                    </div>
                    <figcaption className="text-center text-sm text-tinta-suave">{img.label}</figcaption>
                  </figure>
                ) : (
                  <span key="arrow" aria-hidden className="-mt-8 flex h-10 w-10 items-center justify-center rounded-full bg-terracota-tinte text-terracota">
                    <Icon name="arrow-right" size={18} strokeWidth={1.8} />
                  </span>
                ),
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
