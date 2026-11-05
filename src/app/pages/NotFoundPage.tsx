import { t, type Language } from "../i18n";
import { Link } from "../router";

export function NotFoundPage({ language }: { language: Language }) {
  return (
    <main
      id="main-content"
      className="flex min-h-[100dvh] items-center pb-20 pt-24 sm:pt-28"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {t(language, "notFound.badge")}
        </p>
        <h1 className="mt-4 max-w-3xl text-balance font-sans text-[clamp(40px,6vw,72px)] font-medium leading-[0.98] tracking-[-0.045em]">
          {t(language, "notFound.heading")}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
          {t(language, "notFound.lede")}
        </p>
        <Link
          href="/"
          className="group mt-8 inline-flex items-center gap-2 border-b border-foreground/20 pb-1 font-mono text-[12px] text-foreground transition-colors hover:border-foreground"
        >
          {t(language, "notFound.cta")}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </main>
  );
}
