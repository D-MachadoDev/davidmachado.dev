import { ProjectCover } from "../components/ProjectCover";
import { GITHUB_URL } from "../data/links";
import { projects, type Project } from "../data/projects";
import { t, type Language } from "../i18n";
import { useWheelHorizontalScroll } from "../lib/use-wheel-horizontal-scroll";
import { Link } from "../router";

function ProjectCard({ project, language }: { project: Project; language: Language }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block w-full shrink-0 sm:w-auto"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-card sm:h-[min(62vh,42rem)]">
        <ProjectCover
          project={project}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-background/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="border border-foreground/20 bg-background/80 px-4 py-2 font-mono text-[11px] lowercase text-foreground backdrop-blur-sm">
            {t(language, "projects.viewCase")} <span aria-hidden="true">↗</span>
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-sans text-[21px] font-medium tracking-tight text-foreground">
            {project.title.split(" — ")[0]}
          </h2>
          <p className="mt-1 line-clamp-2 max-w-md text-sm leading-relaxed text-muted">
            {project.summary[language]}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1 font-mono text-[11px] text-muted">
          <span>{project.year}</span>
          <span aria-hidden="true" className="sm:hidden">
            ↗
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ProjectsPage({ language }: { language: Language }) {
  const stripRef = useWheelHorizontalScroll<HTMLDivElement>();

  return (
    <main id="main-content" className="min-h-[100dvh] pt-24 sm:pt-28">
      <h1 className="sr-only">
        {t(language, "projects.heading")} {t(language, "projects.headingAccent")}
      </h1>

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            {t(language, "projects.badge")}{" "}
            <span className="text-foreground/80">/ {String(projects.length).padStart(2, "0")}</span>
          </p>
          <p className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:flex">
            {t(language, "projects.scroll")} <span aria-hidden="true">→</span>
          </p>
        </div>
      </div>

      <section
        ref={stripRef}
        aria-label={t(language, "projects.badge")}
        className="no-scrollbar mt-8 flex flex-col gap-10 px-5 pb-12 sm:mt-10 sm:flex-row sm:gap-6 sm:overflow-x-auto sm:overscroll-x-contain sm:px-8 sm:pb-10"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} language={language} />
        ))}

        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex aspect-[3/2] w-full shrink-0 flex-col justify-between overflow-hidden border border-foreground/10 p-6 sm:aspect-auto sm:h-[min(62vh,42rem)] sm:w-[min(44vw,34rem)]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.14),transparent_62%)]" />
          <div className="relative flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            <span>{t(language, "projects.allRepos")}</span>
            <span aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5">
              ↗
            </span>
          </div>
          <div className="relative">
            <p className="font-mono text-[clamp(24px,3.4vw,40px)] leading-none tracking-[-0.04em] text-muted transition-colors group-hover:text-foreground">
              D-MachadoDev
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {t(language, "projects.allReposLede")}
            </p>
          </div>
        </a>
      </section>
    </main>
  );
}
