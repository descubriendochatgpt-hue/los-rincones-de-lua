# Los Rincones de Lúa · Landing

Web de una sola página para **Los Rincones de Lúa** («Espacios para crecer»): diseño y transformación de habitaciones infantiles. Su objetivo es conseguir solicitudes de familias a través de un formulario de 4 pasos con subida de fotos.

- **Diseño visual:** sistema de Claude Design (cálido, editorial, sereno): Instrument Serif + Figtree, crema/lino, terracota solo para acciones, arcos como forma firma.
- **Estructura y textos:** los que propuso la clienta (Home, ¿Qué hacemos?, Proyectos, Servicios, ¿Y si tengo poco presupuesto?, Sobre Lúa, Cómo trabajamos, Contacto e Instagram).
- **Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · react-hook-form + zod · Framer Motion · Vercel Blob (fotos) · Supabase (datos de clientes) · Resend (aviso por email a losrinconesdelua@gmail.com).

## Estructura

```
src/
  content/              ← TODO EL CONTENIDO EDITABLE (sin tocar componentes)
    site.ts             ← nombre, contacto, WhatsApp, Instagram, menú, SEO, email de avisos
    home.ts             ← textos de todas las secciones, en orden
    projects.ts         ← proyectos (antes / proceso / después, historia, datos)
    pricing.ts          ← servicios y precios
    testimonials.ts     ← opiniones (vacía la lista para ocultar la sección)
    form.ts             ← opciones del formulario, límites de fotos y mensajes
    legal.ts            ← aviso legal, privacidad y cookies (placeholder)
  app/
    page.tsx            ← orden de las secciones
    globals.css         ← colores, sombras y estilos base (tokens del diseño)
    fonts/              ← tipografías (mismos archivos que el diseño)
    api/upload/route.ts ← firma las subidas directas de fotos a Vercel Blob
    api/leads/route.ts  ← valida, guarda en Supabase y envía el email
    aviso-legal/ privacidad/ cookies/  sitemap.ts  robots.ts  opengraph-image.tsx  icon.svg
  components/  layout/ sections/ ui/ form/
  lib/
    lead-schema.ts      ← validación (la misma en navegador y servidor)
    db.ts email.ts retry.ts
supabase/schema.sql     ← tabla de clientes (ejecutar una vez en Supabase)
public/images/          ← imágenes (ahora son ilustraciones y huecos «[FOTO: …]»)
scripts/placeholders.mjs← regenera las imágenes de ejemplo
```

## Editar contenido

- **Textos, precios, servicios, proyectos, testimonios:** archivos de `src/content/`. Escribe `*entre asteriscos*` la parte de un titular que va en cursiva.
- **Fotos:** sustituye los archivos de `public/images/` manteniendo el nombre (o cambia la ruta en `src/content/`):

  | Hueco | Archivo | Formato |
  |---|---|---|
  | Foto del inicio | `hero.jpg` | vertical 4:5 |
  | Proyecto 01 / 02 | `proyectos/proyecto-1-antes.jpg`, `…-despues.jpg` | 16:9, mismo encuadre |
  | Proceso | `proyectos/proyecto-1-proceso-1.jpg` … `-3.jpg` | 4:3 |
  | Poco presupuesto | `presupuesto/armario-antes.jpg`, `armario-despues.jpg`, `muebles-antes.jpg`, `muebles-despues.jpg` | vertical 4:5 |
  | Sobre Lúa | `angela.jpg` | vertical 4:5 |
  | Testimonios | añade `photo: "/images/…"` en `testimonials.ts` | cuadrada |

  Para añadir un proyecto, copia un bloque en `projects.ts`. Si un proyecto no tiene fotos de proceso, deja `process: []`.
- **Logo:** `src/components/ui/Logo.tsx` es una recreación del de Instagram (arco + luna). Si tienes el logo en SVG/PNG, ponlo en `public/` y sustitúyelo ahí. El favicon es `src/app/icon.svg`.
- **Colores:** `src/app/globals.css` (`@theme`).
- **Pendiente de rellenar** (aparece entre corchetes en la web): teléfono y WhatsApp reales (`site.ts`), zona de trabajo, precios «X», datos de los proyectos, testimonios reales, razón social y NIF (`site.ts`, `legal.ts`).

## Desarrollo local

Requiere Node.js 20.9 o superior.

```bash
npm install
cp .env.example .env.local   # rellena las variables
npm run dev                  # http://localhost:3000
```

Sin variables la web funciona, pero la subida de fotos da error (falta `BLOB_READ_WRITE_TOKEN`) y, en desarrollo, las solicitudes se imprimen en la consola.

Comprobaciones: `npm run lint` y `npm run build`.

## Puesta en marcha

### 1. Supabase (datos de clientes)

1. Crea un proyecto en [supabase.com](https://supabase.com) (región UE, p. ej. Frankfurt o París).
2. **SQL Editor → New query**, pega el contenido de `supabase/schema.sql` y pulsa **Run**. Crea la tabla `leads` con seguridad RLS activada (nadie puede leerla desde fuera; solo la web puede escribir con la clave secreta).
3. **Project Settings → API**: copia la **Project URL** (`SUPABASE_URL`) y la clave **service_role** / **secret** (`SUPABASE_SERVICE_ROLE_KEY`).
4. Las solicitudes se ven en **Table Editor → leads**. Hay columnas `status` y `notes` para ir marcando cada cliente (nuevo, contactado, propuesta enviada…).

### 2. Resend (aviso a losrinconesdelua@gmail.com)

1. Crea la cuenta en [resend.com](https://resend.com) **con el correo losrinconesdelua@gmail.com** y genera una **API key**.
2. Sin dominio propio, deja `EMAIL_FROM=Los Rincones de Lúa <onboarding@resend.dev>`: Resend solo entrega al correo de la cuenta, que es justo donde quieres recibir las solicitudes.
3. Cuando tengas dominio, verifícalo en Resend (**Domains**) y cambia `EMAIL_FROM` a una dirección de ese dominio. Entonces también puedes activar `SEND_CUSTOMER_CONFIRMATION=true`.
4. Revisa la carpeta de spam la primera vez y marca el correo como «No es spam».

El email incluye todos los datos, miniaturas y enlaces a las fotos, y botones para llamar, abrir WhatsApp o responder.

### 3. Vercel

1. Importa el repositorio en [vercel.com/new](https://vercel.com/new) (Vercel detecta Next.js; no hay que cambiar el build).
2. **Storage → Create → Blob** y conéctalo al proyecto: crea `BLOB_READ_WRITE_TOKEN`.
3. **Settings → Environment Variables:** `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL`, `EMAIL_FROM` y `NEXT_PUBLIC_SITE_URL`.
4. **Deployments → ⋯ → Redeploy** para aplicar las variables.
5. **Settings → Domains:** conecta el dominio.
6. Envía una solicitud de prueba y comprueba que llega el email y aparece la fila en Supabase.

Basta con Supabase **o** Resend para no perder solicitudes: si una falla, la solicitud se da por recibida con la otra. Si en producción no hay ninguna configurada, el formulario muestra error en lugar de perder datos en silencio.

## Cómo funciona el formulario

- 4 pasos (Vosotros · El espacio · Detalles · Fotos) con barra de progreso; cada paso se valida antes de avanzar con el mismo esquema zod que usa el servidor.
- Teléfono con validación española; es obligatorio salvo que la familia prefiera que la contacten por email.
- **Autoguardado:** lo escrito se guarda en el navegador y se recupera si recargan la página (las fotos no).
- **Fotos:** se suben directamente del navegador a Vercel Blob (sin límite de 4,5 MB de las funciones), con progreso, reintento por foto, vista previa y validación de formato (JPG/PNG/HEIC) y tamaño (10 MB). Entre 2 y 8 fotos (`src/content/form.ts`).
- **Errores:** el envío se reintenta solo hasta 3 veces ante fallos de red o del servidor; el email también se reintenta 3 veces. Si aun así falla, se muestra un mensaje claro con el correo de contacto.
- **Anti-spam:** campo trampa oculto. La API solo acepta fotos alojadas en Vercel Blob.
- Los botones de **Servicios** preseleccionan el servicio en el formulario.

## Notas

- **Privacidad:** las fotos quedan en Blob con URL pública pero aleatoria. Bórralas (Vercel → Storage → Blob) cuando ya no hagan falta, según el plazo de la política de privacidad. Pide que no salgan niños en las fotos.
- **Accesibilidad:** etiquetas y errores asociados a cada campo, foco gestionado entre pasos, comparador antes/después usable con teclado, visor de fotos con `<dialog>`, respeta «reducir movimiento».
- **Cookies:** no se usan cookies de analítica. Si añades Google Analytics o similar, hará falta un banner de consentimiento.
- **Instagram:** la sección enlaza al perfil. Mostrar las últimas publicaciones requiere la API de Instagram (cuenta profesional + token) o un widget externo; se puede añadir más adelante.
