import { Download } from "lucide-react";
import { motion } from "motion/react";
import { type Language, t, type TranslationKey } from "../i18n";
import { FadeIn } from "./TextReveal";

const competencies = [
  {
    labelKey: "about.skillLang" as TranslationKey,
    items: ["C#", ".NET 10", "TypeScript", "JavaScript", "SQL"],
  },
  {
    labelKey: "about.skillData" as TranslationKey,
    items: ["PostgreSQL", "SQL Server", "SQLite", "EF Core", "Migrations"],
  },
  {
    labelKey: "about.skillArch" as TranslationKey,
    items: ["Hexagonal Architecture", "DDD", "CQRS", "REST APIs", "SOLID"],
  },
  {
    labelKey: "about.skillCloud" as TranslationKey,
    items: ["Docker", "Docker Compose", "Linux", "GitHub Actions"],
  },
  {
    labelKey: "about.skillDevops" as TranslationKey,
    items: ["Git", "GitHub", "Postman", "Swagger / OpenAPI"],
  },
  {
    labelKey: "about.skillMethods" as TranslationKey,
    items: ["xUnit", "Vitest", "Code Review", "Technical Docs"],
  },
  {
    labelKey: "about.skillAI" as TranslationKey,
    items: ["LLM APIs", "Prompt Engineering", "Workflow Automation"],
  },
];

export function About({ language }: { language: Language }) {
  const stats = [
    { label: t(language, "about.statProjects"), value: 3 },
    { label: t(language, "about.statTests"), value: 592 },
    { label: t(language, "about.statRepos"), value: 9 },
    { label: t(language, "about.statOpenSource"), value: 2 },
  ];

  return (
    <section
      id="about"
      className="min-h-screen py-20 sm:py-28 lg:py-32 px-6 sm:px-8 lg:px-12 relative"
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="mb-12 sm:mb-16">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <a
                href="https://github.com/D-MachadoDev"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
                aria-label="David Machado on GitHub"
              >
                <img
                  src="/assets/david-machado.jpg"
                  alt="David Machado"
                  width={64}
                  height={64}
                  loading="lazy"
                  className="w-16 h-16 rounded-full object-cover border border-[#27272A] hover:border-[#3B82F6] transition-colors"
                />
              </a>

              <div>
                <p className="text-sm text-[#EDEDED] font-medium">David Machado</p>
                <p className="text-xs font-mono text-[#71717A]">
                  Backend Software Engineer · {t(language, "contact.location")}
                </p>
              </div>

              <motion.div
                className="inline-block px-4 py-2 border border-[#27272A] backdrop-blur-sm sm:ml-auto"
                style={{ borderRadius: "8px" }}
              >
                <span className="text-xs sm:text-sm font-mono text-[#71717A] uppercase tracking-wider">
                  {t(language, "about.badge")}
                </span>
              </motion.div>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#EDEDED] mb-6 sm:mb-8 tracking-tight max-w-4xl leading-tight text-balance">
              {t(language, "about.heading")}{" "}
              <span className="text-[#3B82F6]">
                {t(language, "about.headingAccent")}
              </span>
            </h2>

            <div className="max-w-3xl space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl text-[#71717A] leading-relaxed">
              <p>{t(language, "about.p1")}</p>

              <p>
                {t(language, "about.p2pre")}{" "}
                <span className="text-[#EDEDED]">
                  {t(language, "about.p2cloud")}
                </span>
                ,{" "}
                <span className="text-[#EDEDED]">
                  {t(language, "about.p2distributed")}
                </span>
                {t(language, "about.p2and")}{" "}
                <span className="text-[#EDEDED]">{t(language, "about.p2dx")}</span>
                {t(language, "about.p2post")}
              </p>

              <p>{t(language, "about.p3")}</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-8 sm:mt-10"
            >
              <a
                href="/assets/cv/david-machado-cv.pdf"
                download="david-machado-cv.pdf"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-[#71717A] hover:text-[#EDEDED] border border-[#27272A] hover:border-[#3B82F6] transition-all"
                style={{ borderRadius: "8px" }}
              >
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                {t(language, "about.downloadCv")}
              </a>
            </motion.div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-y border-[#27272A] py-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl sm:text-4xl text-[#EDEDED] font-bold font-mono mb-2 tabular-nums">
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-[11px] sm:text-xs text-[#71717A] uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-16 sm:mt-20">
            <h3 className="text-2xl sm:text-3xl md:text-4xl text-[#EDEDED] mb-8">
              {t(language, "about.competencies")}
            </h3>

            <div className="grid sm:grid-cols-2 gap-x-10">
              {competencies.map((group, index) => (
                <motion.div
                  key={group.labelKey}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.04, duration: 0.4 }}
                  className="border-t border-[#1F1F22] py-3 sm:py-4"
                >
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#71717A] mb-1">
                    {t(language, group.labelKey)}
                  </div>
                  <div className="text-sm text-[#A1A1AA]">
                    {group.items.join(" · ")}
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="mt-8 text-xs font-mono text-[#52525B]">
              <span className="uppercase tracking-wider">
                {t(language, "about.philosophy")}:
              </span>{" "}
              {t(language, "about.phil1Title")} · {t(language, "about.phil2Title")}{" "}
              · {t(language, "about.phil3Title")}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
