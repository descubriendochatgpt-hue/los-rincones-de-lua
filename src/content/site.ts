/**
 * Datos generales del negocio.
 * Edita aquí el nombre, contacto, redes y textos SEO. No hace falta tocar componentes.
 */
export const SITE = {
  name: "Los Rincones de Lúa",
  // Nombre de la persona (sección "Sobre Lúa" y firma de los emails)
  owner: "Ángela",
  tagline: "Espacios para crecer.",
  // Texto pequeño junto al logo
  logoSubtitle: "Espacios para crecer",
  // URL pública final (sin barra al final). Se usa en sitemap, Open Graph y canonical.
  // En Vercel puedes definir NEXT_PUBLIC_SITE_URL y tendrá prioridad.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.losrinconesdelua.es",
  locale: "es_ES",
  seo: {
    title: "Los Rincones de Lúa · Diseño y transformación de habitaciones infantiles",
    description:
      "Creamos rincones donde crecer, jugar y soñar. Diseño y transformación de habitaciones infantiles, adaptadas a cada familia y a cada presupuesto.",
    keywords: [
      "decoración habitación infantil",
      "diseño habitación niños",
      "reforma habitación bebé",
      "rincón de lectura infantil",
      "interiorismo infantil low cost",
    ],
  },
  // Correo donde llegan las solicitudes del formulario
  // (se puede sobrescribir con la variable LEAD_NOTIFICATION_EMAIL en Vercel).
  leadsEmail: "losrinconesdelua@gmail.com",
  contact: {
    email: "losrinconesdelua@gmail.com",
    phone: "+34 600 000 000",
    whatsapp: "34600000000", // solo dígitos, con prefijo de país
    hours: "Lunes a viernes, 9:00–18:00",
    // Zona donde se hacen reformas físicas (se muestra en el footer y en el formulario)
    serviceArea: "[Zona donde hacéis transformaciones] · diseño online en toda España",
  },
  instagram: { handle: "@losrinconesdelua", url: "https://www.instagram.com/losrinconesdelua/" },
  social: [{ label: "Instagram", href: "https://www.instagram.com/losrinconesdelua/" }],
  nav: [
    { label: "Proyectos", href: "#proyectos" },
    { label: "Servicios", href: "#servicios" },
    { label: "Sobre Lúa", href: "#sobre-lua" },
    { label: "Cómo trabajamos", href: "#como-trabajamos" },
  ],
  ctaLabel: "Cuéntame tu idea",
  // Texto legal del footer, p. ej. "Los Rincones de Lúa S.L."
  legalName: "[Razón social]",
} as const;
