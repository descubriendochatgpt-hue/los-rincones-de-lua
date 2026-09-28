/**
 * Textos legales (PLACEHOLDER). Revísalos con un asesor antes de publicar.
 * Cada página es una lista de secciones { heading, paragraphs }.
 * Los datos entre corchetes [ ] son los que tienes que completar.
 */
import { SITE } from "./site";

export type LegalPage = {
  title: string;
  updated: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const LEGAL: Record<"aviso-legal" | "privacidad" | "cookies", LegalPage> = {
  "aviso-legal": {
    title: "Aviso legal",
    updated: "2026",
    sections: [
      {
        heading: "Condiciones de uso",
        paragraphs: [
          "El acceso a este sitio web es gratuito y atribuye la condición de usuario, que acepta estas condiciones. El usuario se compromete a hacer un uso adecuado de los contenidos.",
        ],
      },
      {
        heading: "Propiedad intelectual",
        paragraphs: [
          "Los textos, imágenes, diseños y logotipos de este sitio son propiedad del titular o se usan con licencia. Queda prohibida su reproducción sin autorización.",
        ],
      },
      {
        heading: "Responsabilidad",
        paragraphs: [
          "Los precios mostrados son orientativos y no constituyen una oferta vinculante. El presupuesto definitivo se facilita por escrito tras estudiar cada proyecto.",
        ],
      },
    ],
  },
  privacidad: {
    title: "Política de privacidad",
    updated: "2026",
    sections: [
      {
        heading: "Responsable del tratamiento",
        paragraphs: [`Los Rincones de Lúa. Contacto: ${SITE.contact.email}`],
      },
      {
        heading: "Qué datos tratamos",
        paragraphs: [
          "Los que nos facilitas en el formulario: nombre, correo electrónico, teléfono (si lo indicas), localidad y código postal, información sobre el proyecto (edad del niño o niña, tipo de espacio, servicio, medidas, presupuesto y lo que te gustaría conseguir) y las fotografías del espacio que subas.",
          "Te pedimos que las fotos muestren solo la estancia y no incluyan personas, en especial menores.",
        ],
      },
      {
        heading: "Finalidad y base legal",
        paragraphs: [
          "Tratamos tus datos para estudiar tu solicitud, contactarte y enviarte un presupuesto. La base legal es tu consentimiento (art. 6.1.a RGPD) y la aplicación de medidas precontractuales a petición tuya (art. 6.1.b RGPD).",
        ],
      },
      {
        heading: "Conservación",
        paragraphs: [
          "Conservaremos los datos durante [12 meses] desde tu solicitud si no llegas a contratar, y durante los plazos legales aplicables si contratas.",
        ],
      },
      {
        heading: "Destinatarios y encargados",
        paragraphs: [
          "No cedemos tus datos a terceros salvo obligación legal. Usamos proveedores que actúan como encargados del tratamiento: Vercel Inc. (alojamiento web y almacenamiento de imágenes), Supabase Inc. (base de datos de solicitudes), Resend (envío de correos) y Google (cuenta de correo Gmail). Algunos pueden estar fuera del EEE, con garantías adecuadas (cláusulas contractuales tipo).",
        ],
      },
      {
        heading: "Tus derechos",
        paragraphs: [
          `Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad, y retirar tu consentimiento, escribiendo a ${SITE.contact.email}. También puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).`,
        ],
      },
    ],
  },
  cookies: {
    title: "Política de cookies",
    updated: "2026",
    sections: [
      {
        heading: "Qué cookies usamos",
        paragraphs: [
          "Este sitio no utiliza cookies de analítica ni de publicidad. Solo pueden usarse elementos técnicos imprescindibles para el funcionamiento de la web, que no requieren consentimiento.",
          "Si en el futuro añades herramientas de analítica (por ejemplo Google Analytics), deberás actualizar esta política e incluir un banner de consentimiento.",
        ],
      },
    ],
  },
};
