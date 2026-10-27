import { BookOpen, CheckCircle2, MessageSquare, Users } from "lucide-react";
import { motion } from "motion/react";
import { type Language, t, type TranslationKey } from "../i18n";
import { FadeIn } from "./TextReveal";

const traits = [
  {
    icon: MessageSquare,
    titleKey: "about.work1Title" as TranslationKey,
    descKey: "about.work1Desc" as TranslationKey,
  },
  {
    icon: CheckCircle2,
    titleKey: "about.work2Title" as TranslationKey,
    descKey: "about.work2Desc" as TranslationKey,
  },
  {
    icon: BookOpen,
    titleKey: "about.work3Title" as TranslationKey,
    descKey: "about.work3Desc" as TranslationKey,
  },
  {
    icon: Users,
    titleKey: "about.work4Title" as TranslationKey,
    descKey: "about.work4Desc" as TranslationKey,
  },
];

export function HowIWork({ language }: { language: Language }) {
  return (
    <section
      id="how-i-work"
      className="py-20 sm:py-28 lg:py-32 px-6 sm:px-8 lg:px-12 relative"
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#EDEDED] tracking-tight max-w-3xl leading-tight text-balance">
            {t(language, "about.workTitle")}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#71717A] max-w-2xl leading-relaxed">
            {t(language, "about.workLede")}
          </p>
        </FadeIn>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-10">
          {traits.map((trait, index) => {
            const Icon = trait.icon;

            return (
              <motion.div
                key={trait.titleKey}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                className="border-t border-[#27272A] pt-5"
              >
                <Icon
                  className="w-4 h-4 mb-4 text-[#3B82F6]"
                  aria-hidden="true"
                />
                <h3 className="text-[#EDEDED] font-medium mb-2">
                  {t(language, trait.titleKey)}
                </h3>
                <p className="text-sm text-[#71717A] leading-relaxed">
                  {t(language, trait.descKey)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
