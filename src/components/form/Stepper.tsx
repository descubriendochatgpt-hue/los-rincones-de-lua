import { FORM_STEPS } from "@/content/form";
import { cn } from "@/lib/cn";

/** Progreso: círculos numerados en escritorio, barras segmentadas en móvil. */
export function Stepper({ current }: { current: number }) {
  const total = FORM_STEPS.length;
  const pct = (current / (total - 1)) * 100;
  return (
    <div>
      {/* Móvil */}
      <div className="md:hidden">
        <div className="flex items-center justify-between text-[13px]">
          <span className="font-semibold">{FORM_STEPS[current].label}</span>
          <span className="text-tinta-suave">
            Paso {current + 1} de {total}
          </span>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-1.5" aria-hidden>
          {FORM_STEPS.map((s, i) => (
            <span key={s.label} className={cn("h-1 rounded-full transition-colors duration-500", i <= current ? "bg-terracota" : "bg-arena")} />
          ))}
        </div>
      </div>

      {/* Escritorio */}
      <div className="relative hidden h-[72px] md:block" aria-hidden>
        <div className="absolute top-[19px] right-5 left-5 h-[3px] overflow-hidden rounded bg-arena">
          <div className="h-full bg-terracota transition-[width] duration-500 ease-suave" style={{ width: `${pct}%` }} />
        </div>
        <ol className="relative flex justify-between">
          {FORM_STEPS.map((s, i) => (
            <li key={s.label} className="relative flex w-10 flex-col items-center">
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] text-[15px] font-semibold transition-colors duration-300",
                  i <= current ? "border-terracota bg-terracota text-blanco" : "border-arena bg-blanco text-tinta-suave",
                )}
              >
                {i < current ? "✓" : i + 1}
              </span>
              <span className={cn("absolute top-[50px] text-sm whitespace-nowrap", i === current ? "font-semibold text-tinta" : "font-medium text-tinta-suave")}>
                {s.label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div
        className="sr-only"
        role="progressbar"
        aria-label="Progreso del formulario"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current + 1}
        aria-valuetext={`Paso ${current + 1} de ${total}: ${FORM_STEPS[current].label}`}
      />
    </div>
  );
}
