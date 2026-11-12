import { useCallback, useEffect, useRef, useState } from "react";
import { languageOrder, t, type Language, type TranslationKey } from "../i18n";
import { CONTACT_MAILTO } from "../lib/mailto";
import { Link, useRouter, type Route } from "../router";
import type { ThemePreference } from "../theme";
import { ThemeToggle } from "./ThemeToggle";

interface NavItem {
  href: string;
  key: TranslationKey;
  glyph: string;
  match: Route["name"][];
}

const NAV_ITEMS: NavItem[] = [
  { href: "/projects", key: "nav.projects", glyph: "#", match: ["projects", "project"] },
  { href: "/gallery", key: "nav.gallery", glyph: "*", match: ["gallery"] },
  { href: "/about", key: "nav.about", glyph: "?", match: ["about"] },
];

function isActive(route: Route, item: NavItem): boolean {
  return item.match.includes(route.name);
}

function LanguagePicker({
  language,
  onChange,
  className,
}: {
  language: Language;
  onChange: (language: Language) => void;
  className?: string;
}) {
  return (
    <fieldset
      className={`m-0 min-w-0 border-0 p-0 ${className ?? ""}`}
      aria-label={t(language, "nav.language")}
    >
      {languageOrder.map((code, index) => (
        <span key={code} className="inline-flex items-center">
          {index > 0 && <span className="mx-1.5 text-muted/40">/</span>}
          <button
            type="button"
            onClick={() => onChange(code)}
            aria-pressed={code === language}
            className={`font-mono text-[11px] lowercase transition-colors ${
              code === language ? "text-foreground" : "text-muted/80 hover:text-foreground"
            }`}
          >
            {code}
          </button>
        </span>
      ))}
    </fieldset>
  );
}

export function Navbar({
  language,
  onLanguageChange,
  themePreference,
  onThemeChange,
}: {
  language: Language;
  onLanguageChange: (language: Language) => void;
  themePreference: ThemePreference;
  onThemeChange: (preference: ThemePreference) => void;
}) {
  const { route } = useRouter();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("button, a[href]")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background via-background/85 to-transparent" />
      <div className="relative mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-sans text-[15px] tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          David Machado
        </Link>

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(route, item);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group inline-flex items-baseline gap-1.5 font-mono text-[12px] lowercase transition-colors ${
                  active ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`text-[9px] transition-opacity ${
                    active ? "text-accent opacity-100" : "opacity-0 group-hover:opacity-40"
                  }`}
                >
                  {item.glyph}
                </span>
                {t(language, item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <LanguagePicker
            language={language}
            onChange={onLanguageChange}
            className="hidden items-center sm:flex"
          />
          <ThemeToggle
            language={language}
            preference={themePreference}
            onChange={onThemeChange}
            className="hidden items-center sm:flex"
          />
          <a
            href={CONTACT_MAILTO}
            className="hidden font-mono text-[11px] lowercase text-muted/80 transition-colors hover:text-foreground lg:inline"
          >
            {t(language, "nav.sayHi")} <span aria-hidden="true">↗</span>
          </a>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="font-mono text-[11px] lowercase text-muted/80 transition-colors hover:text-foreground md:hidden"
          >
            {open ? t(language, "nav.closeMenu") : t(language, "nav.openMenu")}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label={t(language, "a11y.mobileMenu")}
          className="fixed inset-0 z-[60] bg-background md:hidden"
        >
          <div ref={panelRef} className="flex h-dvh flex-col px-5 pb-8 pt-4">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[15px] tracking-tight">David Machado</span>
              <button
                type="button"
                onClick={close}
                className="font-mono text-[11px] lowercase text-muted transition-colors hover:text-foreground"
              >
                {t(language, "nav.closeMenu")} <span aria-hidden="true">×</span>
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-16 flex flex-col gap-7">
              {NAV_ITEMS.map((item, index) => {
                const active = isActive(route, item);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-baseline gap-4 font-sans text-4xl tracking-tight transition-colors ${
                  active ? "text-foreground" : "text-muted/80 hover:text-foreground"
                    }`}
                  >
                    <span className="font-mono text-[10px] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {t(language, item.key)}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto flex flex-col gap-5">
              <ThemeToggle
                language={language}
                preference={themePreference}
                onChange={onThemeChange}
                className="flex items-center"
              />
              <div className="flex items-end justify-between gap-6">
                <LanguagePicker
                  language={language}
                  onChange={onLanguageChange}
                  className="flex items-center"
                />
                <a
                  href={CONTACT_MAILTO}
                  className="font-mono text-[11px] lowercase text-muted transition-colors hover:text-foreground"
                >
                  {t(language, "nav.sayHi")} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
