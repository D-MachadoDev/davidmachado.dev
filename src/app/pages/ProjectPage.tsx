import { ProjectCover } from "../components/ProjectCover";
import { projects, type Project } from "../data/projects";
import { t, type Language } from "../i18n";
import { CONTACT_MAILTO } from "../lib/mailto";
import { Link } from "../router";

const linkClass =
  "inline-flex items-center gap-2 font-mono text-[11px] lowercase text-muted transition-colors hover:text-foreground";

export function ProjectPage({
  project,
  language,
}: {
  project: Project;
  language: Language;
}) {
  const index = projects.findIndex((entry) => entry.id === project.id);
  const next = projects[(index + 1) % projects.length];
  const status =
    project.status === "open_source"
      ? t(language, "projects.statusOpenSource")
      : t(language, "projects.statusPrivate");

  return (
    <main id="main-content" className="pb-20 pt-24 sm:pt-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Link href="/projects" className={linkClass}>
          <span aria-hidden="true">←</span> {t(language, "projects.back")}
        </Link>

        <header className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              {t(language, "projects.caseStudy")}{" "}
              <span className="text-muted/40">/</span> {project.category}
            </p>
            <h1 className="mt-4 text-balance font-sans text-[clamp(36px,5vw,64px)] font-medium leading-[0.98] tracking-[-0.04em]">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
              {project.summary[language]}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 self-end border-t border-foreground/10 pt-6 font-mono text-[11px]">
            <div>
              <dt className="uppercase tracking-[0.14em] text-muted/80">
                {t(language, "projects.role")}
              </dt>
              <dd className="mt-1 leading-relaxed text-foreground">{project.role}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.14em] text-muted/80">
                {t(language, "projects.year")}
              </dt>
              <dd className="mt-1 text-foreground">{project.year}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.14em] text-muted/80">
                {t(language, "projects.status")}
              </dt>
              <dd className="mt-1 text-foreground">{status}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.14em] text-muted/80">
                {t(language, "projects.stack")}
              </dt>
              <dd className="mt-1 leading-relaxed text-foreground">
                {project.tags.slice(0, 3).join(" · ")}
              </dd>
            </div>
          </dl>
        </header>

        <div className="mt-12 overflow-hidden border border-foreground/10 sm:mt-16">
          <ProjectCover project={project} className="aspect-[21/9] w-full" />
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              01 / {t(language, "projects.overview")}
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted">
              {project.description[language]}
            </p>

            <h2 className="mt-12 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              02 / {t(language, "projects.decisions")}
            </h2>
            <ol className="mt-4">
              {project.architectureHighlights[language].map((item, itemIndex) => (
                <li
                  key={item}
                  className="flex gap-4 border-b border-foreground/10 py-4 text-sm leading-relaxed text-muted"
                >
                  <span className="font-mono text-[10px] text-muted/50">
                    {String(itemIndex + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>

          <aside>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              03 / {t(language, "projects.evidence")}
            </h2>
            <dl className="mt-4 border-y border-foreground/10">
              {project.evidence.map((item) => (
                <div
                  key={item.value}
                  className="flex items-baseline justify-between gap-4 border-b border-foreground/10 py-3 last:border-b-0"
                >
                  <dt className="text-xs leading-relaxed text-muted">{item.label[language]}</dt>
                  <dd className="font-mono text-lg text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-10 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              04 / {t(language, "projects.stack")}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-foreground/10 px-2 py-1 font-mono text-[10px] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="mt-10 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              05 / {t(language, "projects.links")}
            </h2>
            <div className="mt-4 flex flex-col gap-2.5">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {t(language, "projects.openRepo")} <span aria-hidden="true">↗</span>
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {t(language, "projects.demo")} <span aria-hidden="true">↗</span>
                </a>
              )}
              {project.status === "private" && (
                <a href={CONTACT_MAILTO} className={linkClass}>
                  {t(language, "projects.requestWalkthrough")}{" "}
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </aside>
        </div>

        <div className="mt-20 border-t border-foreground/10 pt-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            {t(language, "projects.next")}
          </p>
          <Link
            href={`/projects/${next.id}`}
            className="group mt-3 flex items-baseline justify-between gap-6"
          >
            <span className="font-sans text-3xl tracking-tight transition-colors group-hover:text-muted sm:text-5xl">
              {next.title.split(" — ")[0]}
            </span>
            <span
              aria-hidden="true"
              className="font-mono text-xl text-muted transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
