import { SITE } from "@/content/site";
import { Icon } from "./Icon";

/** Botones de contacto directo: WhatsApp y email. */
export function ContactLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2.5 ${className}`}>
      <a href={`https://wa.me/${SITE.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="chip gap-2 text-tinta">
        <Icon name="whatsapp" size={18} /> WhatsApp
      </a>
      <a href={`mailto:${SITE.contact.email}`} className="chip gap-2 text-tinta">
        <Icon name="mail" size={18} /> Email
      </a>
    </div>
  );
}
