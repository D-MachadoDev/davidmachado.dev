import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.15], [0.8, 1]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      style={{ opacity, scale, borderRadius: "10px" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 p-3 sm:p-4 bg-[#3B82F6] text-[#EDEDED] hover:bg-[#2563EB] transition-all group"
      aria-label="Back to top"
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-[#3B82F6] blur-xl"
        style={{ borderRadius: "10px" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      
      <ArrowUp className="w-5 h-5 relative z-10 group-hover:-translate-y-1 transition-transform" />
    </motion.button>
  );
}