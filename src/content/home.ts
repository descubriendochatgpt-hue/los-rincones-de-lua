/**
 * Textos de la página principal, en el orden en que aparecen.
 * Escribe *entre asteriscos* la parte del titular que va en cursiva (en terracota en los grandes).
 */

// 1 · HOME
export const HERO = {
  eyebrow: "Espacios para crecer",
  title: "Creamos rincones donde *crecer, jugar y soñar.*",
  subtitle: "Diseño y transformación de habitaciones infantiles, adaptadas a cada familia y a cada presupuesto.",
  primaryCta: "Cuéntame tu idea",
  secondaryCta: "Ver proyectos",
  trust: [
    { icon: "heart", text: "Adaptado a tu presupuesto" },
    { icon: "check", text: "Sin compromiso" },
    { icon: "lock", text: "Tus fotos, protegidas" },
    { icon: "pin", text: "Estamos en Asturias" },
  ],
  // Sustituye /public/images/hero.jpg por una foto bonita de una habitación (vertical 4:5)
  image: { src: "/images/hero.jpg", alt: "Habitación infantil con cama casita, ventana en arco y alfombra" },
  card: { title: "Hecha a su medida", text: "Para su edad, vuestro espacio y vuestro presupuesto." },
} as const;

// 2 · ¿QUÉ HACEMOS?
export const WHAT_WE_DO = {
  eyebrow: "¿Qué hacemos?",
  title: "Diseñamos. Transformamos. *Damos una nueva vida a los espacios.*",
  blocks: [
    {
      icon: "palette",
      tone: "azul",
      title: "Diseño",
      text: "Distribución, colores, materiales, mobiliario y decoración.",
      location: "Disponible para cualquier localización",
    },
    {
      icon: "wand",
      tone: "salvia",
      title: "Transformación",
      text: "Pintura, pequeños cambios, montaje y personalización.",
      location: "Disponible para cualquier población en Asturias",
    },
    { icon: "heart", tone: "mostaza", title: "Presupuesto", text: "Buscamos soluciones bonitas y funcionales sin necesidad de gastar una fortuna." },
  ],
} as const;

// 3 · NUESTROS PROYECTOS (los proyectos están en src/content/projects.ts)
export const PROJECTS_SECTION = {
  eyebrow: "Nuestros proyectos",
  title: "Historias de *antes y después*",
  subtitle: "Desliza para ver la transformación de cada rincón.",
};

// 4 · SERVICIOS (los servicios están en src/content/pricing.ts)
export const SERVICES = {
  eyebrow: "Servicios",
  title: "Tú decides *cuánto quieres que hagamos*",
  subtitle: "Desde un pequeño rincón hasta la habitación completa. Todas empiezan igual: escuchando cómo es tu peque.",
  footnote: "¿No sabes cuál encaja? Cuéntame tu idea y te recomiendo una, sin compromiso.",
  recommended: "Para empezar",
};

// 5 · ¿Y SI TENGO POCO PRESUPUESTO?
export const LOW_BUDGET = {
  eyebrow: "¿Y si tengo poco presupuesto?",
  title: "Una habitación bonita *no tiene por qué costar una fortuna.*",
  text: "Trabajamos con diferentes presupuestos y buscamos aprovechar al máximo lo que ya tienes.",
  // Pares antes/después. Imágenes en /public/images/presupuesto (4:3)
  examples: [
    {
      before: { src: "/images/presupuesto/armario-antes.jpg", label: "Armario existente" },
      after: { src: "/images/presupuesto/armario-despues.jpg", label: "Armario pintado + nuevos tiradores" },
    },
    {
      before: { src: "/images/presupuesto/muebles-antes.jpg", label: "Muebles antiguos" },
      after: { src: "/images/presupuesto/muebles-despues.jpg", label: "Muebles renovados" },
    },
  ],
};

// 6 · SOBRE LÚA
export const ABOUT = {
  eyebrow: "Sobre Lúa",
  greeting: "Hola, soy *Ángela.*",
  paragraphs: [
    "Siempre me ha gustado transformar los espacios y encontrar formas de hacerlos más bonitos, funcionales y especiales sin necesidad de grandes presupuestos.",
    "Los Rincones de Lúa nació de una habitación muy especial: la de mi primer hijo.",
  ],
  question: "Y de una pregunta: ¿y si pudiera ayudar a otras familias a crear ese espacio que imaginan para sus hijos?",
  signature: "Ángela",
  // Sustituye /public/images/angela.jpg por tu foto (vertical 4:5)
  image: { src: "/images/angela.jpg", alt: "Ángela, fundadora de Los Rincones de Lúa" },
};

// 7 · CÓMO TRABAJAMOS
export const HOW_WE_WORK = {
  eyebrow: "Cómo trabajamos",
  title: "Muy *sencillo*",
  intro: "Un proceso fácil y sin complicaciones: tú nos cuentas, nosotras nos ocupamos.",
  steps: [
    { number: "01", title: "Cuéntame tu idea", text: "Rellena el formulario o escríbeme a losrinconesdelua@gmail.com.", contact: true },
    { number: "02", title: "Hablamos", text: "Conocemos el espacio, vuestras necesidades y el presupuesto." },
    { number: "03", title: "Diseñamos", text: "Te presentamos la propuesta." },
    { number: "04", title: "Transformamos", text: "Tú decides cuánto quieres que hagamos nosotras." },
    { number: "05", title: "Disfrutas del nuevo espacio 🌙", text: "Y tu peque, de su rincón favorito." },
  ],
};

// Testimonios (se ocultan si la lista de src/content/testimonials.ts está vacía)
export const TESTIMONIALS_SECTION = {
  eyebrow: "Familias",
  title: "Lo que nos cuentan *después*",
  intro: "Testimonios reales, con permiso de cada familia.",
};

// 8 · CONTACTO
export const CONTACT_SECTION = {
  eyebrow: "Contacto",
  title: "¿Tienes un rincón esperando *una nueva vida?*",
  intro: "Cuéntame qué tienes en mente. Son 4 pasos cortos, unos 5 minutos; puedes dejar las fotos para el final.",
  trust: [
    { icon: "lock", text: "Tus fotos solo las veo yo" },
    { icon: "check", text: "Sin compromiso: primero ves la propuesta" },
  ],
  altContact: "¿Prefieres escribirme directamente?",
};

// Instagram
export const INSTAGRAM = {
  title: "Sígueme en *Instagram*",
  text: "Ideas, procesos y rincones recién transformados.",
  cta: "Ver en Instagram",
};
