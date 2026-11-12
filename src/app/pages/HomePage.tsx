import { useEffect, useState } from "react";
import { OceanBackground } from "../components/OceanBackground";
import { CV_URL, GITHUB_URL, LINKEDIN_URL } from "../data/links";
import { FEATURED_PROJECT_ID, projects } from "../data/projects";
import { t, type Language } from "../i18n";
import { CONTACT_MAILTO } from "../lib/mailto";
import { Link } from "../router";
import type { Theme } from "../theme";

const STACK = [".NET 10", "TypeScript", "PostgreSQL", "Docker"];

export function HomePage({ language, theme }: { language: Language; theme: Theme }) {
  const featured = projects.find((project) => project.id === FEATURED_PROJECT_ID);
  const subtitles = [
    t(language, "hero.subtitle1"),
    t(language, "hero.subtitle2"),
    t(language, "hero.subtitle3"),
    t(language, "hero.subtitle4"),
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const interval = window.setInterval(() => {
      if (!document.hidden) {
        setIndex((value) => (value + 1) % 4);
      }
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <main id="main-content" className="relative min-h-[100dvh] overflow-hidden">
      <OceanBackground theme={theme} />

      <div className="pointer-events-none absolute inset-0 z-10 bg-background/45 sm:bg-transparent" />
      <div className="hero-shade pointer-events-none absolute inset-0 z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-20 mx-auto flex min-h-[100dvh] max-w-[1600px] flex-col px-5 pb-7 pt-24 sm:px-8">
        <div className="flex flex-1 flex-col justify-center gap-10 xl:flex-row xl:items-center xl:justify-between xl:gap-16">
          <div className="max-w-3xl">
            <p className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              <span className="inline-block size-1.5 rounded-full bg-emerald-400" />
              {t(language, "hero.available")}
              <span className="hidden sm:inline">· {t(language, "contact.location")}</span>
            </p>

            <h1 className="mt-6 font-sans text-[clamp(56px,7.4vw,108px)] font-medium leading-[0.9] tracking-[-0.055em] text-foreground">
              David
              <br />
              Machado
            </h1>

            <div className="mt-6 min-h-6">
              <p
                key={index}
                aria-hidden="true"
                className="hero-subtitle font-mono text-[11px] leading-5 uppercase tracking-[0.16em] text-accent sm:text-[12px]"
              >
                {subtitles[index]}
              </p>
            </div>
            <p className="sr-only">{subtitles.join(". ")}</p>

            <p className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-muted sm:text-base">
              {t(language, "hero.descPre")}
              <span className="text-foreground">{t(language, "hero.descCloud")}</span>
              {t(language, "hero.descMiddle")}
              <span className="text-foreground">{t(language, "hero.descDistributed")}</span>
              {t(language, "hero.descAnd")}
              <span className="text-foreground">{t(language, "hero.descDX")}</span>
              {t(language, "hero.descPost")}
            </p>

            <p className="mt-7 font-mono text-[11px] text-muted">
              <span className="text-muted/40">[ </span>
              {STACK.map((tag, tagIndex) => (
                <span key={tag}>
                  {tagIndex > 0 && <span className="mx-2 text-muted/30">/</span>}
                  {tag}
                </span>
              ))}
              <span className="text-muted/40"> ]</span>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[12px]">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 border-b border-foreground/20 pb-0.5 text-foreground transition-colors hover:border-foreground"
              >
                {t(language, "hero.ctaWork")}
                <span aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Link>
              <a
                href={CONTACT_MAILTO}
                className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground"
              >
                {t(language, "hero.ctaContact")}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </div>
          </div>

          {featured && (
            <aside className="relative w-full border-t border-foreground/10 pt-5 xl:w-[330px] xl:shrink-0 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
              <div
                aria-hidden="true"
                className="featured-shade pointer-events-none absolute -inset-y-12 -left-32 -right-8"
              />
              <div className="relative">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  {t(language, "hero.featured")}
                </p>
                <Link href={`/projects/${featured.id}`} className="group mt-4 block">
                  <p className="text-[15px] font-medium leading-snug text-foreground transition-colors group-hover:text-accent">
                    {featured.title}
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                    {featured.architectureBadge}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
                    {featured.evidence.slice(0, 2).map((item) => (
                      <div key={item.value}>
                        <p className="font-mono text-[15px] leading-none text-foreground">
                          {item.value}
                        </p>
                        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                          {item.label[language]}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 inline-flex items-center gap-1.5 border-b border-foreground/20 pb-0.5 font-mono text-[11px] text-muted transition-colors group-hover:border-foreground group-hover:text-foreground">
                    {t(language, "hero.featuredCta")}
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </p>
                </Link>
              </div>
            </aside>
          )}
        </div>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-4 border-t border-foreground/10 pt-5 font-mono text-[11px] text-muted">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              github <span aria-hidden="true">↗</span>
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              linkedin <span aria-hidden="true">↗</span>
            </a>
            <a href={CONTACT_MAILTO} className="transition-colors hover:text-foreground">
              email <span aria-hidden="true">↗</span>
            </a>
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              cv <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="text-[10px] text-muted/80">medellín, co · utc-5</p>
        </div>
      </div>
    </main>
  );
}
