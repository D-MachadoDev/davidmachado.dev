import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const isHovering = useMotionValue(0);

  const springConfig = { stiffness: 500, damping: 28 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const ringSpringConfig = { stiffness: 150, damping: 15 };
  const ringX = useSpring(cursorX, ringSpringConfig);
  const ringY = useSpring(cursorY, ringSpringConfig);

  const glowSpringConfig = { stiffness: 100, damping: 20 };
  const glowX = useSpring(cursorX, glowSpringConfig);
  const glowY = useSpring(cursorY, glowSpringConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor='pointer']")
      ) {
        isHovering.set(1);
      } else {
        isHovering.set(0);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isHovering]);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed w-1.5 h-1.5 bg-[#3B82F6] rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* Cursor ring */}
      <motion.div
        className="fixed w-10 h-10 rounded-full pointer-events-none z-[9999] transition-[width,height] duration-200"
        style={{
          border: "1.5px solid rgba(59, 130, 246, 0.4)",
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="fixed w-32 h-32 rounded-full pointer-events-none z-[9998] blur-2xl"
        style={{
          backgroundColor: "rgba(59, 130, 246, 0.08)",
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}