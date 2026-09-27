/**
 * Logotipo aproximado al de Instagram: arco terracota con luna y estrellas,
 * "LOS RINCONES" en versalitas salvia y "de Lúa" en caligrafía.
 * Si tienes el logo en SVG/PNG, sustitúyelo aquí por <Image src="/logo.svg" … />.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 48" className={className} aria-hidden>
      <path d="M5 45V19a15 15 0 0 1 30 0v26z" fill="none" stroke="#a9543a" strokeWidth="3.2" strokeLinejoin="round" />
      <path d="M22.5 17.5a6.5 6.5 0 1 0 4.8 10.4 5.4 5.4 0 0 1-4.8-10.4z" fill="#b8927a" />
      <circle cx="28" cy="15" r="0.9" fill="#a9543a" />
      <circle cx="13" cy="21" r="0.8" fill="#a9543a" />
      <circle cx="29.5" cy="33.5" r="0.8" fill="#a9543a" />
      <circle cx="14.5" cy="36" r="0.8" fill="#a9543a" />
    </svg>
  );
}

export function Logo({ className = "", inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-10 w-auto shrink-0 md:h-11" />
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-[19px] tracking-[0.06em] uppercase md:text-[21px] ${inverted ? "text-blanco" : "text-salvia-texto"}`}>
          Los Rincones
        </span>
        <span className={`-mt-0.5 self-center font-script text-[22px] md:text-[24px] ${inverted ? "text-arena" : "text-verde"}`}>de Lúa</span>
      </span>
    </span>
  );
}
