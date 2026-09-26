import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { LEGAL } from "@/content/legal";

const page = LEGAL["privacidad"];

export const metadata: Metadata = {
  title: page.title,
  alternates: { canonical: "/privacidad" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LegalPage page={page} />;
}
