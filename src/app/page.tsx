import type { Metadata } from "next";
import { site } from "@/lib/site";
import {
  AchievementSection,
  ContactFooter,
  EducationSection,
  ExperienceSection,
  GithubActivitySection,
  HeroSection,
  ProjectsSection,
  SiteHeader,
  TechStackSection,
  WritingSection,
} from "@/components/portfolio";

export const metadata: Metadata = {
  alternates: { canonical: site.url },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      image: `${site.url}/profile-cropped.png`,
      jobTitle: "Frontend Developer",
      description: site.description,
      sameAs: site.profiles,
      knowsAbout: ["React", "Next.js", "TypeScript", "Frontend development"],
    },
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#profile`,
      url: site.url,
      name: site.title,
      description: site.description,
      inLanguage: "en",
      mainEntity: { "@id": `${site.url}/#person` },
    },
  ],
};

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      <main className="mx-auto w-full max-w-[760px] px-3 pb-20 pt-1 sm:px-6">
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <AchievementSection />
        <EducationSection />
        <WritingSection />
        <TechStackSection />
        <GithubActivitySection />
        <ContactFooter />
      </main>
    </div>
  );
}
