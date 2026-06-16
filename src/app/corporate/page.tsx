import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site";
import Hero from "@/components/corporate/Hero";
import Manifesto from "@/components/corporate/Manifesto";
import PeopleSkills from "@/components/corporate/PeopleSkills";
import Formats from "@/components/corporate/Formats";
import Included from "@/components/corporate/Included";
import Stats from "@/components/corporate/Stats";
import CorporateGallery from "@/components/corporate/CorporateGallery";
import CorporateBooking from "@/components/corporate/CorporateBooking";
import CorporateFAQ from "@/components/corporate/CorporateFAQ";
import CtaBand from "@/components/corporate/CtaBand";

export const metadata: Metadata = buildMetadata({
  title: "Corporate Team Building — Edinburgh & Glasgow",
  description:
    "Live, screen-free social deduction games for teams across the UK. Team-building, away-days, onboarding and socials in Edinburgh, Glasgow and beyond — fully hosted, up to 50 players. Get a quote.",
  path: "/corporate",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Mafia Kilty Corporate Events",
  serviceType: "Corporate team-building social deduction games",
  provider: {
    "@type": "Organization",
    name: siteConfig.siteName,
    url: siteConfig.url,
    email: siteConfig.contactEmail,
  },
  areaServed: ["Edinburgh", "Glasgow", "United Kingdom"],
  description:
    "Live, screen-free social deduction games for corporate teams — team-building, away-days, onboarding and socials. Fully hosted, up to 50 players per session.",
  url: `${siteConfig.url}/corporate`,
};

export default function CorporatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Manifesto />
      <PeopleSkills />
      <Formats />
      <Included />
      <Stats />
      <CorporateGallery />
      <CorporateBooking />
      <CorporateFAQ />
      <CtaBand />
    </>
  );
}
