export type Language = "en" | "es" | "pt";

export const languageOrder: Language[] = ["en", "es", "pt"];

export const languageMeta: Record<
	Language,
	{ label: string; flag: string; native: string }
> = {
	en: { label: "English", flag: "🇺🇸", native: "English" },
	es: { label: "Spanish", flag: "🇨🇴", native: "Español" },
	pt: { label: "Portuguese", flag: "🇧🇷", native: "Português" },
};

export function getNextLanguage(current: Language): Language {
	const index = languageOrder.indexOf(current);
	return languageOrder[(index + 1) % languageOrder.length];
}

export const LANGUAGE_STORAGE_KEY = "davidmachado.language";

export function isLanguage(value: string | null): value is Language {
	return value === "en" || value === "es" || value === "pt";
}

function getBrowserStorage(): Storage | null {
	if (typeof window === "undefined") return null;
	try {
		return window.localStorage;
	} catch {
		// Storage can be unavailable in private browsing or locked-down embeds.
		return null;
	}
}

export function readStoredLanguage(
	storage: Pick<Storage, "getItem"> | null = getBrowserStorage(),
): Language | null {
	try {
		const value = storage?.getItem(LANGUAGE_STORAGE_KEY) ?? null;
		return isLanguage(value) ? value : null;
	} catch {
		return null;
	}
}

export function persistLanguage(
	language: Language,
	storage: Pick<Storage, "setItem"> | null = getBrowserStorage(),
): void {
	try {
		storage?.setItem(LANGUAGE_STORAGE_KEY, language);
	} catch {
		// A blocked storage write must not break language switching.
	}
}

export function detectLanguageFrom(browserLanguage: string | undefined): Language {
	const normalized = browserLanguage?.toLowerCase() ?? "";
	if (normalized.startsWith("es")) return "es";
	if (normalized.startsWith("pt")) return "pt";
	return "en";
}

<<<<<<< Updated upstream
const translations = {
=======
export function detectLanguage(): Language {
	const stored = readStoredLanguage();
	if (stored) return stored;
	return detectLanguageFrom(
		typeof navigator === "undefined" ? undefined : navigator.language,
	);
}

export const translations = {
>>>>>>> Stashed changes
	en: {
		"nav.work": "Work",
		"nav.about": "About",
		"nav.experience": "Experience",
		"nav.contact": "Contact",
		"nav.cta": "Get in touch",
		"nav.openMenu": "Open menu",
		"nav.closeMenu": "Close menu",
		"nav.language": "Language",
		"nav.theme": "Theme",
		"nav.translateSite": "Translate site",

		"mobile.location": "Location",
		"mobile.email": "Email",
		"mobile.language": "Language",

		"hero.available": "Available for opportunities",
		"hero.availableShort": "Available",
		"hero.subtitle1": "Backend & Software Engineer",
		"hero.subtitle2": ".NET / C# & Clean Architecture",
		"hero.subtitle3": "Full-Stack Web Developer",
		"hero.subtitle4": "PostgreSQL & Transactional APIs",
		"hero.descPre": "Building robust transactional systems at the intersection of ",
		"hero.descCloud": "backend architecture",
		"hero.descMiddle": ", ",
		"hero.descDistributed": "relational databases",
		"hero.descAnd": ", and ",
		"hero.descDX": "modern web engineering",
		"hero.ctaWork": "View my work",
		"hero.ctaContact": "Get in touch",
		"hero.scroll": "Scroll",

		"projects.badge": "FEATURED WORK",
		"projects.heading": "Engineering initiatives &",
		"projects.headingAccent": "active systems",
		"projects.subtitle":
			"Transactional backend architectures, Clean Architecture APIs, and responsive web applications built for reliability.",
		"projects.viewAll": "View all repositories on GitHub",
		"projects.demo": "Live Demo",
		"projects.inDevelopment": "In Construction",
		"projects.source": "GitHub Repository",
		"projects.details": "Architecture & Details",
		"projects.closeModal": "Close modal (Esc)",
<<<<<<< Updated upstream
		"projects.countdownDays": "Days",
		"projects.countdownHours": "Hours",
		"projects.countdownMins": "Mins",
		"projects.countdownSecs": "Secs",
		"projects.launchEstimated": "Estimated Delivery",
=======
		"projects.statusOpenSource": "Open source",
		"projects.statusPrivate": "Private case study",
		"projects.privateCase": "Private case study",
		"projects.openRepo": "Open repository",
		"projects.requestWalkthrough": "Request walkthrough",
		"projects.overview": "Project overview",
		"projects.decisions": "Key technical decisions",
		"projects.evidence": "Engineering evidence",
		"projects.stack": "Stack",
		"projects.pauseRotation": "Pause automatic rotation",
		"projects.resumeRotation": "Resume automatic rotation",
		"projects.previousProject": "Previous project",
		"projects.nextProject": "Next project",
>>>>>>> Stashed changes

		"about.badge": "ABOUT ME",
		"about.heading": "First principles meet",
		"about.headingAccent": "pragmatic engineering",
		"about.p1":
<<<<<<< Updated upstream
			"I am a software engineer approaching development from first principles. Currently in my 5th semester of Software Engineering at Universidad Pascual Bravo, I focus on building robust backend systems, relational schemas, and modern web applications that solve real-world problems.",
		"about.p2pre": "My technical foundation centers on",
		"about.p2cloud": "clean backend architecture",
		"about.p2distributed": "relational database design",
		"about.p2and": ", and",
		"about.p2dx": "responsive web interfaces",
=======
			"I am a software engineering student at Universidad Pascual Bravo. What I enjoy most is the part of the job many people skip: turning an ambiguous business rule into something a team can build, test, and explain.",
		"about.p2pre": "My foundation is ",
		"about.p2cloud": "hexagonal architecture",
		"about.p2distributed": "relational data modeling",
		"about.p2and": ", and ",
		"about.p2dx": "TypeScript and .NET",
>>>>>>> Stashed changes
		"about.p2post":
			". I believe sustainable software is built through clear separation of concerns, testable code, and pragmatic design decisions.",
		"about.p3":
			"From implementing layered domain models in ASP.NET Core and structuring transactional ledgers in PostgreSQL, to crafting fluid user interfaces in React 18 and containerizing services with Docker—I build systems with verifiable engineering discipline.",
		"about.competencies": "Core Competencies",
		"about.skillCloud": "Containers & Environment",
		"about.skillLang": "Languages & Frameworks",
		"about.skillData": "Databases & ORM",
		"about.skillArch": "Architecture & Design",
		"about.skillDevops": "Tools & Version Control",
		"about.skillMethods": "Practices & Quality",
		"cert.badge": "CERTIFICATIONS",
		"cert.heading": "Credentials & learning path",
		"cert.subtitle": "Planned certifications that reinforce my backend, cloud, and data analytics profile.",
		"cert.statusPlanned": "Planned",
		"about.skillAI": "AI Integration & Automation",
		"about.statProjects": "Engineered Systems",
		"about.statArch": "Clean Architecture",
		"about.statRepos": "Public Repositories",
		"about.statStack": "Core Stack",
		"about.philosophy": "Software Engineering Philosophy",
		"about.phil1Title": "First Principles",
		"about.phil1Desc":
			"Break down complex problems to their fundamental truths and build up from there.",
		"about.phil2Title": "Scalability First",
		"about.phil2Desc":
			"Design systems that can grow without architectural rewrites.",
		"about.phil3Title": "Developer Joy",
		"about.phil3Desc":
			"Great tools should make developers more productive and happier.",

		"exp.badge": "EXPERIENCE",
		"exp.heading": "Journey of",
		"exp.headingAccent": "growth & impact",
		"exp.subtitle":
			"A timeline of professional initiatives, foundational education, and engineering projects shaping my software mindset.",
		"exp.typeWork": "Experience",
		"exp.typeEducation": "Education",
		"exp.typeAchievement": "Achievement",
		"exp.more": "More to come...",
		"exp.workTitle": "Independent Software Developer",
		"exp.workOrg": "Client Projects & Engineering",
		"exp.workPeriod": "2024 - Present",
		"exp.workDesc":
			"Architecting and developing full-stack web applications and transactional RESTful APIs. Designed Faro, an auditable property management platform with ASP.NET Core, PostgreSQL, and React, structuring lease lifecycles, payment reconciliations, and deterministic balance ledgers.",
		"exp.eduTitle": "Software Engineering",
		"exp.eduOrg": "Universidad Pascual Bravo",
		"exp.eduPeriod": "2022 - Present",
		"exp.eduDesc":
<<<<<<< Updated upstream
			"5th semester. Academic focus on object-oriented programming, software architecture, relational database theory, data structures, and operating systems.",
=======
			"Coursework in object-oriented programming, software architecture, relational databases, data structures, and operating systems.",
		"exp.eduTag1": "Software Engineering",
		"exp.eduTag2": "OOP & Algorithms",
		"exp.eduTag3": "Databases",
>>>>>>> Stashed changes

		"contact.badge": "GET IN TOUCH",
		"contact.heading": "Let's build something",
		"contact.headingAccent": "remarkable",
		"contact.subtitle":
			"Open to opportunities in cloud architecture, DevOps, and systems engineering. Also available for consulting and collaboration.",
		"contact.formTitle": "Send a message",
		"contact.labelName": "Name",
		"contact.labelEmail": "Email",
		"contact.labelMessage": "Message",
		"contact.placeholderName": "Your name",
		"contact.placeholderEmail": "your@email.com",
		"contact.placeholderMessage":
			"Tell me about your project or opportunity...",
		"contact.sending": "Sending...",
		"contact.send": "Send message",
		"contact.sent": "Message sent!",
		"contact.sentSub": "I'll get back to you within 24 hours.",
		"contact.basedIn": "Based in",
		"contact.location": "Medellín, Colombia",
		"contact.availability": "Availability",
		"contact.availStatus": "Open for opportunities",
		"contact.timezone": "Time Zone",
		"contact.sendEmail": "Send me an email",
		"contact.emailResponse": "Typically responds within 24 hours",
		"contact.copyright": "© 2026 David Alexander Machado Alzate",
		"contact.tagline": "Designed for clarity. Engineered for performance.",
		"contact.builtWith":
<<<<<<< Updated upstream
			"Built with React, TypeScript, Motion, and Tailwind CSS",
		"contact.github": "GitHub",
		"contact.linkedin": "LinkedIn",
		"contact.twitter": "X / Twitter",
=======
			"Built with React, TypeScript, and Tailwind CSS. Tested with Vitest.",
		"contact.github": "GitHub",
		"contact.linkedin": "LinkedIn",

		"meta.projects": "Projects — David Machado",
		"meta.gallery": "Gallery — David Machado",
		"meta.about": "About — David Machado",
		"nav.pond": "pond",
		"nav.projects": "projects",
		"nav.gallery": "gallery",
		"nav.sayHi": "say hi",
		"projects.viewCase": "view project",
		"projects.scroll": "scroll",
		"projects.allRepos": "all repositories",
		"projects.allReposLede": "The rest of the public work lives on GitHub.",
		"projects.back": "all projects",
		"projects.next": "next project",
		"projects.caseStudy": "case study",
		"projects.year": "Year",
		"projects.role": "Role",
		"projects.status": "Status",
		"projects.links": "Links",
		"projects.roleValue": "Backend engineering, architecture, tests",
		"projects.notFound": "This project does not exist.",
		"gallery.badge": "GALLERY",
		"gallery.heading": "Certifications & credentials",
		"gallery.lede":
			"Credentials I am studying for or have earned, with the honest status of each one. No badges I have not earned.",
		"gallery.credentials": "credentials",
		"gallery.status": "in progress",
		"gallery.statusInProgress": "in progress",
		"gallery.statusIssued": "issued",
		"gallery.credential": "verify credential",
		"gallery.note":
			"Issued credentials will link to their verification page when available.",
		"about.education": "Education",
		"about.educationValue":
			"Software Engineering, Universidad Pascual Bravo",
		"about.educationMeta": "2022 — present",
		"about.contactTitle": "Let's build something reliable",
		"notFound.badge": "404",
		"notFound.heading": "This page is not in the pond.",
		"notFound.lede": "The link may be old, or the page moved.",
		"notFound.cta": "Back to the pond",
>>>>>>> Stashed changes

		"a11y.skipToContent": "Skip to content",
	},

	es: {
		"nav.work": "Proyectos",
		"nav.about": "Sobre mí",
		"nav.experience": "Experiencia",
		"nav.contact": "Contacto",
		"nav.cta": "Contactar",
		"nav.openMenu": "Abrir menú",
		"nav.closeMenu": "Cerrar menú",
		"nav.language": "Idioma",
		"nav.theme": "Tema",
		"nav.translateSite": "Traducir sitio",

		"mobile.location": "Ubicación",
		"mobile.email": "Correo",
		"mobile.language": "Idioma",

		"hero.available": "Disponible para oportunidades",
		"hero.availableShort": "Disponible",
		"hero.subtitle1": "Ingeniero de Software & Backend",
		"hero.subtitle2": ".NET / C# & Clean Architecture",
		"hero.subtitle3": "Desarrollador Web Full-Stack",
		"hero.subtitle4": "PostgreSQL & APIs Transaccionales",
		"hero.descPre": "Construyo software transaccional y robusto en la intersección de ",
		"hero.descCloud": "arquitectura backend",
		"hero.descMiddle": ", ",
		"hero.descDistributed": "bases de datos relacionales",
		"hero.descAnd": " y ",
		"hero.descDX": "desarrollo web moderno",
		"hero.ctaWork": "Ver proyectos",
		"hero.ctaContact": "Hablemos",
		"hero.scroll": "Deslizar",

		"projects.badge": "PROYECTOS DESTACADOS",
		"projects.heading": "Iniciativas técnicas y",
		"projects.headingAccent": "sistemas activos",
		"projects.subtitle":
			"Arquitecturas backend transaccionales, APIs con Clean Architecture y aplicaciones web orientadas a la confiabilidad.",
		"projects.viewAll": "Ver todos los repositorios en GitHub",
		"projects.demo": "Demo en Vivo",
		"projects.inDevelopment": "En Construcción",
		"projects.source": "Repositorio GitHub",
		"projects.details": "Arquitectura y Detalles",
		"projects.closeModal": "Cerrar ventana (Esc)",
<<<<<<< Updated upstream
		"projects.countdownDays": "Días",
		"projects.countdownHours": "Horas",
		"projects.countdownMins": "Min",
		"projects.countdownSecs": "Seg",
		"projects.launchEstimated": "Entrega Estimada",
=======
		"projects.statusOpenSource": "Código abierto",
		"projects.statusPrivate": "Caso privado",
		"projects.privateCase": "Caso de estudio privado",
		"projects.openRepo": "Abrir repositorio",
		"projects.requestWalkthrough": "Solicitar recorrido",
		"projects.overview": "Resumen del proyecto",
		"projects.decisions": "Decisiones técnicas clave",
		"projects.evidence": "Evidencia de ingeniería",
		"projects.stack": "Stack",
		"projects.pauseRotation": "Pausar rotación automática",
		"projects.resumeRotation": "Reanudar rotación automática",
		"projects.previousProject": "Proyecto anterior",
		"projects.nextProject": "Siguiente proyecto",
>>>>>>> Stashed changes

		"about.badge": "SOBRE MÍ",
		"about.heading": "Primeros principios y",
		"about.headingAccent": "ingeniería pragmática",
		"about.p1":
<<<<<<< Updated upstream
			"Soy un desarrollador de software que aborda la ingeniería desde los primeros principios. Actualmente en 5to semestre de Ingeniería de Software en la Universidad Pascual Bravo, me enfoco en construir sistemas backend robustos, esquemas relacionales sólidos y aplicaciones web modernas orientadas a resolver problemas reales.",
		"about.p2pre": "Mi núcleo técnico se enfoca en",
		"about.p2cloud": "arquitectura limpia de backend",
		"about.p2distributed": "diseño relacional en bases de datos",
		"about.p2and": " y ",
		"about.p2dx": "desarrollo web responsivo",
=======
			"Soy estudiante de Ingeniería de Software en la Universidad Pascual Bravo. Lo que más disfruto es la parte del trabajo que muchos saltan: convertir una regla de negocio ambigua en algo que un equipo pueda construir, probar y explicar.",
		"about.p2pre": "Mi base es la ",
		"about.p2cloud": "arquitectura hexagonal",
		"about.p2distributed": "modelado relacional",
		"about.p2and": ", además de ",
		"about.p2dx": "TypeScript y .NET",
>>>>>>> Stashed changes
		"about.p2post":
			". Creo que el software sostenible se construye mediante una separación clara de responsabilidades, código testeable y decisiones de diseño pragmáticas.",
		"about.p3":
			"Desde modelar reglas de negocio con Clean Architecture en ASP.NET Core y estructurar balances contables transaccionales en PostgreSQL, hasta crear interfaces de usuario fluidas en React 18 y contenerizar servicios con Docker — construyo con disciplina de ingeniería verificable.",
		"about.competencies": "Competencias Principales",
		"about.skillCloud": "Contenedores y Entorno",
		"about.skillLang": "Lenguajes y Frameworks",
		"about.skillData": "Bases de Datos y ORM",
		"about.skillArch": "Arquitectura y Diseño",
		"about.skillDevops": "Herramientas y Control de Versiones",
		"about.skillMethods": "Prácticas y Calidad",
		"cert.badge": "CERTIFICACIONES",
		"cert.heading": "Credenciales y ruta de aprendizaje",
		"cert.subtitle": "Certificaciones planificadas que refuerzan mi perfil backend, cloud y análisis de datos.",
		"cert.statusPlanned": "Planificada",
		"about.skillAI": "Integración de IA y Automatización",
		"about.statProjects": "Sistemas Desarrollados",
		"about.statArch": "Clean Architecture",
		"about.statRepos": "Repositorios Públicos",
		"about.statStack": "Stack Principal",
		"about.philosophy": "Filosofía de Ingeniería de Software",
		"about.phil1Title": "Primeros Principios",
		"about.phil1Desc":
			"Descomponer problemas complejos hasta sus verdades fundamentales y construir desde ahí.",
		"about.phil2Title": "Escalabilidad Primero",
		"about.phil2Desc":
			"Diseñar sistemas que puedan crecer sin reescrituras arquitectónicas.",
		"about.phil3Title": "Felicidad del Desarrollador",
		"about.phil3Desc":
			"Las grandes herramientas deben hacer a los desarrolladores más productivos y felices.",

		"exp.badge": "EXPERIENCIA",
		"exp.heading": "Trayectoria de",
		"exp.headingAccent": "crecimiento e impacto",
		"exp.subtitle":
			"Línea de tiempo de iniciativas profesionales, formación académica y proyectos que forjan mi mentalidad en ingeniería.",
		"exp.typeWork": "Experiencia",
		"exp.typeEducation": "Educación",
		"exp.typeAchievement": "Logro",
		"exp.more": "Más por venir...",
		"exp.workTitle": "Desarrollador de Software Independiente",
		"exp.workOrg": "Proyectos de Ingeniería & Clientes",
		"exp.workPeriod": "2024 - Presente",
		"exp.workDesc":
			"Diseño y desarrollo de sistemas web full-stack y APIs RESTful transaccionales. Creador de Faro, plataforma de gestión inmobiliaria con ASP.NET Core, PostgreSQL y React, automatizando contratos de arriendo, conciliación contable y liquidación determinista de mora.",
		"exp.eduTitle": "Ingeniería de Software",
		"exp.eduOrg": "Universidad Pascual Bravo",
		"exp.eduPeriod": "2022 - Presente",
		"exp.eduDesc":
<<<<<<< Updated upstream
			"5to semestre. Formación académica orientada a programación orientada a objetos, arquitectura de software, bases de datos relacionales, estructuras de datos y sistemas operativos.",
=======
			"Cursos de programación orientada a objetos, arquitectura de software, bases de datos relacionales, estructuras de datos y sistemas operativos.",
		"exp.eduTag1": "Ingeniería de Software",
		"exp.eduTag2": "POO y Algoritmos",
		"exp.eduTag3": "Bases de Datos",
>>>>>>> Stashed changes

		"contact.badge": "CONTACTO",
		"contact.heading": "Construyamos algo",
		"contact.headingAccent": "juntos",
		"contact.subtitle":
			"Abierto a oportunidades en arquitectura cloud, DevOps e ingeniería de sistemas. También disponible para consultoría y colaboración.",
		"contact.formTitle": "Enviar un mensaje",
		"contact.labelName": "Nombre",
		"contact.labelEmail": "Correo",
		"contact.labelMessage": "Mensaje",
		"contact.placeholderName": "Tu nombre",
		"contact.placeholderEmail": "tu@correo.com",
		"contact.placeholderMessage": "Cuéntame sobre tu proyecto u oportunidad...",
		"contact.sending": "Enviando...",
		"contact.send": "Enviar mensaje",
		"contact.sent": "¡Mensaje enviado!",
		"contact.sentSub": "Te responderé dentro de 24 horas.",
		"contact.basedIn": "Ubicación",
		"contact.location": "Medellín, Colombia",
		"contact.availability": "Disponibilidad",
		"contact.availStatus": "Abierto a oportunidades",
		"contact.timezone": "Zona Horaria",
		"contact.sendEmail": "Envíame un correo",
		"contact.emailResponse": "Generalmente responde en 24 horas",
		"contact.copyright": "© 2026 David Alexander Machado Alzate",
<<<<<<< Updated upstream
		"contact.tagline": "Diseñado con claridad. Construido para rendimiento.",
		"contact.builtWith": "Hecho con React, TypeScript, Motion y Tailwind CSS",
		"contact.github": "GitHub",
		"contact.linkedin": "LinkedIn",
		"contact.twitter": "X / Twitter",
=======
		"contact.tagline": "Diseñado con claridad. Construido con evidencia.",
		"contact.builtWith":
			"Hecho con React, TypeScript y Tailwind CSS. Probado con Vitest.",
		"contact.github": "GitHub",
		"contact.linkedin": "LinkedIn",

		"meta.projects": "Proyectos — David Machado",
		"meta.gallery": "Galería — David Machado",
		"meta.about": "Sobre mí — David Machado",
		"nav.pond": "pond",
		"nav.projects": "proyectos",
		"nav.gallery": "galería",
		"nav.sayHi": "saluda",
		"projects.viewCase": "ver proyecto",
		"projects.scroll": "desliza",
		"projects.allRepos": "todos los repositorios",
		"projects.allReposLede": "El resto del trabajo público vive en GitHub.",
		"projects.back": "todos los proyectos",
		"projects.next": "siguiente proyecto",
		"projects.caseStudy": "caso de estudio",
		"projects.year": "Año",
		"projects.role": "Rol",
		"projects.status": "Estado",
		"projects.links": "Enlaces",
		"projects.roleValue": "Ingeniería backend, arquitectura, pruebas",
		"projects.notFound": "Este proyecto no existe.",
		"gallery.badge": "GALERÍA",
		"gallery.heading": "Certificaciones y credenciales",
		"gallery.lede":
			"Credenciales que estoy preparando u obteniendo, con el estado honesto de cada una. Sin insignias que no haya obtenido.",
		"gallery.credentials": "credenciales",
		"gallery.status": "en curso",
		"gallery.statusInProgress": "en curso",
		"gallery.statusIssued": "emitida",
		"gallery.credential": "verificar credencial",
		"gallery.note":
			"Las credenciales emitidas enlazarán a su página de verificación cuando estén disponibles.",
		"about.education": "Formación",
		"about.educationValue":
			"Ingeniería de Software, Universidad Pascual Bravo",
		"about.educationMeta": "2022 — presente",
		"about.contactTitle": "Construyamos algo confiable",
		"notFound.badge": "404",
		"notFound.heading": "Esta página no está en el estanque.",
		"notFound.lede": "El enlace puede ser viejo, o la página se movió.",
		"notFound.cta": "Volver al estanque",
>>>>>>> Stashed changes

		"a11y.skipToContent": "Ir al contenido",
	},

	pt: {
		"nav.work": "Projetos",
		"nav.about": "Sobre",
		"nav.experience": "Experiência",
		"nav.contact": "Contato",
		"nav.cta": "Entre em contato",
		"nav.openMenu": "Abrir menu",
		"nav.closeMenu": "Fechar menu",
		"nav.language": "Idioma",
		"nav.theme": "Tema",
		"nav.translateSite": "Traduzir site",

		"mobile.location": "Localização",
		"mobile.email": "Email",
		"mobile.language": "Idioma",

		"hero.available": "Disponível para oportunidades",
		"hero.availableShort": "Disponível",
		"hero.subtitle1": "Engenheiro de Software & Backend",
		"hero.subtitle2": ".NET / C# & Clean Architecture",
		"hero.subtitle3": "Desenvolvedor Web Full-Stack",
		"hero.subtitle4": "PostgreSQL & APIs Transacionais",
		"hero.descPre": "Construindo software transacional e robusto na intersecção de ",
		"hero.descCloud": "arquitetura backend",
		"hero.descMiddle": ", ",
		"hero.descDistributed": "bancos de dados relacionais",
		"hero.descAnd": " e ",
		"hero.descDX": "desenvolvimento web moderno",
		"hero.ctaWork": "Ver meus projetos",
		"hero.ctaContact": "Entre em contato",
		"hero.scroll": "Rolar",

		"projects.badge": "PROJETOS EM DESTAQUE",
		"projects.heading": "Iniciativas técnicas e",
		"projects.headingAccent": "sistemas ativos",
		"projects.subtitle":
			"Arquiteturas backend transacionais, APIs com Clean Architecture e aplicações web orientadas à confiabilidade.",
		"projects.viewAll": "Ver todos os repositórios no GitHub",
		"projects.demo": "Demo ao Vivo",
		"projects.inDevelopment": "Em Construção",
		"projects.source": "Repositório GitHub",
		"projects.details": "Arquitetura e Detalhes",
		"projects.closeModal": "Fechar janela (Esc)",
<<<<<<< Updated upstream
		"projects.countdownDays": "Dias",
		"projects.countdownHours": "Horas",
		"projects.countdownMins": "Min",
		"projects.countdownSecs": "Seg",
		"projects.launchEstimated": "Entrega Estimada",
=======
		"projects.statusOpenSource": "Código aberto",
		"projects.statusPrivate": "Estudo privado",
		"projects.privateCase": "Estudo de caso privado",
		"projects.openRepo": "Abrir repositório",
		"projects.requestWalkthrough": "Solicitar apresentação",
		"projects.overview": "Visão geral do projeto",
		"projects.decisions": "Decisões técnicas principais",
		"projects.evidence": "Evidência de engenharia",
		"projects.stack": "Stack",
		"projects.pauseRotation": "Pausar rotação automática",
		"projects.resumeRotation": "Retomar rotação automática",
		"projects.previousProject": "Projeto anterior",
		"projects.nextProject": "Próximo projeto",
>>>>>>> Stashed changes

		"about.badge": "SOBRE MIM",
		"about.heading": "Primeiros princípios e",
		"about.headingAccent": "engenharia pragmática",
		"about.p1":
<<<<<<< Updated upstream
			"Sou um engenheiro de software que aborda o desenvolvimento a partir de primeiros princípios. Atualmente no 5º semestre de Engenharia de Software na Universidad Pascual Bravo, foco na construção de sistemas backend robustos, esquemas relacionais sólidos e aplicações web modernas que resolvem problemas reais.",
		"about.p2pre": "Meu foco técnico está na intersecção de",
		"about.p2cloud": "arquitetura limpa de backend",
		"about.p2distributed": "design de bancos de dados relacionais",
		"about.p2and": ", e",
		"about.p2dx": "interfaces web modernas",
=======
			"Sou estudante de Engenharia de Software na Universidad Pascual Bravo. O que mais gosto é da parte do trabalho que muitos pulam: transformar uma regra de negócio ambígua em algo que o time possa construir, testar e explicar.",
		"about.p2pre": "Minha base é a ",
		"about.p2cloud": "arquitetura hexagonal",
		"about.p2distributed": "modelagem relacional",
		"about.p2and": ", além de ",
		"about.p2dx": "TypeScript e .NET",
>>>>>>> Stashed changes
		"about.p2post":
			". Acredito que software sustentável é construído através de separação clara de responsabilidades, código testável e decisões pragmáticas.",
		"about.p3":
			"Desde a implementação de modelos de domínio em ASP.NET Core e estruturação de balanços transacionais no PostgreSQL, até a criação de interfaces fluidas em React 18 e orquestração de contêineres com Docker — construo com disciplina de engenharia verificável.",
		"about.competencies": "Competências Principais",
		"about.skillCloud": "Contêineres e Ambiente",
		"about.skillLang": "Linguagens e Frameworks",
		"about.skillData": "Bancos de Dados e ORM",
		"about.skillArch": "Arquitetura e Design",
		"about.skillDevops": "Ferramentas e Controle de Versão",
		"about.skillMethods": "Práticas e Qualidade",
		"cert.badge": "CERTIFICAÇÕES",
		"cert.heading": "Credenciais e trilha de aprendizado",
		"cert.subtitle": "Certificações planejadas que reforçam meu perfil backend, cloud e análise de dados.",
		"cert.statusPlanned": "Planejada",
		"about.skillAI": "Integração de IA e Automação",
		"about.statProjects": "Sistemas Desenvolvidos",
		"about.statArch": "Clean Architecture",
		"about.statRepos": "Repositórios Públicos",
		"about.statStack": "Stack Principal",
		"about.philosophy": "Filosofia de Engenharia de Software",
		"about.phil1Title": "Primeiros Princípios",
		"about.phil1Desc":
			"Decompor problemas complexos até suas verdades fundamentais e construir a partir daí.",
		"about.phil2Title": "Escalabilidade Primeiro",
		"about.phil2Desc":
			"Projetar sistemas que podem crescer sem reescritas arquiteturais.",
		"about.phil3Title": "Alegria do Desenvolvedor",
		"about.phil3Desc":
			"Grandes ferramentas devem tornar os desenvolvedores mais produtivos e felizes.",

		"exp.badge": "EXPERIÊNCIA",
		"exp.heading": "Jornada de",
		"exp.headingAccent": "crescimento e impacto",
		"exp.subtitle":
			"Linha do tempo de iniciativas profissionais, formação acadêmica e projetos que moldaram minha mentalidade em engenharia.",
		"exp.typeWork": "Experiência",
		"exp.typeEducation": "Educação",
		"exp.typeAchievement": "Conquista",
		"exp.more": "Mais por vir...",
		"exp.workTitle": "Desenvolvedor de Software Independente",
		"exp.workOrg": "Projetos de Engenharia & Clientes",
		"exp.workPeriod": "2024 - Presente",
		"exp.workDesc":
			"Projeto e desenvolvimento de sistemas web full-stack e APIs RESTful transacionais. Criador do Faro, plataforma de gestão imobiliária com ASP.NET Core, PostgreSQL e React, automatizando contratos de locação, conciliação contábil e cálculos determinísticos.",
		"exp.eduTitle": "Engenharia de Software",
		"exp.eduOrg": "Universidad Pascual Bravo",
		"exp.eduPeriod": "2022 - Presente",
		"exp.eduDesc":
<<<<<<< Updated upstream
			"5º semestre. Foco acadêmico em programação orientada a objetos, arquitetura de software, bancos de dados relacionais, estruturas de dados e sistemas operacionais.",
=======
			"Disciplinas de programação orientada a objetos, arquitetura de software, bancos de dados relacionais, estruturas de dados e sistemas operacionais.",
		"exp.eduTag1": "Engenharia de Software",
		"exp.eduTag2": "POO e Algoritmos",
		"exp.eduTag3": "Bancos de Dados",
>>>>>>> Stashed changes

		"contact.badge": "ENTRE EM CONTATO",
		"contact.heading": "Vamos construir algo",
		"contact.headingAccent": "extraordinário",
		"contact.subtitle":
			"Aberto a oportunidades em arquitetura cloud, DevOps e engenharia de sistemas. Também disponível para consultoria e colaboração.",
		"contact.formTitle": "Enviar uma mensagem",
		"contact.labelName": "Nome",
		"contact.labelEmail": "Email",
		"contact.labelMessage": "Mensagem",
		"contact.placeholderName": "Seu nome",
		"contact.placeholderEmail": "seu@email.com",
		"contact.placeholderMessage":
			"Conte-me sobre seu projeto ou oportunidade...",
		"contact.sending": "Enviando...",
		"contact.send": "Enviar mensagem",
		"contact.sent": "Mensagem enviada!",
		"contact.sentSub": "Responderei dentro de 24 horas.",
		"contact.basedIn": "Localização",
		"contact.location": "Medellín, Colômbia",
		"contact.availability": "Disponibilidade",
		"contact.availStatus": "Aberto a oportunidades",
		"contact.timezone": "Fuso Horário",
		"contact.sendEmail": "Envie-me um email",
		"contact.emailResponse": "Geralmente responde em 24 horas",
		"contact.copyright": "© 2026 David Alexander Machado Alzate",
<<<<<<< Updated upstream
		"contact.tagline": "Projetado com clareza. Construído para performance.",
		"contact.builtWith": "Feito com React, TypeScript, Motion e Tailwind CSS",
		"contact.github": "GitHub",
		"contact.linkedin": "LinkedIn",
		"contact.twitter": "X / Twitter",
=======
		"contact.tagline": "Projetado com clareza. Construído com evidência.",
		"contact.builtWith":
			"Feito com React, TypeScript e Tailwind CSS. Testado com Vitest.",
		"contact.github": "GitHub",
		"contact.linkedin": "LinkedIn",

		"meta.projects": "Projetos — David Machado",
		"meta.gallery": "Galeria — David Machado",
		"meta.about": "Sobre — David Machado",
		"nav.pond": "pond",
		"nav.projects": "projetos",
		"nav.gallery": "galeria",
		"nav.sayHi": "diga oi",
		"projects.viewCase": "ver projeto",
		"projects.scroll": "role",
		"projects.allRepos": "todos os repositórios",
		"projects.allReposLede": "O resto do trabalho público está no GitHub.",
		"projects.back": "todos os projetos",
		"projects.next": "próximo projeto",
		"projects.caseStudy": "estudo de caso",
		"projects.year": "Ano",
		"projects.role": "Papel",
		"projects.status": "Status",
		"projects.links": "Links",
		"projects.roleValue": "Engenharia backend, arquitetura, testes",
		"projects.notFound": "Este projeto não existe.",
		"gallery.badge": "GALERIA",
		"gallery.heading": "Certificações e credenciais",
		"gallery.lede":
			"Credenciais que estou estudando ou conquistando, com o status honesto de cada uma. Sem selos que não conquistei.",
		"gallery.credentials": "credenciais",
		"gallery.status": "em andamento",
		"gallery.statusInProgress": "em andamento",
		"gallery.statusIssued": "emitida",
		"gallery.credential": "verificar credencial",
		"gallery.note":
			"As credenciais emitidas terão link para a página de verificação quando disponíveis.",
		"about.education": "Formação",
		"about.educationValue":
			"Engenharia de Software, Universidad Pascual Bravo",
		"about.educationMeta": "2022 — presente",
		"about.contactTitle": "Vamos construir algo confiável",
		"notFound.badge": "404",
		"notFound.heading": "Esta página não está no lago.",
		"notFound.lede": "O link pode ser antigo, ou a página mudou.",
		"notFound.cta": "Voltar ao lago",
>>>>>>> Stashed changes

		"a11y.skipToContent": "Ir para o conteúdo",
	},
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

export function t(language: Language, key: TranslationKey): string {
	return translations[language]?.[key] ?? translations.en[key] ?? key;
}
