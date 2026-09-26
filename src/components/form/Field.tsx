import { cn } from "@/lib/cn";

/** Etiqueta + ayuda + error enlazados con aria-describedby. */
export function Field({
  id,
  label,
  hint,
  error,
  optional,
  className,
  children,
}: {
  id: string;
  label: React.ReactNode;
  hint?: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {optional ? <span className="font-normal text-tinta-suave"> (opcional)</span> : null}
      </label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="text-sm leading-normal text-tinta-suave">
          {hint}
        </p>
      ) : null}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-sm font-medium text-error">
      {message}
    </p>
  );
}

/** Props ARIA para un input dentro de <Field>. */
export const describedBy = (id: string, { hint, error }: { hint?: string; error?: string }) => ({
  id,
  "aria-invalid": error ? true : undefined,
  "aria-describedby": [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined,
});
