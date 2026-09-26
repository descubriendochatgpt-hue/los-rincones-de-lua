import { ImageResponse } from "next/og";
import { HERO } from "@/content/home";
import { SITE } from "@/content/site";

export const alt = SITE.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagen para compartir en redes. Si prefieres una foto, borra este archivo
// y deja un opengraph-image.jpg (1200×630) en esta misma carpeta.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", padding: 80, gap: 64, background: "#FAF6EF", color: "#2E2A26" }}>
        <svg width="220" height="264" viewBox="0 0 40 48">
          <path d="M5 45V19a15 15 0 0 1 30 0v26z" fill="none" stroke="#A9543A" strokeWidth="3" strokeLinejoin="round" />
          <path d="M22.5 17.5a6.5 6.5 0 1 0 4.8 10.4 5.4 5.4 0 0 1-4.8-10.4z" fill="#B8927A" />
          <circle cx="28" cy="15" r="0.9" fill="#A9543A" />
          <circle cx="13" cy="21" r="0.8" fill="#A9543A" />
          <circle cx="29.5" cy="33.5" r="0.8" fill="#A9543A" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
          <div style={{ fontSize: 30, color: "#4F6349", letterSpacing: 4, textTransform: "uppercase" }}>{SITE.name}</div>
          <div style={{ fontSize: 68, lineHeight: 1.05, marginTop: 20 }}>{HERO.title.replace(/\*/g, "")}</div>
          <div style={{ fontSize: 28, marginTop: 24, color: "#6B6158" }}>{HERO.eyebrow}</div>
        </div>
      </div>
    ),
    size,
  );
}
