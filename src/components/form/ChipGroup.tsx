"use client";

import { useFormContext, type Path } from "react-hook-form";
import type { LeadInput } from "@/lib/lead-schema";
import { cn } from "@/lib/cn";
import { FieldError } from "./Field";

/** Grupo de opciones tipo chip (radios nativos: accesibles con teclado y lectores de pantalla). */
export function ChipGroup({
  name,
  legend,
  options,
  optional,
  error,
  grid,
}: {
  name: Path<LeadInput>;
  legend: string;
  options: readonly { value: string; label: string }[];
  optional?: boolean;
  error?: string;
  grid?: boolean;
}) {
  const { register } = useFormContext<LeadInput>();
  const errorId = `${name}-error`;
  return (
    <fieldset aria-describedby={error ? errorId : undefined} className="flex flex-col gap-3">
      <legend className="mb-3 text-sm font-semibold">
        {legend}
        {optional ? <span className="font-normal text-tinta-suave"> (opcional)</span> : null}
      </legend>
      <div className={cn(grid ? "grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap" : "flex flex-wrap gap-2.5")}>
        {options.map((o) => (
          <label key={o.value} className="relative">
            <input type="radio" value={o.value} className="peer sr-only" {...register(name)} />
            <span
              className={cn(
                "chip w-full justify-center",
                "peer-checked:border-terracota peer-checked:bg-terracota peer-checked:text-blanco",
                "peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-terracota",
              )}
            >
              {o.label}
            </span>
          </label>
        ))}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}
