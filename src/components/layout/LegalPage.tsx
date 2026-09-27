import Link from "next/link";
import type { LegalPage as LegalPageData } from "@/content/legal";
import { Logo } from "@/components/ui/Logo";
import { Footer } from "./Footer";

export function LegalPage({ page }: { page: LegalPageData }) {
  return (
    <>
      <header className="border-b border-arena bg-crema">
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/" className="text-verde" aria-label="Volver al inicio">
            <Logo />
          </Link>
          <Link href="/#contacto" className="text-sm font-semibold text-terracota underline underline-offset-4">
            Cuéntame tu idea
          </Link>
        </div>
      </header>
      <main className="container-page py-14">
        <div className="max-w-3xl">
        <h1 className="font-serif text-5xl">{page.title}</h1>
        <p className="mt-2 text-sm text-tinta-suave">Última actualización: {page.updated}</p>
        {page.sections.map((s) => (
          <section key={s.heading} className="mt-10">
            <h2 className="font-serif text-3xl">{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p} className="mt-3 leading-relaxed text-tinta-suave">{p}</p>
            ))}
          </section>
        ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
