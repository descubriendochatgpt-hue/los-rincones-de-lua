import Link from "next/link";
import { SITE } from "@/content/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const { contact } = SITE;
  return (
    <footer className="bg-tinta text-arena">
      <div className="container-page flex flex-col gap-10 py-14 md:flex-row md:justify-between">
        <div className="flex flex-col gap-2.5">
          <Logo inverted />
          <p className="text-sm">{SITE.tagline}</p>
          <p className="text-sm">{contact.serviceArea}</p>
        </div>

        <div className="grid gap-8 text-sm sm:grid-cols-2 md:gap-16">
          <div>
            <h2 className="mb-3 font-semibold text-blanco">Contacto</h2>
            <ul className="space-y-2">
              <li><a className="text-arena underline underline-offset-4 hover:text-blanco" href={`mailto:${contact.email}`}>{contact.email}</a></li>
              <li><a className="text-arena underline underline-offset-4 hover:text-blanco" href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a></li>
              <li><a className="text-arena underline underline-offset-4 hover:text-blanco" href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li>{contact.hours}</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 font-semibold text-blanco">Síguenos</h2>
            <ul className="space-y-2">
              {SITE.social.map((s) => (
                <li key={s.href}>
                  <a className="text-arena underline underline-offset-4 hover:text-blanco" href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.legalName}</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            <li><Link className="text-arena underline underline-offset-4 hover:text-blanco" href="/aviso-legal">Aviso legal</Link></li>
            <li><Link className="text-arena underline underline-offset-4 hover:text-blanco" href="/privacidad">Privacidad</Link></li>
            <li><Link className="text-arena underline underline-offset-4 hover:text-blanco" href="/cookies">Cookies</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
