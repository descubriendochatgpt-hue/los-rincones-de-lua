"use client";

import { SELECT_PLAN_EVENT } from "@/lib/events";

/** Enlace al formulario que además preselecciona el servicio elegido. */
export function PlanCta({
  planId,
  className,
  children,
  ref,
}: {
  planId: string;
  className?: string;
  children: React.ReactNode;
  ref?: React.Ref<HTMLAnchorElement>;
}) {
  return (
    <a ref={ref} href="#contacto" className={className} onClick={() => window.dispatchEvent(new CustomEvent(SELECT_PLAN_EVENT, { detail: planId }))}>
      {children}
    </a>
  );
}
