import { useEffect, useState } from "react";
import { About } from "./components/About";
import { BackToTop } from "./components/BackToTop";
import { Contact } from "./components/Contact";
import { CustomCursor } from "./components/CustomCursor";
import { Experience } from "./components/Experience";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Projects } from "./components/Projects";
import { ScrollProgress } from "./components/ScrollProgress";
import { detectLanguage, type Language, t } from "./i18n";

function SectionDivider() {
	return (
		<div className="relative py-4 sm:py-6">
			<div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
				<div
					className="h-[1px] w-full"
					style={{
						background:
							"linear-gradient(90deg, transparent 0%, #27272A 20%, #3B82F6 50%, #27272A 80%, transparent 100%)",
					}}
				/>
			</div>
		</div>
	);
}

export default function App() {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
	const [language, setLanguage] = useState<Language>(detectLanguage());

	type MotionPreferenceChangeHandler = (e: MediaQueryListEvent) => void;

	useEffect(() => {
		// Smooth scroll behavior
		document.documentElement.style.scrollBehavior = "smooth";

		// Prevent flash of unstyled content
		document.body.style.visibility = "visible";

		// Check reduced motion preference
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setPrefersReducedMotion(mq.matches);

		const handler: MotionPreferenceChangeHandler = (e) => {
			setPrefersReducedMotion(e.matches);
		};

		mq.addEventListener("change", handler);

		return () => mq.removeEventListener("change", handler);
	}, []);

	useEffect(() => {
		document.documentElement.lang = language;
		document.title = t(language, "meta.title");

		const description = document.querySelector<HTMLMetaElement>(
			'meta[name="description"]',
		);
		if (description) {
			description.content = t(language, "meta.description");
		}
	}, [language]);

	return (
		<div className="relative bg-[#050505] min-h-screen overflow-x-hidden">
			{/*  Skip to content for a11y */}
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-semibold focus:rounded-md focus:outline-none"
			>
				{t(language, "a11y.skipToContent")}
			</a>

			{/* Custom Cursor — hidden on touch / reduced motion */}
			{!prefersReducedMotion && <CustomCursor />}

			{/* Scroll Progress Bar */}
			<ScrollProgress />

			{/* Grid Background Overlay */}
			<div
				className="fixed inset-0 pointer-events-none z-0"
				style={{
					backgroundImage: `
            linear-gradient(rgba(237, 237, 237, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(237, 237, 237, 0.04) 1px, transparent 1px)
          `,
					backgroundSize: "32px 32px",
				}}
			/>

			{/* Noise Texture */}
			<div
				className="fixed inset-0 opacity-[0.015] pointer-events-none z-0"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
				}}
			/>

			{/* Gradient Orbs */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
				<div
					className="absolute top-1/4 -left-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-[#3B82F6] rounded-full opacity-[0.03] blur-[80px] sm:blur-[100px] lg:blur-[120px]"
					style={{
						animation: prefersReducedMotion
							? "none"
							: "float 20s ease-in-out infinite",
					}}
				/>
				<div
					className="absolute bottom-1/4 -right-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-[#3B82F6] rounded-full opacity-[0.03] blur-[80px] sm:blur-[100px] lg:blur-[120px]"
					style={{
						animation: prefersReducedMotion
							? "none"
							: "float 25s ease-in-out infinite reverse",
					}}
				/>
			</div>

			<Navbar language={language} onLanguageChange={setLanguage} />

			{/* Semantic Main Content Landmark */}
			<main
				id="main-content"
				className="relative z-10 w-full overflow-x-hidden"
			>
				<Hero language={language} />
				<SectionDivider />
				<Projects language={language} />
				<SectionDivider />
				<About language={language} />
				<SectionDivider />
				<Experience language={language} />
				<SectionDivider />
				<Contact language={language} />
			</main>

			{/* Back to Top Button */}
			<BackToTop language={language} />
		</div>
	);
}
