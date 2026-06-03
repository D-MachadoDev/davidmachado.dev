import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, Download } from "lucide-react";
import { toast } from "sonner";
import { MagneticButton } from "./MagneticButton";
import { TextReveal } from "./TextReveal";
import { useRef, useState, useEffect } from "react";
import { type Language, t } from "../i18n";

export function Hero({ language }: { language: Language }) {
  const subtitles = [
    t(language, "hero.subtitle1"),
    t(language, "hero.subtitle2"),
    t(language, "hero.subtitle3"),
    t(language, "hero.subtitle4"),
  ];

  const ref = useRef(null);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  // Rotate subtitle every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDownloadCV = async () => {
    try {
      const res = await fetch("/assets/cv/david-machado-cv.pdf", { method: "HEAD" });
      if (res.ok) {
        const link = document.createElement("a");
        link.href = "/assets/cv/david-machado-cv.pdf";
        link.download = "david-machado-cv.pdf";
        link.click();
      } else {
        toast("CV próximamente disponible", { duration: 2000 });
      }
    } catch {
      toast("CV próximamente disponible", { duration: 2000 });
    }
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="min-h-screen relative flex items-start md:items-center justify-center px-6 sm:px-8 lg:px-12 pt-20 sm:pt-24 md:pt-0 overflow-hiddenn"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, rgba(59, 130, 246, 0.06) 0%, transparent 52%)",
          }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.24, 0.38, 0.24],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(237, 237, 237, 0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(237, 237, 237, 0.022) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          y,
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[18%] right-[14%] w-20 h-20 border border-[#3B82F6]/10 rounded-full"
          animate={{ y: [-14, 14, -14] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[28%] left-[10%] w-2.5 h-2.5 bg-[#3B82F6]/20 rounded-full"
          animate={{ y: [-18, 18, -18] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid Background with Parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(237, 237, 237, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(237, 237, 237, 0.025) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          y,
        }}
      />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[20%] right-[15%] w-20 h-20 border border-[#3B82F6]/10 rounded-full"
          animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-[30%] left-[10%] w-3 h-3 bg-[#3B82F6]/20 rounded-full"
          animate={{ y: [-30, 30, -30], x: [-10, 10, -10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[60%] right-[25%] w-1 h-16 bg-gradient-to-b from-[#3B82F6]/20 to-transparent"
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[15%] left-[25%] w-8 h-8 border border-[#3B82F6]/10"
          style={{ borderRadius: "2px" }}
          animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

        <motion.div className="max-w-6xl mx-auto relative z-10 w-full" style={{ opacity }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
            
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 border border-[#27272A] mb-8 sm:mb-10 backdrop-blur-sm max-w-full"
            style={{ 
              borderRadius: "8px",
              backgroundColor: "rgba(10, 10, 10, 0.5)"
            }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-emerald-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs sm:text-sm text-[#71717A] font-mono truncate">
              <span className="hidden sm:inline">{t(language, "hero.available")} • </span>
              <span className="sm:hidden">{t(language, "hero.availableShort")} • </span>
              {t(language, "contact.location")}
              <motion.span
                className="inline-block w-[2px] h-3 bg-[#3B82F6] ml-1 align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </span>
          </motion.div>

          {/* Main Heading */}
          <div className="mb-3 sm:mb-4">
            <TextReveal delay={0.1}>
              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl leading-[0.88] tracking-tight"
                style={{
                  background: "linear-gradient(90deg, #EDEDED 0%, #EDEDED 44%, #93C5FD 50%, #EDEDED 56%, #EDEDED 100%)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer 6s ease-in-out infinite",
                }}
              >
                David
              </h1>
            </TextReveal>
            <TextReveal delay={0.2}>
              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl leading-[0.88] tracking-tight"
                style={{
                  background: "linear-gradient(90deg, #EDEDED 0%, #EDEDED 44%, #93C5FD 50%, #EDEDED 56%, #EDEDED 100%)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer 6s ease-in-out infinite 0.5s",
                }}
              >
                Machado
              </h1>
            </TextReveal>
          </div>

          {/* Animated Rotating Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-6 sm:mb-7 h-14 sm:h-14 md:h-14 overflow-hidden max-w-3xl relative"
          >
            <AnimatePresence mode="wait">
              <motion.h2
                key={subtitleIndex}
                initial={{ y: 60, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -60, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                className="text-xl sm:text-2xl md:text-2xl lg:text-[2rem] font-light tracking-tight leading-none absolute inset-0 flex items-center"
                style={{
                  background: "linear-gradient(to right, #EDEDED 30%, #71717A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {subtitles[subtitleIndex]}
              </motion.h2>
            </AnimatePresence>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-sm sm:text-base md:text-[1.05rem] text-[#71717A] mb-12 sm:mb-12 max-w-[36rem] leading-[1.8]"
            >
            {t(language, "hero.descPre")}
            <span className="text-[#3B82F6]">{t(language, "hero.descCloud")}</span>
            {t(language, "hero.descMiddle")}
            <span className="text-[#3B82F6]">{t(language, "hero.descDistributed")}</span>
            {t(language, "hero.descAnd")}
            <span className="text-[#3B82F6]">{t(language, "hero.descDX")}</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-14 sm:mb-16"
          >
            <MagneticButton
              onClick={() => scrollToSection("work")}
              className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#3B82F6] text-[#EDEDED] font-medium flex items-center justify-center gap-3 hover:bg-[#2563EB] transition-all relative overflow-hidden text-sm sm:text-base"
              style={{ borderRadius: "8px" }}
            >
              <motion.span
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
                style={{ opacity: 0.1 }}
              />
              <span className="relative z-10">{t(language, "hero.ctaWork")}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </MagneticButton>
            <MagneticButton
              href="https://mail.google.com/mail/?view=cm&to=davidmachado.dev07@gmail.com&su=Hola%20David"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-[#3B82F6]/30 text-[#EDEDED] font-medium hover:border-[#3B82F6] hover:text-[#3B82F6] transition-all backdrop-blur-sm text-sm sm:text-base"
              style={{ 
                borderRadius: "8px",
                backgroundColor: "rgba(59, 130, 246, 0.05)"
              }}
            >
              {t(language, "hero.ctaContact")}
            </MagneticButton>
            <button
              onClick={handleDownloadCV}
              className="group flex items-center justify-center gap-2 px-4 py-2 text-sm text-[#A1A1AA] hover:text-[#EDEDED] transition-colors"
            >
              <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              Descargar CV
            </button>
          </motion.div>

          {/* Tech Stack Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap gap-2 sm:gap-3 pt-2"
          >
            {[
              "Cloud Architecture",
              "Distributed Systems",
              "React",
              "Node.js",
              "Kubernetes",
              "TypeScript",
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.05, borderColor: "#3B82F6" }}
                className="px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-mono text-[#71717A] border border-[#27272A] hover:text-[#3B82F6] transition-all cursor-default backdrop-blur-sm"
                style={{ 
                  borderRadius: "8px",
                  backgroundColor: "rgba(10, 10, 10, 0.3)"
                }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer hidden sm:block"
        onClick={() => scrollToSection("work")}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3 text-[#71717A] hover:text-[#3B82F6] transition-colors group"
        >
          <span className="text-xs font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">{t(language, "hero.scroll")}</span>
          <div className="w-6 h-10 border-2 border-current flex items-start justify-center p-2" style={{ borderRadius: "20px" }}>
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-current rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 200% 0; }
          50% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}
