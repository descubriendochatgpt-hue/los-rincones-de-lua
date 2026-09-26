"use client";

import { useFormContext } from "react-hook-form";
import { CHILD_AGE_OPTIONS, SERVICE_OPTIONS, SPACE_OPTIONS } from "@/content/form";
import type { LeadInput } from "@/lib/lead-schema";
import { ChipGroup } from "./ChipGroup";
import { describedBy, Field } from "./Field";

export function StepSpace() {
  const {
    register,
    formState: { errors: e },
  } = useFormContext<LeadInput>();

  return (
    <div className="flex flex-col gap-6">
      <ChipGroup name="childAge" legend="Edad del peque" options={CHILD_AGE_OPTIONS} error={e.childAge?.message} grid />
      <ChipGroup name="spaceType" legend="Tipo de espacio" options={SPACE_OPTIONS} error={e.spaceType?.message} />
      <ChipGroup name="service" legend="¿Qué servicio te interesa?" options={SERVICE_OPTIONS} error={e.service?.message} />
      <Field id="message" label="¿Qué te gustaría conseguir?" optional error={e.message?.message}>
        <textarea
          className="field h-auto min-h-[110px] resize-y py-3"
          rows={4}
          placeholder="Que tenga su propio rincón para leer, aprovechar mejor el espacio, que crezca con él…"
          {...describedBy("message", { error: e.message?.message })}
          {...register("message")}
        />
      </Field>
    </div>
  );
}
