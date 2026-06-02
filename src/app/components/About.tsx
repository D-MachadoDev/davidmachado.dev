import { motion } from "motion/react";
import {
  Code2,
  Boxes,
  Cloud,
  Database,
  Terminal,
  GitBranch,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { FadeIn } from "./TextReveal";
import { useRef, useState, useEffect } from "react";
import { type Language, t, type TranslationKey } from "../i18n";

const skills = [
  {
    icon: Cloud,
    categoryKey: "about.skillCloud" as TranslationKey,
    items: ["AWS", "Docker", "CI/CD", "Azure"],
    color: "#60A5FA",
  },
  {
    icon: Code2,
    categoryKey: "about.skillLang" as TranslationKey,
    items: ["C#", ".NET", "Python", "JavaScript"],
    color: "#34D399",
  },
  {
    icon: Database,
    categoryKey: "about.skillData" as TranslationKey,
    items: ["SQL Server", "MySQL", "Oracle", "MongoDB"],
    color: "#FBBF24",
  },
  {
    icon: Boxes,
    categoryKey: "about.skillArch" as TranslationKey,
    items: ["APIs", "Microservices", "SaaS", "Integrations"],
    color: "#A78BFA",
  },
  {
    icon: Terminal,
    categoryKey: "about.skillDevops" as TranslationKey,
    items: ["Git", "Linux", "Docker", "Azure Portal"],
    color: "#F472B6",
  },
  {
    icon: GitBranch,
    categoryKey: "about.skillMethods" as TranslationKey,
    items: ["Scrum", "Kanban", "Code Review", "Documentation"],
    color: "#22D3EE",
  },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [displayed, setDisplayed] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasAnimated || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;

        setHasAnimated(true);

        const duration = 1800;
        const steps = 50;
        const increment = value / steps;
        const stepTime = duration / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;

          if (current >= value) {
            current = value;
            clearInterval(timer);
          }

          setDisplayed(Math.round(current));
        }, stepTime);
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div
      ref={ref}
      className="text-4xl md:text-5xl text-[#60A5FA] font-bold font-mono mb-3 tabular-nums"
    >
      {displayed.toLocaleString()}
      {suffix}
    </div>
  );
}

function SkillCard({
  skill,
  index,
  language,
}: {
  skill: (typeof skills)[number];
  index: number;
  language: Language;
}) {
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.55 }}
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      className="group border border-[#27272A] p-6 transition-all duration-300 relative overflow-hidden h-full"
      style={{
        borderRadius: "8px",
        backgroundColor: "#0B0B0C",
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 20% 15%, ${skill.color}08 0%, transparent 42%)`,
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          border: `1px solid ${skill.color}55`,
          borderRadius: "8px",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-5">
          <motion.div
            whileHover={{ scale: 1.05, y: -1 }}
            className="relative p-3 border border-[#27272A] transition-all"
            style={{
              borderRadius: "8px",
              background: "rgba(255,255,255,0.01)",
            }}
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                borderRadius: "8px",
                background: `radial-gradient(circle at 50% 50%, ${skill.color}18 0%, transparent 70%)`,
              }}
            />
            <Icon className="w-5 h-5 relative z-10" style={{ color: skill.color }} />
          </motion.div>

          <div className="flex-1">
            <h4 className="text-[#EDEDED] mb-2 font-medium text-lg">
              {t(language, skill.categoryKey)}
            </h4>

            <div
              className="w-12 h-[2px] bg-[#27272A] overflow-hidden"
              style={{ borderRadius: "999px" }}
            >
              <motion.div
                className="h-full"
                style={{ backgroundColor: skill.color }}
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + index * 0.05, duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {skill.items.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 + i * 0.03, duration: 0.35 }}
              whileHover={{
                y: -1,
                color: "#EDEDED",
                borderColor: `${skill.color}55`,
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
              className="text-xs font-mono text-[#A1A1AA] px-3 py-1.5 border border-[#27272A] transition-all cursor-default"
              style={{ borderRadius: "6px" }}
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function About({ language }: { language: Language }) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const handleDownloadCV = async () => {
    try {
      const res = await fetch("/assets/cv/david-machado-cv.pdf", { method: "HEAD" });

      if (res.ok) {
        const link = document.createElement("a");
        link.href = "/assets/cv/david-machado-cv.pdf";
        link.download = "david-machado-cv.pdf";
        link.click();
        return;
      }

      toast("CV próximamente disponible", { duration: 2000 });
    } catch {
      toast("CV próximamente disponible", { duration: 2000 });
    }
  };

  // Cambia estos números cuando quieras actualizar tus métricas.
  const stats = [
    { label: t(language, "about.statYears"), value: 2, suffix: "+" },   // años de experiencia
    { label: t(language, "about.statProjects"), value: 12, suffix: "+" }, // proyectos importantes
    { label: t(language, "about.statRepos"), value: 25, suffix: "+" },   // repos relevantes
    { label: t(language, "about.statLines"), value: 20, suffix: "k+" },  // líneas aproximadas
  ];

  const philosophy = [
    {
      num: "01",
      title: t(language, "about.phil1Title"),
      desc: t(language, "about.phil1Desc"),
      color: "#3B82F6",
    },
    {
      num: "02",
      title: t(language, "about.phil2Title"),
      desc: t(language, "about.phil2Desc"),
      color: "#10B981",
    },
    {
      num: "03",
      title: t(language, "about.phil3Title"),
      desc: t(language, "about.phil3Desc"),
      color: "#8B5CF6",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen py-16 sm:py-24 lg:py-32 px-6 sm:px-8 lg:px-12 relative"
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="mb-12 sm:mb-16 lg:mb-20">
            <motion.div
              className="inline-block px-4 py-2 border border-[#27272A] mb-6 backdrop-blur-sm"
              style={{ borderRadius: "8px" }}
            >
              <span className="text-xs sm:text-sm font-mono text-[#71717A] uppercase tracking-wider">
                {t(language, "about.badge")}
              </span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#EDEDED] mb-6 sm:mb-8 tracking-tight max-w-4xl leading-tight">
              {t(language, "about.heading")}{" "}
              <span className="text-[#3B82F6]">{t(language, "about.headingAccent")}</span>
            </h2>

            <div className="max-w-3xl space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl text-[#71717A] leading-relaxed">
              <p>{t(language, "about.p1")}</p>

              <p>
                {t(language, "about.p2pre")}{" "}
                <span className="text-[#EDEDED]">{t(language, "about.p2cloud")}</span>,{" "}
                <span className="text-[#EDEDED]">{t(language, "about.p2distributed")}</span>
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
              <button
                onClick={handleDownloadCV}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-[#71717A] hover:text-[#EDEDED] border border-[#27272A] hover:border-[#3B82F6] transition-all"
                style={{ borderRadius: "8px" }}
              >
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                Descargar CV
              </button>
            </motion.div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mb-12 sm:mb-16 lg:mb-20">
            <h3 className="text-2xl sm:text-3xl md:text-4xl text-[#EDEDED] mb-8 sm:mb-10">
              {t(language, "about.competencies")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {skills.map((skill, index) => (
                <SkillCard
                  key={skill.categoryKey}
                  skill={skill}
                  index={index}
                  language={language}
                />
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.08, duration: 0.45 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group border border-[#27272A] p-6 sm:p-8 text-center relative overflow-hidden"
                style={{
                  borderRadius: "8px",
                  backgroundColor: "#0B0B0C",
                }}
              >
              
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 20%, rgba(96,165,250,0.12) 0%, transparent 55%)",
                  }}
                />

                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    border: "1px solid rgba(96,165,250,0.45)",
                    borderRadius: "8px",
                  }}
                />

                <div className="relative z-10">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  <div className="text-sm text-[#71717A] uppercase tracking-wider font-medium">
                    {stat.label}
                  </div>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
                  style={{
                    background:
                      "linear-gradient(90deg, #3B82F6 0%, rgba(59,130,246,0.2) 100%)",
                  }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.28 }}
                />
              </motion.div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div
            className="mt-20 border border-[#27272A] p-8 md:p-12 relative overflow-hidden bg-[#050505]"
            style={{ borderRadius: "8px" }}
          >
            <h3 className="text-2xl md:text-3xl text-[#EDEDED] mb-8">
              {t(language, "about.philosophy")}
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
              {philosophy.map((item, i) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                  className="relative"
                >
                  <div className="font-mono text-sm mb-3" style={{ color: item.color }}>
                    {item.num} — {item.title}
                  </div>

                  <p className="text-[#71717A] leading-relaxed">{item.desc}</p>

                  {i < philosophy.length - 1 && (
                    <div
                      className="hidden md:block absolute top-4 -right-4 w-8 h-px"
                      style={{ backgroundColor: `${item.color}30` }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}