"use client";

import { useFormContext } from "react-hook-form";
import { CONTACT_OPTIONS } from "@/content/form";
import type { LeadInput } from "@/lib/lead-schema";
import { ChipGroup } from "./ChipGroup";
import { describedBy, Field } from "./Field";

export function StepYou() {
  const {
    register,
    watch,
    formState: { errors: e },
  } = useFormContext<LeadInput>();
  const phoneOptional = watch("contact.preference") === "email";

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Nombre y apellidos" error={e.name?.message}>
          <input className="field" autoComplete="name" placeholder="Laura García" {...describedBy("name", { error: e.name?.message })} {...register("name")} />
        </Field>
        <Field id="contact.phone" label="Teléfono" optional={phoneOptional} error={e.contact?.phone?.message}>
          <input
            className="field"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="600 000 000"
            {...describedBy("contact.phone", { error: e.contact?.phone?.message })}
            {...register("contact.phone")}
          />
        </Field>
      </div>
      <Field id="email" label="Email" error={e.email?.message}>
        <input className="field" type="email" autoComplete="email" placeholder="tu@email.com" {...describedBy("email", { error: e.email?.message })} {...register("email")} />
      </Field>
      <ChipGroup name="contact.preference" legend="¿Cómo prefieres que te contactemos?" options={CONTACT_OPTIONS} />
    </div>
  );
}
