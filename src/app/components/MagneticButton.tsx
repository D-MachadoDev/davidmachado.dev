import { motion } from "motion/react";
import { useRef, useState, ReactNode, CSSProperties } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  style?: CSSProperties;
  // props de anchor — solo aplican cuando href está presente
  target?: string;
  rel?: string;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  style,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current!.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };

  const resetPosition = () => setPosition({ x: 0, y: 0 });

  const Component = motion[href ? "a" : "button"] as any;

  return (
    <Component
      ref={ref as any}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={resetPosition}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}