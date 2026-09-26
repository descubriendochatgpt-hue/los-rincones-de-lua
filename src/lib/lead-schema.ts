import { z } from "zod";
import {
  BUDGET_OPTIONS,
  CHILD_AGE_OPTIONS,
  CONTACT_OPTIONS,
  PHOTO_RULES,
  SERVICE_OPTIONS,
  SPACE_OPTIONS,
} from "@/content/form";

const values = <T extends readonly { value: string }[]>(opts: T) =>
  opts.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

/** Normaliza un teléfono español: quita espacios, guiones, puntos y el prefijo +34 / 0034. */
export function normalizePhone(raw: string) {
  return raw.replace(/[\s\-.()]/g, "").replace(/^(\+34|0034)/, "");
}
const isSpanishPhone = (v: string) => /^[6789]\d{8}$/.test(normalizePhone(v));

/** Metros opcionales: vacío o número tipo 3,20 */
const meters = z
  .string()
  .trim()
  .refine((v) => v === "" || (/^\d{1,2}([.,]\d{1,2})?$/.test(v) && Number(v.replace(",", ".")) >= 0.5), "Introduce metros, p. ej. 3,20");

export const photoSchema = z.object({
  url: z.url(),
  pathname: z.string().min(1),
  name: z.string().max(200),
  size: z.number().int().nonnegative(),
  contentType: z.string(),
});
export type UploadedPhoto = z.infer<typeof photoSchema>;

export const leadSchema = z.object({
  // Paso 1 · Vosotros
  name: z.string().trim().min(3, "Escribe tu nombre y apellidos").max(120),
  email: z.email("Email no válido").max(160),
  // Teléfono obligatorio salvo que prefieran que les contactemos por email
  contact: z
    .object({
      phone: z.string().trim().max(30),
      preference: z.enum(values(CONTACT_OPTIONS)),
    })
    .superRefine((c, ctx) => {
      if (c.phone === "" && c.preference !== "email")
        ctx.addIssue({ code: "custom", path: ["phone"], message: "Necesitamos tu teléfono para llamarte o escribirte por WhatsApp" });
      else if (c.phone !== "" && !isSpanishPhone(c.phone))
        ctx.addIssue({ code: "custom", path: ["phone"], message: "Teléfono no válido (ej. 612 345 678)" });
    }),
  // Paso 2 · El espacio
  childAge: z.enum(values(CHILD_AGE_OPTIONS), { error: "Elige la edad" }),
  spaceType: z.enum(values(SPACE_OPTIONS), { error: "Elige el tipo de espacio" }),
  service: z.enum(values(SERVICE_OPTIONS), { error: "Elige un servicio" }),
  message: z.string().trim().max(2000, "Máximo 2000 caracteres"), // ¿Qué te gustaría conseguir?
  // Paso 3 · Detalles
  room: z.object({ length: meters, width: meters, height: meters }),
  budget: z.enum(values(BUDGET_OPTIONS)),
  postalCode: z
    .string()
    .trim()
    .regex(/^(0[1-9]|[1-4]\d|5[0-2])\d{3}$/, "Código postal no válido"),
  town: z.string().trim().min(2, "Indica tu localidad").max(120),
  // Paso 4 · Fotos
  photos: z
    .array(photoSchema)
    .min(PHOTO_RULES.min, `Sube al menos ${PHOTO_RULES.min} fotos`)
    .max(PHOTO_RULES.max, `Máximo ${PHOTO_RULES.max} fotos`),
  privacy: z.boolean().refine((v) => v, "Debes aceptar la política de privacidad"),
  // Anti-spam: campo oculto que las personas dejan vacío
  website: z.string().max(0).optional(),
});

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;

/** Campos que se validan en cada paso del formulario. */
export const STEP_FIELDS = [
  ["name", "email", "contact"],
  ["childAge", "spaceType", "service", "message"],
  ["room", "budget", "postalCode", "town"],
  ["photos", "privacy"],
] as const satisfies readonly (readonly (keyof LeadInput)[])[];

export const labelOf = (opts: readonly { value: string; label: string }[], value: string) =>
  opts.find((o) => o.value === value)?.label ?? value;
