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

export function detectLanguage(): Language {
	const browserLang = navigator.language?.toLowerCase() ?? "";
	if (browserLang.startsWith("es")) return "es";
	if (browserLang.startsWith("pt")) return "pt";
	return "en";
}

const translations = {
	en: {
		"nav.work": "Work",
		"nav.about": "About",
		"nav.experience": "Experience",
		"nav.contact": "Contact",
		"nav.cta": "Get in touch",
		"nav.openMenu": "Open menu",
		"nav.closeMenu": "Close menu",
		"nav.language": "Language",
		"nav.translateSite": "Translate site",

		"mobile.location": "Location",
		"mobile.email": "Email",
		"mobile.language": "Language",

		"hero.available": "Available for opportunities",
		"hero.availableShort": "Available",
		"hero.subtitle1": "Backend & Distributed Systems Engineer",
		"hero.subtitle2": "Cloud & Transactional Architect",
		"hero.subtitle3": "DevOps & Infrastructure Builder",
		"hero.subtitle4": "High-Performance Full-Stack Developer",
		"hero.descPre": "Engineering resilient architectures at the intersection of ",
		"hero.descCloud": "distributed systems",
		"hero.descMiddle": ", ",
		"hero.descDistributed": "transactional persistence",
		"hero.descAnd": ", and ",
		"hero.descDX": "high-performance web apps",
		"hero.ctaWork": "View my work",
		"hero.ctaContact": "Get in touch",
		"hero.scroll": "Scroll",

		"projects.badge": "FEATURED WORK",
		"projects.heading": "Engineering initiatives &",
		"projects.headingAccent": "active systems",
		"projects.subtitle":
			"High-concurrency services, transactional backend architectures, and 60fps web applications engineered for scale.",
		"projects.viewAll": "View all repositories on GitHub",
		"projects.demo": "Live Demo",
		"projects.inDevelopment": "In Construction",
		"projects.source": "GitHub Repository",
		"projects.details": "Architecture & Details",
		"projects.closeModal": "Close modal (Esc)",
		"projects.countdownDays": "Days",
		"projects.countdownHours": "Hours",
		"projects.countdownMins": "Mins",
		"projects.countdownSecs": "Secs",
		"projects.launchEstimated": "Estimated Delivery",

		"about.badge": "ABOUT ME",
		"about.heading": "Systems thinking meets",
		"about.headingAccent": "pragmatic engineering",
		"about.p1":
			"I am a software engineer focused on building resilient distributed systems and transactional architectures. Currently pursuing software engineering at Universidad Pascual Bravo, I approach technical problems from first principles—optimizing for correctness, deterministic behavior, and operational scalability.",
		"about.p2pre": "My engineering core centers on",
		"about.p2cloud": "backend architectures",
		"about.p2distributed": "distributed concurrency",
		"about.p2and": ", and",
		"about.p2dx": "high-performance interfaces",
		"about.p2post":
			". I believe great engineering turns complex distributed problems into robust, auditable, and maintainable software.",
		"about.p3":
			"From implementing hexagonal domain models and preventing high-concurrency overbooking with Redis atomic locks, to building virtualized DOM viewports operating at 60fps—I build systems with verifiable architectural rigor.",
		"about.competencies": "Core Competencies",
		"about.skillCloud": "Cloud & Infrastructure",
		"about.skillLang": "Languages & Frameworks",
		"about.skillData": "Data & Storage",
		"about.skillArch": "Architecture & Design",
		"about.skillDevops": "DevOps & Tools",
		"about.skillMethods": "Methodologies",
		"about.statYears": "Years Experience",
		"about.statProjects": "Projects Deployed",
		"about.statRepos": "GitHub Repos",
		"about.statLines": "Lines of Code",
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
			"A trajectory of engineering challenges, foundational education, and technical initiatives shaping my software systems mindset.",
		"exp.typeWork": "Experience",
		"exp.typeEducation": "Education",
		"exp.typeAchievement": "Achievement",
		"exp.more": "More to come...",
		"exp.eduTitle": "Software Engineering",
		"exp.eduOrg": "Universidad Pascual Bravo",
		"exp.eduPeriod": "2022 - Present",
		"exp.eduDesc":
			"Academic focus on distributed systems, software architecture, relational database theory, and operating systems. Active member of the Computer Science and Systems Community.",

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
			"Built with React, TypeScript, Motion, and Tailwind CSS",
		"contact.github": "GitHub",
		"contact.linkedin": "LinkedIn",
		"contact.twitter": "X / Twitter",

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
		"nav.translateSite": "Traducir sitio",

		"mobile.location": "Ubicación",
		"mobile.email": "Correo",
		"mobile.language": "Idioma",

		"hero.available": "Disponible para oportunidades",
		"hero.availableShort": "Disponible",
		"hero.subtitle1": "Ingeniero de Software & Sistemas Distribuidos",
		"hero.subtitle2": "Backend Transaccional & Arquitectura Cloud",
		"hero.subtitle3": "DevOps & Resiliencia de Infraestructura",
		"hero.subtitle4": "Full-Stack de Alto Rendimiento (60fps)",
		"hero.descPre": "Construyo software confiable y escalable en la intersección de ",
		"hero.descCloud": "sistemas distribuidos",
		"hero.descMiddle": ", ",
		"hero.descDistributed": "persistencia transaccional",
		"hero.descAnd": " y ",
		"hero.descDX": "aplicaciones web de alto rendimiento",
		"hero.ctaWork": "Ver proyectos",
		"hero.ctaContact": "Hablemos",
		"hero.scroll": "Deslizar",

		"projects.badge": "PROYECTOS DESTACADOS",
		"projects.heading": "Iniciativas técnicas y",
		"projects.headingAccent": "sistemas activos",
		"projects.subtitle":
			"Servicios de alta concurrencia, arquitecturas backend transaccionales y aplicaciones web a 60fps diseñadas para escalar.",
		"projects.viewAll": "Ver todos los repositorios en GitHub",
		"projects.demo": "Demo en Vivo",
		"projects.inDevelopment": "En Construcción",
		"projects.source": "Repositorio GitHub",
		"projects.details": "Arquitectura y Detalles",
		"projects.closeModal": "Cerrar ventana (Esc)",
		"projects.countdownDays": "Días",
		"projects.countdownHours": "Horas",
		"projects.countdownMins": "Min",
		"projects.countdownSecs": "Seg",
		"projects.launchEstimated": "Entrega Estimada",

		"about.badge": "SOBRE MÍ",
		"about.heading": "Pensamiento sistémico y",
		"about.headingAccent": "arquitectura pragmática",
		"about.p1":
			"Soy un ingeniero de software enfocado en construir sistemas distribuidos resilientes y arquitecturas transaccionales. Actualmente curso Ingeniería de Software en la Universidad Pascual Bravo, abordando cada reto técnico desde los primeros principios: optimizando para exactitud, determinismo y escalabilidad operativa.",
		"about.p2pre": "Mi núcleo técnico se enfoca en",
		"about.p2cloud": "arquitectura de backend",
		"about.p2distributed": "concurrencia distribuida",
		"about.p2and": " e ",
		"about.p2dx": "ingeniería frontend de 60fps",
		"about.p2post":
			". La verdadera excelencia técnica consiste en transformar problemas distribuidos complejos en sistemas auditables, estables y mantenibles.",
		"about.p3":
			"Desde modelar dominios desacoplados con Arquitectura Hexagonal y eliminar sobreventas bajo alta demanda mediante primitivas atómicas en Redis, hasta renderizar catálogos masivos a 60fps con DOM Windowing dinámico — construyo con rigor demostrable en código y arquitectura.",
		"about.competencies": "Competencias Principales",
		"about.skillCloud": "Cloud e Infraestructura",
		"about.skillLang": "Lenguajes y Frameworks",
		"about.skillData": "Datos y Almacenamiento",
		"about.skillArch": "Arquitectura y Diseño",
		"about.skillDevops": "DevOps y Herramientas",
		"about.skillMethods": "Metodologías",
		"about.statYears": "Años de Experiencia",
		"about.statProjects": "Proyectos Desplegados",
		"about.statRepos": "Repos en GitHub",
		"about.statLines": "Líneas de Código",
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
			"Línea de tiempo de hitos formativos, retos de ingeniería y proyectos que forjan mi mentalidad en sistemas.",
		"exp.typeWork": "Experiencia",
		"exp.typeEducation": "Educación",
		"exp.typeAchievement": "Logro",
		"exp.more": "Más por venir...",
		"exp.eduTitle": "Ingeniería de Software",
		"exp.eduOrg": "Universidad Pascual Bravo",
		"exp.eduPeriod": "2022 - Presente",
		"exp.eduDesc":
			"Enfoque académico en sistemas distribuidos, arquitectura de software, bases de datos relacionales y diseño de sistemas. Participación activa en la comunidad técnica y clubes de computación.",

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
		"contact.tagline": "Diseñado con claridad. Construido para rendimiento.",
		"contact.builtWith": "Hecho con React, TypeScript, Motion y Tailwind CSS",
		"contact.github": "GitHub",
		"contact.linkedin": "LinkedIn",
		"contact.twitter": "X / Twitter",

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
		"nav.translateSite": "Traduzir site",

		"mobile.location": "Localização",
		"mobile.email": "Email",
		"mobile.language": "Idioma",

		"hero.available": "Disponível para oportunidades",
		"hero.availableShort": "Disponível",
		"hero.subtitle1": "Engenheiro de Software & Sistemas Distribuídos",
		"hero.subtitle2": "Backend Transacional & Arquitetura Cloud",
		"hero.subtitle3": "DevOps & Infraestrutura Resiliente",
		"hero.subtitle4": "Full-Stack de Alto Desempenho (60fps)",
		"hero.descPre": "Construindo software escalável e confiável na intersecção de ",
		"hero.descCloud": "sistemas distribuídos",
		"hero.descMiddle": ", ",
		"hero.descDistributed": "persistência transacional",
		"hero.descAnd": " e ",
		"hero.descDX": "aplicações web de alto desempenho",
		"hero.ctaWork": "Ver meus projetos",
		"hero.ctaContact": "Entre em contato",
		"hero.scroll": "Rolar",

		"projects.badge": "PROJETOS EM DESTAQUE",
		"projects.heading": "Iniciativas técnicas e",
		"projects.headingAccent": "sistemas ativos",
		"projects.subtitle":
			"Serviços de alta concorrência, arquiteturas backend transacionais e aplicações web a 60fps projetadas para escalar.",
		"projects.viewAll": "Ver todos os repositórios no GitHub",
		"projects.demo": "Demo ao Vivo",
		"projects.inDevelopment": "Em Construção",
		"projects.source": "Repositório GitHub",
		"projects.details": "Arquitetura e Detalhes",
		"projects.closeModal": "Fechar janela (Esc)",
		"projects.countdownDays": "Dias",
		"projects.countdownHours": "Horas",
		"projects.countdownMins": "Min",
		"projects.countdownSecs": "Seg",
		"projects.launchEstimated": "Entrega Estimada",

		"about.badge": "SOBRE MIM",
		"about.heading": "Pensamento sistêmico e",
		"about.headingAccent": "engenharia pragmática",
		"about.p1":
			"Sou um engenheiro de software focado em construir sistemas distribuídos resilientes e arquiteturas transacionais. Cursando Engenharia de Software na Universidad Pascual Bravo, abordo problemas técnicos a partir de primeiros princípios — priorizando corretude, determinismo e escalabilidade operacional.",
		"about.p2pre": "Meu foco técnico está na intersecção de",
		"about.p2cloud": "arquitetura backend",
		"about.p2distributed": "concorrência distribuída",
		"about.p2and": ", e",
		"about.p2dx": "engenharia frontend de 60fps",
		"about.p2post":
			". Acredito que a excelência técnica consiste em transformar sistemas distribuídos complexos em soluções simples, auditáveis e confiáveis.",
		"about.p3":
			"Desde o design de domínios desacoplados com Arquitetura Hexagonal e controle de sobre-reservas via primitivas atômicas no Redis, até o DOM Windowing dinâmico a 60fps em catálogos massivos — construo com rigor arquitetural e código limpo.",
		"about.competencies": "Competências Principais",
		"about.skillCloud": "Cloud e Infraestrutura",
		"about.skillLang": "Linguagens e Frameworks",
		"about.skillData": "Dados e Armazenamento",
		"about.skillArch": "Arquitetura e Design",
		"about.skillDevops": "DevOps e Ferramentas",
		"about.skillMethods": "Metodologias",
		"about.statYears": "Anos de Experiência",
		"about.statProjects": "Projetos Implantados",
		"about.statRepos": "Repos no GitHub",
		"about.statLines": "Linhas de Código",
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
			"Linha do tempo de marcos acadêmicos, desafios de engenharia e projetos que moldaram minha mentalidade em sistemas.",
		"exp.typeWork": "Experiência",
		"exp.typeEducation": "Educação",
		"exp.typeAchievement": "Conquista",
		"exp.more": "Mais por vir...",
		"exp.eduTitle": "Engenharia de Software",
		"exp.eduOrg": "Universidad Pascual Bravo",
		"exp.eduPeriod": "2022 - Presente",
		"exp.eduDesc":
			"Foco acadêmico em sistemas distribuídos, arquitetura de software, bancos de dados relacionais e sistemas operacionais. Membro ativo da comunidade de computação.",

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
		"contact.tagline": "Projetado com clareza. Construído para performance.",
		"contact.builtWith": "Feito com React, TypeScript, Motion e Tailwind CSS",
		"contact.github": "GitHub",
		"contact.linkedin": "LinkedIn",
		"contact.twitter": "X / Twitter",

		"a11y.skipToContent": "Ir para o conteúdo",
	},
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

export function t(language: Language, key: TranslationKey): string {
	return translations[language]?.[key] ?? translations.en[key] ?? key;
}
