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
  facts: {
    budget: string;
    budgetIncludes?: string; // qué incluye el presupuesto (texto pequeño)
    surface: string;
    whatWeDid: string[];
  };
  closing?: string; // frase final
};

export const PROJECTS: Project[] = [
  {
    number: "01",
    title: "La habitación de Martín",
    story:
      "Transformamos esta habitación en un espacio propio para un niño de 2 años, pensado para acompañarle en su crecimiento. Buscábamos un ambiente sencillo, luminoso y espacioso, con una cama a ras de suelo y mucho sitio para jugar. La pared acentuada con motivos circulares de colores y los juguetes organizados a su alcance fueron el estímulo perfecto para que diera el paso de empezar a dormir en su propia habitación.",
    before: "/images/proyectos/proyecto-1-antes.jpg",
    after: "/images/proyectos/proyecto-1-despues.jpg",
    process: [
      { src: "/images/proyectos/proyecto-1-proceso-1.jpg", alt: "Proceso: pintando la pared" },
      { src: "/images/proyectos/proyecto-1-proceso-2.jpg", alt: "Proceso: montaje del mobiliario" },
      { src: "/images/proyectos/proyecto-1-proceso-3.jpg", alt: "Proceso: últimos detalles de decoración" },
    ],
    alt: "Habitación infantil con pared en verde salvia y ventana en arco",
    facts: {
      budget: "1.500 € (+ IVA)",
      budgetIncludes: "Diseño, muebles, materiales, mano de obra, iluminación y ropa de cama",
      surface: "7,5 m²",
      whatWeDid: ["pintura", "distribución", "mobiliario", "decoración"],
    },
    closing: "El rincón que lo empezó todo. 🌙",
  },
  {
    number: "02",
    title: "La habitación de Vega",
    story:
      "Una habitación que necesitaba convertirse en un espacio propio para una bebé recién nacida. La familia acababa de mudarse a su nuevo hogar y se encontró con un cuarto envejecido y anticuado, por lo que necesitaban renovarlo por completo para crear un refugio sano, cálido y sereno a tiempo para la llegada de la pequeña. Para resolverlo, actualizamos revestimientos y acabados para aportar luminosidad, e integramos un mobiliario evolutivo a medida con iluminación tenue y textiles naturales que garantizan un ambiente saludable, cómodo y lleno de calma desde el primer día.",
    before: "/images/proyectos/proyecto-2-antes.jpg",
    after: "/images/proyectos/proyecto-2-despues.jpg",
    process: [
      { src: "/images/proyectos/proyecto-2-proceso-1.jpg", alt: "Proceso: preparando el espacio" },
      { src: "/images/proyectos/proyecto-2-proceso-2.jpg", alt: "Proceso: pintura" },
      { src: "/images/proyectos/proyecto-2-proceso-3.jpg", alt: "Proceso: decoración" },
    ],
    alt: "Habitación infantil con pared azul polvo",
    facts: {
      budget: "2.000 € (+ IVA)",
      surface: "13,5 m²",
      whatWeDid: ["pintura", "distribución", "mobiliario", "decoración"],
    },
    closing: "La mejor bienvenida para esta nueva etapa",
  },
  {
    number: "03",
    title: "La habitación de César",
    story:
      "Una habitación que necesitaba convertirse en un espacio propio para César, un joven de 14 años. César se mudó a casa de su abuela para hacerle compañía y se encontró con un cuarto anticuado y desactualizado, por lo que la familia necesitaba transformarlo en un refugio moderno y funcional adaptado a su adolescencia sin perder la calidez del hogar. Para resolverlo, renovamos por completo los acabados para ganar dinamismo y diseñamos una distribución inteligente con zonas diferenciadas para el descanso, el estudio y el ocio, integrando soluciones de almacenaje a medida que aportan orden, independencia y carácter.",
    before: "/images/proyectos/proyecto-3-antes.jpg",
    after: "/images/proyectos/proyecto-3-despues.jpg",
    process: [
      { src: "/images/proyectos/proyecto-3-proceso-1.jpg", alt: "Proceso: preparando el espacio" },
      { src: "/images/proyectos/proyecto-3-proceso-2.jpg", alt: "Proceso: pintura" },
      { src: "/images/proyectos/proyecto-3-proceso-3.jpg", alt: "Proceso: decoración" },
    ],
    alt: "Habitación infantil con pared en tono melocotón",
    facts: {
      budget: "1.500 € (+ IVA)",
      surface: "9 m²",
      whatWeDid: ["pintura", "distribución", "mobiliario", "decoración"],
    },
    closing: "Celebramos el encuentro entre dos generaciones bajo un mismo techo",
  },
];
