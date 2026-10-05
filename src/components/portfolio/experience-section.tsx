import Image from "next/image";
import { experience } from "@/data/portfolio-data";
import SectionHeading from "./section-heading";

export default function ExperienceSection() {
  return (
    <section id="experience" className="mt-6 sm:mt-10 scroll-mt-6">
        <SectionHeading>Experience</SectionHeading>
      <div className="space-y-4 sm:space-y-8">
        {experience.map((item) => (
          <article
            key={`${item.role}-${item.company}`}
            className="grid min-w-0 gap-2 sm:grid-cols-[10rem_minmax(0,1fr)]"
          >
            <div className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
              {item.period}
            </div>
            <div>
              <h2 className="flex items-center gap-2 text-[15px] text-[var(--foreground)]">
                {item.logo && (
                  <Image src={item.logo} alt="" width={20} height={20} className="h-5 w-5 rounded object-contain" />
                )}
                <span>
                  <span className="font-semibold text-sm sm:text-base">{item.role}</span>{" "}
                  <span className="font-normal text-[var(--muted)]">at</span>{" "}
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-sm sm:text-base transition hover:text-[var(--primary)]"
                    >
                      {item.company}
                    </a>
                  ) : (
                    <span className="font-semibold text-sm sm:text-base">{item.company}</span>
                  )}
                </span>
              </h2>
              <p className="mt-2 text-sm sm:text-[15px] sm:leading-7 text-[var(--muted)]">
                {item.description}
                {item.projects && (
                  <>
                    {` ${item.projectsPrefix ?? "Contributed to"} `}
                    {item.projects.map((project, index) => (
                      <span key={project.name}>
                        {index > 0 && " and "}
                        <span className="inline-flex items-center gap-1 align-middle text-[var(--foreground)]">
                          <Image
                            src={project.logo}
                            alt=""
                            width={16}
                            height={16}
                            className="h-4 w-4 rounded object-contain"
                          />
                          {project.href ? (
                            <a
                              href={project.href}
                              target="_blank"
                              rel="noreferrer"
                              className="transition hover:text-[var(--primary)]"
                            >
                              {project.name}
                            </a>
                          ) : (
                            <span>{project.name}</span>
                          )}
                        </span>
                      </span>
                    ))}
                    .
                  </>
                )}
                {item.continuation && ` ${item.continuation}`}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
