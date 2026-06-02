import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsExiting(true), 400);
          setTimeout(onComplete, 1000);
          return 100;
        }
        // Easing: arranca rápido, desacelera al final
        const increment = prev < 60 ? 2 : prev < 85 ? 1 : 0.5;
        return Math.min(prev + increment, 100);
      });
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center"
        >
          {/* Grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(237, 237, 237, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(237, 237, 237, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
            }}
          />

          {/* Glow orb de fondo */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 flex flex-col items-center justify-center gap-10">

            {/* Iniciales animadas */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              className="flex flex-col items-center gap-2"
            >
              {/* Logo DM */}
              <motion.div
                className="text-xs font-mono tracking-[0.3em] text-[#3B82F6] uppercase mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                DM
              </motion.div>
              <div
                className="text-3xl md:text-4xl font-bold text-[#EDEDED] tracking-tighter"
              >
                David Machado
              </div>
              <motion.div
                className="text-xs text-[#71717A] font-mono tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Desarrollador de Software
              </motion.div>
            </motion.div>

            {/* Barra de progreso */}
            <motion.div
              className="flex flex-col items-center gap-3 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-56 h-[2px] bg-[#1a1a1a] relative overflow-hidden rounded-full">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #1d4ed8, #3B82F6, #60A5FA)",
                    backgroundSize: "200% 100%",
                  }}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${count}%`,
                    backgroundPosition: ["0% 0%", "100% 0%"],
                  }}
                  transition={{
                    width: { duration: 0.08, ease: "linear" },
                    backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" },
                  }}
                />
                {/* Glow en el extremo de la barra */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full blur-sm bg-[#60A5FA]"
                  style={{ left: `${count}%`, opacity: count > 2 ? 0.8 : 0 }}
                />
              </div>

              {/* Contador — sin padStart */}
              <div className="text-[#71717A] font-mono text-sm tabular-nums flex items-baseline gap-0.5">
                <motion.span
                  key={count}
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 1 }}
                >
                  {Math.floor(count)}
                </motion.span>
                <span className="text-[#3B82F6]">%</span>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}