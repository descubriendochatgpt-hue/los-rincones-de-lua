import { CONTACT_SECTION } from "@/content/home";
import { LeadForm } from "@/components/form/LeadForm";
import { ContactLinks } from "@/components/ui/ContactLinks";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";

const TRUST_ICON: Record<string, IconName> = { lock: "lock", check: "check-circle" };

export function ContactSection() {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="section-y bg-lino">
      <div className="container-page grid items-start gap-10 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-20">
        <Reveal className="flex flex-col gap-6 lg:pt-6">
          <p className="eyebrow">{CONTACT_SECTION.eyebrow}</p>
          <h2 id="contacto-title" className="h2">
            <Rich text={CONTACT_SECTION.title} />
          </h2>
          <p className="text-[17px] leading-relaxed text-tinta-suave">{CONTACT_SECTION.intro}</p>
          <ul className="hidden flex-col gap-3 pt-2 lg:flex">
            {CONTACT_SECTION.trust.map((t) => (
              <li key={t.text} className="flex items-center gap-3 rounded-xl bg-salvia-tinte px-4 py-3.5 text-[15px] font-medium text-salvia-texto">
                <Icon name={TRUST_ICON[t.icon]} className="shrink-0" />
                {t.text}
              </li>
            ))}
          </ul>
          <div className="hidden flex-col gap-3 pt-2 lg:flex">
            <p className="text-sm font-semibold">{CONTACT_SECTION.altContact}</p>
            <ContactLinks />
          </div>
        </Reveal>

        <div>
          <LeadForm />
          <div className="mt-6 flex flex-col gap-4 lg:hidden">
            <p className="flex items-center gap-3 text-[15px] text-salvia-texto">
              <Icon name="lock" className="shrink-0" />
              {CONTACT_SECTION.trust[0].text}
            </p>
            <p className="text-sm font-semibold">{CONTACT_SECTION.altContact}</p>
            <ContactLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
