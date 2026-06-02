import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { MagneticButton } from "./MagneticButton";
import { MobileMenu } from "./MobileMenu";
import { Globe, ChevronDown } from "lucide-react";
import { type Language, languageMeta, t } from "../i18n";

const navSections = [
  { id: "work", key: "nav.work" },
  { id: "about", key: "nav.about" },
  { id: "experience", key: "nav.experience" },
  { id: "contact", key: "nav.contact" },
] as const;

interface NavbarProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

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
    ["rgba(5, 5, 5, 0)", "rgba(5, 5, 5, 0.9)"]
  );

  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      setScrolled(y > 50);

      const hero = document.getElementById("hero");
      if (hero) {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        setIsInHero(y < heroBottom - 100);
      }

      const sections = navSections.map((item) => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));

      let current = "";
      for (const section of sections) {
        if (section.el) {
          const rect = section.el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            current = section.id;
          }
        }
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
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
              aria-label={t(language, "nav.language")}
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
                      {(Object.entries(languageMeta) as [
                        Language,
                        (typeof languageMeta)[Language]
                      ][]).map(([key, meta]) => (
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
}