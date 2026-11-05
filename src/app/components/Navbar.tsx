<<<<<<< Updated upstream
import { ChevronDown, Globe } from "lucide-react";
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
	useTransform,
} from "motion/react";
import { useEffect, useState } from "react";
import { type Language, languageMeta, t } from "../i18n";
import { MagneticButton } from "./MagneticButton";
import { MobileMenu } from "./MobileMenu";
=======
import { useCallback, useEffect, useRef, useState } from "react";
import { languageOrder, t, type Language, type TranslationKey } from "../i18n";
import { CONTACT_MAILTO } from "../lib/mailto";
import { Link, useRouter, type Route } from "../router";
import type { ThemePreference } from "../theme";
import { ThemeToggle } from "./ThemeToggle";
>>>>>>> Stashed changes

interface NavItem {
  href: string;
  key: TranslationKey;
  glyph: string;
  match: Route["name"][];
}

<<<<<<< Updated upstream
export function Navbar({ language, onLanguageChange }: NavbarProps) {
	const [scrolled, setScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("");
	const [langMenuOpen, setLangMenuOpen] = useState(false);
	const [isInHero, setIsInHero] = useState(true);

	const { scrollY } = useScroll();

	const backgroundColor = useTransform(
		scrollY,
		[0, 80],
		["rgba(5, 5, 5, 0)", "rgba(5, 5, 5, 0.9)"],
	);

	const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);

	// Synchronize 'scrolled' and 'isInHero' booleans without synchronous DOM layout reads
	useMotionValueEvent(scrollY, "change", (latest) => {
		const isScrolled = latest > 50;
		setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
		if (latest <= 50) {
			setIsInHero(true);
		}
	});

	// Asynchronous IntersectionObserver for active section highlighting & hero tracking
	useEffect(() => {
		const sectionIds = ["hero", "work", "about", "experience", "contact"];
		const entryMap = new Map<string, IntersectionObserverEntry>();

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					entryMap.set(entry.target.id, entry);
				}

				let bestId = "";
				let maxHeight = 0;

				for (const [id, entry] of entryMap.entries()) {
					if (
						entry.isIntersecting &&
						entry.intersectionRect.height > maxHeight
					) {
						maxHeight = entry.intersectionRect.height;
						bestId = id;
					}
				}

				if (bestId === "hero") {
					setIsInHero(true);
					setActiveSection("");
				} else if (bestId) {
					setIsInHero(false);
					setActiveSection(bestId);
				}
			},
			{
				// Detection band sits under the 96px navbar down to 35% viewport height
				rootMargin: "-96px 0px -65% 0px",
				threshold: [0, 0.2, 0.5, 0.8, 1],
			},
		);

		for (const id of sectionIds) {
			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		}

		return () => {
			observer.disconnect();
			entryMap.clear();
		};
	}, []);

	useEffect(() => {
		document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

		return () => {
			document.body.style.overflow = "";
		};
	}, [mobileMenuOpen]);

	useEffect(() => {
		if (mobileMenuOpen) {
			setLangMenuOpen(false);
		}
	}, [mobileMenuOpen]);

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (!element) return;

		const navbarOffset = 96;
		const elementTop =
			element.getBoundingClientRect().top + window.pageYOffset - navbarOffset;

		window.scrollTo({
			top: Math.max(elementTop, 0),
			behavior: "smooth",
		});

		setMobileMenuOpen(false);
		setLangMenuOpen(false);
	};

	return (
		<motion.nav
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
			style={{ backgroundColor }}
			className={`fixed top-0 left-0 right-0 z-50 transition-[backdrop-filter] duration-300 ${
				scrolled ? "backdrop-blur-2xl" : ""
			}`}
		>
			<motion.div
				className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#27272A]"
				style={{ opacity: borderOpacity }}
			/>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between">
				<MagneticButton
					onClick={() => scrollToSection("hero")}
					className="relative group"
				>
					<motion.div
						className="relative"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<span className="text-[#EDEDED] font-mono font-bold text-xl tracking-tighter">
							DM
						</span>

						<motion.div
							className="absolute -bottom-1 left-0 h-[2px] bg-[#3B82F6]"
							initial={{ width: 0 }}
							whileHover={{ width: "100%" }}
							transition={{ duration: 0.3 }}
						/>
					</motion.div>
				</MagneticButton>

				<div className="hidden md:flex items-center gap-1 relative">
					{navSections.map((item, index) => {
						const isActive = activeSection === item.id;

						return (
							<motion.button
								key={item.id}
								onClick={() => scrollToSection(item.id)}
								initial={{ opacity: 0, y: -16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.08 + 0.2, duration: 0.4 }}
								className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
									isActive
										? "text-[#EDEDED]"
										: "text-[#71717A] hover:text-[#EDEDED]"
								}`}
							>
								{isActive && (
									<motion.span
										layoutId="nav-active-pill"
										className="absolute inset-0 rounded-md"
										style={{
											backgroundColor: "rgba(59, 130, 246, 0.1)",
											border: "1px solid rgba(59, 130, 246, 0.2)",
										}}
										transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
									/>
								)}

								<span className="relative z-10 inline-flex overflow-hidden">
									<AnimatePresence mode="wait">
										<motion.span
											key={`${item.id}-${language}`}
											initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
											animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
											exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
											transition={{
												duration: 0.22,
												ease: [0.22, 1, 0.36, 1],
											}}
											className="block"
										>
											{t(language, item.key)}
										</motion.span>
									</AnimatePresence>
								</span>
							</motion.button>
						);
					})}
				</div>

				<div className="hidden md:flex items-center gap-3">
					<div className="relative">
						<motion.button
							type="button"
							whileTap={{ scale: 0.96 }}
							onClick={() => setLangMenuOpen((prev) => !prev)}
							className="group px-3 py-2 text-sm font-medium text-[#EDEDED] border border-[#27272A] hover:border-[#3B82F6]/50 transition-all duration-300 flex items-center gap-2"
							style={{
								borderRadius: "6px",
								backgroundColor: "rgba(10, 10, 10, 0.6)",
								backdropFilter: "blur(8px)",
							}}
							aria-label={`${t(language, "nav.language")}: ${language.toUpperCase()} - ${languageMeta[language].label}`}
						>
							<Globe className="w-3.5 h-3.5 text-[#71717A] group-hover:text-[#3B82F6] transition-colors" />

							<span className="inline-flex overflow-hidden min-w-[52px]">
								<AnimatePresence mode="wait">
									<motion.span
										key={language}
										initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
										animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
										exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
										transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
										className="block"
									>
										{languageMeta[language].flag} {language.toUpperCase()}
									</motion.span>
								</AnimatePresence>
							</span>

							<motion.div
								animate={{ rotate: langMenuOpen ? 180 : 0 }}
								transition={{ duration: 0.2 }}
							>
								<ChevronDown className="w-3 h-3 text-[#71717A]" />
							</motion.div>
						</motion.button>

						<AnimatePresence>
							{langMenuOpen && (
								<>
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="fixed inset-0 z-[-1]"
										onClick={() => setLangMenuOpen(false)}
									/>

									<motion.div
										initial={{ opacity: 0, y: 8, scale: 0.95 }}
										animate={{ opacity: 1, y: 0, scale: 1 }}
										exit={{ opacity: 0, y: 8, scale: 0.95 }}
										transition={{
											duration: 0.15,
											ease: [0.33, 1, 0.68, 1],
										}}
										className="absolute right-0 mt-2 w-40 border border-[#27272A] shadow-2xl overflow-hidden"
										style={{
											borderRadius: "8px",
											backgroundColor: "rgba(8, 8, 8, 0.95)",
											backdropFilter: "blur(16px)",
										}}
									>
										<div className="py-1">
											{(
												Object.entries(languageMeta) as [
													Language,
													(typeof languageMeta)[Language],
												][]
											).map(([key, meta]) => (
												<button
													key={key}
													type="button"
													onClick={() => {
														onLanguageChange(key);
														setLangMenuOpen(false);
													}}
													className={`relative w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center gap-3 ${
														language === key
															? "text-[#3B82F6]"
															: "text-[#EDEDED] hover:bg-[#27272A]/60"
													}`}
												>
													{language === key && (
														<motion.span
															layoutId="lang-active"
															className="absolute left-0 w-[2px] h-5 bg-[#3B82F6] rounded-r"
														/>
													)}

													<span>{meta.flag}</span>
													<span className="font-medium">{meta.native}</span>

													{language === key && (
														<span className="ml-auto text-xs text-[#3B82F6]/60">
															✓
														</span>
													)}
												</button>
											))}
										</div>
									</motion.div>
								</>
							)}
						</AnimatePresence>
					</div>

					<MagneticButton
						href="https://mail.google.com/mail/?view=cm&to=davidmachado.dev07@gmail.com&su=Hola%20David"
						target="_blank"
						rel="noopener noreferrer"
						className="group px-5 py-2.5 text-sm font-medium text-[#EDEDED] border border-[#27272A] hover:border-[#3B82F6]/60 transition-all duration-300 relative overflow-hidden"
						style={{ borderRadius: "6px" }}
					>
						<motion.span
							className="absolute inset-0"
							style={{ backgroundColor: "rgba(59, 130, 246, 0.08)" }}
							initial={{ x: "-100%" }}
							whileHover={{ x: 0 }}
							transition={{ duration: 0.3 }}
						/>

						<span className="relative z-10 flex items-center gap-2">
							<motion.span
								className="inline-block w-1.5 h-1.5 rounded-full bg-[#10B981]"
								animate={{ opacity: [1, 0.4, 1] }}
								transition={{ duration: 2, repeat: Infinity }}
							/>

							<AnimatePresence mode="wait">
								<motion.span
									key={language}
									initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
									animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
									exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
									transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
									className="block"
								>
									{t(language, "nav.cta")}
								</motion.span>
							</AnimatePresence>
						</span>
					</MagneticButton>
				</div>

				{isInHero && (
					<motion.button
						type="button"
						whileTap={{ scale: 0.9 }}
						onClick={() => setMobileMenuOpen((prev) => !prev)}
						className="md:hidden text-[#EDEDED] p-2 w-10 h-10 flex items-center justify-center"
						aria-label={
							mobileMenuOpen
								? t(language, "nav.closeMenu")
								: t(language, "nav.openMenu")
						}
					>
						<div className="w-6 flex flex-col items-end gap-1.5">
							<motion.span
								animate={{
									rotate: mobileMenuOpen ? 45 : 0,
									y: mobileMenuOpen ? 8 : 0,
								}}
								transition={{ duration: 0.25 }}
								className="block h-[2px] bg-current origin-center"
								style={{ width: "100%" }}
							/>
							<motion.span
								animate={{
									opacity: mobileMenuOpen ? 0 : 1,
									x: mobileMenuOpen ? 10 : 0,
								}}
								transition={{ duration: 0.18 }}
								className="block h-[2px] bg-current"
								style={{ width: "75%" }}
							/>
							<motion.span
								animate={{
									rotate: mobileMenuOpen ? -45 : 0,
									y: mobileMenuOpen ? -8 : 0,
								}}
								transition={{ duration: 0.25 }}
								className="block h-[2px] bg-current origin-center"
								style={{ width: "66%" }}
							/>
						</div>
					</motion.button>
				)}
			</div>

			<MobileMenu
				isOpen={mobileMenuOpen}
				onClose={() => setMobileMenuOpen(false)}
				language={language}
				onLanguageChange={onLanguageChange}
			/>
		</motion.nav>
	);
=======
const NAV_ITEMS: NavItem[] = [
  { href: "/", key: "nav.pond", glyph: "~", match: ["home"] },
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
>>>>>>> Stashed changes
}
