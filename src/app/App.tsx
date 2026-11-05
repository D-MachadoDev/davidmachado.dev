import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
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

export default function App() {
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
}
