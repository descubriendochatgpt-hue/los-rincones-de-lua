"use client";

import { SELECT_PLAN_EVENT } from "@/lib/events";

/** Enlace al formulario que además preselecciona el servicio elegido. */
export function PlanCta({ planId, className, children }: { planId: string; className?: string; children: React.ReactNode }) {
  return (
    <a href="#contacto" className={className} onClick={() => window.dispatchEvent(new CustomEvent(SELECT_PLAN_EVENT, { detail: planId }))}>
      {children}
    </a>
  );
}
