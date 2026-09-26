import { INSTAGRAM } from "@/content/home";
import { SITE } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { LogoMark } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { Rich } from "@/components/ui/Rich";

export function Instagram() {
  return (
    <section aria-labelledby="instagram-title" className="container-page py-20 md:py-28">
      <Reveal className="flex flex-col items-center gap-6 text-center">
        <LogoMark className="h-16 w-auto" />
        <h2 id="instagram-title" className="h2">
          <Rich text={INSTAGRAM.title} emClassName="text-terracota" />
        </h2>
        <p className="max-w-[480px] text-[17px] leading-relaxed text-tinta-suave">{INSTAGRAM.text}</p>
        <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className="btn-outline">
          <Icon name="instagram" size={20} />
          {SITE.instagram.handle}
        </a>
      </Reveal>
    </section>
  );
}
