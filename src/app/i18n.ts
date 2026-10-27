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

export const translations = {
	en: {
		"meta.title":
			"David Machado — Backend Software Engineer (.NET & TypeScript)",
		"meta.description":
			"Backend software engineer in Medellín, Colombia. .NET/C# and TypeScript, hexagonal architecture, PostgreSQL, Docker, and automated tests. Open-source work with public repositories.",

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
		"hero.subtitle1": "Backend Software Engineer",
		"hero.subtitle2": ".NET / C# & Hexagonal Architecture",
		"hero.subtitle3": "TypeScript & Transactional APIs",
		"hero.subtitle4": "PostgreSQL & Tested Domain Logic",
		"hero.descPre": "I build transactional systems where ",
		"hero.descCloud": "backend architecture",
		"hero.descMiddle": ", ",
		"hero.descDistributed": "relational data",
		"hero.descAnd": ", and ",
		"hero.descDX": "automated tests",
		"hero.ctaWork": "View my work",
		"hero.ctaContact": "Get in touch",
		"hero.scroll": "Scroll",

		"projects.badge": "SELECTED WORK",
		"projects.heading": "Selected work &",
		"projects.headingAccent": "verifiable systems",
		"projects.subtitle":
			"Backend and data systems with public repositories, documented decisions, and test suites you can inspect.",
		"projects.viewAll": "View all repositories on GitHub",
		"projects.demo": "Live demo",
		"projects.source": "GitHub repository",
		"projects.details": "Architecture & details",
		"projects.closeModal": "Close modal (Esc)",
		"projects.statusOpenSource": "Open source",
		"projects.statusPrivate": "Private case study",
		"projects.privateCase": "Private case study",
		"projects.openRepo": "Open repository",
		"projects.requestWalkthrough": "Request walkthrough",
		"projects.overview": "Project overview",
		"projects.decisions": "Key technical decisions",
		"projects.evidence": "Engineering evidence",
		"projects.stack": "Technologies & stack",
		"projects.pauseRotation": "Pause automatic rotation",
		"projects.resumeRotation": "Resume automatic rotation",
		"projects.previousProject": "Previous project",
		"projects.nextProject": "Next project",

		"about.badge": "ABOUT ME",
		"about.heading": "First principles meet",
		"about.headingAccent": "pragmatic engineering",
		"about.p1":
			"I am a software engineering student in my fifth semester at Universidad Pascual Bravo, focused on backend systems: transactional APIs, relational schemas, and domain logic that can be tested without a framework.",
		"about.p2pre": "My foundation is ",
		"about.p2cloud": "hexagonal architecture",
		"about.p2distributed": "relational data modeling",
		"about.p2and": ", and ",
		"about.p2dx": "TypeScript and .NET",
		"about.p2post":
			". I care about explicit invariants, deterministic behavior, and tests that describe the domain.",
		"about.p3":
			"I have built and documented a .NET marketplace core with 592 automated tests and an open-source lease billing engine in TypeScript. I am looking for a backend team where I can review code, own small services, and learn from production systems.",
		"about.competencies": "Core Competencies",
		"about.skillCloud": "Containers & Environment",
		"about.skillLang": "Languages & Frameworks",
		"about.skillData": "Databases & ORM",
		"about.skillArch": "Architecture & Design",
		"about.skillDevops": "Tools & Version Control",
		"about.skillMethods": "Testing & Quality",
		"about.skillAI": "AI-assisted Engineering",
		"about.statProjects": "Featured Projects",
		"about.statTests": "Automated Tests (Zentric)",
		"about.statRepos": "Public Repositories",
		"about.statOpenSource": "Open-Source Systems",
		"about.downloadCv": "Download CV",
		"about.philosophy": "Software Engineering Philosophy",
		"about.phil1Title": "First Principles",
		"about.phil1Desc":
			"Break down complex problems to their fundamental truths and build up from there.",
		"about.phil2Title": "Reliability First",
		"about.phil2Desc":
			"Prefer explicit rules and deterministic behavior over clever abstractions.",
		"about.phil3Title": "Evidence Over Claims",
		"about.phil3Desc":
			"Ship what can be demonstrated: repositories, tests, and measured results.",

		"exp.badge": "EXPERIENCE",
		"exp.heading": "Journey of",
		"exp.headingAccent": "growth & impact",
		"exp.subtitle":
			"A timeline of client work, open-source systems, and the education behind them.",
		"exp.typeWork": "Experience",
		"exp.typeEducation": "Education",
		"exp.typeAchievement": "Achievement",
		"exp.more": "More to come...",
		"exp.workTitle": "Independent Software Developer",
		"exp.workOrg": "Client projects & open source",
		"exp.workPeriod": "2024 - Present",
		"exp.workDesc":
			"Building transactional systems for clients and open source. Zentric: .NET 10 marketplace core with Hexagonal Architecture, DDD, CQRS, PostgreSQL, Docker, and 592 automated tests. LeaseFlow: TypeScript lease billing engine with Express, SQLite, and a Vitest suite covering partial payments and reconciliation.",
		"exp.eduTitle": "Software Engineering",
		"exp.eduOrg": "Universidad Pascual Bravo",
		"exp.eduPeriod": "2022 - Present",
		"exp.eduDesc":
			"5th semester. Coursework in object-oriented programming, software architecture, relational databases, data structures, and operating systems.",
		"exp.eduTag1": "5th semester",
		"exp.eduTag2": "OOP & Algorithms",
		"exp.eduTag3": "Databases",

		"contact.badge": "GET IN TOUCH",
		"contact.heading": "Let's build something",
		"contact.headingAccent": "reliable",
		"contact.subtitle":
			"Open to backend and full-stack roles, and to open-source collaboration. Based in Medellín (UTC-5), working remotely.",
		"contact.formTitle": "Start an email",
		"contact.formHint":
			"This opens your email app with the message prefilled. Nothing is sent from this page.",
		"contact.labelName": "Name",
		"contact.labelEmail": "Email",
		"contact.labelMessage": "Message",
		"contact.placeholderName": "Your name",
		"contact.placeholderEmail": "your@email.com",
		"contact.placeholderMessage":
			"Tell me about your project or opportunity...",
		"contact.openDraft": "Open email draft",
		"contact.draftReady": "Email draft ready",
		"contact.draftReadySub":
			"Your email app should be open. If it did not open, write to the address below or copy it manually.",
		"contact.editDraft": "Edit message",
		"contact.email": "Email",
		"contact.location": "Medellín, Colombia",
		"contact.availability": "Availability",
		"contact.availStatus": "Open to backend roles",
		"contact.timezone": "Time Zone",
		"contact.copyright": "© 2026 David Alexander Machado Alzate",
		"contact.tagline": "Designed for clarity. Engineered for evidence.",
		"contact.builtWith":
			"Built with React, TypeScript, Motion, and Tailwind CSS. Tested with Vitest.",
		"contact.github": "GitHub",
		"contact.linkedin": "LinkedIn",


		"a11y.skipToContent": "Skip to content",
		"a11y.mobileMenu": "Mobile navigation menu",
		"a11y.backToTop": "Back to top",
	},

	es: {
		"meta.title":
			"David Machado — Ingeniero de Software Backend (.NET y TypeScript)",
		"meta.description":
			"Ingeniero de software backend en Medellín, Colombia. .NET/C# y TypeScript, arquitectura hexagonal, PostgreSQL, Docker y pruebas automatizadas. Trabajo open source con repositorios públicos.",

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
		"hero.subtitle1": "Ingeniero de Software Backend",
		"hero.subtitle2": ".NET / C# y Arquitectura Hexagonal",
		"hero.subtitle3": "TypeScript y APIs Transaccionales",
		"hero.subtitle4": "PostgreSQL y Lógica de Dominio Probada",
		"hero.descPre": "Construyo sistemas transaccionales donde la ",
		"hero.descCloud": "arquitectura backend",
		"hero.descMiddle": ", el ",
		"hero.descDistributed": "modelo relacional",
		"hero.descAnd": " y las ",
		"hero.descDX": "pruebas automatizadas guían el diseño",
		"hero.ctaWork": "Ver proyectos",
		"hero.ctaContact": "Hablemos",
		"hero.scroll": "Deslizar",

		"projects.badge": "PROYECTOS DESTACADOS",
		"projects.heading": "Trabajo seleccionado y",
		"projects.headingAccent": "sistemas verificables",
		"projects.subtitle":
			"Sistemas backend y de datos con repositorios públicos, decisiones documentadas y suites de pruebas que puedes inspeccionar.",
		"projects.viewAll": "Ver todos los repositorios en GitHub",
		"projects.demo": "Demo en vivo",
		"projects.source": "Repositorio GitHub",
		"projects.details": "Arquitectura y detalles",
		"projects.closeModal": "Cerrar ventana (Esc)",
		"projects.statusOpenSource": "Código abierto",
		"projects.statusPrivate": "Caso privado",
		"projects.privateCase": "Caso de estudio privado",
		"projects.openRepo": "Abrir repositorio",
		"projects.requestWalkthrough": "Solicitar recorrido",
		"projects.overview": "Resumen del proyecto",
		"projects.decisions": "Decisiones técnicas clave",
		"projects.evidence": "Evidencia de ingeniería",
		"projects.stack": "Tecnologías y stack",
		"projects.pauseRotation": "Pausar rotación automática",
		"projects.resumeRotation": "Reanudar rotación automática",
		"projects.previousProject": "Proyecto anterior",
		"projects.nextProject": "Siguiente proyecto",

		"about.badge": "SOBRE MÍ",
		"about.heading": "Primeros principios y",
		"about.headingAccent": "ingeniería pragmática",
		"about.p1":
			"Soy estudiante de Ingeniería de Software en quinto semestre en la Universidad Pascual Bravo, enfocado en sistemas backend: APIs transaccionales, esquemas relacionales y lógica de dominio que se puede probar sin un framework.",
		"about.p2pre": "Mi base es la ",
		"about.p2cloud": "arquitectura hexagonal",
		"about.p2distributed": "modelado relacional",
		"about.p2and": ", además de ",
		"about.p2dx": "TypeScript y .NET",
		"about.p2post":
			". Me importan las invariantes explícitas, el comportamiento determinista y las pruebas que describen el dominio.",
		"about.p3":
			"He construido y documentado un núcleo de marketplace en .NET con 592 pruebas automatizadas y un motor de facturación de arriendos open source en TypeScript. Busco un equipo backend donde pueda revisar código, hacerme cargo de servicios pequeños y aprender de sistemas en producción.",
		"about.competencies": "Competencias Principales",
		"about.skillCloud": "Contenedores y Entorno",
		"about.skillLang": "Lenguajes y Frameworks",
		"about.skillData": "Bases de Datos y ORM",
		"about.skillArch": "Arquitectura y Diseño",
		"about.skillDevops": "Herramientas y Control de Versiones",
		"about.skillMethods": "Pruebas y Calidad",
		"about.skillAI": "Ingeniería asistida por IA",
		"about.statProjects": "Proyectos Destacados",
		"about.statTests": "Pruebas Automatizadas (Zentric)",
		"about.statRepos": "Repositorios Públicos",
		"about.statOpenSource": "Sistemas Open Source",
		"about.downloadCv": "Descargar CV",
		"about.philosophy": "Filosofía de Ingeniería de Software",
		"about.phil1Title": "Primeros Principios",
		"about.phil1Desc":
			"Descomponer problemas complejos hasta sus verdades fundamentales y construir desde ahí.",
		"about.phil2Title": "Confiabilidad Primero",
		"about.phil2Desc":
			"Prefiero reglas explícitas y comportamiento determinista antes que abstracciones ingeniosas.",
		"about.phil3Title": "Evidencia Sobre Promesas",
		"about.phil3Desc":
			"Entregar lo que se puede demostrar: repositorios, pruebas y resultados medidos.",

		"exp.badge": "EXPERIENCIA",
		"exp.heading": "Trayectoria de",
		"exp.headingAccent": "crecimiento e impacto",
		"exp.subtitle":
			"Una línea de tiempo de trabajo con clientes, sistemas open source y la formación detrás.",
		"exp.typeWork": "Experiencia",
		"exp.typeEducation": "Educación",
		"exp.typeAchievement": "Logro",
		"exp.more": "Más por venir...",
		"exp.workTitle": "Desarrollador de Software Independiente",
		"exp.workOrg": "Proyectos de clientes y código abierto",
		"exp.workPeriod": "2024 - Presente",
		"exp.workDesc":
			"Construyo sistemas transaccionales para clientes y para código abierto. Zentric: núcleo de marketplace en .NET 10 con Arquitectura Hexagonal, DDD, CQRS, PostgreSQL, Docker y 592 pruebas automatizadas. LeaseFlow: motor de facturación de arriendos en TypeScript con Express, SQLite y una suite de Vitest que cubre pagos parciales y conciliación.",
		"exp.eduTitle": "Ingeniería de Software",
		"exp.eduOrg": "Universidad Pascual Bravo",
		"exp.eduPeriod": "2022 - Presente",
		"exp.eduDesc":
			"5to semestre. Cursos de programación orientada a objetos, arquitectura de software, bases de datos relacionales, estructuras de datos y sistemas operativos.",
		"exp.eduTag1": "5to semestre",
		"exp.eduTag2": "POO y Algoritmos",
		"exp.eduTag3": "Bases de Datos",

		"contact.badge": "CONTACTO",
		"contact.heading": "Construyamos algo",
		"contact.headingAccent": "confiable",
		"contact.subtitle":
			"Abierto a roles backend y full-stack, y a colaboración en código abierto. Ubicado en Medellín (UTC-5), trabajo en remoto.",
		"contact.formTitle": "Empezar un correo",
		"contact.formHint":
			"Esto abre tu aplicación de correo con el mensaje precargado. Nada se envía desde esta página.",
		"contact.labelName": "Nombre",
		"contact.labelEmail": "Correo",
		"contact.labelMessage": "Mensaje",
		"contact.placeholderName": "Tu nombre",
		"contact.placeholderEmail": "tu@correo.com",
		"contact.placeholderMessage":
			"Cuéntame sobre tu proyecto u oportunidad...",
		"contact.openDraft": "Abrir borrador de correo",
		"contact.draftReady": "Borrador de correo listo",
		"contact.draftReadySub":
			"Tu aplicación de correo debería estar abierta. Si no se abrió, escribe a la dirección de abajo o cópiala manualmente.",
		"contact.editDraft": "Editar mensaje",
		"contact.email": "Correo",
		"contact.location": "Medellín, Colombia",
		"contact.availability": "Disponibilidad",
		"contact.availStatus": "Abierto a roles backend",
		"contact.timezone": "Zona Horaria",
		"contact.copyright": "© 2026 David Alexander Machado Alzate",
		"contact.tagline": "Diseñado con claridad. Construido con evidencia.",
		"contact.builtWith":
			"Hecho con React, TypeScript, Motion y Tailwind CSS. Probado con Vitest.",
		"contact.github": "GitHub",
		"contact.linkedin": "LinkedIn",


		"a11y.skipToContent": "Ir al contenido",
		"a11y.mobileMenu": "Menú de navegación móvil",
		"a11y.backToTop": "Volver arriba",
	},

	pt: {
		"meta.title":
			"David Machado — Engenheiro de Software Backend (.NET e TypeScript)",
		"meta.description":
			"Engenheiro de software backend em Medellín, Colômbia. .NET/C# e TypeScript, arquitetura hexagonal, PostgreSQL, Docker e testes automatizados. Trabalho open source com repositórios públicos.",

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
		"hero.subtitle1": "Engenheiro de Software Backend",
		"hero.subtitle2": ".NET / C# e Arquitetura Hexagonal",
		"hero.subtitle3": "TypeScript e APIs Transacionais",
		"hero.subtitle4": "PostgreSQL e Lógica de Domínio Testada",
		"hero.descPre": "Construo sistemas transacionais onde a ",
		"hero.descCloud": "arquitetura backend",
		"hero.descMiddle": ", o ",
		"hero.descDistributed": "modelo relacional",
		"hero.descAnd": " e os ",
		"hero.descDX": "testes automatizados orientam o design",
		"hero.ctaWork": "Ver meus projetos",
		"hero.ctaContact": "Entre em contato",
		"hero.scroll": "Rolar",

		"projects.badge": "PROJETOS EM DESTAQUE",
		"projects.heading": "Trabalho selecionado e",
		"projects.headingAccent": "sistemas verificáveis",
		"projects.subtitle":
			"Sistemas backend e de dados com repositórios públicos, decisões documentadas e suítes de testes que você pode inspecionar.",
		"projects.viewAll": "Ver todos os repositórios no GitHub",
		"projects.demo": "Demo ao vivo",
		"projects.source": "Repositório GitHub",
		"projects.details": "Arquitetura e detalhes",
		"projects.closeModal": "Fechar janela (Esc)",
		"projects.statusOpenSource": "Código aberto",
		"projects.statusPrivate": "Estudo privado",
		"projects.privateCase": "Estudo de caso privado",
		"projects.openRepo": "Abrir repositório",
		"projects.requestWalkthrough": "Solicitar apresentação",
		"projects.overview": "Visão geral do projeto",
		"projects.decisions": "Decisões técnicas principais",
		"projects.evidence": "Evidência de engenharia",
		"projects.stack": "Tecnologias e stack",
		"projects.pauseRotation": "Pausar rotação automática",
		"projects.resumeRotation": "Retomar rotação automática",
		"projects.previousProject": "Projeto anterior",
		"projects.nextProject": "Próximo projeto",

		"about.badge": "SOBRE MIM",
		"about.heading": "Primeiros princípios e",
		"about.headingAccent": "engenharia pragmática",
		"about.p1":
			"Sou estudante de Engenharia de Software no quinto semestre na Universidad Pascual Bravo, focado em sistemas backend: APIs transacionais, esquemas relacionais e lógica de domínio que pode ser testada sem um framework.",
		"about.p2pre": "Minha base é a ",
		"about.p2cloud": "arquitetura hexagonal",
		"about.p2distributed": "modelagem relacional",
		"about.p2and": ", além de ",
		"about.p2dx": "TypeScript e .NET",
		"about.p2post":
			". Valorizo invariantes explícitas, comportamento determinístico e testes que descrevem o domínio.",
		"about.p3":
			"Construí e documentei um núcleo de marketplace em .NET com 592 testes automatizados e um motor de cobrança de aluguéis open source em TypeScript. Busco uma equipe backend onde possa revisar código, assumir serviços pequenos e aprender com sistemas em produção.",
		"about.competencies": "Competências Principais",
		"about.skillCloud": "Contêineres e Ambiente",
		"about.skillLang": "Linguagens e Frameworks",
		"about.skillData": "Bancos de Dados e ORM",
		"about.skillArch": "Arquitetura e Design",
		"about.skillDevops": "Ferramentas e Controle de Versão",
		"about.skillMethods": "Testes e Qualidade",
		"about.skillAI": "Engenharia assistida por IA",
		"about.statProjects": "Projetos em Destaque",
		"about.statTests": "Testes Automatizados (Zentric)",
		"about.statRepos": "Repositórios Públicos",
		"about.statOpenSource": "Sistemas Open Source",
		"about.downloadCv": "Baixar CV",
		"about.philosophy": "Filosofia de Engenharia de Software",
		"about.phil1Title": "Primeiros Princípios",
		"about.phil1Desc":
			"Decompor problemas complexos até suas verdades fundamentais e construir a partir daí.",
		"about.phil2Title": "Confiabilidade Primeiro",
		"about.phil2Desc":
			"Prefiro regras explícitas e comportamento determinístico a abstrações engenhosas.",
		"about.phil3Title": "Evidência Acima de Promessas",
		"about.phil3Desc":
			"Entregar o que pode ser demonstrado: repositórios, testes e resultados medidos.",

		"exp.badge": "EXPERIÊNCIA",
		"exp.heading": "Jornada de",
		"exp.headingAccent": "crescimento e impacto",
		"exp.subtitle":
			"Uma linha do tempo de trabalho com clientes, sistemas open source e a formação por trás.",
		"exp.typeWork": "Experiência",
		"exp.typeEducation": "Educação",
		"exp.typeAchievement": "Conquista",
		"exp.more": "Mais por vir...",
		"exp.workTitle": "Desenvolvedor de Software Independente",
		"exp.workOrg": "Projetos de clientes e código aberto",
		"exp.workPeriod": "2024 - Presente",
		"exp.workDesc":
			"Construo sistemas transacionais para clientes e para código aberto. Zentric: núcleo de marketplace em .NET 10 com Arquitetura Hexagonal, DDD, CQRS, PostgreSQL, Docker e 592 testes automatizados. LeaseFlow: motor de cobrança de aluguéis em TypeScript com Express, SQLite e uma suíte Vitest que cobre pagamentos parciais e conciliação.",
		"exp.eduTitle": "Engenharia de Software",
		"exp.eduOrg": "Universidad Pascual Bravo",
		"exp.eduPeriod": "2022 - Presente",
		"exp.eduDesc":
			"5º semestre. Disciplinas de programação orientada a objetos, arquitetura de software, bancos de dados relacionais, estruturas de dados e sistemas operacionais.",
		"exp.eduTag1": "5º semestre",
		"exp.eduTag2": "POO e Algoritmos",
		"exp.eduTag3": "Bancos de Dados",

		"contact.badge": "ENTRE EM CONTATO",
		"contact.heading": "Vamos construir algo",
		"contact.headingAccent": "confiável",
		"contact.subtitle":
			"Aberto a vagas backend e full-stack, e a colaboração em código aberto. Baseado em Medellín (UTC-5), trabalho remotamente.",
		"contact.formTitle": "Iniciar um email",
		"contact.formHint":
			"Isso abre seu aplicativo de email com a mensagem preenchida. Nada é enviado a partir desta página.",
		"contact.labelName": "Nome",
		"contact.labelEmail": "Email",
		"contact.labelMessage": "Mensagem",
		"contact.placeholderName": "Seu nome",
		"contact.placeholderEmail": "seu@email.com",
		"contact.placeholderMessage":
			"Conte-me sobre seu projeto ou oportunidade...",
		"contact.openDraft": "Abrir rascunho de email",
		"contact.draftReady": "Rascunho de email pronto",
		"contact.draftReadySub":
			"Seu aplicativo de email deve estar aberto. Se não abriu, escreva para o endereço abaixo ou copie manualmente.",
		"contact.editDraft": "Editar mensagem",
		"contact.email": "Email",
		"contact.location": "Medellín, Colômbia",
		"contact.availability": "Disponibilidade",
		"contact.availStatus": "Aberto a vagas backend",
		"contact.timezone": "Fuso Horário",
		"contact.copyright": "© 2026 David Alexander Machado Alzate",
		"contact.tagline": "Projetado com clareza. Construído com evidência.",
		"contact.builtWith":
			"Feito com React, TypeScript, Motion e Tailwind CSS. Testado com Vitest.",
		"contact.github": "GitHub",
		"contact.linkedin": "LinkedIn",


		"a11y.skipToContent": "Ir para o conteúdo",
		"a11y.mobileMenu": "Menu de navegação móvel",
		"a11y.backToTop": "Voltar ao topo",
	},
} as const;

export type TranslationKey = keyof (typeof translations)["en"];

export function t(language: Language, key: TranslationKey): string {
	return translations[language]?.[key] ?? translations.en[key] ?? key;
}
