import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export function CustomCursor() {
	const [hasFinePointer, setHasFinePointer] = useState(false);
	const cursorX = useMotionValue(-100);
	const cursorY = useMotionValue(-100);

	const springConfig = { stiffness: 500, damping: 28 };
	const smoothX = useSpring(cursorX, springConfig);
	const smoothY = useSpring(cursorY, springConfig);

	const ringSpringConfig = { stiffness: 150, damping: 15 };
	const ringX = useSpring(cursorX, ringSpringConfig);
	const ringY = useSpring(cursorY, ringSpringConfig);

	useEffect(() => {
		const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
		setHasFinePointer(mq.matches);

		const handleChange = (e: MediaQueryListEvent) => {
			setHasFinePointer(e.matches);
		};

		mq.addEventListener("change", handleChange);
		return () => mq.removeEventListener("change", handleChange);
	}, []);

	useEffect(() => {
		if (!hasFinePointer) return;

		const updateMousePosition = (e: MouseEvent) => {
			cursorX.set(e.clientX);
			cursorY.set(e.clientY);
		};

		window.addEventListener("mousemove", updateMousePosition, {
			passive: true,
		});
		return () => {
			window.removeEventListener("mousemove", updateMousePosition);
		};
	}, [hasFinePointer, cursorX, cursorY]);

	if (!hasFinePointer) {
		return null;
	}

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

			{/* Soft ambient glow (Hardware-accelerated radial gradient; 0 blur filter overhead) */}
			<motion.div
				className="fixed w-32 h-32 rounded-full pointer-events-none z-[9998]"
				style={{
					background:
						"radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(59, 130, 246, 0) 70%)",
					x: ringX,
					y: ringY,
					translateX: "-50%",
					translateY: "-50%",
				}}
			/>
		</>
	);
}
