import {
  AchievementSection,
  ContactFooter,
  EducationSection,
  ExperienceSection,
  HeroSection,
  ProjectsSection,
  SiteHeader,
  TechStackSection,
  WritingSection,
} from "@/components/portfolio";

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[760px] px-3 pb-20 pt-1 sm:px-6">
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <AchievementSection />
        <EducationSection />
        <WritingSection />
        <TechStackSection />
        <ContactFooter />
      </main>
    </div>
  );
}
