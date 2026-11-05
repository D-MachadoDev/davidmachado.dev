import { CV_URL, GITHUB_URL, LINKEDIN_URL } from "../data/links";
import { t, type Language, type TranslationKey } from "../i18n";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "../lib/mailto";

const COMPETENCIES: { labelKey: TranslationKey; items: string[] }[] = [
  {
    labelKey: "about.skillLang",
    items: ["C#", ".NET 10", "TypeScript", "JavaScript", "SQL"],
  },
  {
    labelKey: "about.skillData",
    items: ["PostgreSQL", "SQL Server", "SQLite", "EF Core", "Migrations"],
  },
  {
    labelKey: "about.skillArch",
    items: ["Hexagonal Architecture", "DDD", "CQRS", "REST APIs", "SOLID"],
  },
  {
    labelKey: "about.skillCloud",
    items: ["Docker", "Docker Compose", "Linux", "GitHub Actions"],
  },
  {
    labelKey: "about.skillDevops",
    items: ["Git", "GitHub", "Postman", "Swagger / OpenAPI"],
  },
  {
    labelKey: "about.skillMethods",
    items: ["xUnit", "Vitest", "Code Review", "Technical Docs"],
  },
  {
    labelKey: "about.skillAI",
    items: ["LLM APIs", "Prompt Engineering", "Workflow Automation"],
  },
];

const WORK_ITEMS: { titleKey: TranslationKey; descKey: TranslationKey }[] = [
  { titleKey: "about.work1Title", descKey: "about.work1Desc" },
  { titleKey: "about.work2Title", descKey: "about.work2Desc" },
  { titleKey: "about.work3Title", descKey: "about.work3Desc" },
  { titleKey: "about.work4Title", descKey: "about.work4Desc" },
];

const linkClass =
  "font-mono text-[11px] lowercase text-muted transition-colors hover:text-foreground";

export function AboutPage({ language }: { language: Language }) {
  const stats = [
    { label: t(language, "about.statProjects"), value: 3 },
    { label: t(language, "about.statTests"), value: 592 },
    { label: t(language, "about.statRepos"), value: 9 },
    { label: t(language, "about.statOpenSource"), value: 2 },
  ];

  return (
    <main id="main-content" className="pb-20 pt-24 sm:pt-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {t(language, "about.badge")}
        </p>

        <h1 className="mt-4 max-w-4xl text-balance font-sans text-[clamp(38px,6vw,72px)] font-medium leading-[0.98] tracking-[-0.045em]">
          {t(language, "about.heading")}{" "}
          <span className="text-accent">{t(language, "about.headingAccent")}</span>
        </h1>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <img
              src="/assets/david-machado.jpg"
              alt="David Machado"
              width={320}
              height={320}
              loading="lazy"
              className="aspect-square w-full max-w-[280px] object-cover grayscale"
            />
            <p className="mt-4 font-mono text-[11px] text-muted">
              David Machado · {t(language, "contact.location")}
            </p>
            <a href={CV_URL} target="_blank" rel="noopener noreferrer" className={`${linkClass} mt-3 inline-block`}>
              {t(language, "about.downloadCv")} <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="max-w-2xl space-y-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
            <p>{t(language, "about.p1")}</p>
            <p>
              {t(language, "about.p2pre")}{" "}
              <span className="text-foreground">{t(language, "about.p2cloud")}</span>
              {", "}
              <span className="text-foreground">{t(language, "about.p2distributed")}</span>
              {t(language, "about.p2and")}{" "}
              <span className="text-foreground">{t(language, "about.p2dx")}</span>
              {t(language, "about.p2post")}
            </p>
            <p>{t(language, "about.p3")}</p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 border-y border-foreground/10 py-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-mono text-3xl tabular-nums text-foreground sm:text-4xl">
                {stat.value.toLocaleString()}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-2 border-b border-foreground/10 pb-8 sm:grid-cols-[200px_1fr] sm:items-baseline sm:gap-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            {t(language, "about.education")}
          </p>
          <div>
            <p className="text-base text-foreground">{t(language, "about.educationValue")}</p>
            <p className="mt-1 font-mono text-[11px] text-muted">
              {t(language, "about.educationMeta")}
            </p>
          </div>
        </div>

        <section
          aria-labelledby="experience-heading"
          className="mt-10 border-b border-foreground/10 pb-8"
        >
          <div className="grid gap-2 sm:grid-cols-[200px_1fr] sm:items-baseline sm:gap-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              {t(language, "exp.badge")}
            </p>
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2
                  id="experience-heading"
                  className="text-base font-normal text-foreground"
                >
                  {t(language, "exp.workTitle")}
                </h2>
                <p className="font-mono text-[11px] text-muted">
                  {t(language, "exp.workPeriod")}
                </p>
              </div>
              <p className="mt-1 font-mono text-[11px] text-muted">
                {t(language, "exp.workOrg")}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                {t(language, "exp.workDesc")}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-sans text-3xl tracking-tight sm:text-4xl">
              {t(language, "about.workTitle")}
            </h2>
            <p className="max-w-sm text-sm text-muted">{t(language, "about.workLede")}</p>
          </div>
          <div className="mt-8 grid gap-x-10 sm:grid-cols-2">
            {WORK_ITEMS.map((item, index) => (
              <div key={item.titleKey} className="border-t border-foreground/10 py-5">
                <p className="font-mono text-[10px] text-muted/50">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-sans text-lg font-medium tracking-tight">
                  {t(language, item.titleKey)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t(language, item.descKey)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-sans text-3xl tracking-tight sm:text-4xl">
            {t(language, "about.competencies")}
          </h2>
          <div className="mt-8 grid gap-x-10 sm:grid-cols-2">
            {COMPETENCIES.map((group) => (
              <div key={group.labelKey} className="border-t border-foreground/10 py-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {t(language, group.labelKey)}
                </p>
                <p className="mt-1.5 text-sm text-secondary">{group.items.join(" · ")}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.12em] text-muted/80">
            {t(language, "about.philosophy")}: {t(language, "about.phil1Title")} ·{" "}
            {t(language, "about.phil2Title")} · {t(language, "about.phil3Title")}
          </p>
        </section>

        <section className="mt-20 border-t border-foreground/10 pt-10">
          <h2 className="max-w-3xl text-balance font-sans text-[clamp(30px,4.4vw,52px)] font-medium leading-[1.02] tracking-[-0.04em]">
            {t(language, "about.contactTitle")}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            {t(language, "contact.subtitle")}
          </p>
          <a
            href={CONTACT_MAILTO}
            className="mt-7 inline-block border-b border-foreground/20 pb-1 font-mono text-sm text-foreground transition-colors hover:border-foreground sm:text-base"
          >
            {CONTACT_EMAIL} <span aria-hidden="true">↗</span>
          </a>
          <div className="mt-6 flex flex-wrap gap-6">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              github <span aria-hidden="true">↗</span>
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              linkedin <span aria-hidden="true">↗</span>
            </a>
            <a href={CV_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
              cv <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
