/**
 * Servicios. Cambia textos y precios aquí.
 * `price`: número en euros, `null` para mostrar "X" mientras no lo tengas decidido,
 *          o "custom" para mostrar `customPriceLabel` (p. ej. "Presupuesto personalizado").
 * `from: true` muestra "desde" delante del precio.
 * `id` debe coincidir con una opción de servicio del formulario (src/content/form.ts).
 */
export type Plan = {
  id: "diseno" | "diseno-transformacion" | "rincon-especial";
  emoji: string;
  name: string;
  description: string;
  price: number | null | "custom";
  from?: boolean;
  customPriceLabel?: string;
  tone: "azul" | "salvia" | "mostaza";
  featuresTitle: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

export const CURRENCY = "€";

export const PLANS: Plan[] = [
  {
    id: "diseno",
    emoji: "🌿",
    name: "Diseño",
    description: "Para familias que quieren hacerlo ellas mismas.",
    price: 200,
    from: true,
    tone: "salvia",
    featuresTitle: "Incluye",
    features: ["Distribución", "Paleta de colores", "Moodboard", "Mobiliario", "Decoración", "Lista de compras"],
    cta: "Quiero el diseño",
  },
  {
    id: "diseno-transformacion",
    emoji: "🧸",
    name: "Diseño + transformación",
    description: "Para quien quiere que nos encarguemos de todo.",
    price: "custom",
    customPriceLabel: "Presupuesto personalizado",
    tone: "mostaza",
    featuresTitle: "Incluye",
    features: ["Diseño", "Compra y selección", "Pintura", "Montaje", "Decoración", "Organización final"],
    cta: "Quiero transformarla",
  },
  {
    id: "rincon-especial",
    emoji: "🌙",
    name: "Un rincón especial",
    description: "No necesariamente una habitación entera. Una forma bonita de empezar.",
    price: 300,
    from: true,
    tone: "azul",
    featuresTitle: "Puede ser",
    features: ["📚 Rincón de lectura", "🎨 Rincón creativo", "🧸 Zona de juego", "🛏️ Zona de cama", "📦 Zona de almacenamiento"],
    cta: "Quiero mi rincón",
  },
];
