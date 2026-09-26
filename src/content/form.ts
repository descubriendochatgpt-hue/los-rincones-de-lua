/**
 * Opciones y textos del formulario de 4 pasos.
 * Si cambias los `value`, los leads antiguos guardados seguirán con el valor anterior.
 */
export const CONTACT_OPTIONS = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "llamada", label: "Llamada" },
  { value: "email", label: "Email" },
] as const;

export const CHILD_AGE_OPTIONS = [
  { value: "no-nacido", label: "Aún no ha nacido" },
  { value: "0-2", label: "0–2 años" },
  { value: "3-5", label: "3–5 años" },
  { value: "6-8", label: "6–8 años" },
  { value: "9-12", label: "9–12 años" },
  { value: "varios", label: "Varios peques" },
] as const;

export const SPACE_OPTIONS = [
  { value: "habitacion", label: "Habitación completa" },
  { value: "lectura", label: "Rincón de lectura" },
  { value: "creativo", label: "Rincón creativo" },
  { value: "juego", label: "Zona de juego" },
  { value: "cama", label: "Zona de cama" },
  { value: "almacenamiento", label: "Zona de almacenamiento" },
  { value: "otro", label: "Otro" },
] as const;

// Los tres primeros coinciden con los servicios de src/content/pricing.ts
export const SERVICE_OPTIONS = [
  { value: "diseno", label: "Diseño" },
  { value: "diseno-transformacion", label: "Diseño + transformación" },
  { value: "rincon-especial", label: "Un rincón especial" },
  { value: "no-lo-se", label: "No lo tengo claro, asesórame" },
] as const;

export const BUDGET_OPTIONS = [
  { value: "no-lo-se", label: "Aún no lo sé" },
  { value: "<500", label: "Menos de 500 €" },
  { value: "500-1500", label: "500 – 1.500 €" },
  { value: "1500-3000", label: "1.500 – 3.000 €" },
  { value: "3000-6000", label: "3.000 – 6.000 €" },
  { value: ">6000", label: "Más de 6.000 €" },
] as const;

export const PHOTO_RULES = {
  min: 2,
  max: 8,
  maxSizeMB: 10,
  // Tipos aceptados. HEIC/HEIF son las fotos de iPhone.
  accept: {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "image/heic": [".heic"],
    "image/heif": [".heif"],
  } as Record<string, string[]>,
};

export const FORM_STEPS = [
  { label: "Vosotros", title: "Primero, ¿quiénes sois?", icon: "people", tone: "salvia" },
  { label: "El espacio", title: "Háblame del rincón", icon: "star", tone: "mostaza" },
  { label: "Detalles", title: "Medidas y presupuesto", icon: "ruler", tone: "azul" },
  { label: "Fotos", title: "Unas fotos y listo", icon: "camera", tone: "terracota", note: "el último" },
] as const;

export const FORM_TEXT = {
  next: "Siguiente",
  back: "Atrás",
  submit: "Enviar solicitud",
  sending: "Enviando…",
  autosave: "Guardamos tu avance automáticamente",
  roomHint: "Medidas aproximadas. ¿No las tienes? Déjalo en blanco: con las fotos podemos estimarlas.",
  locationHint: "Para saber si cubrimos tu zona si hay reforma.",
  photosDrop: "Arrastra aquí tus fotos o",
  photosPick: "elígelas",
  photosFormats: `De ${PHOTO_RULES.min} a ${PHOTO_RULES.max} fotos · JPG, PNG o HEIC · máx. ${PHOTO_RULES.maxSizeMB} MB · también desde el móvil`,
  photosHelp: "Sube fotos desde varios ángulos para que podamos darte un diseño más preciso.",
  photoTips: ["Una desde cada esquina", "Con luz de día", "Tal cual está, sin recoger"],
  privacyBefore: "Acepto la",
  privacyLink: "política de privacidad",
  privacyAfter: ". Usaré tus fotos y datos solo para preparar tu propuesta.",
  success: {
    title: "¡Recibido!",
    text: "Revisaré todo con calma y te escribiré en menos de 24 horas para hablar de tu idea. Mientras, puedes ir pensando en un nombre para su nuevo rincón favorito. 🌙",
    back: "Volver al inicio",
  },
  errors: {
    network: "No hemos podido conectar. Revisa tu conexión y vuelve a intentarlo: tus datos siguen aquí.",
    server: "Algo ha fallado al enviar la solicitud. Inténtalo de nuevo en unos minutos o escríbenos directamente.",
    uploading: "Espera a que terminen de subirse las fotos.",
  },
};
