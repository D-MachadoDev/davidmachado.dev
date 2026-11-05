import { certifications } from "../data/certifications";
import { t, type Language } from "../i18n";

export function GalleryPage({ language }: { language: Language }) {
  return (
    <main id="main-content" className="pb-20 pt-24 sm:pt-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {t(language, "gallery.badge")}
        </p>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <h1 className="text-balance font-sans text-[clamp(36px,5vw,60px)] font-medium leading-[0.98] tracking-[-0.04em]">
            {t(language, "gallery.heading")}
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted lg:pb-2">
            {String(certifications.length).padStart(2, "0")} /{" "}
            {t(language, "gallery.credentials")}
          </p>
        </div>

        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted">
          {t(language, "gallery.lede")}
        </p>

        <div className="mt-12 border-t border-foreground/10">
          {certifications.map((cert, index) => (
            <article
              key={cert.id}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-foreground/10 py-7 sm:gap-8"
            >
              <span className="font-mono text-[10px] text-muted/50">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="flex min-w-0 items-center gap-4 sm:gap-6">
                <span
                  className="shrink-0 whitespace-nowrap font-mono text-lg tracking-tight sm:text-2xl"
                  style={{ color: cert.accent }}
                >
                  {cert.short}
                </span>
                <div className="min-w-0">
                  <h2 className="text-pretty font-sans text-lg font-medium leading-snug tracking-tight sm:text-xl">
                    {cert.title}
                  </h2>
                  <p className="mt-1 font-mono text-[11px] text-muted">{cert.issuer}</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="border border-foreground/10 px-2 py-1 font-mono text-[10px] lowercase text-muted">
                  {t(
                    language,
                    cert.status === "issued"
                      ? "gallery.statusIssued"
                      : "gallery.statusInProgress",
                  )}
                </span>
                <span className="font-mono text-[10px] text-muted/80">{cert.year}</span>
                {cert.status === "issued" && cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] lowercase text-muted underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-foreground"
                  >
                    {t(language, "gallery.credential")} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-xl font-mono text-[11px] leading-relaxed text-muted/80">
          {t(language, "gallery.note")}
        </p>
      </div>
    </main>
  );
}
