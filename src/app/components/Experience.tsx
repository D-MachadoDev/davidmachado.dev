import { motion, useScroll, useTransform } from "motion/react";
import { Briefcase, GraduationCap, Award, Calendar } from "lucide-react";
import { FadeIn } from "./TextReveal";
import { useRef } from "react";

import { type Language, t } from "../i18n";

interface TimelineItem {
  type: "work" | "education" | "achievement";
  title: string;
  organization: string;
  period: string;
  description: string;
  tags?: string[];
}

const typeConfig = {
  work: { icon: Briefcase, color: "#10B981", labelKey: "exp.typeWork" },
  education: { icon: GraduationCap, color: "#3B82F6", labelKey: "exp.typeEducation" },
  achievement: { icon: Award, color: "#F59E0B", labelKey: "exp.typeAchievement" },
} as const;

function TimelineItemCard({ item, index, language }: { item: TimelineItem; index: number; language: Language }) {
  const config = typeConfig[item.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative pl-12 sm:pl-16 md:pl-20 lg:pl-24 group"
    >
      {/* Timeline Dot & Icon */}
      <div className="absolute left-0 md:left-7 top-0">
        <motion.div
          whileHover={{ scale: 1.2, rotate: 5 }}
          className="relative"
        >
          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity"
            style={{ backgroundColor: config.color }}
          />
          
          {/* Pulse ring on scroll into view */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: [0.8, 1.4, 1], opacity: [0, 0.5, 0] }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
            className="absolute inset-0 rounded-lg"
            style={{ border: `2px solid ${config.color}` }}
          />
          
          {/* Icon Container */}
          <div
            className="relative p-2.5 sm:p-3 bg-[#050505] border border-[#27272A] group-hover:border-transparent transition-all z-10"
            style={{ borderRadius: "8px" }}
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{
                border: `1px solid ${config.color}50`,
                borderRadius: "8px",
              }}
            />
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: config.color }} />
          </div>
        </motion.div>
      </div>

      {/* Content Card */}
      <motion.div
        whileHover={{ x: 5 }}
        className="border border-[#27272A] p-6 md:p-8 hover:border-transparent transition-all duration-300 relative overflow-hidden"
        style={{ borderRadius: "10px" }}
      >
        {/* Colored border on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            border: `1px solid ${config.color}30`,
            borderRadius: "10px",
          }}
        />

        {/* Hover Gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 0% 50%, ${config.color}08 0%, transparent 50%)`,
          }}
        />

        <div className="relative z-10">
          {/* Type Badge */}
          <div
            className="inline-block px-2.5 py-1 mb-4"
            style={{
              backgroundColor: `${config.color}15`,
              border: `1px solid ${config.color}30`,
              borderRadius: "6px",
            }}
          >
            <span className="text-xs font-mono uppercase tracking-wider" style={{ color: config.color }}>
              {t(language, config.labelKey as any)}
            </span>
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-2 sm:gap-3">
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl text-[#EDEDED] mb-2 transition-colors"
                style={{ transition: "color 0.3s" }}
              >
                {item.title}
              </h3>
              <p className="text-[#71717A] font-medium text-base sm:text-lg">{item.organization}</p>
            </div>
            <div className="flex items-center gap-2 text-[#71717A] font-mono text-xs sm:text-sm shrink-0">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              {item.period}
            </div>
          </div>

          {/* Description */}
          <p className="text-[#71717A] mb-6 leading-relaxed text-sm sm:text-base md:text-lg">{item.description}</p>

          {/* Tags */}
          {item.tags && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-3 py-1.5 text-sm font-mono text-[#71717A] border border-[#27272A] transition-all"
                  style={{ borderRadius: "6px" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${config.color}50`;
                    (e.currentTarget as HTMLElement).style.color = config.color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#27272A";
                    (e.currentTarget as HTMLElement).style.color = "#71717A";
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Border Accent */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] origin-left"
          style={{ backgroundColor: config.color }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}

export function Experience({ language }: { language: Language }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  const timeline: TimelineItem[] = [
    /* TODO: Add work experience / achievements here using this format
    {
      type: "work",
      title: "Solutions Architect Intern",
      organization: "Tech Innovations Lab",
      period: "2025 - Present",
      description: "Designing scalable cloud architectures for enterprise clients.",
      tags: ["AWS", "Kubernetes", "Microservices"],
    },
    */
    {
      type: "education",
      title: t(language, "exp.eduTitle"),
      organization: t(language, "exp.eduOrg"),
      period: t(language, "exp.eduPeriod"),
      description: t(language, "exp.eduDesc"),
      tags: ["GPA: 4.2/5.0"],
    },
  ];

  return (
    <section id="experience" ref={sectionRef} className="min-h-screen py-16 sm:py-24 lg:py-32 px-6 sm:px-8 lg:px-12 relative">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="mb-12 sm:mb-16 lg:mb-20">
            <motion.div
              className="inline-block px-4 py-2 border border-[#27272A] mb-6 backdrop-blur-sm"
              style={{ borderRadius: "8px" }}
            >
              <span className="text-xs sm:text-sm font-mono text-[#71717A] uppercase tracking-wider">{t(language, "exp.badge")}</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#EDEDED] mb-4 sm:mb-6 tracking-tight leading-tight">
              {t(language, "exp.heading")} <span className="text-[#3B82F6]">{t(language, "exp.headingAccent")}</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#71717A] max-w-3xl leading-relaxed">
              {t(language, "exp.subtitle")}
            </p>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Animated Vertical Timeline Line — draws on scroll */}
          <motion.div
            className="absolute left-0 md:left-10 top-0 bottom-0 w-[1px] origin-top"
            style={{
              scaleY: lineScaleY,
              background: "linear-gradient(to bottom, #3B82F6, #10B981, #F59E0B, transparent)",
            }}
          />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <TimelineItemCard key={index} item={item} index={index} language={language} />
            ))}
          </div>

          {/* Timeline End Marker */}
          <FadeIn delay={0.5}>
            <div className="relative pl-8 md:pl-24 mt-12">
              <div className="absolute left-0 md:left-7">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-11 h-11 border-2 border-[#3B82F6] rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-[#3B82F6] rounded-full" />
                </motion.div>
              </div>
              <div className="text-[#71717A] font-mono text-sm">
                {t(language, "exp.more")}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}