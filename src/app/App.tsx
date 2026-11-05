import { useEffect, useState } from "react";
<<<<<<< Updated upstream
import { Toaster } from "sonner";
import { About } from "./components/About";
import { BackToTop } from "./components/BackToTop";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";
import { CustomCursor } from "./components/CustomCursor";
import { Experience } from "./components/Experience";
import { Hero } from "./components/Hero";
import { LoadingScreen } from "./components/LoadingScreen";
=======
import { Footer } from "./components/Footer";
>>>>>>> Stashed changes
import { Navbar } from "./components/Navbar";
import { projects } from "./data/projects";
import { detectLanguage, persistLanguage, t, type Language } from "./i18n";
import { AboutPage } from "./pages/AboutPage";
import { GalleryPage } from "./pages/GalleryPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProjectPage } from "./pages/ProjectPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { RouterProvider, routeKey, useRouter } from "./router";
import { updateDocumentSeo } from "./seo";
import {
	applyTheme,
	getSystemTheme,
	persistTheme,
	readStoredTheme,
	resolveTheme,
	type Theme,
	type ThemePreference,
} from "./theme";

function Site({
  language,
  onLanguageChange,
  theme,
  themePreference,
  onThemeChange,
}: {
  language: Language;
  onLanguageChange: (language: Language) => void;
  theme: Theme;
  themePreference: ThemePreference;
  onThemeChange: (preference: ThemePreference) => void;
}) {
  const { route } = useRouter();
  const project =
    route.name === "project" ? projects.find((entry) => entry.id === route.id) : undefined;

  useEffect(() => {
    persistLanguage(language);
    document.documentElement.lang = language;
    updateDocumentSeo(route, language);
  }, [language, route]);

  const page = (() => {
    switch (route.name) {
      case "home":
        return <HomePage language={language} theme={theme} />;
      case "projects":
        return <ProjectsPage language={language} />;
      case "project":
        return project ? (
          <ProjectPage project={project} language={language} />
        ) : (
          <NotFoundPage language={language} />
        );
      case "gallery":
        return <GalleryPage language={language} />;
      case "about":
        return <AboutPage language={language} />;
      default:
        return <NotFoundPage language={language} />;
    }
  })();

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-white focus:font-semibold focus:text-black focus:outline-none"
      >
        {t(language, "a11y.skipToContent")}
      </a>

      <Navbar
        language={language}
        onLanguageChange={onLanguageChange}
        themePreference={themePreference}
        onThemeChange={onThemeChange}
      />

      <div key={routeKey(route)} className="page-enter flex-1">
        {page}
      </div>

      {route.name !== "home" && route.name !== "projects" && <Footer language={language} />}
    </div>
  );
}

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
<<<<<<< Updated upstream
	const [loading, setLoading] = useState(true);
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

	if (loading) {
		return <LoadingScreen onComplete={() => setLoading(false)} />;
	}

	return (
		<div className="relative bg-[#050505] min-h-screen overflow-x-hidden">
			<Toaster theme="dark" position="bottom-right" />
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
				<Certifications language={language} />
			<SectionDivider />
			<Contact language={language} />
			</main>

			{/* Back to Top Button */}
			<BackToTop />
		</div>
	);
=======
  const [language, setLanguage] = useState<Language>(detectLanguage);
  const [themePreference, setThemePreference] =
    useState<ThemePreference>(readStoredTheme);
  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);
  const theme = resolveTheme(themePreference, systemTheme);

  useEffect(() => {
    persistTheme(themePreference);
  }, [themePreference]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemTheme(media.matches ? "dark" : "light");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <RouterProvider>
      <Site
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        themePreference={themePreference}
        onThemeChange={setThemePreference}
      />
    </RouterProvider>
  );
>>>>>>> Stashed changes
}
