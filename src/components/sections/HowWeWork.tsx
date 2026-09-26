import { HOW_WE_WORK } from "@/content/home";
import { ContactLinks } from "@/components/ui/ContactLinks";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";

export function HowWeWork() {
  return (
    <section id="como-trabajamos" aria-labelledby="como-trabajamos-title" className="section-y">
      <div className="container-page grid gap-12 lg:grid-cols-[400px_1fr] lg:gap-20">
        <Reveal className="flex flex-col gap-4 lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow">{HOW_WE_WORK.eyebrow}</p>
          <h2 id="como-trabajamos-title" className="h2">
            <Rich text={HOW_WE_WORK.title} />
          </h2>
          <p className="text-[17px] leading-relaxed text-tinta-suave">{HOW_WE_WORK.intro}</p>
        </Reveal>

        <ol className="relative flex flex-col gap-4">
          <span aria-hidden className="absolute top-8 bottom-8 left-[39px] hidden w-px border-l-2 border-dashed border-arena sm:block" />
          {HOW_WE_WORK.steps.map((step, i) => (
            <Reveal as="li" key={step.number} delay={i * 0.08} className="relative flex gap-5 rounded-2xl bg-blanco p-6 sm:gap-7 sm:p-7">
              <span aria-hidden className="relative z-[1] w-10 shrink-0 font-serif text-[40px] leading-none text-terracota sm:w-auto sm:min-w-11 sm:text-[48px]">
                {step.number}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-[20px] font-semibold">
                  <span className="sr-only">Paso {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed text-tinta-suave">{step.text}</p>
                {"contact" in step && step.contact ? (
                  <div className="mt-2 flex flex-wrap gap-2.5">
                    <a href="#contacto" className="btn-primary h-11 px-5 text-[15px]">
                      Ir al formulario <Icon name="arrow-right" size={16} strokeWidth={1.8} />
                    </a>
                    <ContactLinks />
                  </div>
                ) : null}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
