import { motion, AnimatePresence } from "motion/react";
import { X, Globe } from "lucide-react";
import { type Language, languageMeta, t } from "../i18n";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const navSections = [
  { id: "work", key: "nav.work" },
  { id: "about", key: "nav.about" },
  { id: "experience", key: "nav.experience" },
  { id: "contact", key: "nav.contact" },
] as const;

export function MobileMenu({
  isOpen,
  onClose,
  language,
  onLanguageChange,
}: MobileMenuProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    onClose();

    window.setTimeout(() => {
      const navbarOffset = 96;
      const elementTop =
        element.getBoundingClientRect().top + window.pageYOffset - navbarOffset;

      window.scrollTo({
        top: Math.max(elementTop, 0),
        behavior: "smooth",
      });
    }, 40);
  };

  const handleLanguageChange = (nextLanguage: Language) => {
    onLanguageChange(nextLanguage);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu-root"
          className="fixed inset-0 z-[60] md:hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 z-0"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 w-full max-w-sm h-dvh bg-[#0A0A0A] border-l border-[#27272A] z-10 overflow-y-auto overscroll-contain will-change-transform flex flex-col"
            aria-label="Mobile navigation menu"
          >
            <div className="flex items-center justify-between p-6 border-b border-[#27272A]">
              <h2 className="text-xl text-[#EDEDED] font-mono font-bold">DM</h2>

              <motion.button
                type="button"
                onClick={onClose}
                whileTap={{ scale: 0.92 }}
                className="p-2 text-[#71717A] hover:text-[#EDEDED] transition-colors"
                aria-label={t(language, "nav.closeMenu")}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <nav className="p-6">
              <ul className="space-y-2">
                {navSections.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.2 }}
                  >
                    <motion.button
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-left py-4 px-4 text-2xl text-[#EDEDED] hover:text-[#3B82F6] transition-colors border-b border-[#27272A] hover:border-[#3B82F6]"
                    >
                      <span className="font-mono text-sm text-[#71717A] mr-4">
                        0{index + 1}
                      </span>
                      {t(language, item.key)}
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.24 }}
              className="px-6 pb-2"
            >
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#71717A]">
                <Globe className="w-3.5 h-3.5" />
                <span>{t(language, "nav.language")}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {(Object.entries(languageMeta) as [
                  Language,
                  (typeof languageMeta)[Language]
                ][]).map(([key, meta]) => {
                  const isActive = language === key;

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleLanguageChange(key)}
                      className={`px-4 py-3 rounded-lg border text-sm flex items-center justify-center gap-2 transition-colors ${
                        isActive
                          ? "border-[#3B82F6] text-[#EDEDED] bg-[#3B82F6]/10"
                          : "border-[#27272A] text-[#71717A] hover:text-[#EDEDED] hover:border-[#3B82F6]/40"
                      }`}
                    >
                      <span>{meta.flag}</span>
                      <span>{meta.native}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.24 }}
              className="p-6"
            >
              <a
                href="https://mail.google.com/mail/?view=cm&to=davidmachado.dev07@gmail.com&su=Hola%20David"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 px-6 bg-[#3B82F6] text-[#EDEDED] text-center font-medium hover:bg-[#2563EB] transition-all"
                style={{ borderRadius: "8px" }}
              >
                {t(language, "nav.cta")}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.34, duration: 0.24 }}
              className="p-6 border-t border-[#27272A] mt-auto"
            >
              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-[#71717A] mb-1">
                    {t(language, "mobile.location")}
                  </div>
                  <div className="text-[#EDEDED]">
                    {t(language, "contact.location")}
                  </div>
                </div>

                <div>
                  <div className="text-[#71717A] mb-1">
                    {t(language, "mobile.email")}
                  </div>
                  <a
                    href="mailto:davidmachado.dev07@gmail.com"
                    className="text-[#EDEDED] font-mono text-xs break-all hover:text-[#3B82F6] transition-colors"
                  >
                    davidmachado.dev07@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}