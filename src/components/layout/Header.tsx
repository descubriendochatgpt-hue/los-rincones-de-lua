"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-300", scrolled || open ? "bg-crema/95 shadow-(--shadow-sm) backdrop-blur" : "bg-crema")}>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded-lg focus:bg-blanco focus:p-3">
        Saltar al contenido
      </a>
      <div className="container-page flex h-16 items-center justify-between md:h-24">
        <a href="#inicio" className="text-verde no-underline" aria-label={`${SITE.name}, ir al inicio`} onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-10 text-[15px] font-medium lg:flex">
          {SITE.nav.map((item) => (
            <a key={item.href} href={item.href} className="text-verde transition-colors hover:text-terracota">
              {item.label}
            </a>
          ))}
          <a href="#contacto" className="btn-primary h-12 px-6 text-[15px] shadow-none">
            {SITE.ctaLabel}
          </a>
        </nav>

        <button
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? "x" : "menu"} size={26} strokeWidth={1.6} />
        </button>
      </div>

      <nav id="menu-movil" aria-label="Menú móvil" hidden={!open} className="border-t border-arena lg:hidden">
        <ul className="container-page flex flex-col py-3">
          {SITE.nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="block py-3 font-serif text-2xl" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-3 pb-2">
            <a href="#contacto" className="btn-primary w-full" onClick={() => setOpen(false)}>
              {SITE.ctaLabel}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
