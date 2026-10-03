import { ArrowUp } from "lucide-react";
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from "motion/react";
import { useState } from "react";

export function BackToTop() {
	const [isVisible, setIsVisible] = useState(false);
	const { scrollY } = useScroll();

	useMotionValueEvent(scrollY, "change", (latest) => {
		const shouldShow = latest > 300;
		setIsVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
	});

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.button
					type="button"
					onClick={scrollToTop}
					initial={{ opacity: 0, scale: 0.8, y: 8 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.8, y: 8 }}
					transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
					whileHover={{ scale: 1.08 }}
					whileTap={{ scale: 0.92 }}
					className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 p-3 sm:p-4 bg-[#3B82F6] text-[#EDEDED] hover:bg-[#2563EB] transition-colors duration-200 group rounded-xl shadow-lg shadow-blue-500/20"
					aria-label="Back to top"
				>
					{/* Subtle glow that only renders when mounted, static blur <= 8px */}
					<span className="absolute inset-0 bg-[#3B82F6] opacity-30 group-hover:opacity-60 blur-md rounded-xl pointer-events-none transition-opacity duration-300" />

					<ArrowUp className="w-5 h-5 relative z-10 group-hover:-translate-y-0.5 transition-transform duration-200" />
				</motion.button>
			)}
		</AnimatePresence>
	);
}
