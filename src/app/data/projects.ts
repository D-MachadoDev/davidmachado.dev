import type { Language } from "../i18n";

export type ProjectStatus = "open_source" | "private";

export interface ProjectEvidence {
	value: string;
	label: Record<Language, string>;
}

export interface Project {
	id: string;
	title: string;
	category: string;
	role: string;
	summary: Record<Language, string>;
	description: Record<Language, string>;
	architectureHighlights: Record<Language, string[]>;
	evidence: ProjectEvidence[];
	tags: string[];
	link?: string;
	github?: string;
	year: string;
	accent: string;
	status: ProjectStatus;
	architectureBadge: string;
}

const testLabel: Record<Language, string> = {
	en: "automated tests",
	es: "pruebas automatizadas",
	pt: "testes automatizados",
};

const cqrsLabel: Record<Language, string> = {
	en: "CQRS handlers",
	es: "handlers CQRS",
	pt: "handlers CQRS",
};

const runtimeLabel: Record<Language, string> = {
	en: "runtime + EF Core",
	es: "runtime + EF Core",
	pt: "runtime + EF Core",
};

const etlLabel: Record<Language, string> = {
	en: "incremental pipeline",
	es: "pipeline incremental",
	pt: "pipeline incremental",
};

const starLabel: Record<Language, string> = {
	en: "dimensional schema",
	es: "esquema dimensional",
	pt: "esquema dimensional",
};

const biLabel: Record<Language, string> = {
	en: "Power BI dashboards",
	es: "dashboards en Power BI",
	pt: "dashboards no Power BI",
};

const sqlLabel: Record<Language, string> = {
	en: "SQL Server persistence",
	es: "persistencia en SQL Server",
	pt: "persistência no SQL Server",
};

const architectureLabel: Record<Language, string> = {
	en: "Clean Architecture",
	es: "Arquitectura Limpia",
	pt: "Clean Architecture",
};

const productDesignLabel: Record<Language, string> = {
	en: "product design case study",
	es: "caso de diseño de producto",
	pt: "estudo de design de produto",
};

const nutritionLabel: Record<Language, string> = {
	en: "nutrition and culinary planning",
	es: "planificación nutricional y culinaria",
	pt: "planejamento nutricional e culinário",
};

const deterministicLabel: Record<Language, string> = {
	en: "deterministic calculations",
	es: "cálculos deterministas",
	pt: "cálculos determinísticos",
};

/**
 * Featured work is limited to artifacts that can be inspected or explained
 * today. Every entry states where the evidence lives: a public repository or
 * a private case study. Avoid delivery dates, adoption metrics, or stack
 * claims that the available evidence cannot back up.
 */

/**
 * The single project the home page surfaces. It lives here, next to the data,
 * so renaming an id breaks a test instead of silently emptying the hero slot.
 */
export const FEATURED_PROJECT_ID = "zentric";

export const projects: Project[] = [
	{
		id: "zentric",
		title: "Zentric — Marketplace Core API",
		category: "Backend & API",
		role: "Backend Developer",
		summary: {
			en: "Transactional marketplace core built with .NET 10, Hexagonal Architecture, DDD, and CQRS. The domain stays independent from frameworks and persists to PostgreSQL.",
			es: "Núcleo transaccional de marketplace construido con .NET 10, Arquitectura Hexagonal, DDD y CQRS. El dominio permanece independiente de los frameworks y persiste en PostgreSQL.",
			pt: "Núcleo transacional de marketplace construído com .NET 10, Arquitetura Hexagonal, DDD e CQRS. O domínio permanece independente dos frameworks e persiste no PostgreSQL.",
		},
		description: {
			en: "The domain core of a multi-vendor marketplace: catalog, inventory, and order placement. Ports and adapters isolate business invariants from the database and the web layer, so the rules can be tested without either. CQRS separates 22 command handlers from 14 query handlers; EF Core maps 14 DbSets; the repository documents decisions as ADRs and ships 592 automated tests.",
			es: "El núcleo de dominio de un marketplace multi-vendedor: catálogo, inventario y creación de pedidos. Puertos y adaptadores aíslan las invariantes de negocio de la base de datos y de la capa web, de modo que las reglas se prueban sin ellas. CQRS separa 22 command handlers de 14 query handlers; EF Core mapea 14 DbSets; el repositorio documenta decisiones en ADRs y publica 592 pruebas automatizadas.",
			pt: "O núcleo de domínio de um marketplace multi-vendedor: catálogo, inventário e criação de pedidos. Portas e adaptadores isolam as invariantes de negócio do banco de dados e da camada web, permitindo testar as regras sem eles. CQRS separa 22 command handlers de 14 query handlers; o EF Core mapeia 14 DbSets; o repositório documenta decisões em ADRs e publica 592 testes automatizados.",
		},
		architectureHighlights: {
			en: [
				"Hexagonal architecture: the domain has no framework or database dependency",
				"DDD aggregates and value objects enforce stock and order invariants",
				"CQRS split with 22 command handlers and 14 query handlers",
				"592 xUnit tests across domain, application, and API layers",
				"PostgreSQL through EF Core, containerized with Docker",
			],
			es: [
				"Arquitectura Hexagonal: el dominio no depende de frameworks ni de la base de datos",
				"Agregados y value objects de DDD protegen las invariantes de stock y pedidos",
				"Separación CQRS con 22 command handlers y 14 query handlers",
				"592 pruebas con xUnit en las capas de dominio, aplicación y API",
				"PostgreSQL mediante EF Core, contenerizado con Docker",
			],
			pt: [
				"Arquitetura Hexagonal: o domínio não depende de frameworks nem do banco de dados",
				"Agregados e value objects de DDD protegem as invariantes de estoque e pedidos",
				"Separação CQRS com 22 command handlers e 14 query handlers",
				"592 testes com xUnit nas camadas de domínio, aplicação e API",
				"PostgreSQL via EF Core, containerizado com Docker",
			],
		},
		evidence: [
			{ value: "592", label: testLabel },
			{ value: "22+14", label: cqrsLabel },
			{ value: ".NET 10", label: runtimeLabel },
		],
		tags: [".NET", "C#", "PostgreSQL", "Docker"],
		github: "https://github.com/D-MachadoDev/Zentric",
		year: "2026",
		accent: "#3B82F6",
		status: "open_source",
		architectureBadge: "Hexagonal + DDD + CQRS",
	},
	{
		id: "faroo",
		title: "Faroo — Rental Control & Reconciliation",
		category: "Full-Stack & Domain",
		role: "Full-Stack Developer",
		summary: {
			en: "An academic rental operations platform for independent landlords. Faroo brings contracts, scheduled charges, payment reconciliation, and arrears follow-up into one traceable workflow.",
			es: "Plataforma académica de operación de alquileres para propietarios independientes. Faroo reúne contratos, cobros programados, conciliación de pagos y seguimiento de mora en un flujo trazable.",
			pt: "Plataforma acadêmica de operação de aluguéis para proprietários independentes. Faroo reúne contratos, cobranças programadas, conciliação de pagamentos e acompanhamento de atrasos em um fluxo rastreável.",
		},
		description: {
			en: "Faroo is a monorepo with a .NET 10 backend and a React 18, Vite, and TypeScript frontend. It models rental contracts, scheduled charges, photo-based payment reconciliation, and an operational arrears traffic light. Clean Architecture keeps domain rules independent from infrastructure; versioned SQL migrations and automated unit and integration tests make the system easier to evolve and verify.",
			es: "Faroo es un monorepo con backend en .NET 10 y frontend en React 18, Vite y TypeScript. Modela contratos de alquiler, cobros programados, conciliación de pagos mediante fotos y un semáforo operativo de mora. La Arquitectura Limpia mantiene las reglas de negocio independientes de la infraestructura; las migraciones SQL versionadas y las pruebas unitarias y de integración facilitan su evolución y verificación.",
			pt: "Faroo é um monorepo com backend em .NET 10 e frontend em React 18, Vite e TypeScript. Modela contratos de aluguel, cobranças programadas, conciliação de pagamentos por foto e um semáforo operacional de atrasos. A Clean Architecture mantém as regras de negócio independentes da infraestrutura; migrações SQL versionadas e testes unitários e de integração facilitam sua evolução e verificação.",
		},
		architectureHighlights: {
			en: [
				"Clean Architecture split across Domain, Application, Infrastructure, and API",
				"Rental contracts, scheduled charges, and photo-based payment reconciliation",
				"React 18 + Vite + TypeScript web application",
				".NET 10 backend with SQL Server and versioned migrations",
				"Unit and integration tests for the core workflows",
			],
			es: [
				"Arquitectura Limpia separada en Domain, Application, Infrastructure y API",
				"Contratos de alquiler, cobros programados y conciliación de pagos mediante fotos",
				"Aplicación web con React 18, Vite y TypeScript",
				"Backend en .NET 10 con SQL Server y migraciones versionadas",
				"Pruebas unitarias y de integración para los flujos principales",
			],
			pt: [
				"Clean Architecture separada em Domain, Application, Infrastructure e API",
				"Contratos de aluguel, cobranças programadas e conciliação de pagamentos por foto",
				"Aplicação web com React 18, Vite e TypeScript",
				"Backend em .NET 10 com SQL Server e migrações versionadas",
				"Testes unitários e de integração para os fluxos principais",
			],
		},
		evidence: [
			{ value: ".NET 10", label: runtimeLabel },
			{ value: "Clean Architecture", label: architectureLabel },
			{ value: "SQL Server", label: sqlLabel },
		],
		tags: [".NET 10", "React", "TypeScript", "SQL Server", "Docker"],
		github: "https://github.com/D-MachadoDev/faroo",
		year: "2026",
		accent: "#8B5CF6",
		status: "open_source",
		architectureBadge: "Clean Architecture + rental domain",
	},
	{
		id: "chefnutri",
		title: "ChefNutri — Gourmet Nutrition Planner",
		category: "Product Design & AI",
		role: "Product Designer / Software Engineer",
		summary: {
			en: "A product concept that combines nutrition guidance and practical cooking. ChefNutri helps people plan healthy, flavorful meals without wasting ingredients or losing track of budget.",
			es: "Concepto de producto que combina orientación nutricional y cocina práctica. ChefNutri ayuda a planificar comidas saludables y sabrosas sin desperdiciar ingredientes ni perder de vista el presupuesto.",
			pt: "Conceito de produto que combina orientação nutricional e cozinha prática. ChefNutri ajuda a planejar refeições saudáveis e saborosas sem desperdiçar ingredientes nem perder o controle do orçamento.",
		},
		description: {
			en: "ChefNutri is a documented product and architecture case study for people who want to eat better but need practical guidance. The proposal combines a curated recipe library with calories and macros, step-by-step cooking guidance, an ingredient list that groups repeated items, and a local supermarket price comparison layer. The design keeps deterministic nutrition and shopping calculations in structured data, reserving AI for focused tasks such as interpreting a recipe link or suggesting meals from available ingredients.",
			es: "ChefNutri es un caso documentado de producto y arquitectura para personas que quieren comer mejor, pero necesitan orientación práctica. La propuesta combina un recetario curado con calorías y macronutrientes, instrucciones de cocina paso a paso, una lista de ingredientes que agrupa productos repetidos y una capa de comparación de precios en supermercados locales. El diseño mantiene los cálculos nutricionales y de compras en datos estructurados y deterministas, y reserva la IA para tareas puntuales como interpretar un enlace de receta o sugerir comidas a partir de los ingredientes disponibles.",
			pt: "ChefNutri é um estudo documentado de produto e arquitetura para pessoas que querem comer melhor, mas precisam de orientação prática. A proposta combina um acervo de receitas com calorias e macronutrientes, instruções de cozinha passo a passo, uma lista de ingredientes que agrupa itens repetidos e uma camada de comparação de preços em supermercados locais. O design mantém os cálculos nutricionais e de compras em dados estruturados e determinísticos, reservando a IA para tarefas específicas como interpretar um link de receita ou sugerir refeições a partir dos ingredientes disponíveis.",
		},
		architectureHighlights: {
			en: [
				"Recipe catalog with skill levels, calories, macros, and clear techniques",
				"Shopping-list generation that groups shared ingredients to reduce waste",
				"Deterministic nutrition and budget calculations before any AI call",
				"Progressive supermarket pricing strategy that can start with reference prices or official APIs",
				"Hybrid AI boundary for recipe-link interpretation and ingredient-based suggestions",
			],
			es: [
				"Catálogo de recetas con niveles, calorías, macros y técnicas explicadas con claridad",
				"Generación de listas que agrupa ingredientes compartidos para reducir desperdicio",
				"Cálculos nutricionales y de presupuesto deterministas antes de llamar a la IA",
				"Estrategia progresiva de precios que puede iniciar con referencias o APIs oficiales",
				"Límite claro para IA: interpretar recetas y sugerir comidas según ingredientes",
			],
			pt: [
				"Catálogo de receitas com níveis, calorias, macros e técnicas explicadas com clareza",
				"Geração de listas que agrupa ingredientes compartilhados para reduzir desperdício",
				"Cálculos nutricionais e de orçamento determinísticos antes de chamar a IA",
				"Estratégia progressiva de preços que pode começar com referências ou APIs oficiais",
				"Limite claro para IA: interpretar receitas e sugerir refeições pelos ingredientes",
			],
		},
		evidence: [
			{ value: "Product brief", label: productDesignLabel },
			{ value: "Hybrid AI", label: deterministicLabel },
			{ value: "Recipe + market flow", label: nutritionLabel },
		],
		tags: ["Product Design", "Nutrition", "AI", "Data Modeling", "UX"],
		year: "2026",
		accent: "#F97316",
		status: "private",
		architectureBadge: "Product design + hybrid AI",
	},
	{
		id: "retail-analytics",
		title: "Retail Analytics — Data Pipeline & BI",
		category: "Data Engineering & BI",
		role: "Data Analyst / Analytics Engineer",
		summary: {
			en: "Private case study: an incremental ETL pipeline, a dimensional model, and Power BI dashboards that trace every retail KPI back to source rows.",
			es: "Caso de estudio privado: pipeline ETL incremental, modelo dimensional y dashboards en Power BI que rastrean cada KPI de retail hasta las filas de origen.",
			pt: "Estudo de caso privado: pipeline ETL incremental, modelo dimensional e dashboards no Power BI que rastreiam cada KPI de varejo até as linhas de origem.",
		},
		description: {
			en: "Raw retail transactions go through an incremental ETL process with data-quality checks, land in a star schema, and feed dashboards for revenue, cohorts, and regional trends. The focus is traceability: every metric can be followed back to the source rows and the transformation that produced it.",
			es: "Las transacciones retail crudas pasan por un ETL incremental con validaciones de calidad, aterrizan en un modelo estrella y alimentan dashboards de ingresos, cohortes y tendencias regionales. El foco es la trazabilidad: cada métrica se puede seguir hasta las filas de origen y la transformación que la produjo.",
			pt: "As transações de varejo brutas passam por um ETL incremental com validações de qualidade, chegam a um modelo estrela e alimentam dashboards de receita, coortes e tendências regionais. O foco é a rastreabilidade: cada métrica pode ser seguida até as linhas de origem e a transformação que a produziu.",
		},
		architectureHighlights: {
			en: [
				"Incremental ETL with data-quality validation and error handling",
				"Star schema separating facts from dimensions",
				"Power BI dashboards for revenue, cohorts, and regional trends",
				"Private case study; a walkthrough is available on request",
			],
			es: [
				"ETL incremental con validación de calidad y manejo de errores",
				"Modelo estrella que separa hechos de dimensiones",
				"Dashboards en Power BI para ingresos, cohortes y tendencias regionales",
				"Caso de estudio privado; recorrido disponible a solicitud",
			],
			pt: [
				"ETL incremental com validação de qualidade e tratamento de erros",
				"Modelo estrela separando fatos de dimensões",
				"Dashboards no Power BI para receita, coortes e tendências regionais",
				"Estudo de caso privado; apresentação disponível sob solicitação",
			],
		},
		evidence: [
			{ value: "ETL", label: etlLabel },
			{ value: "Star", label: starLabel },
			{ value: "BI", label: biLabel },
		],
		tags: ["Python", "SQL", "PostgreSQL", "Power BI", "Docker"],
		year: "2026",
		accent: "#F59E0B",
		status: "private",
		architectureBadge: "ETL + star schema",
	},
];
