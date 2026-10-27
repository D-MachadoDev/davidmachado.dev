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

const vitestLabel: Record<Language, string> = {
	en: "test suite",
	es: "suite de pruebas",
	pt: "suíte de testes",
};

const sqliteLabel: Record<Language, string> = {
	en: "transactional storage",
	es: "almacenamiento transaccional",
	pt: "armazenamento transacional",
};

const restLabel: Record<Language, string> = {
	en: "REST API",
	es: "API REST",
	pt: "API REST",
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

/**
 * Featured work is limited to artifacts that can be inspected today.
 * Every entry states where the evidence lives: a public repository or a
 * private case study available on request. Avoid delivery dates, adoption
 * metrics, or stack claims that the repository cannot back up.
 */
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
		id: "leaseflow",
		title: "LeaseFlow — Lease Billing Engine",
		category: "Full-Stack & Domain",
		role: "Full-Stack Developer",
		summary: {
			en: "Open-source billing engine for property managers. It models leases, partial payments, and receipt reconciliation as explicit domain rules instead of spreadsheet formulas.",
			es: "Motor de facturación open source para administradores de inmuebles. Modela contratos, pagos parciales y conciliación de recibos como reglas de dominio explícitas en lugar de fórmulas en hojas de cálculo.",
			pt: "Motor de cobrança open source para administradores de imóveis. Modela contratos, pagamentos parciais e conciliação de recibos como regras de domínio explícitas em vez de fórmulas em planilhas.",
		},
		description: {
			en: "A lease billing engine that turns rent, partial payments, and receipts into deterministic balances. The domain model makes arrears and reconciliation rules explicit and testable; Express exposes the REST API and SQLite provides transactional local persistence. The Vitest suite covers the money rules before they reach the interface.",
			es: "Un motor de facturación de arriendos que convierte el canon, los pagos parciales y los recibos en saldos deterministas. El modelo de dominio hace explícitas y testeables las reglas de mora y conciliación; Express expone la API REST y SQLite aporta persistencia transaccional local. La suite de Vitest cubre las reglas de dinero antes de llegar a la interfaz.",
			pt: "Um motor de cobrança de aluguéis que transforma o valor mensal, os pagamentos parciais e os recibos em saldos determinísticos. O modelo de domínio torna as regras de atraso e conciliação explícitas e testáveis; o Express expõe a API REST e o SQLite fornece persistência transacional local. A suíte Vitest cobre as regras de dinheiro antes de chegarem à interface.",
		},
		architectureHighlights: {
			en: [
				"Domain model for leases, partial payments, and receipt reconciliation",
				"Deterministic balance and arrears rules, independent from the UI",
				"Vitest suite covering domain logic and the HTTP layer",
				"Express REST API with SQLite transactional persistence",
			],
			es: [
				"Modelo de dominio para contratos, pagos parciales y conciliación de recibos",
				"Reglas deterministas de saldo y mora, independientes de la interfaz",
				"Suite de Vitest sobre la lógica de dominio y la capa HTTP",
				"API REST con Express y persistencia transaccional en SQLite",
			],
			pt: [
				"Modelo de domínio para contratos, pagamentos parciais e conciliação de recibos",
				"Regras determinísticas de saldo e atraso, independentes da interface",
				"Suíte Vitest sobre a lógica de domínio e a camada HTTP",
				"API REST com Express e persistência transacional em SQLite",
			],
		},
		evidence: [
			{ value: "Vitest", label: vitestLabel },
			{ value: "SQLite", label: sqliteLabel },
			{ value: "Express", label: restLabel },
		],
		tags: ["TypeScript", "Express", "SQLite", "Vitest"],
		github: "https://github.com/D-MachadoDev/leaseflow",
		year: "2026",
		accent: "#10B981",
		status: "open_source",
		architectureBadge: "Domain model: leases & ledger",
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
