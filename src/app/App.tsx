import { useEffect, useState } from "react";
import { About } from "./components/About";
import { BackToTop } from "./components/BackToTop";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Hero } from "./components/Hero";
import { HowIWork } from "./components/HowIWork";
import { Navbar } from "./components/Navbar";
import { Projects } from "./components/Projects";
import { ScrollProgress } from "./components/ScrollProgress";
import { detectLanguage, type Language, t } from "./i18n";

export default function App() {
	const [language, setLanguage] = useState<Language>(detectLanguage());

	useEffect(() => {
		// Smooth scroll behavior
		document.documentElement.style.scrollBehavior = "smooth";

		// Prevent flash of unstyled content
		document.body.style.visibility = "visible";
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

			<Navbar language={language} onLanguageChange={setLanguage} />

			{/* Semantic Main Content Landmark */}
			<main
				id="main-content"
				className="relative z-10 w-full overflow-x-hidden"
			>
				<Hero language={language} />
				<Projects language={language} />
				<HowIWork language={language} />
				<About language={language} />
				<Experience language={language} />
				<Contact language={language} />
			</main>

			{/* Back to Top Button */}
			<BackToTop language={language} />
		</div>
	);
}
