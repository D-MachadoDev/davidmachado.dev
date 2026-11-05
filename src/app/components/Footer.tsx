import { t, type Language } from "../i18n";
import { CV_URL, GITHUB_URL, LINKEDIN_URL } from "../data/links";
import { CONTACT_MAILTO } from "../lib/mailto";

const linkClass =
  "font-mono text-[11px] lowercase text-muted/80 transition-colors hover:text-foreground";

export function Footer({ language }: { language: Language }) {
  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto grid max-w-[1600px] gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1.6fr_1fr_1.2fr]">
        <div>
          <p className="font-sans text-sm tracking-tight">David Machado</p>
          <p className="mt-2 max-w-xs text-sm text-muted">{t(language, "contact.tagline")}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2.5">
          <a href={CONTACT_MAILTO} className={linkClass}>
            email <span aria-hidden="true">↗</span>
          </a>
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
        </nav>

        <div className="font-mono text-[11px] text-muted md:text-right">
          <p>{t(language, "contact.location")} · UTC-5</p>
          <p className="mt-2">{t(language, "contact.copyright")}</p>
          <p className="mt-2 text-[10px] text-muted/80">{t(language, "contact.builtWith")}</p>
        </div>
      </div>
    </footer>
  );
}
