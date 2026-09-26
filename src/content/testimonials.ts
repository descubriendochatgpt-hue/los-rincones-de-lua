/**
 * Testimonios. `initial` es la letra del avatar (si no pones `photo`).
 * `rating` de 1 a 5 (pon `undefined` para no mostrar estrellas).
 * `tone` elige el color del avatar: salvia, mostaza o azul.
 */
export type Testimonial = {
  quote: string;
  name: string;
  detail: string; // p. ej. "Mamá de Lucía, 2 años · Valencia"
  initial: string;
  photo?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  tone: "salvia" | "mostaza" | "azul";
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "[Testimonio real: el problema que tenían, cómo fue el proceso y cómo se siente ahora su hijo en la habitación.]",
    name: "[Nombre]",
    detail: "Mamá de [Nombre], 2 años · [Ciudad]",
    initial: "A",
    rating: 5,
    tone: "salvia",
  },
  {
    quote: "[Testimonio real centrado en el ahorro de tiempo: qué no tuvieron que hacer ellos.]",
    name: "[Nombre]",
    detail: "Papá de [Nombre], 7 años · [Ciudad]",
    initial: "B",
    rating: 5,
    tone: "mostaza",
  },
  {
    quote: "[Testimonio real sobre el presupuesto: que se ajustó a lo acordado y sin sorpresas.]",
    name: "[Nombre]",
    detail: "Mamá de [Nombre], 11 años · [Ciudad]",
    initial: "C",
    rating: 5,
    tone: "azul",
  },
];
