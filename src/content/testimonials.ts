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
    quote:
      "Pasar a Lara a su propia habitación nos daba mucho vértigo porque la habitación era un caos y no resultaba acogedora. El proceso de rediseño fue superfluido; escucharon exactamente lo que buscábamos y optimizaron el espacio de forma increíble. Ahora Lara adora su cuarto: entra sola a jugar, se siente segura y duerme toda la noche en su camita nueva.",
    name: "Laura",
    detail: "Mamá de Laura, 2 años · Oviedo",
    initial: "L",
    rating: 5,
    tone: "salvia",
  },
  {
    quote:
      "Teníamos la habitación llena de juguetes y muebles poco funcionales, lo que hacía que Pablo se agobiara rápido y no quisiera estar allí. Desde el primer momento nos orientaron con ideas facilísimas de mantener. Tras la transformación, el cambio ha sido radical: la habitación transmite paz y Pablo se siente tan cómodo y autónomo que pasa horas jugando feliz en su propio espacio.",
    name: "Elena",
    detail: "Mamá de Pablo, 5 años · Gijón",
    initial: "E",
    rating: 5,
    tone: "mostaza",
  },
  {
    quote:
      "No sabíamos cómo adaptar el espacio para la etapa de los 9+ años sin cargar la estancia. El acompañamiento y el diseño fueron una maravilla, cuidando cada detalle y material. Hoy en día es el rincón favorito de la casa; Mateo siente la habitación como su refugio y nosotros estamos felices de verlo disfrutar tanto en un entorno seguro y bonito.",
    name: "Olaya",
    detail: "Mamá de Mateo, 9 años · Oviedo",
    initial: "O",
    rating: 5,
    tone: "azul",
  },
];
