import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { LEGAL } from "@/content/legal";

const page = LEGAL["aviso-legal"];

export const metadata: Metadata = {
  title: page.title,
  alternates: { canonical: "/aviso-legal" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LegalPage page={page} />;
}
