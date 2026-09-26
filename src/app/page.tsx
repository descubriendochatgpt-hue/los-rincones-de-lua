import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { ContactSection } from "@/components/sections/ContactSection";
import { Hero } from "@/components/sections/Hero";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { Instagram } from "@/components/sections/Instagram";
import { LowBudget } from "@/components/sections/LowBudget";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { PLANS } from "@/content/pricing";
import { SITE } from "@/content/site";

// Datos estructurados para Google (negocio local + servicios)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: SITE.name,
  slogan: SITE.tagline,
  description: SITE.seo.description,
  url: SITE.url,
  email: SITE.contact.email,
  telephone: SITE.contact.phone,
  founder: { "@type": "Person", name: SITE.owner },
  sameAs: SITE.social.map((s) => s.href),
  makesOffer: PLANS.map((p) => ({
    "@type": "Offer",
    name: p.name,
    description: p.description,
    ...(typeof p.price === "number" ? { priceSpecification: { "@type": "PriceSpecification", minPrice: p.price, priceCurrency: "EUR" } } : {}),
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Header />
      <main id="contenido">
        <Hero />
        <WhatWeDo />
        <Projects />
        <Services />
        <LowBudget />
        <About />
        <HowWeWork />
        <Testimonials />
        <ContactSection />
        <Instagram />
      </main>
      <Footer />
    </>
  );
}
