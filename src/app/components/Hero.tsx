import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { type Language, t } from "../i18n";
import { CONTACT_EMAIL } from "../lib/mailto";
import { MagneticButton } from "./MagneticButton";
import { TextReveal } from "./TextReveal";

export function Hero({ language }: { language: Language }) {
	const subtitles = [
		t(language, "hero.subtitle1"),
		t(language, "hero.subtitle2"),
		t(language, "hero.subtitle3"),
		t(language, "hero.subtitle4"),
	];

	const prefersReducedMotion = useReducedMotion();
	const [subtitleIndex, setSubtitleIndex] = useState(0);

	// Rotate subtitle every 4.5s, unless the visitor asked for reduced motion
	useEffect(() => {
		if (prefersReducedMotion) return;

		const interval = setInterval(() => {
			if (document.hidden) return;
			setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
		}, 4500);
		return () => clearInterval(interval);
	}, [subtitles.length, prefersReducedMotion]);

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<section
			id="hero"
			className="min-h-screen relative flex items-start lg:items-center justify-center px-6 sm:px-8 lg:px-12 pt-18 sm:pt-20 lg:pt-0 overflow-hidden"
		>
			{/* Single static light source, no decorative motion */}
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					background:
						"radial-gradient(circle at 50% 38%, rgba(59, 130, 246, 0.07) 0%, transparent 55%)",
				}}
			/>

			<motion.div
				className="max-w-6xl mx-auto relative z-10 w-full"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
			>
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
							backgroundColor: "rgba(10, 10, 10, 0.5)",
						}}
					>
						<motion.div
							className="w-2 h-2 rounded-full bg-emerald-500"
							animate={
								prefersReducedMotion ? undefined : { opacity: [1, 0.3, 1] }
							}
							transition={{ duration: 2, repeat: Infinity }}
						/>
						<span className="text-xs sm:text-sm text-zinc-300 font-mono truncate">
							<span className="hidden sm:inline">
								{t(language, "hero.available")} •{" "}
							</span>
							<span className="sm:hidden">
								{t(language, "hero.availableShort")} •{" "}
							</span>
							{t(language, "contact.location")}
						</span>
					</motion.div>

					{/* Main Heading */}
					<div className="mb-3 sm:mb-4">
						<TextReveal delay={0.1}>
							<h1
								className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl leading-[0.88] tracking-tight text-balance text-white"
							>
								David
								<span className="block">Machado</span>
							</h1>
						</TextReveal>
					</div>

					{/* Rotating Title */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5, duration: 0.8 }}
						className="mb-6 sm:mb-7 h-14 overflow-hidden max-w-3xl relative"
					>
						<AnimatePresence mode="wait">
							<motion.h2
								key={subtitleIndex}
								initial={prefersReducedMotion ? false : { y: 30, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								exit={prefersReducedMotion ? undefined : { y: -30, opacity: 0 }}
								transition={{
									duration: prefersReducedMotion ? 0 : 0.35,
									ease: [0.33, 1, 0.68, 1],
								}}
								className="text-xl sm:text-2xl md:text-2xl lg:text-[2rem] font-light tracking-tight leading-tight absolute inset-0 flex items-center"
								style={{
									background:
										"linear-gradient(to right, #EDEDED 30%, #71717A 100%)",
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
						className="text-base sm:text-lg text-zinc-300 mb-10 max-w-[42rem] leading-[1.75]"
					>
						{t(language, "hero.descPre")}
						<span className="text-blue-400 font-medium">
							{t(language, "hero.descCloud")}
						</span>
						{t(language, "hero.descMiddle")}
						<span className="text-blue-400 font-medium">
							{t(language, "hero.descDistributed")}
						</span>
						{t(language, "hero.descAnd")}
						<span className="text-blue-400 font-medium">
							{t(language, "hero.descDX")}
						</span>
						{t(language, "hero.descPost")}
					</motion.p>

					{/* CTA Buttons */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.7, duration: 0.8 }}
						className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10"
					>
						<MagneticButton
							onClick={() => scrollToSection("work")}
							className="group w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black font-semibold flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all relative overflow-hidden text-sm sm:text-base shadow-sm"
							style={{ borderRadius: "8px" }}
							aria-label={t(language, "hero.ctaWork")}
						>
							<span className="relative z-10">
								{t(language, "hero.ctaWork")}
							</span>
							<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform relative z-10" />
						</MagneticButton>
						<MagneticButton
							href={`mailto:${CONTACT_EMAIL}`}
							className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 border border-white/20 text-white font-medium hover:border-white/40 hover:bg-white/5 transition-all backdrop-blur-sm text-sm sm:text-base flex items-center justify-center"
							style={{
								borderRadius: "8px",
								backgroundColor: "rgba(255, 255, 255, 0.03)",
							}}
							aria-label={t(language, "hero.ctaContact")}
						>
							{t(language, "hero.ctaContact")}
						</MagneticButton>
					</motion.div>

					{/* Four anchors, not a stack dump */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.8, duration: 0.8 }}
						className="flex flex-wrap gap-1.5 sm:gap-3"
					>
						{[".NET 10", "TypeScript", "PostgreSQL", "Docker"].map(
							(tech, index) => (
								<motion.span
									key={tech}
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.9 + index * 0.05, duration: 0.4 }}
									whileHover={{ scale: 1.05, borderColor: "#3B82F6" }}
									className="px-2.5 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-sm font-mono text-zinc-300 border border-white/10 hover:border-white/30 hover:text-white transition-all cursor-default backdrop-blur-sm"
									style={{
										borderRadius: "8px",
										backgroundColor: "rgba(255, 255, 255, 0.02)",
									}}
								>
									{tech}
								</motion.span>
							),
						)}
					</motion.div>
				</motion.div>
			</motion.div>
		</section>
	);
}
