"use client";

import { useFormContext } from "react-hook-form";
import { BUDGET_OPTIONS, FORM_TEXT } from "@/content/form";
import type { LeadInput } from "@/lib/lead-schema";
import { describedBy, Field } from "./Field";

const DIMENSIONS = [
  { key: "length", label: "Largo (m)", placeholder: "3,20" },
  { key: "width", label: "Ancho (m)", placeholder: "2,80" },
  { key: "height", label: "Alto (m)", placeholder: "2,50" },
] as const;

export function StepRoom() {
  const {
    register,
    formState: { errors: e },
  } = useFormContext<LeadInput>();

  return (
    <div className="flex flex-col gap-6">
      <fieldset className="flex flex-col gap-3">
        <legend className="sr-only">Medidas aproximadas del espacio</legend>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {DIMENSIONS.map((d) => {
            const err = e.room?.[d.key]?.message;
            return (
              <Field key={d.key} id={`room.${d.key}`} label={d.label} error={err}>
                <input
                  className="field"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder={d.placeholder}
                  {...describedBy(`room.${d.key}`, { hint: FORM_TEXT.roomHint, error: err })}
                  {...register(`room.${d.key}`)}
                />
              </Field>
            );
          })}
        </div>
        <p id="room.length-hint" className="text-sm leading-normal text-tinta-suave">
          {FORM_TEXT.roomHint}
        </p>
      </fieldset>

      <Field id="budget" label="Presupuesto aproximado" error={e.budget?.message}>
        <select className="field" {...describedBy("budget", { error: e.budget?.message })} {...register("budget")}>
          {BUDGET_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4">
        <Field id="postalCode" label="Código postal" error={e.postalCode?.message}>
          <input
            className="field"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder="46001"
            {...describedBy("postalCode", { hint: FORM_TEXT.locationHint, error: e.postalCode?.message })}
            {...register("postalCode")}
          />
        </Field>
        <Field id="town" label="Localidad" error={e.town?.message}>
          <input className="field" autoComplete="address-level2" placeholder="Valencia" {...describedBy("town", { error: e.town?.message })} {...register("town")} />
        </Field>
        <p id="postalCode-hint" className="col-span-2 -mt-2 text-sm text-tinta-suave">
          {FORM_TEXT.locationHint}
        </p>
      </div>
    </div>
  );
}
