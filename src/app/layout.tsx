import type { Metadata, Viewport } from "next";
import { Allura } from "next/font/google";
import localFont from "next/font/local";
import { SITE } from "@/content/site";
import "./globals.css";

// Tipografías del sistema visual (mismos archivos que el diseño de Claude Design, Google Fonts · OFL)
const serif = localFont({
  src: [
    { path: "./fonts/instrument-serif-latin.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-serif-italic-latin.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
  fallback: ["Georgia", "serif"],
});
const script = Allura({ subsets: ["latin"], weight: "400", variable: "--font-allura", display: "swap" });
const sans = localFont({
  src: "./fonts/figtree-latin.woff2",
  weight: "300 900",
  variable: "--font-figtree",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.seo.title, template: `%s | ${SITE.name}` },
  description: SITE.seo.description,
  keywords: [...SITE.seo.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: "/",
    siteName: SITE.name,
    title: SITE.seo.title,
    description: SITE.seo.description,
  },
  twitter: { card: "summary_large_image", title: SITE.seo.title, description: SITE.seo.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#faf6ef" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable} ${script.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
