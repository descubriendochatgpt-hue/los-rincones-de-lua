import "server-only";
import { Resend } from "resend";
import { SITE } from "@/content/site";
import { BUDGET_OPTIONS, CHILD_AGE_OPTIONS, CONTACT_OPTIONS, SERVICE_OPTIONS, SPACE_OPTIONS } from "@/content/form";
import { labelOf, type Lead } from "./lead-schema";
import { withRetry } from "./retry";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const isEmailConfigured = () => Boolean(process.env.RESEND_API_KEY);
const recipients = () => (process.env.LEAD_NOTIFICATION_EMAIL || SITE.leadsEmail).split(",").map((s) => s.trim());

function roomText(lead: Lead) {
  const { length, width, height } = lead.room;
  if (!length && !width && !height) return "No las sabe (estimar con fotos)";
  return `Largo ${length || "?"} · Ancho ${width || "?"} · Alto ${height || "?"} m`;
}

function leadRows(lead: Lead): [string, string][] {
  return [
    ["Nombre", lead.name],
    ["Teléfono", lead.contact.phone || "—"],
    ["Email", lead.email],
    ["Prefiere", labelOf(CONTACT_OPTIONS, lead.contact.preference)],
    ["Ubicación", `${lead.postalCode} ${lead.town}`],
    ["Servicio", labelOf(SERVICE_OPTIONS, lead.service)],
    ["Presupuesto", labelOf(BUDGET_OPTIONS, lead.budget)],
    ["Edad", labelOf(CHILD_AGE_OPTIONS, lead.childAge)],
    ["Espacio", labelOf(SPACE_OPTIONS, lead.spaceType)],
    ["Medidas", roomText(lead)],
    ["Qué quiere conseguir", lead.message || "—"],
  ];
}

function notificationHtml(lead: Lead, leadId: string | null) {
  const rows = leadRows(lead)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#6b6158;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:6px 0;color:#2e2a26">${esc(v).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");
  const photos = lead.photos
    .map(
      (p, i) =>
        `<a href="${esc(p.url)}" style="display:inline-block;margin:0 8px 8px 0;text-decoration:none">${
          p.contentType.includes("hei")
            ? `<span style="display:inline-block;padding:40px 12px;border:1px solid #e4d9c7;border-radius:8px;color:#a9543a">Foto ${i + 1} (HEIC)</span>`
            : `<img src="${esc(p.url)}" alt="Foto ${i + 1}" width="160" style="border-radius:8px;display:block">`
        }</a>`,
    )
    .join("");
  const phone = lead.contact.phone.replace(/\D/g, "").slice(-9);
  return `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#faf6ef;padding:24px">
  <div style="max-width:640px;margin:auto;background:#fff;border-radius:12px;padding:24px">
    <h1 style="font-size:20px;color:#a9543a;margin:0 0 16px">Nueva solicitud: ${esc(lead.name)}</h1>
    <table style="font-size:14px;border-collapse:collapse">${rows}</table>
    <p style="margin:20px 0 8px;font-weight:bold">Fotos (${lead.photos.length})</p>
    <div>${photos}</div>
    <p style="margin-top:20px">
      ${phone ? `<a href="tel:+34${phone}" style="margin-right:16px">Llamar</a><a href="https://wa.me/34${phone}" style="margin-right:16px">WhatsApp</a>` : ""}
      <a href="mailto:${esc(lead.email)}">Responder por email</a>
    </p>
    ${leadId ? `<p style="color:#9a9089;font-size:12px">ID: ${leadId}</p>` : ""}
  </div></body></html>`;
}

function notificationText(lead: Lead) {
  return [
    ...leadRows(lead).map(([k, v]) => `${k}: ${v}`),
    "",
    "Fotos:",
    ...lead.photos.map((p) => p.url),
  ].join("\n");
}

function confirmationHtml(lead: Lead) {
  return `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#faf6ef;padding:24px">
  <div style="max-width:560px;margin:auto;background:#fff;border-radius:12px;padding:24px;color:#2e2a26">
    <h1 style="font-size:20px;color:#a9543a">¡Gracias, ${esc(lead.name.split(" ")[0])}!</h1>
    <p>Hemos recibido tu solicitud para la habitación. Te contactaremos en menos de 24 horas laborables.</p>
    <p>Si quieres añadir algo, responde a este correo.</p>
    <p>Un abrazo,<br>${esc(SITE.name)}</p>
  </div></body></html>`;
}

/** Envía el aviso del nuevo lead (con 3 intentos). Lanza error si falla. */
export async function sendLeadNotification(lead: Lead, leadId: string | null) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.EMAIL_FROM ?? `${SITE.name} <onboarding@resend.dev>`;
  const to = recipients();

  await withRetry(async () => {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: lead.email,
      subject: `Nueva solicitud: ${lead.name} · ${labelOf(SERVICE_OPTIONS, lead.service)} · ${lead.town}`,
      html: notificationHtml(lead, leadId),
      text: notificationText(lead),
    });
    if (error) throw new Error(`Resend: ${error.name} ${error.message}`);
  });

  // Confirmación al cliente (opcional). No hace fallar el envío si da error.
  if (process.env.SEND_CUSTOMER_CONFIRMATION === "true") {
    await resend.emails
      .send({
        from,
        to: lead.email,
        replyTo: to[0],
        subject: `Hemos recibido tu solicitud · ${SITE.name}`,
        html: confirmationHtml(lead),
      })
      .catch((e) => console.error("[lead] confirmación al cliente fallida", e));
  }
}
