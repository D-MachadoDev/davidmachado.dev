import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { ExternalLink, Github, ArrowUpRight, X } from "lucide-react";
import { FadeIn } from "./TextReveal";
import {
  useRef,
  useState,
  useEffect,
  type MouseEvent,
  type CSSProperties,
} from "react";
import { type Language, t } from "../i18n";

interface Project {
  title: string;
  summary: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  year: string;
  impact: string;
  role?: string;
  image?: string;
  previewImage?: string;
  previewVideo?: string;
  accent: string;
}

const projects: Project[] = [

  {
    
    title: "Project Name",
    summary: "Short project summary for the card. Keep this to one or two lines.",
    description:
      "Detailed description of what the project does, the problem it solves, the technical decisions behind it, and the challenges you handled.",
    impact: "1 user",
    role: "Full Stack Development",
    tags: ["React", "TypeScript", "Node.js"],
    link: "https://your-project-url.com",
    github: "https://github.com/user/repo",
    year: "2026",
    image: "/images/project-placeholder.svg",
    accent: "#3B82F6",
  },
  

];

function AnimatedCounter({ value }: { value: string }) {
  const [displayed, setDisplayed] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;

        setHasAnimated(true);
        const numMatch = value.match(/[\d,]+/);

        if (!numMatch) {
          setDisplayed(value);
          return;
        }

        const target = parseInt(numMatch[0].replace(/,/g, ""));
        const prefix = value.substring(0, value.indexOf(numMatch[0]));
        const postfix = value.substring(value.indexOf(numMatch[0]) + numMatch[0].length);

        let current = 0;
        const duration = 1500;
        const steps = 40;
        const increment = target / steps;
        const stepTime = duration / steps;

        const timer = setInterval(() => {
          current += increment;

          if (current >= target) {
            current = target;
            clearInterval(timer);
          }

          const rounded = Math.round(current);
          const formatted =
            rounded >= 1000 ? rounded.toLocaleString() : rounded.toString();

          setDisplayed(`${prefix}${formatted}${postfix}`);
        }, stepTime);
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return <span ref={ref}>{displayed}</span>;
}

function ProjectPreview({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  const iconSize = large ? "w-12 h-12" : "w-8 h-8";

  if (project.previewVideo) {
    return (
      <video
        src={project.previewVideo}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    );
  }

  if (project.previewImage || project.image) {
    return (
      <img
        src={project.previewImage || project.image}
        alt={project.title}
        className="w-full h-full object-cover"
      />
    );
  }

  return (
    <div className="w-full h-full bg-[#0D0D0D] flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(237, 237, 237, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(237, 237, 237, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="flex gap-4 relative z-10 opacity-40 blur-[0.5px]">
        {project.tags.slice(0, 4).map((tag) => (
          <img
            key={tag}
            src={`https://cdn.simpleicons.org/${tag
              .toLowerCase()
              .replace(/[^a-z0-9]/g, "")}`}
            className={`${iconSize} filter grayscale brightness-200`}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            alt={tag}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 160, damping: 18 });
  const mouseYSpring = useSpring(y, { stiffness: 160, damping: 18 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || window.innerWidth < 1024) return;

    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <FadeIn delay={index * 0.1}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className="group border border-[#27272A] transition-all duration-500 relative overflow-hidden h-full cursor-pointer bg-[#050505]"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
        style={
          {
            "--accent": project.accent,
            "--accent-border": `${project.accent}60`,
            borderRadius: "12px",
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          } as CSSProperties
        }
      >
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"
          style={{
            border: `1px solid ${project.accent}40`,
            borderRadius: "12px",
          }}
        />

        <div className="relative overflow-hidden aspect-video">
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          >
            <ProjectPreview project={project} />
          </motion.div>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.35) 35%, transparent 70%)",
            }}
          />

          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 80%, ${project.accent}15 0%, transparent 60%)`,
            }}
          />

          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <span
              className="px-3 py-1.5 text-xs font-mono backdrop-blur-sm flex items-center gap-2"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: project.accent,
                borderRadius: "6px",
                border: `1px solid ${project.accent}25`,
              }}
            >
              <AnimatedCounter value={project.impact} />
            </span>
          </div>

          <div className="absolute top-4 right-4 z-10 pointer-events-none">
            <span
              className="px-3 py-1.5 text-xs font-mono backdrop-blur-sm font-medium text-[#EDEDED]"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {project.year}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 relative z-10" style={{ transform: "translateZ(10px)" }}>
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <h3 className="text-xl sm:text-2xl md:text-3xl text-[#EDEDED] transition-colors truncate group-hover:text-[var(--accent)]">
                  {project.title}
                </h3>
                <motion.div className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <ArrowUpRight
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    style={{ color: project.accent }}
                  />
                </motion.div>
              </div>

              {project.role && (
                <p className="text-xs sm:text-sm font-mono text-[#71717A] mt-2">
                  {project.role}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[#71717A] transition-all p-3 border hover:text-[var(--accent)] hover:border-[color:var(--accent-border)]"
                  style={{ borderRadius: "8px", borderColor: "rgba(39, 39, 42, 1)" }}
                  aria-label="View project"
                >
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[#71717A] transition-all p-3 border hover:text-[var(--accent)] hover:border-[color:var(--accent-border)]"
                  style={{ borderRadius: "8px", borderColor: "rgba(39, 39, 42, 1)" }}
                  aria-label="View source code"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )}
            </div>
          </div>

          <p className="text-[#71717A] mb-6 leading-relaxed text-sm sm:text-base md:text-lg line-clamp-2">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs sm:text-sm font-mono text-[#71717A] border border-[#27272A]"
                style={{ borderRadius: "6px" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
}

function EmptyProjectsState({ language }: { language: Language }) {
  return (
    <FadeIn>
      <div
        className="border border-[#27272A] p-10 sm:p-14 text-center bg-[#050505]"
        style={{ borderRadius: "12px" }}
      >
        <p className="text-[#EDEDED] text-lg sm:text-xl mb-3">
          {t(language, "projects.emptyTitle")}
        </p>
        <p className="text-[#71717A] max-w-2xl mx-auto leading-relaxed">
          {t(language, "projects.emptyDesc")}
        </p>
      </div>
    </FadeIn>
  );
}

function ProjectModal({
  project,
  language,
  onClose,
}: {
  project: Project;
  language: Language;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-description"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-[#050505] w-full max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden relative flex flex-col"
        style={{ borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="sticky top-0 z-20 flex items-start justify-between gap-4 p-4 sm:p-6 border-b border-[#27272A]"
          style={{ backgroundColor: "rgba(5,5,5,0.82)", backdropFilter: "blur(8px)" }}
        >
          <div className="min-w-0">
            <h3 id="project-modal-title" className="text-xl sm:text-2xl font-bold text-[#EDEDED]">
              {project.title}
            </h3>

            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="px-3 py-1 text-xs font-mono text-[#71717A] border border-[#27272A]" style={{ borderRadius: "999px" }}>
                {project.year}
              </span>

              <span
                className="px-3 py-1 text-xs font-mono"
                style={{
                  borderRadius: "999px",
                  backgroundColor: `${project.accent}12`,
                  color: project.accent,
                  border: `1px solid ${project.accent}30`,
                }}
              >
                {project.impact}
              </span>

              {project.role && (
                <span className="px-3 py-1 text-xs font-mono text-[#71717A] border border-[#27272A]" style={{ borderRadius: "999px" }}>
                  {project.role}
                </span>
              )}
            </div>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 text-[#71717A] hover:text-[#EDEDED] hover:bg-[#27272A] transition-colors rounded-full shrink-0"
            aria-label="Close project preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative aspect-video w-full bg-[#0D0D0D]">
          <ProjectPreview project={project} large />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.2) 30%, transparent 60%)",
            }}
          />
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono text-[#71717A] border border-[#27272A]"
                style={{ borderRadius: "6px" }}
              >
                {tag}
              </span>
            ))}
          </div>

          <p
            id="project-modal-description"
            className="text-[#EDEDED] leading-relaxed text-base sm:text-lg mb-8 whitespace-pre-line max-w-3xl"
          >
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[#27272A]">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#3B82F6] text-[#EDEDED] font-medium hover:bg-[#2563EB] transition-colors"
                style={{ borderRadius: "8px" }}
              >
                <span>{t(language, "projects.demo")}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#27272A] text-[#EDEDED] hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors"
                style={{ borderRadius: "8px" }}
              >
                <Github className="w-4 h-4" />
                <span>{t(language, "projects.source")}</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects({ language }: { language: Language }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };

    if (selectedProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [selectedProject]);

  return (
    <section id="work" className="min-h-screen py-16 sm:py-24 lg:py-32 px-6 sm:px-8 lg:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="mb-12 sm:mb-16 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 border border-[#27272A] mb-6 backdrop-blur-sm"
              style={{ borderRadius: "8px" }}
            >
              <span className="text-xs sm:text-sm font-mono text-[#71717A] uppercase tracking-wider">
                {t(language, "projects.badge")}
              </span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#EDEDED] mb-4 sm:mb-6 tracking-tight leading-tight">
              {t(language, "projects.heading")}{" "}
              <span className="text-[#3B82F6]">{t(language, "projects.headingAccent")}</span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#71717A] max-w-3xl leading-relaxed">
              {t(language, "projects.subtitle")}
            </p>
          </div>
        </FadeIn>

        {projects.length === 0 ? (
          <EmptyProjectsState language={language} />
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        )}

        <FadeIn delay={0.5}>
          <div className="mt-12 sm:mt-16 text-center">
            <motion.a
              href="https://github.com/D-MachadoDev?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 text-[#EDEDED] border border-[#27272A] hover:border-[#3B82F6] transition-all group text-sm sm:text-base font-medium"
              style={{ borderRadius: "8px" }}
              whileHover={{ scale: 1.02 }}
            >
              <span>{t(language, "projects.viewAll")}</span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </div>
        </FadeIn>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            language={language}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}