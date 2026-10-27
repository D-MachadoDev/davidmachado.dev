import {
	SiDocker,
	SiDotnet,
	SiExpress,
	SiNextdotjs,
	SiNodedotjs,
	SiPostgresql,
	SiPython,
	SiReact,
	SiSqlite,
	SiTailwindcss,
	SiTypescript,
	SiVitest,
} from "@icons-pack/react-simple-icons";
import {
	ArrowRight,
	ArrowUpRight,
	BarChart3,
	ChevronLeft,
	ChevronRight,
	Code2,
	Database,
	ExternalLink,
	Github,
	Layers,
	Pause,
	Play,
	ShieldCheck,
	Sparkles,
	Terminal,
	X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { type Project, projects } from "../data/projects";
import { type Language, t } from "../i18n";
import { FadeIn } from "./TextReveal";

export type { Project } from "../data/projects";

export function TechIcon({
	tag,
	className = "w-3.5 h-3.5",
}: {
	tag: string;
	className?: string;
}) {
	const clean = tag.toLowerCase().trim();
	if (clean.includes("react")) return <SiReact className={className} />;
	if (clean.includes("next")) return <SiNextdotjs className={className} />;
	if (clean.includes("typescript"))
		return <SiTypescript className={className} />;
	if (clean.includes("express")) return <SiExpress className={className} />;
	if (clean.includes("sqlite")) return <SiSqlite className={className} />;
	if (clean.includes("vitest")) return <SiVitest className={className} />;
	if (clean.includes("power bi") || clean === "bi")
		return <BarChart3 className={className} />;
	if (clean === "sql") return <Database className={className} />;
	if (
		clean === ".net" ||
		clean.includes("dotnet") ||
		clean === "c#" ||
		clean.includes("csharp")
	)
		return <SiDotnet className={className} />;
	if (clean.includes("postgres")) return <SiPostgresql className={className} />;
	if (clean.includes("docker")) return <SiDocker className={className} />;
	if (clean.includes("tailwind"))
		return <SiTailwindcss className={className} />;
	if (clean.includes("python")) return <SiPython className={className} />;
	if (clean.includes("node")) return <SiNodedotjs className={className} />;
	return <Layers className={className} />;
}

export function getAccessibleTextColor(hexColor: string): string {
	const map: Record<string, string> = {
		"#8B5CF6": "#A78BFA",
		"#10B981": "#34D399",
		"#3B82F6": "#60A5FA",
		"#06B6D4": "#22D3EE",
	};
	return map[hexColor.toUpperCase()] ?? hexColor;
}

/**
 * Visual stage for one project. It shows only inspectable evidence:
 * repository location, status, architecture decisions, and test surface.
 * There are no delivery countdowns or simulated progress indicators.
 */
function ProjectPreviewStage({
	project,
	language,
}: {
	project: Project;
	language: Language;
}) {
	const isOpenSource = project.status === "open_source";
	const statusLabel = isOpenSource
		? t(language, "projects.statusOpenSource")
		: t(language, "projects.statusPrivate");

	return (
		<div className="w-full h-full bg-[#08080B] rounded-xl border border-white/10 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden select-none">
			<div
				className="absolute inset-0 pointer-events-none opacity-20"
				style={{
					backgroundImage: `
            linear-gradient(rgba(237, 237, 237, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(237, 237, 237, 0.04) 1px, transparent 1px)
          `,
					backgroundSize: "20px 20px",
				}}
			/>

			<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between z-10 border-b border-white/10 pb-3">
				<div className="flex min-w-0 items-center gap-2">
					<div className="flex shrink-0 items-center gap-1.5">
						<span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80" />
						<span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80" />
						<span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80" />
					</div>
					<span className="min-w-0 text-xs font-mono text-zinc-400 ml-1.5 flex items-center gap-1.5">
						<Terminal className="w-3 h-3 shrink-0 text-zinc-500" />
						<span className="truncate">
							{project.github
								? "github.com/D-MachadoDev"
								: t(language, "projects.privateCase")}
						</span>
					</span>
				</div>

				<span
					className={`inline-flex shrink-0 items-center gap-1.5 self-start px-2.5 py-0.5 rounded-full border text-[11px] font-mono ${
						isOpenSource
							? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
							: "bg-zinc-500/10 border-zinc-500/20 text-zinc-400"
					}`}
				>
					<span
						className={`w-1.5 h-1.5 rounded-full ${
							isOpenSource ? "bg-emerald-400" : "bg-zinc-400"
						}`}
					/>
					<span>{statusLabel}</span>
				</span>
			</div>

			<div className="my-auto py-4 z-10 flex flex-col items-center text-center">
				<div className="inline-flex max-w-full items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 mb-4 text-xs font-mono text-zinc-300">
					<Code2 className="w-3.5 h-3.5 shrink-0 text-blue-400" />
					<span className="truncate">{project.architectureBadge}</span>
				</div>

				<div className="grid w-full max-w-md grid-cols-3 gap-2 mb-4">
					{project.evidence.map((item) => (
						<div
							key={item.label[language]}
							className="flex flex-col items-center justify-center bg-white/[0.03] border border-white/10 px-2 py-2 rounded-lg min-w-0"
						>
							<span className="text-base sm:text-lg font-mono font-bold text-white">
								{item.value}
							</span>
							<span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5 leading-tight">
								{item.label[language]}
							</span>
						</div>
					))}
				</div>

				<div className="w-full max-w-md text-left bg-white/[0.02] border border-white/5 rounded-lg p-3 space-y-1.5 text-xs font-mono text-zinc-400">
					{project.architectureHighlights[language].map((highlight) => (
						<div key={highlight} className="flex items-start gap-2">
							<ShieldCheck className="w-3 h-3 mt-0.5 shrink-0 text-emerald-400" />
							<span className="leading-snug text-zinc-300">{highlight}</span>
						</div>
					))}
				</div>
			</div>

			<div className="flex items-center justify-between gap-3 z-10 pt-3 border-t border-white/10 text-xs font-mono">
				<div className="flex min-w-0 items-center gap-1.5 text-zinc-400">
					<span className="truncate">{project.tags.slice(0, 3).join(" · ")}</span>
				</div>

				{project.github ? (
					<a
						href={project.github}
						target="_blank"
						rel="noopener noreferrer"
						className="shrink-0 text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
					>
						<span>{t(language, "projects.openRepo")}</span>
						<ArrowUpRight className="w-3.5 h-3.5" />
					</a>
				) : (
					<a
						href="#contact"
						className="shrink-0 text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
					>
						<span>{t(language, "projects.requestWalkthrough")}</span>
						<ArrowRight className="w-3.5 h-3.5" />
					</a>
				)}
			</div>
		</div>
	);
}

export function ProjectModal({
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
		<>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.16, ease: "easeOut" }}
				className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm"
				onClick={onClose}
			/>

			<div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
				<motion.div
					role="dialog"
					aria-modal="true"
					aria-labelledby="project-modal-title"
					aria-describedby="project-modal-description"
					initial={{ opacity: 0, scale: 0.98, y: 10 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.98, y: 10 }}
					transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
					className="pointer-events-auto bg-[#0A0A0E] w-full max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden border border-white/10 shadow-2xl relative flex flex-col rounded-2xl"
					onClick={(e) => e.stopPropagation()}
				>
					<div
						className="sticky top-0 z-20 flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-white/10"
						style={{
							backgroundColor: "rgba(10, 10, 14, 0.95)",
							backdropFilter: "blur(10px)",
						}}
					>
						<div>
							<div className="flex items-center gap-2 mb-2">
								<span
									className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold uppercase tracking-wider"
									style={{
										backgroundColor: `${project.accent}18`,
										color: getAccessibleTextColor(project.accent),
										border: `1px solid ${project.accent}30`,
									}}
								>
									{project.category}
								</span>
								<span className="text-xs font-mono text-zinc-400">
									· {project.year}
								</span>
							</div>
							<h3
								id="project-modal-title"
								className="text-xl sm:text-2xl font-bold text-white leading-tight"
							>
								{project.title}
							</h3>
							<p className="text-xs sm:text-sm font-mono text-zinc-400 mt-1">
								{project.role}
							</p>
						</div>

						<button
							type="button"
							ref={closeButtonRef}
							onClick={onClose}
							className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors rounded-full shrink-0"
							aria-label={t(language, "projects.closeModal")}
						>
							<X className="w-5 h-5" />
						</button>
					</div>

					<div className="p-6 sm:p-8 space-y-6">
						<div>
							<h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2 font-semibold">
								{t(language, "projects.overview")}
							</h4>
							<p
								id="project-modal-description"
								className="text-sm sm:text-base text-zinc-300 leading-relaxed"
							>
								{project.description[language]}
							</p>
						</div>

						<div>
							<h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3 font-semibold">
								{t(language, "projects.decisions")}
							</h4>
							<div className="space-y-2 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
								{project.architectureHighlights[language].map((item) => (
									<div
										key={item}
										className="flex items-start gap-2.5 text-xs sm:text-sm"
									>
										<span className="text-blue-400 font-bold mt-0.5">›</span>
										<span className="text-zinc-300 leading-normal">{item}</span>
									</div>
								))}
							</div>
						</div>

						<div>
							<h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3 font-semibold">
								{t(language, "projects.evidence")}
							</h4>
							<div className="grid grid-cols-3 gap-2">
								{project.evidence.map((item) => (
									<div
										key={item.label[language]}
										className="border border-white/10 bg-white/[0.02] rounded-lg p-3 text-center"
									>
										<div className="text-base sm:text-lg font-mono font-bold text-white">
											{item.value}
										</div>
										<div className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-wider mt-1 leading-tight">
											{item.label[language]}
										</div>
									</div>
								))}
							</div>
						</div>

						<div>
							<h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2.5 font-semibold">
								{t(language, "projects.stack")}
							</h4>
							<div className="flex flex-wrap gap-2">
								{project.tags.map((tag) => (
									<span
										key={tag}
										className="px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300 bg-white/[0.03] border border-white/10 flex items-center gap-1.5"
									>
										<TechIcon tag={tag} className="w-3.5 h-3.5" />
										{tag}
									</span>
								))}
							</div>
						</div>

						<div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
							<div className="flex items-center gap-3">
								{project.github && (
									<a
										href={project.github}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black hover:bg-zinc-200 transition-all text-xs sm:text-sm font-mono font-medium shadow-sm"
									>
										<Github className="w-4 h-4" />
										<span>{t(language, "projects.source")}</span>
									</a>
								)}

								{project.link && (
									<a
										href={project.link}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all text-xs sm:text-sm font-medium"
									>
										<span>{t(language, "projects.demo")}</span>
										<ExternalLink className="w-4 h-4" />
									</a>
								)}
							</div>

							<button
								type="button"
								onClick={onClose}
								className="text-xs font-mono text-zinc-400 hover:text-white transition-colors"
							>
								{t(language, "projects.closeModal")}
							</button>
						</div>
					</div>
				</motion.div>
			</div>
		</>
	);
}

export function Projects({ language }: { language: Language }) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const prefersReducedMotion = useReducedMotion();
	const [isAutoPlay, setIsAutoPlay] = useState(!prefersReducedMotion);
	const timerRef = useRef<number | null>(null);

	const activeProject = projects[activeIndex];

	const nextProject = useCallback(() => {
		setActiveIndex((prev) => (prev + 1) % projects.length);
	}, []);

	const prevProject = useCallback(() => {
		setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
	}, []);

	useEffect(() => {
		if (prefersReducedMotion) {
			setIsAutoPlay(false);
		}
	}, [prefersReducedMotion]);

	useEffect(() => {
		if (!isAutoPlay || selectedProject !== null) {
			if (timerRef.current) clearInterval(timerRef.current);
			return;
		}

		timerRef.current = window.setInterval(() => {
			if (!document.hidden) {
				nextProject();
			}
		}, 8000);

		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [isAutoPlay, selectedProject, nextProject]);

	useEffect(() => {
		if (!selectedProject) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setSelectedProject(null);
		};

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [selectedProject]);

	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const node = sectionRef.current;
		if (!node) return;
		const handleEnter = () => setIsAutoPlay(false);
		const handleLeave = () => setIsAutoPlay(true);
		node.addEventListener("mouseenter", handleEnter);
		node.addEventListener("mouseleave", handleLeave);
		return () => {
			node.removeEventListener("mouseenter", handleEnter);
			node.removeEventListener("mouseleave", handleLeave);
		};
	}, []);

	return (
		<section
			id="work"
			ref={sectionRef}
			className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
		>
			<div className="max-w-6xl mx-auto">
				<FadeIn>
					<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
						<div>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className="inline-block px-4 py-1.5 border border-white/10 mb-4 backdrop-blur-sm rounded-lg"
							>
								<span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
									<Sparkles className="w-3 h-3 text-blue-400" />
									{t(language, "projects.badge")}
								</span>
							</motion.div>

							<h2 className="text-3xl sm:text-4xl md:text-5xl text-white tracking-tight font-bold">
								{t(language, "projects.heading")}{" "}
								<span className="text-blue-500">
									{t(language, "projects.headingAccent")}
								</span>
							</h2>
							<p className="text-sm sm:text-base text-zinc-400 max-w-2xl mt-2 leading-relaxed">
								{t(language, "projects.subtitle")}
							</p>
						</div>

						<div className="flex items-center gap-3 shrink-0">
							<span className="text-xs font-mono text-zinc-400">
								{String(activeIndex + 1).padStart(2, "0")} /{" "}
								{String(projects.length).padStart(2, "0")}
							</span>

							<button
								type="button"
								onClick={() => setIsAutoPlay((p) => !p)}
								className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
								aria-label={
									isAutoPlay
										? t(language, "projects.pauseRotation")
										: t(language, "projects.resumeRotation")
								}
								aria-pressed={!isAutoPlay}
							>
								{isAutoPlay ? (
									<Pause className="w-3.5 h-3.5" />
								) : (
									<Play className="w-3.5 h-3.5" />
								)}
							</button>

							<div className="flex items-center gap-1.5">
								<button
									type="button"
									onClick={prevProject}
									className="p-2 rounded-lg border border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
									aria-label={t(language, "projects.previousProject")}
								>
									<ChevronLeft className="w-4 h-4" />
								</button>
								<button
									type="button"
									onClick={nextProject}
									className="p-2 rounded-lg border border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
									aria-label={t(language, "projects.nextProject")}
								>
									<ChevronRight className="w-4 h-4" />
								</button>
							</div>
						</div>
					</div>
				</FadeIn>

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
					{projects.map((proj, idx) => {
						const isActive = idx === activeIndex;
						return (
							<button
								key={proj.id}
								type="button"
								aria-pressed={isActive}
								onClick={() => {
									setActiveIndex(idx);
									setIsAutoPlay(false);
								}}
								className={`text-left p-3 rounded-xl border transition-colors duration-150 relative ${
									isActive
										? "border-blue-500/50 bg-[#121218] text-white shadow-lg shadow-blue-500/5"
										: "border-white/5 bg-[#0B0B0E]/60 text-zinc-400 hover:border-white/15 hover:bg-[#0E0E12]"
								}`}
							>
								<div className="flex items-center justify-between mb-1">
									<span className="text-[11px] font-mono font-bold text-zinc-400">
										{String(idx + 1).padStart(2, "0")}
									</span>
									<span
										className="w-1.5 h-1.5 rounded-full"
										style={{ backgroundColor: proj.accent }}
									/>
								</div>
								<div className="text-xs font-semibold truncate text-zinc-200">
									{proj.title.split("—")[0].trim()}
								</div>
								<div className="text-[10px] font-mono text-zinc-400 truncate mt-0.5">
									{proj.category}
								</div>

								{isActive && (
									<motion.div
										layoutId="active-project-bar"
										className="absolute -bottom-px left-3 right-3 h-[2px] bg-blue-500 rounded-full"
										style={{ willChange: "transform" }}
										transition={{
											type: "spring",
											stiffness: 420,
											damping: 32,
											mass: 0.8,
										}}
									/>
								)}
							</button>
						);
					})}
				</div>

				<div className="bg-[#0A0A0D] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative grid grid-cols-1 grid-rows-1 transition-[box-shadow] duration-200 ease-out"
					style={{
						boxShadow: `0 24px 48px -18px ${activeProject.accent}15`,
					}}
				>
					<AnimatePresence initial={false} mode="wait">
						<motion.div
							key={activeProject.id}
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
							style={{ willChange: "transform, opacity" }}
							className="col-start-1 row-start-1 w-full grid grid-cols-1 lg:grid-cols-12 items-stretch"
						>
							<div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#060608] p-4 sm:p-6 flex flex-col justify-center min-h-[380px]">
								<ProjectPreviewStage
									project={activeProject}
									language={language}
								/>
							</div>

							<div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
								<div>
									<div className="flex items-center gap-2 mb-3">
										<span
											className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold uppercase tracking-wider"
											style={{
												backgroundColor: `${activeProject.accent}18`,
												color: getAccessibleTextColor(activeProject.accent),
												border: `1px solid ${activeProject.accent}30`,
											}}
										>
											{activeProject.category}
										</span>
										<span className="text-xs font-mono text-zinc-400">
											{activeProject.year}
										</span>
									</div>

									<h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-snug">
										{activeProject.title}
									</h3>

									<p className="text-xs sm:text-sm font-mono text-zinc-400 mb-4">
										{activeProject.role}
									</p>

									<p className="text-sm text-zinc-300 leading-relaxed mb-6">
										{activeProject.summary[language]}
									</p>

									<div className="flex flex-wrap gap-1.5 mb-6">
										{activeProject.tags.map((tag) => (
											<span
												key={tag}
												className="px-2.5 py-1 rounded-md text-xs font-mono text-zinc-300 bg-white/[0.03] border border-white/10 flex items-center gap-1.5"
											>
												<TechIcon tag={tag} className="w-3 h-3" />
												{tag}
											</span>
										))}
									</div>
								</div>

								<div className="flex flex-wrap items-center gap-3 pt-5 border-t border-white/10">
									{activeProject.github && (
										<a
											href={activeProject.github}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-sm font-mono"
										>
											<Github className="w-4 h-4" />
											<span>{t(language, "projects.source")}</span>
										</a>
									)}

									<button
										type="button"
										onClick={() => setSelectedProject(activeProject)}
										className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 text-white hover:border-white/30 hover:bg-white/5 transition-all text-xs font-mono"
									>
										<span>{t(language, "projects.details")}</span>
										<ArrowUpRight className="w-3.5 h-3.5" />
									</button>
								</div>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>

				<FadeIn delay={0.15}>
					<div className="mt-12 text-center">
						<motion.a
							href="https://github.com/D-MachadoDev?tab=repositories"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-3 px-6 py-3 text-zinc-300 border border-white/10 hover:border-blue-500/50 hover:text-white hover:bg-blue-500/5 transition-all group text-xs sm:text-sm font-mono rounded-xl bg-[#09090C]"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							<Github className="w-4 h-4" />
							<span>{t(language, "projects.viewAll")}</span>
							<ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
