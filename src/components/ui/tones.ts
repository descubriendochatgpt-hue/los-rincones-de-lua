/** Fondos y colores de texto de los acentos de apoyo (arcos, avatares, iconos). */
export const TONE = {
  salvia: "bg-salvia-tinte text-salvia-texto",
  mostaza: "bg-mostaza-tinte text-mostaza-texto",
  azul: "bg-azul-tinte text-azul-texto",
  terracota: "bg-terracota-tinte text-terracota",
} as const;
export type Tone = keyof typeof TONE;
