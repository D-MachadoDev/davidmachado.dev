import { useEffect, useState } from "react";
import { CustomCursor } from "./components/CustomCursor";
import { ScrollProgress } from "./components/ScrollProgress";
import { BackToTop } from "./components/BackToTop";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { type Language, detectLanguage, t } from "./i18n";
import { Toaster } from "sonner";

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
  const [loading, setLoading] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [language, setLanguage] = useState<Language>(detectLanguage());
  
  interface MotionPreferenceChangeHandler {
    (e: MediaQueryListEvent): void;
  }

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
      {/*  Skip to content for a11y */ } 
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#3B82F6] focus:text-white focus:rounded-md focus:outline-none"
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
            animation: prefersReducedMotion ? "none" : "float 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 -right-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-[#3B82F6] rounded-full opacity-[0.03] blur-[80px] sm:blur-[100px] lg:blur-[120px]"
          style={{
            animation: prefersReducedMotion ? "none" : "float 25s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar language={language} onLanguageChange={setLanguage} />
        <Hero language={language} />
        <SectionDivider />
        <Projects language={language} />
        <SectionDivider />
        <About language={language} />
        <SectionDivider />
        <Experience language={language} />
        <SectionDivider />
        <Contact language={language} />
      </div>

      {/* Back to Top Button */}
      <BackToTop />

      {/* Global Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        /* Hide cursor on touch devices */
        @media (hover: none) {
          .fixed.w-1\\.5,
          .fixed.w-10,
          .fixed.w-32 {
            display: none !important;
          }
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #050505;
        }

        ::-webkit-scrollbar-thumb {
          background: #27272A;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #3B82F6;
        }

        /* Selection */
        ::selection {
          background-color: rgba(59, 130, 246, 0.3);
          color: #EDEDED;
        }

        /* Focus visible */
        *:focus-visible {
          outline: 2px solid #3B82F6;
          outline-offset: 2px;
        }

        /* Reduce motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}