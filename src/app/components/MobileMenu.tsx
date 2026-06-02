import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { type Language, t } from "../i18n";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const navSections = [
  { id: "work", key: "nav.work" },
  { id: "about", key: "nav.about" },
  { id: "experience", key: "nav.experience" },
  { id: "contact", key: "nav.contact" },
] as const;

export function MobileMenu({ isOpen, onClose, language }: MobileMenuProps) {

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#0A0A0A] border-l border-[#27272A] z-[70] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-[#27272A]">
              <h2 className="text-xl text-[#EDEDED] font-mono font-bold">DM</h2>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-[#71717A] hover:text-[#EDEDED] transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <nav className="p-6">
              <ul className="space-y-2">
                {navSections.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.button
                      onClick={() => scrollToSection(item.id)}
                      whileHover={{ x: 10 }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6"
            >
                <a
                href="https://mail.google.com/mail/?view=cm&to=davidmachado.dev07@gmail.com&su=Hola%20David"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 px-6 bg-[#3B82F6] text-[#EDEDED] text-center font-medium hover:bg-[#2563EB] transition-all"
                style={{ borderRadius: "4px" }}
              >
                {t(language, "nav.cta")}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="p-6 border-t border-[#27272A] mt-auto"
            >
              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-[#71717A] mb-1">{t(language, "mobile.location")}</div>
                  <div className="text-[#EDEDED]">{t(language, "contact.location")}</div>
                </div>
                <div>
                  <div className="text-[#71717A] mb-1">{t(language, "mobile.email")}</div>
                  <div className="text-[#EDEDED] font-mono text-xs">
                    davidmachado.dev07@gmail.com
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
