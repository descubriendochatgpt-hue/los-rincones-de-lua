/**
 * Proyectos de "Nuestros proyectos". Añade o quita elementos del array.
 * Imágenes en /public/images/proyectos:
 *  - antes y después: proporción 16:9, mismo encuadre (se comparan con el deslizador)
 *  - proceso: las que quieras (0 a 4), cualquier proporción
 */
export type Project = {
  number: string;
  title: string;
  story: string; // pequeña historia
  before: string;
  after: string;
  process: { src: string; alt: string }[];
  alt: string; // descripción breve de la habitación para lectores de pantalla
  facts: { budget: string; surface: string; whatWeDid: string[] };
  closing?: string; // frase final
};

export const PROJECTS: Project[] = [
  {
    number: "01",
    title: "La habitación de [nombre]",
    story:
      "Una habitación que necesitaba convertirse en un espacio propio para un niño de [X] años… [Cuenta aquí en 2-3 frases cómo era, qué necesitaba la familia y cómo lo resolvisteis.]",
    before: "/images/proyectos/proyecto-1-antes.jpg",
    after: "/images/proyectos/proyecto-1-despues.jpg",
    process: [
      { src: "/images/proyectos/proyecto-1-proceso-1.jpg", alt: "Proceso: pintando la pared" },
      { src: "/images/proyectos/proyecto-1-proceso-2.jpg", alt: "Proceso: montaje del mobiliario" },
      { src: "/images/proyectos/proyecto-1-proceso-3.jpg", alt: "Proceso: últimos detalles de decoración" },
    ],
    alt: "Habitación infantil con pared en verde salvia y ventana en arco",
    facts: { budget: "[X] €", surface: "[X] m²", whatWeDid: ["pintura", "distribución", "mobiliario", "decoración"] },
    closing: "El rincón que lo empezó todo. 🌙",
  },
  {
    number: "02",
    title: "La habitación de [nombre]",
    story:
      "Una habitación que necesitaba convertirse en un espacio propio para un niño de [X] años… [Cuenta aquí en 2-3 frases cómo era, qué necesitaba la familia y cómo lo resolvisteis.]",
    before: "/images/proyectos/proyecto-2-antes.jpg",
    after: "/images/proyectos/proyecto-2-despues.jpg",
    process: [
      { src: "/images/proyectos/proyecto-2-proceso-1.jpg", alt: "Proceso: preparando el espacio" },
      { src: "/images/proyectos/proyecto-2-proceso-2.jpg", alt: "Proceso: pintura" },
      { src: "/images/proyectos/proyecto-2-proceso-3.jpg", alt: "Proceso: decoración" },
    ],
    alt: "Habitación infantil con pared azul polvo",
    facts: { budget: "[X] €", surface: "[X] m²", whatWeDid: ["pintura", "distribución", "mobiliario", "decoración"] },
    closing: "[Frase final del proyecto]",
  },
];
