import { motion, useMotionValue, useSpring } from "motion/react";
import { type CSSProperties, type ReactNode, useCallback, useRef } from "react";

interface MagneticButtonProps {
	children: ReactNode;
	className?: string;
	onClick?: () => void;
	href?: string;
	style?: CSSProperties;
	target?: string;
	rel?: string;
	"aria-label"?: string;
	type?: "button" | "submit" | "reset";
}

const SPRING_CONFIG = {
	stiffness: 150,
	damping: 15,
	mass: 0.1,
};

export function MagneticButton({
	children,
	className = "",
	onClick,
	href,
	style,
	target,
	rel,
	"aria-label": ariaLabel,
	type = "button",
}: MagneticButtonProps) {
	// Raw motion values (0 React state re-renders on mouse movements)
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	// Physics-based spring values for snappy, smooth physical motion
	const springX = useSpring(x, SPRING_CONFIG);
	const springY = useSpring(y, SPRING_CONFIG);

	// Cache bounding geometry on mouseenter to eliminate layout thrashing on mousemove
	const rectRef = useRef<{
		left: number;
		top: number;
		width: number;
		height: number;
	} | null>(null);

	const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLElement>) => {
		if (
			typeof window !== "undefined" &&
			window.matchMedia("(hover: none)").matches
		)
			return;
		const rect = e.currentTarget.getBoundingClientRect();
		rectRef.current = {
			left: rect.left,
			top: rect.top,
			width: rect.width,
			height: rect.height,
		};
	}, []);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLElement>) => {
			if (
				typeof window !== "undefined" &&
				window.matchMedia("(hover: none)").matches
			)
				return;
			const rect = rectRef.current ?? e.currentTarget.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;
			const targetX = (e.clientX - centerX) * 0.3;
			const targetY = (e.clientY - centerY) * 0.3;
			x.set(targetX);
			y.set(targetY);
		},
		[x, y],
	);

	const handleMouseLeave = useCallback(() => {
		rectRef.current = null;
		x.set(0);
		y.set(0);
	}, [x, y]);

	if (href) {
		return (
			<motion.a
				href={href}
				target={target}
				rel={rel}
				onClick={onClick}
				onMouseEnter={handleMouseEnter}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				style={{
					...style,
					x: springX,
					y: springY,
					willChange: "transform",
				}}
				className={className}
				aria-label={ariaLabel}
			>
				{children}
			</motion.a>
		);
	}

	return (
		<motion.button
			type={type}
			onClick={onClick}
			onMouseEnter={handleMouseEnter}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				...style,
				x: springX,
				y: springY,
				willChange: "transform",
			}}
			className={className}
			aria-label={ariaLabel}
		>
			{children}
		</motion.button>
	);
}
