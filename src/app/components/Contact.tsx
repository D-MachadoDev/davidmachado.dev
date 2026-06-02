import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { type ComponentType, useState, type FormEvent } from "react";
import { FadeIn } from "./TextReveal";
import { MagneticButton } from "./MagneticButton";
import { type Language, type TranslationKey, t } from "../i18n";

interface ContactProps {
  language: Language;
}

const contactLinks: {
  icon: ComponentType<{ className?: string }>;
  labelKey: TranslationKey;
  value: string;
  href: string;
}[] = [
  {
    icon: Mail,
    labelKey: "nav.contact",
    value: "davidmachado.dev07@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&to=davidmachado.dev07@gmail.com&su=Hola%20David",
  },
  {
    icon: FaGithub,
    labelKey: "contact.github",
    value: "@D-MachadoDev",
    href: "https://github.com/D-MachadoDev",
  },
  {
    icon: FaLinkedinIn,
    labelKey: "contact.linkedin",
    value: "David Machado",
    href: "https://www.linkedin.com/in/david-machado-94b3921a2/",
  },
  {
    icon: FaXTwitter,
    labelKey: "contact.twitter",
    value: "@Davidma13020061",
    href: "https://x.com/Davidma13020061",
  },
];

function ContactForm({ language }: { language: Language }) {
  const [formState, setFormState] = useState<"idle" | "sending" | "success">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setFormState("success");

    setTimeout(() => {
      setFormState("idle");
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const inputClasses =
    "w-full bg-[#0A0A0A] border border-[#27272A] text-[#EDEDED] px-4 py-3 sm:py-4 font-mono text-sm focus:border-[#3B82F6] focus:outline-none transition-colors placeholder:text-[#3a3a3a]";

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="border border-[#27272A] p-6 sm:p-8 md:p-10 relative overflow-hidden group hover:border-[#3B82F6]/20 transition-all duration-500"
      style={{ borderRadius: "12px" }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.04) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10">
        <h3 className="text-xl sm:text-2xl text-[#EDEDED] mb-6 sm:mb-8">
          {t(language, "contact.formTitle")}
        </h3>

        <AnimatePresence mode="wait">
          {formState === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 gap-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <CheckCircle className="w-16 h-16 text-[#10B981]" />
              </motion.div>

              <p className="text-[#EDEDED] text-lg font-medium">
                {t(language, "contact.sent")}
              </p>
              <p className="text-[#71717A] text-sm">
                {t(language, "contact.sentSub")}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 sm:space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono text-[#71717A] uppercase tracking-wider mb-2"
                  >
                    {t(language, "contact.labelName")}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={inputClasses}
                    style={{ borderRadius: "8px" }}
                    placeholder={t(language, "contact.placeholderName")}
                    disabled={formState === "sending"}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono text-[#71717A] uppercase tracking-wider mb-2"
                  >
                    {t(language, "contact.labelEmail")}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={inputClasses}
                    style={{ borderRadius: "8px" }}
                    placeholder={t(language, "contact.placeholderEmail")}
                    disabled={formState === "sending"}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono text-[#71717A] uppercase tracking-wider mb-2"
                >
                  {t(language, "contact.labelMessage")}
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={`${inputClasses} resize-none`}
                  style={{ borderRadius: "8px" }}
                  placeholder={t(language, "contact.placeholderMessage")}
                  disabled={formState === "sending"}
                />
              </div>

              <motion.button
                type="submit"
                disabled={formState === "sending"}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#3B82F6] text-[#EDEDED] font-medium hover:bg-[#2563EB] transition-all relative overflow-hidden disabled:opacity-70"
                style={{ borderRadius: "8px" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {formState === "sending" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{t(language, "contact.sending")}</span>
                  </>
                ) : (
                  <>
                    <span>{t(language, "contact.send")}</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.form>
  );
}

export function Contact({ language }: ContactProps) {
  return (
    <section
      id="contact"
      className="min-h-screen py-16 sm:py-24 lg:py-32 px-6 sm:px-8 lg:px-12 relative flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-12 sm:mb-16">
          <div className="flex flex-col">
            <FadeIn>
              <div className="text-left mb-12">
                <motion.div
                  className="inline-block px-4 py-2 border border-[#27272A] mb-6 backdrop-blur-sm"
                  style={{ borderRadius: "8px" }}
                >
                  <span className="text-xs sm:text-sm font-mono text-[#71717A] uppercase tracking-wider">
                    {t(language, "contact.badge")}
                  </span>
                </motion.div>

                <h2 className="text-5xl lg:text-6xl text-[#EDEDED] mb-6 sm:mb-8 tracking-tight leading-tight">
                  {t(language, "contact.heading")}
                  <br />
                  <span className="text-[#3B82F6]">
                    {t(language, "contact.headingAccent")}
                  </span>
                </h2>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#71717A] max-w-xl leading-relaxed">
                  {t(language, "contact.subtitle")}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className="p-3 border border-[#27272A] hover:border-[#10B981]/30 transition-all relative shrink-0"
                    style={{ borderRadius: "8px" }}
                  >
                    <motion.div
                      className="w-3 h-3 rounded-full bg-[#10B981]"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  <div>
                    <div className="text-xs sm:text-sm text-[#71717A] mb-1 font-mono uppercase tracking-wider">
                      {t(language, "contact.availability")}
                    </div>
                    <div className="text-[#EDEDED] font-medium text-base sm:text-lg">
                      {t(language, "contact.availStatus")}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className="p-3 border border-[#27272A] hover:border-[#3B82F6]/30 transition-all shrink-0"
                    style={{ borderRadius: "8px" }}
                  >
                    <div className="text-[#3B82F6] font-mono text-sm font-bold">
                      UTC
                    </div>
                  </div>

                  <div>
                    <div className="text-xs sm:text-sm text-[#71717A] mb-1 font-mono uppercase tracking-wider">
                      {t(language, "contact.timezone")}
                    </div>
                    <div className="text-[#EDEDED] font-medium text-base sm:text-lg font-mono">
                      UTC-5
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="flex flex-col gap-12 lg:w-full">
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {contactLinks.map((link, index) => {
                  const Icon = link.icon;

                  return (
                    <motion.div
                      key={link.labelKey}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.05, duration: 0.6 }}
                    >
                      <MagneticButton
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group border border-[#27272A] p-5 sm:p-6 hover:border-[#3B82F6] transition-all duration-300 flex items-center gap-4 relative overflow-hidden block w-full"
                        style={{ borderRadius: "10px" }}
                      >
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background:
                              "radial-gradient(circle at 0% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 70%)",
                          }}
                        />

                        <motion.div
                          whileHover={{ scale: 1.08, rotate: 4 }}
                          className="relative p-3 border border-[#27272A] group-hover:border-[#3B82F6] transition-all shrink-0"
                          style={{ borderRadius: "8px" }}
                        >
                          <Icon className="w-5 h-5 text-[#3B82F6] relative z-10" />
                        </motion.div>

                        <div className="flex-1 text-left relative z-10 min-w-0">
                          <div className="text-xs text-[#71717A] mb-0.5 font-mono uppercase tracking-wider">
                            {t(language, link.labelKey)}
                          </div>
                          <div className="text-[#EDEDED] group-hover:text-[#3B82F6] transition-colors font-medium text-base truncate">
                            {link.value}
                          </div>
                        </div>

                        <Send className="w-4 h-4 text-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </MagneticButton>
                    </motion.div>
                  );
                })}
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <ContactForm language={language} />
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={0.6}>
          <div className="mt-24 sm:mt-32 pt-8 sm:pt-10 border-t border-[#27272A]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="text-sm text-[#71717A] font-mono mb-2">
                  {t(language, "contact.copyright")}
                </p>
                <p className="text-xs text-[#71717A]">
                  {t(language, "contact.tagline")}
                </p>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                {contactLinks.slice(1).map((link) => (
                  <MagneticButton
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-[#71717A] hover:text-[#3B82F6] transition-colors border border-transparent hover:border-[#3B82F6]/20"
                    style={{ borderRadius: "8px" }}
                    aria-label={t(language, link.labelKey as TranslationKey)}
                  >
                    <link.icon className="w-5 h-5" />
                  </MagneticButton>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-[#71717A] font-mono">
                {t(language, "contact.builtWith")}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}