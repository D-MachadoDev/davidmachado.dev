export type Language = "en" | "es" | "pt";

export const languageOrder: Language[] = ["en", "es", "pt"];

export const languageMeta: Record<Language, { label: string; flag: string; native: string }> = {
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
    "hero.subtitle1": "Systems Thinker × Problem Solver",
    "hero.subtitle2": "Cloud Architect × Builder",
    "hero.subtitle3": "DevOps Engineer × Creator",
    "hero.subtitle4": "Full-Stack × Infrastructure",
    "hero.descPre": "Building scalable solutions at the intersection of ",
    "hero.descCloud": "cloud architecture",
    "hero.descMiddle": ", ",
    "hero.descDistributed": "distributed systems",
    "hero.descAnd": ", and ",
    "hero.descDX": "developer experience",
    "hero.ctaWork": "View my work",
    "hero.ctaContact": "Get in touch",
    "hero.scroll": "Scroll",

    "projects.badge": "Selected Work",
    "projects.heading": "Projects that",
    "projects.headingAccent": "scale",
    "projects.subtitle":
      "Building infrastructure and tools focused on performance, reliability, and developer experience.",
    "projects.viewAll": "View all projects on GitHub",
    "projects.emptyTitle": "Projects coming soon",
    "projects.emptyDesc":
      "I'm currently preparing stronger case studies with real previews, technical decisions, and measurable outcomes.",
    "projects.demo": "Visit demo",
    "projects.source": "Source code",

    "about.badge": "ABOUT ME",
    "about.heading": "Systems thinking meets",
    "about.headingAccent": "pragmatic engineering",
    "about.p1":
      "I'm a systems thinker who approaches engineering from first principles. Currently pursuing software engineering at Universidad Pascual Bravo, I focus on building infrastructure that scales and tools that empower teams.",
    "about.p2pre": "My interest lies at the intersection of",
    "about.p2cloud": "cloud architecture",
    "about.p2distributed": "distributed systems",
    "about.p2and": ", and",
    "about.p2dx": "developer experience",
    "about.p2post":
      ". I believe great engineering is about making complex systems simple, reliable, and maintainable.",
    "about.p3":
      "Whether it's designing microservice architectures, optimizing deployment pipelines, or building developer tools — I'm driven by problems that require deep technical thinking and pragmatic solutions.",
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
    "about.philosophy": "Software Developer Philosophy",
    "about.phil1Title": "First Principles",
    "about.phil1Desc":
      "Break down complex problems to their fundamental truths and build up from there.",
    "about.phil2Title": "Scalability First",
    "about.phil2Desc": "Design systems that can grow without architectural rewrites.",
    "about.phil3Title": "Developer Joy",
    "about.phil3Desc": "Great tools should make developers more productive and happier.",

    "exp.badge": "EXPERIENCE",
    "exp.heading": "Journey of",
    "exp.headingAccent": "growth",
    "exp.subtitle":
      "A timeline of roles, education, and achievements that shaped my software developer..",
    "exp.typeWork": "Experience",
    "exp.typeEducation": "Education",
    "exp.typeAchievement": "Achievement",
    "exp.more": "More to come...",
    "exp.eduTitle": "Software Engineering",
    "exp.eduOrg": "Universidad Pascual Bravo",
    "exp.eduPeriod": "2022 - Present",
    "exp.eduDesc":
      "5th semester. Focus on distributed systems, cloud computing, and software architecture. Active member of the Computer Science Club.",

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
    "contact.placeholderMessage": "Tell me about your project or opportunity...",
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
    "contact.builtWith": "Built with React, TypeScript, Motion, and Tailwind CSS",
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

    "hero.available": "Abierto a nuevos proyectos",
    "hero.availableShort": "Abierto",
    "hero.subtitle1": "Pienso en sistemas. Construyo soluciones.",
    "hero.subtitle2": "Arquitecto Cloud × Constructor",
    "hero.subtitle3": "Ingeniero DevOps × Creador",
    "hero.subtitle4": "Full-Stack × Infraestructura",
    "hero.descPre": "Construyo software que escala. Me interesa la ",
    "hero.descCloud": "arquitectura",
    "hero.descMiddle": ", los ",
    "hero.descDistributed": "sistemas distribuidos",
    "hero.descAnd": " y la ",
    "hero.descDX": "experiencia del desarrollador",
    "hero.ctaWork": "Ver proyectos",
    "hero.ctaContact": "Hablemos",
    "hero.scroll": "Deslizar",

    "projects.badge": "PROYECTOS",
    "projects.heading": "Trabajo",
    "projects.headingAccent": "seleccionado",
    "projects.subtitle":
      "Construyo infraestructura y herramientas enfocadas en rendimiento, confiabilidad y experiencia del desarrollador.",
    "projects.viewAll": "Ver todos los proyectos en GitHub",
    "projects.emptyTitle": "Proyectos próximamente",
    "projects.emptyDesc":
      "Estoy preparando casos de estudio más sólidos, con previews reales, decisiones técnicas y resultados medibles.",
    "projects.demo": "Visitar demo",
    "projects.source": "Código fuente",

    "about.badge": "SOBRE MÍ",
    "about.heading": "Cómo pienso y cómo",
    "about.headingAccent": "construyo",
    "about.p1":
      "Soy un pensador de sistemas que aborda la ingeniería desde los primeros principios. Actualmente cursando ingeniería de software en la Universidad Pascual Bravo, me enfoco en construir infraestructura que escala y herramientas que empoderan equipos.",
    "about.p2pre": "Mi interés está en la intersección de",
    "about.p2cloud": "arquitectura cloud",
    "about.p2distributed": "sistemas distribuidos",
    "about.p2and": ", y",
    "about.p2dx": "experiencia de desarrollador",
    "about.p2post":
      ". Creo que la gran ingeniería consiste en hacer que los sistemas complejos sean simples, confiables y mantenibles.",
    "about.p3":
      "Ya sea diseñando arquitecturas de microservicios, optimizando pipelines de despliegue o construyendo herramientas para desarrolladores — me impulsan los problemas que requieren pensamiento técnico profundo y soluciones pragmáticas.",
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
    "about.philosophy": "Filosofía de desarrollador de software",
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
    "exp.heading": "Trayectoria",
    "exp.headingAccent": "",
    "exp.subtitle":
      "Una línea de tiempo de roles, educación y logros que formaron mi mentalidad de desarrollador de software.",
    "exp.typeWork": "Experiencia",
    "exp.typeEducation": "Educación",
    "exp.typeAchievement": "Logro",
    "exp.more": "Más por venir...",
    "exp.eduTitle": "Ingeniería de Software",
    "exp.eduOrg": "Universidad de Medellín",
    "exp.eduPeriod": "2022 - Presente",
    "exp.eduDesc":
      "5to semestre. Enfocado en sistemas distribuidos, computación en la nube y arquitectura de software. Miembro activo del Club de Ciencias de la Computación.",

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
    "hero.subtitle1": "Pensador de Sistemas × Solucionador de Problemas",
    "hero.subtitle2": "Arquiteto Cloud × Construtor",
    "hero.subtitle3": "Engenheiro DevOps × Criador",
    "hero.subtitle4": "Full-Stack × Infraestrutura",
    "hero.descPre": "Construindo soluções escaláveis na intersecção de ",
    "hero.descCloud": "arquitetura cloud",
    "hero.descMiddle": ", ",
    "hero.descDistributed": "sistemas distribuídos",
    "hero.descAnd": " e ",
    "hero.descDX": "experiência do desenvolvedor",
    "hero.ctaWork": "Ver meus projetos",
    "hero.ctaContact": "Entre em contato",
    "hero.scroll": "Rolar",

    "projects.badge": "PROJETOS SELECIONADOS",
    "projects.heading": "Projetos que",
    "projects.headingAccent": "escalam",
    "projects.subtitle":
      "Construindo infraestrutura e ferramentas focadas em performance, confiabilidade e experiência do desenvolvedor.",
    "projects.viewAll": "Ver todos os projetos no GitHub",
    "projects.emptyTitle": "Projetos em breve",
    "projects.emptyDesc":
      "Estou preparando estudos de caso mais fortes, com previews reais, decisões técnicas e resultados mensuráveis.",
    "projects.demo": "Visitar demo",
    "projects.source": "Código-fonte",

    "about.badge": "SOBRE MIM",
    "about.heading": "Pensamento sistêmico e",
    "about.headingAccent": "engenharia pragmática",
    "about.p1":
      "Sou um pensador de sistemas que aborda a engenharia a partir de primeiros princípios. Atualmente cursando engenharia de software na Universidad Pacual Bravo, foco em construir infraestrutura que escala e ferramentas que empoderam equipes.",
    "about.p2pre": "Meu interesse está na intersecção de",
    "about.p2cloud": "arquitetura cloud",
    "about.p2distributed": "sistemas distribuídos",
    "about.p2and": ", e",
    "about.p2dx": "experiência do desenvolvedor",
    "about.p2post":
      ". Acredito que a grande engenharia consiste em tornar sistemas complexos simples, confiáveis e sustentáveis.",
    "about.p3":
      "Seja projetando arquiteturas de microsserviços, otimizando pipelines de deploy ou construindo ferramentas para desenvolvedores — sou movido por problemas que exigem pensamento técnico profundo e soluções pragmáticas.",
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
    "about.philosophy": "Filosofia de Engenharia",
    "about.phil1Title": "Primeiros Princípios",
    "about.phil1Desc":
      "Decompor problemas complexos até suas verdades fundamentais e construir a partir daí.",
    "about.phil2Title": "Escalabilidade Primeiro",
    "about.phil2Desc": "Projetar sistemas que podem crescer sem reescritas arquiteturais.",
    "about.phil3Title": "Alegria do Desenvolvedor",
    "about.phil3Desc":
      "Grandes ferramentas devem tornar os desenvolvedores mais produtivos e felizes.",

    "exp.badge": "EXPERIÊNCIA",
    "exp.heading": "Jornada de",
    "exp.headingAccent": "crescimento",
    "exp.subtitle":
      "Uma linha do tempo de papéis, educação e conquistas que moldaram minha mentalidade de engenheiro.",
    "exp.typeWork": "Experiência",
    "exp.typeEducation": "Educação",
    "exp.typeAchievement": "Conquista",
    "exp.more": "Mais por vir...",
    "exp.eduTitle": "Engenharia de Software",
    "exp.eduOrg": "Universidad Pascual Bravo",
    "exp.eduPeriod": "2022 - Presente",
    "exp.eduDesc":
      "5º semestre. Foco em sistemas distribuídos, computação em nuvem e arquitetura de software. Membro ativo do Clube de Ciência da Computação.",

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
    "contact.placeholderMessage": "Conte-me sobre seu projeto ou oportunidade...",
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