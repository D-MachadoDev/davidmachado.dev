import {
	SiDocker,
	SiDotnet,
	SiGo,
	SiGraphql,
	SiKubernetes,
	SiLinux,
	SiMongodb,
	SiNextdotjs,
	SiNodedotjs,
	SiPostgresql,
	SiPython,
	SiReact,
	SiRedis,
	SiTailwindcss,
	SiTypescript,
} from "@icons-pack/react-simple-icons";
import {
	ArrowUpRight,
	ChevronLeft,
	ChevronRight,
	Code2,
	ExternalLink,
	Github,
	Layers,
	Pause,
	Play,
	Sparkles,
	Terminal,
	X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { type Language, t } from "../i18n";
import { FadeIn } from "./TextReveal";

export interface Project {
	id: string;
	title: string;
	category: string;
	role: string;
	summary: Record<Language, string>;
	description: Record<Language, string>;
	architectureHighlights: Record<Language, string[]>;
	tags: string[];
	link?: string;
	github?: string;
	year: string;
	accent: string;
	status: "live" | "in_development";
	targetDays: number;
	architectureBadge: string;
}

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
	if (
		clean === ".net" ||
		clean.includes("dotnet") ||
		clean === "c#" ||
		clean.includes("csharp")
	)
		return <SiDotnet className={className} />;
	if (clean.includes("postgres")) return <SiPostgresql className={className} />;
	if (clean.includes("docker")) return <SiDocker className={className} />;
	if (clean.includes("kubernetes") || clean === "k8s")
		return <SiKubernetes className={className} />;
	if (clean.includes("tailwind"))
		return <SiTailwindcss className={className} />;
	if (clean.includes("redis")) return <SiRedis className={className} />;
	if (clean.includes("python")) return <SiPython className={className} />;
	if (clean.includes("go") || clean === "golang")
		return <SiGo className={className} />;
	if (clean.includes("node")) return <SiNodedotjs className={className} />;
	if (clean.includes("mongo")) return <SiMongodb className={className} />;
	if (clean.includes("graphql")) return <SiGraphql className={className} />;
	if (clean.includes("linux")) return <SiLinux className={className} />;
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
 * ============================================================================
 * GUÍA DE ESCALABILIDAD — CÓMO AÑADIR NUEVOS PROYECTOS AL PORTAFOLIO
 * ============================================================================
 *
 * Este carrusel está diseñado para escalar a cualquier número de proyectos (4, 8, 12, etc.)
 * y cualquier stack tecnológico. Para añadir o modificar proyectos:
 *
 * 1. AÑADIR UN PROYECTO:
 *    Copia la siguiente plantilla y agrégala al array `projects` abajo:
 *
 *    {
 *      id: "mi-nuevo-proyecto",               // ID único (kebab-case)
 *      title: "Nombre del Proyecto",          // Título visible
 *      category: "Backend & Systems",         // Categoría (Full-Stack, Backend, Cloud, Frontend)
 *      role: "Backend Architect",             // Tu rol en el proyecto
 *      summary: {
 *        es: "Resumen de 1-2 líneas enfocado en impacto y valor.",
 *        en: "1-2 line summary focused on impact and value.",
 *        pt: "Resumo de 1-2 linhas focado em impacto e valor."
 *      },
 *      description: {
 *        es: "Descripción técnica detallada: problema, arquitectura (Hexagonal, DDD, EDA), trade-offs y decisiones.",
 *        en: "Detailed technical description: problem, architecture, trade-offs, and design rationale.",
 *        pt: "Descrição técnica detalhada com decisões arquiteturais e trade-offs."
 *      },
 *      architectureHighlights: {
 *        es: ["Punto clave 1", "Punto clave 2", "Punto clave 3"],
 *        en: ["Key point 1", "Key point 2", "Key point 3"],
 *        pt: ["Ponto chave 1", "Ponto chave 2", "Ponto chave 3"]
 *      },
 *      tags: [".NET", "PostgreSQL", "Docker", "Redis"], // Tecnologías (TechIcon las detecta automáticamente)
 *      github: "https://github.com/D-MachadoDev/mi-repo", // URL del repositorio (abre botón GitHub directo)
 *      link: "https://mi-proyecto.davidmachado.dev",       // URL de producción (opcional cuando esté desplegado)
 *      year: "2026",
 *      accent: "#3B82F6",                     // Color de resplandor (#10B981, #3B82F6, #8B5CF6, #06B6D4, #F59E0B, etc.)
 *      status: "in_development",              // "live" (activo/desplegado) o "in_development" (en construcción)
 *      targetDays: 14,                        // Días restantes estimados para el contador en vivo
 *      architectureBadge: "Hexagonal DDD",    // Píldora destacada de patrón arquitectónico
 *    }
 *
 * 2. PASAR UN PROYECTO A PRODUCCIÓN ("LIVE"):
 *    - Cambia `status: "live"`.
 *    - Coloca la URL de demo en `link: "https://..."`.
 *    - El botón cambiará automáticamente de "En Construcción (Countdown)" a "Demo en Vivo" con enlace directo.
 *
 * 3. VINCULAR REPOSITORIOS GITHUB:
 *    - Basta con actualizar la propiedad `github: "https://github.com/D-MachadoDev/..."`.
 *    - Si aún no tiene repo público, puedes omitir la propiedad o dejarla comentada.
 *
 * 4. NAVEGACIÓN Y RENDIMIENTO:
 *    - La UI adapta los indicadores inferiores, el contador (1/N), la pausa automática,
 *      los controles de teclado (flechas ← →) y el soporte táctil sin requerir cambios adicionales.
 * ============================================================================
 */
export const projects: Project[] = [
	{
		id: "faro",
		title: "Faro — Gestión Inmobiliaria",
		category: "Full-Stack Web App",
		role: "Full-Stack Developer",
		summary: {
			es: "Aplicación full-stack para propietarios y administradores que estructura contratos de arriendo, conciliación de pagos y balances contables deterministas.",
			en: "Full-stack application for property managers structuring lease agreements, payment reconciliations, and deterministic balance tracking.",
			pt: "Aplicação full-stack para proprietários estruturando contratos de locação, reconciliação de pagamentos e balanços contábeis determinísticos.",
		},
		description: {
			es: "Resuelve la dispersión de datos en hojas de cálculo manuales centralizando inmuebles, inquilinos y recibos en un sistema auditable. Diseñado con frontend desacoplado en React 18 + TypeScript y backend en ASP.NET Core con base de datos relacional PostgreSQL para cálculos de mora deterministas y persistencia transaccional.",
			en: "Eliminates spreadsheet fragmentation by centralizing properties, tenants, and receipts in an auditable system. Engineered with a decoupled React 18 + TypeScript frontend and ASP.NET Core backend with PostgreSQL for deterministic interest calculations and transactional persistence.",
			pt: "Resolve a fragmentação de planilhas centralizando imóveis, inquilinos e recibos em um sistema auditável. Desenvolvido com React 18, TypeScript e backend em ASP.NET Core com PostgreSQL.",
		},
		architectureHighlights: {
			es: [
				"Contratos de arriendo con estados formales (Activo, Mora, Finalizado)",
				"Cálculo determinista de canon, recargos y saldos pendientes",
				"Backend en ASP.NET Core con arquitectura modular y PostgreSQL",
			],
			en: [
				"Lease agreements with formal finite states (Active, Overdue, Terminated)",
				"Deterministic calculation of rent amounts, surcharges, and balances",
				"Modular ASP.NET Core backend with PostgreSQL relational schema",
			],
			pt: [
				"Contratos de locação com estados finitos (Ativo, Em Atraso, Finalizado)",
				"Cálculo determinístico de aluguéis, multas e saldos pendentes",
				"Backend modular em ASP.NET Core com persistência relacional PostgreSQL",
			],
		},
		tags: ["React", "TypeScript", ".NET", "PostgreSQL", "Tailwind CSS"],
		github: "https://github.com/D-MachadoDev/control-de-arriendo",
		year: "2026",
		accent: "#10B981",
		status: "in_development",
		targetDays: 12,
		architectureBadge: "Domain Model: Leases & Ledger",
	},
	{
		id: "zentric",
		title: "Zentric Marketplace — Core Domain & API",
		category: "Backend & API",
		role: "Backend Developer",
		summary: {
			es: "API transaccional diseñada bajo Arquitectura Hexagonal y DDD para catálogos, gestión de inventario y pedidos con consistencia estricta.",
			en: "Transactional API designed with Hexagonal Architecture and DDD for product catalogs, inventory management, and consistent order placement.",
			pt: "API transacional projetada com Arquitetura Hexagonal e DDD para catálogos, inventário e pedidos com consistência estrita.",
		},
		description: {
			es: "Núcleo de negocio desacoplado de la infraestructura mediante puertos y adaptadores. Las reglas de dominio (validación de stock, límites de compra y estados de órdenes) permanecen aisladas de frameworks externos, facilitando pruebas unitarias limpias y portabilidad entre motores de base de datos.",
			en: "Core domain logic decoupled from external infrastructure using ports and adapters. Domain invariants (stock checks, purchase limits, order transitions) remain independent of frameworks, allowing clean unit tests and database portability.",
			pt: "Lógica de domínio desacoplada da infraestrutura através de portas e adaptadores, isolando regras de negócio e validações de estoque com testes unitários limpos.",
		},
		architectureHighlights: {
			es: [
				"Arquitectura Hexagonal (Ports & Adapters) sin acoplamiento a frameworks",
				"Entidades y Value Objects de DDD protegiendo invariantes de negocio",
				"Contenedorizado con Docker y persistencia relacional en PostgreSQL",
			],
			en: [
				"Hexagonal Architecture (Ports & Adapters) isolating domain from frameworks",
				"DDD Entities & Value Objects enforcing domain invariants",
				"Containerized with Docker and relational PostgreSQL persistence",
			],
			pt: [
				"Arquitetura Hexagonal (Portas e Adaptadores) sem acoplamento externo",
				"Entidades e Value Objects de DDD garantindo consistência",
				"Contêineres Docker e persistência relacional no PostgreSQL",
			],
		},
		tags: [".NET", "C#", "PostgreSQL", "Docker"],
		github: "https://github.com/D-MachadoDev/zentric-backend",
		year: "2026",
		accent: "#3B82F6",
		status: "in_development",
		targetDays: 18,
		architectureBadge: "Hexagonal Architecture & DDD",
	},
	{
		id: "auth-identity-core",
		title: "Auth & Identity Core — Seguridad y RBAC",
		category: "Backend & Security",
		role: "Backend Developer",
		summary: {
			es: "API de autenticación y autorización segura con JWT firmado, rotación de Refresh Tokens y control de acceso basado en roles (RBAC).",
			en: "Secure authentication and authorization API featuring signed JWTs, Refresh Token rotation, and Role-Based Access Control (RBAC).",
			pt: "API de autenticação e autorização segura com JWT assinado, rotação de Refresh Tokens e controle de acesso baseado em papéis (RBAC).",
		},
		description: {
			es: "Servicio de identidad y seguridad desacoplado para proteger endpoints y validar permisos en arquitecturas de backend. Implementa hash de contraseñas con algoritmos modernos, almacenamiento seguro de refresh tokens en base de datos relacional para revocación inmediata y middleware personalizado para políticas de autorización granular.",
			en: "Decoupled identity and security service protecting endpoints and validating permissions in backend architectures. Implements modern password hashing, secure relational persistence for immediate refresh token revocation, and custom middleware enforcing granular authorization policies.",
			pt: "Serviço desacoplado de identidade e segurança para proteger endpoints e validar permissões. Implementa hash de senhas moderno, persistência relacional para revogação imediata de tokens e middleware customizado para políticas granulares de autorização.",
		},
		architectureHighlights: {
			es: [
				"Autenticación stateless con JWT y Refresh Tokens revocables",
				"Control de acceso basado en roles y permisos granulares (RBAC)",
				"Hash criptográfico seguro y middleware de validación contra ataques comunes",
			],
			en: [
				"Stateless authentication via JWT with revokable Refresh Tokens",
				"Role-Based Access Control (RBAC) with granular claims",
				"Cryptographic password hashing and custom validation middleware",
			],
			pt: [
				"Autenticação stateless via JWT com Refresh Tokens revogáveis",
				"Controle de acesso baseado em papéis e permissões granulares (RBAC)",
				"Hash criptográfico seguro e middleware customizado de segurança",
			],
		},
		tags: [".NET", "C#", "PostgreSQL", "Docker"],
		year: "2026",
		accent: "#8B5CF6",
		status: "in_development",
		targetDays: 20,
		architectureBadge: "JWT Security & RBAC Policies",
	},
	{
		id: "virtualized-explorer",
		title: "Explorador de Datos Virtualizado",
		category: "Frontend Engineering",
		role: "Frontend Engineer",
		summary: {
			es: "Interfaz analítica con DOM Windowing dinámico para navegar grandes conjuntos de datos (+50k registros) a 60fps constantes.",
			en: "Analytical viewport with dynamic DOM windowing navigating massive datasets (+50k records) at continuous 60fps.",
			pt: "Interface analítica com DOM Windowing dinâmico para navegar grandes volumes de dados (+50k registros) a 60fps constantes.",
		},
		description: {
			es: "Demuestra técnicas avanzadas de optimización en el navegador: mantiene el número de nodos del DOM acotado (<120 elementos en pantalla) mientras navega catálogos masivos. Delega operaciones complejas de filtrado y ordenamiento multicriterio a Web Workers para evitar bloqueos en el hilo principal.",
			en: "Demonstrates advanced browser performance engineering: strictly limits active DOM nodes (<120 elements) while scrolling massive tables. Delegates heavy multi-column filtering and sorting to dedicated Web Worker threads to maintain zero UI thread blocking.",
			pt: "Demonstra otimização avançada no navegador mantendo poucos nós no DOM enquanto delega filtros pesados a Web Workers em segundo plano.",
		},
		architectureHighlights: {
			es: [
				"DOM Windowing dinámico con reciclaje de nodos en scroll",
				"Cálculos de filtrado y ordenamiento delegados a Web Workers",
				"Presupuesto estricto de 60fps sin caídas de frame en navegadores móviles",
			],
			en: [
				"Dynamic DOM windowing with node recycling during viewport scroll",
				"Heavy filtering and sorting computations offloaded to Web Workers",
				"Strict 60fps frame budget without UI jank on mobile browsers",
			],
			pt: [
				"DOM Windowing dinâmico com reciclagem de nós durante a rolagem",
				"Filtros e ordenações pesadas delegadas para Web Workers",
				"Orçamento estrito de 60fps sem engasgos no thread principal",
			],
		},
		tags: ["React", "TypeScript", "Tailwind CSS"],
		year: "2025",
		accent: "#06B6D4",
		status: "in_development",
		targetDays: 32,
		architectureBadge: "Dynamic DOM Windowing · 60fps",
	},
];

// Interactive Architecture / Console Stage Component
function ProjectPreviewStage({
	project,
	language,
}: {
	project: Project;
	language: Language;
}) {
	const [timeLeft, setTimeLeft] = useState({
		days: project.targetDays,
		hours: 14,
		minutes: 32,
		seconds: 45,
	});

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
				if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
				if (prev.hours > 0)
					return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
				if (prev.days > 0)
					return {
						...prev,
						days: prev.days - 1,
						hours: 23,
						minutes: 59,
						seconds: 59,
					};
				return prev;
			});
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="w-full h-full bg-[#08080B] rounded-xl border border-white/10 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden select-none">
			{/* Subtle Blueprint Grid Background */}
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

			{/* Top Window Bar: Repo identifier + Single Clear Status Badge */}
			<div className="flex items-center justify-between z-10 border-b border-white/10 pb-3">
				<div className="flex items-center gap-2">
					<div className="flex items-center gap-1.5">
						<span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80" />
						<span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80" />
						<span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80" />
					</div>
					<span className="text-xs font-mono text-zinc-400 ml-1.5 flex items-center gap-1.5">
						<Terminal className="w-3 h-3 text-zinc-500" />
						<span>
							{project.github ? "github.com/D-MachadoDev" : "architecture.dev"}
						</span>
					</span>
				</div>

				<div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono text-amber-400">
					<span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
					<span>{t(language, "projects.inDevelopment")}</span>
				</div>
			</div>

			{/* Center Architectural Telemetry & Digital Countdown */}
			<div className="my-auto py-4 z-10 flex flex-col items-center text-center">
				{/* Domain Badge */}
				<div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 mb-4 text-xs font-mono text-zinc-300">
					<Code2 className="w-3.5 h-3.5 text-blue-400" />
					<span>{project.architectureBadge}</span>
				</div>

				{/* Digital Clock Box */}
				<div className="flex items-center gap-2 sm:gap-3 mb-4">
					<div className="flex flex-col items-center bg-white/[0.03] border border-white/10 px-3 py-2 rounded-lg min-w-[54px] sm:min-w-[62px]">
						<span className="text-xl sm:text-2xl font-mono font-bold text-white">
							{String(timeLeft.days).padStart(2, "0")}
						</span>
						<span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
							{t(language, "projects.countdownDays")}
						</span>
					</div>
					<span className="text-zinc-500 font-mono text-lg">:</span>
					<div className="flex flex-col items-center bg-white/[0.03] border border-white/10 px-3 py-2 rounded-lg min-w-[54px] sm:min-w-[62px]">
						<span className="text-xl sm:text-2xl font-mono font-bold text-white">
							{String(timeLeft.hours).padStart(2, "0")}
						</span>
						<span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
							{t(language, "projects.countdownHours")}
						</span>
					</div>
					<span className="text-zinc-500 font-mono text-lg">:</span>
					<div className="flex flex-col items-center bg-white/[0.03] border border-white/10 px-3 py-2 rounded-lg min-w-[54px] sm:min-w-[62px]">
						<span className="text-xl sm:text-2xl font-mono font-bold text-white">
							{String(timeLeft.minutes).padStart(2, "0")}
						</span>
						<span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
							{t(language, "projects.countdownMins")}
						</span>
					</div>
					<span className="text-zinc-500 font-mono text-lg">:</span>
					<div className="flex flex-col items-center bg-white/[0.03] border border-white/10 px-3 py-2 rounded-lg min-w-[54px] sm:min-w-[62px]">
						<span className="text-xl sm:text-2xl font-mono font-bold text-emerald-400">
							{String(timeLeft.seconds).padStart(2, "0")}
						</span>
						<span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
							{t(language, "projects.countdownSecs")}
						</span>
					</div>
				</div>

				{/* Architecture Bullet List */}
				<div className="w-full max-w-md text-left bg-white/[0.02] border border-white/5 rounded-lg p-3 space-y-1.5 text-xs font-mono text-zinc-400">
					{project.architectureHighlights[language].map((highlight) => (
						<div key={highlight} className="flex items-start gap-2">
							<span className="text-emerald-400 font-bold">›</span>
							<span className="leading-snug text-zinc-300">{highlight}</span>
						</div>
					))}
				</div>
			</div>

			{/* Bottom Telemetry: Stack & Direct Repository Link */}
			<div className="flex items-center justify-between z-10 pt-3 border-t border-white/10 text-xs font-mono">
				<div className="flex items-center gap-1.5 text-zinc-400">
					<span>{project.tags.slice(0, 3).join(" · ")}</span>
				</div>

				{project.github ? (
					<a
						href={project.github}
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
					>
						<span>GitHub Commits</span>
						<ArrowUpRight className="w-3.5 h-3.5" />
					</a>
				) : (
					<span className="text-zinc-400">Staging Release</span>
				)}
			</div>
		</div>
	);
}

// Lightweight, Zero-Lag Modal (Fixed Height Clipping Bug)
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
			{/* Backdrop */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.16, ease: "easeOut" }}
				className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal Container */}
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
					{/* Header */}
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

					{/* Modal Body: Clean Flow, Zero Overlapping */}
					<div className="p-6 sm:p-8 space-y-6">
						{/* Overview */}
						<div>
							<h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2 font-semibold">
								{language === "en"
									? "Project Overview"
									: language === "pt"
										? "Visão Geral do Projeto"
										: "Resumen del Proyecto"}
							</h4>
							<p
								id="project-modal-description"
								className="text-sm sm:text-base text-zinc-300 leading-relaxed"
							>
								{project.description[language]}
							</p>
						</div>

						{/* Architecture & Decisions */}
						<div>
							<h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3 font-semibold">
								{language === "en"
									? "Key Technical Decisions"
									: language === "pt"
										? "Decisões Técnicas Principais"
										: "Decisiones Técnicas Principales"}
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

						{/* Technologies */}
						<div>
							<h4 className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2.5 font-semibold">
								{language === "en"
									? "Technologies & Stack"
									: language === "pt"
										? "Tecnologias e Stack"
										: "Tecnologías y Stack"}
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

						{/* Actions */}
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

// Master Projects Section: Carousel / Stage Showcase with Zero Infinite List
export function Projects({ language }: { language: Language }) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [isAutoPlay, setIsAutoPlay] = useState(true);
	const timerRef = useRef<number | null>(null);

	const activeProject = projects[activeIndex];

	// Navigation handlers
	const nextProject = useCallback(() => {
		setActiveIndex((prev) => (prev + 1) % projects.length);
	}, []);

	const prevProject = useCallback(() => {
		setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
	}, []);

	// Auto-advance with hover pause
	useEffect(() => {
		if (!isAutoPlay || selectedProject !== null) {
			if (timerRef.current) clearInterval(timerRef.current);
			return;
		}

		timerRef.current = window.setInterval(() => {
			nextProject();
		}, 8000);

		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [isAutoPlay, selectedProject, nextProject]);

	// Keyboard navigation & Esc listener
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (selectedProject) {
				if (e.key === "Escape") setSelectedProject(null);
				return;
			}
			if (e.key === "ArrowRight") nextProject();
			if (e.key === "ArrowLeft") prevProject();
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [selectedProject, nextProject, prevProject]);

	const sectionRef = useRef<HTMLElement>(null);

	// Pause autoplay on mouse enter
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
				{/* Section Header */}
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

						{/* Carousel Controls: Arrows + Counter + Pause/Play */}
						<div className="flex items-center gap-3 shrink-0">
							<span className="text-xs font-mono text-zinc-400">
								0{activeIndex + 1} / 0{projects.length}
							</span>

							<button
								type="button"
								onClick={() => setIsAutoPlay((p) => !p)}
								className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
								aria-label={
									isAutoPlay
										? "Pausar rotación automática"
										: "Reanudar rotación automática"
								}
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
									aria-label="Proyecto anterior"
								>
									<ChevronLeft className="w-4 h-4" />
								</button>
								<button
									type="button"
									onClick={nextProject}
									className="p-2 rounded-lg border border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 transition-all"
									aria-label="Siguiente proyecto"
								>
									<ChevronRight className="w-4 h-4" />
								</button>
							</div>
						</div>
					</div>
				</FadeIn>

				{/* Top Project Selector Tabs: Eliminates infinite list feel */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
					{projects.map((proj, idx) => {
						const isActive = idx === activeIndex;
						return (
							<button
								key={proj.id}
								type="button"
								onClick={() => setActiveIndex(idx)}
								className={`text-left p-3 rounded-xl border transition-colors duration-150 relative ${
									isActive
										? "border-blue-500/50 bg-[#121218] text-white shadow-lg shadow-blue-500/5"
										: "border-white/5 bg-[#0B0B0E]/60 text-zinc-400 hover:border-white/15 hover:bg-[#0E0E12]"
								}`}
							>
								<div className="flex items-center justify-between mb-1">
									<span className="text-[11px] font-mono font-bold text-zinc-400">
										0{idx + 1}
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

								{/* Animated Active Indicator */}
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

				{/* The Hero Showcase Stage (Single Unified View) */}
				<div
					className="bg-[#0A0A0D] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative grid grid-cols-1 grid-rows-1 transition-[box-shadow] duration-200 ease-out"
					style={{
						boxShadow: `0 24px 48px -18px ${activeProject.accent}15`,
					}}
				>
					<AnimatePresence initial={false}>
						<motion.div
							key={activeProject.id}
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
							style={{ willChange: "transform, opacity" }}
							className="col-start-1 row-start-1 w-full grid grid-cols-1 lg:grid-cols-12 items-stretch"
						>
							{/* Left Stage: Architecture & Console Preview (7 Cols) */}
							<div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#060608] p-4 sm:p-6 flex flex-col justify-center min-h-[380px]">
								<ProjectPreviewStage
									project={activeProject}
									language={language}
								/>
							</div>

							{/* Right Stage: Project Architecture & Details (5 Cols) */}
							<div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
								<div>
									{/* Category & Year */}
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

									{/* Title */}
									<h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-snug">
										{activeProject.title}
									</h3>

									{/* Role */}
									<p className="text-xs sm:text-sm font-mono text-zinc-400 mb-4">
										{activeProject.role}
									</p>

									{/* Summary */}
									<p className="text-sm text-zinc-300 leading-relaxed mb-6">
										{activeProject.summary[language]}
									</p>

									{/* Tech Pills */}
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

								{/* Action Buttons: Clean & Direct */}
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

				{/* View All Repositories on GitHub */}
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

			{/* Zero-Lag Modal Dialog */}
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
