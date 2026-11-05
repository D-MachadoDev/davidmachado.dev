import { projects } from "./data/projects";
import { t, type Language } from "./i18n";
import type { Route } from "./router";

const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.trim();
export const SITE_URL = (
	configuredSiteUrl || "https://davidmachado-dev.vercel.app"
).replace(/\/+$/, "");
export const OG_IMAGE_PATH = "/og-image-v2.png";
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;

export interface SeoMetadata {
	title: string;
	description: string;
	canonical: string;
	image: string;
	locale: string;
}

export function routePath(route: Route): string {
	switch (route.name) {
		case "home":
			return "/";
		case "projects":
			return "/projects";
		case "gallery":
			return "/gallery";
		case "about":
			return "/about";
		case "project":
			return `/projects/${encodeURIComponent(route.id)}`;
		default:
			return "/404";
	}
}

function localeFor(language: Language): string {
	if (language === "es") return "es_CO";
	if (language === "pt") return "pt_BR";
	return "en_US";
}

function notFoundMetadata(language: Language): SeoMetadata {
	return {
		title: `404 — David Machado`,
		description: t(language, "notFound.lede"),
		canonical: `${SITE_URL}/404`,
		image: OG_IMAGE_URL,
		locale: localeFor(language),
	};
}

export function getSeoMetadata(route: Route, language: Language): SeoMetadata {
	const path = routePath(route);

	if (route.name === "notFound") return notFoundMetadata(language);

	if (route.name === "project") {
		const project = projects.find((entry) => entry.id === route.id);
		if (!project) return notFoundMetadata(language);

		return {
			title: `${project.title.split(" — ")[0]} — David Machado`,
			description: project.summary[language],
			canonical: `${SITE_URL}${path}`,
			image: OG_IMAGE_URL,
			locale: localeFor(language),
		};
	}

	const titleKey =
		route.name === "home"
			? "meta.title"
			: route.name === "projects"
				? "meta.projects"
				: route.name === "gallery"
					? "meta.gallery"
					: "meta.about";

	const descriptionKey =
		route.name === "home"
			? "meta.description"
			: route.name === "projects"
				? "projects.subtitle"
				: route.name === "gallery"
					? "gallery.lede"
					: "about.p1";

	return {
		title: t(language, titleKey),
		description: t(language, descriptionKey),
		canonical: `${SITE_URL}${path}`,
		image: OG_IMAGE_URL,
		locale: localeFor(language),
	};
}

export const staticRoutes: { path: string; route: Route }[] = [
	{ path: "/", route: { name: "home" } },
	{ path: "/projects", route: { name: "projects" } },
	...projects.map((project) => ({
		path: `/projects/${project.id}`,
		route: { name: "project", id: project.id } as const,
	})),
	{ path: "/gallery", route: { name: "gallery" } },
	{ path: "/about", route: { name: "about" } },
];

function escapeHtml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

function replaceRequired(
	html: string,
	pattern: RegExp,
	replacement: string,
	label: string,
): string {
	if (!pattern.test(html)) {
		throw new Error(`SEO template is missing ${label}`);
	}
	return html.replace(pattern, replacement);
}

export function applySeoToHtml(template: string, meta: SeoMetadata): string {
	let html = template;
	const title = escapeHtml(meta.title);
	const description = escapeHtml(meta.description);
	const canonical = escapeHtml(meta.canonical);
	const image = escapeHtml(meta.image);
	const locale = escapeHtml(meta.locale);

	html = replaceRequired(
		html,
		/<title>[\s\S]*?<\/title>/,
		`<title>${title}</title>`,
		"title",
	);
	html = replaceRequired(
		html,
		/<meta name="description" content="[^"]*" \/>/,
		`<meta name="description" content="${description}" />`,
		"description",
	);
	html = replaceRequired(
		html,
		/<link rel="canonical" href="[^"]*" \/>/,
		`<link rel="canonical" href="${canonical}" />`,
		"canonical",
	);
	html = replaceRequired(
		html,
		/<meta property="og:title" content="[^"]*" \/>/,
		`<meta property="og:title" content="${title}" />`,
		"og:title",
	);
	html = replaceRequired(
		html,
		/<meta property="og:description" content="[^"]*" \/>/,
		`<meta property="og:description" content="${description}" />`,
		"og:description",
	);
	html = replaceRequired(
		html,
		/<meta property="og:url" content="[^"]*" \/>/,
		`<meta property="og:url" content="${canonical}" />`,
		"og:url",
	);
	html = replaceRequired(
		html,
		/<meta property="og:image" content="[^"]*" \/>/,
		`<meta property="og:image" content="${image}" />`,
		"og:image",
	);
	html = replaceRequired(
		html,
		/<meta property="og:image:secure_url" content="[^"]*" \/>/,
		`<meta property="og:image:secure_url" content="${image}" />`,
		"og:image:secure_url",
	);
	html = replaceRequired(
		html,
		/<meta property="og:locale" content="[^"]*" \/>/,
		`<meta property="og:locale" content="${locale}" />`,
		"og:locale",
	);
	html = replaceRequired(
		html,
		/<meta name="twitter:title" content="[^"]*" \/>/,
		`<meta name="twitter:title" content="${title}" />`,
		"twitter:title",
	);
	html = replaceRequired(
		html,
		/<meta name="twitter:description" content="[^"]*" \/>/,
		`<meta name="twitter:description" content="${description}" />`,
		"twitter:description",
	);
	html = replaceRequired(
		html,
		/<meta name="twitter:image" content="[^"]*" \/>/,
		`<meta name="twitter:image" content="${image}" />`,
		"twitter:image",
	);

	return html;
}

function setMeta(
	attribute: "name" | "property",
	key: string,
	content: string,
): void {
	const selector = `meta[${attribute}="${key}"]`;
	const existing = document.head.querySelector<HTMLMetaElement>(selector);
	if (existing) {
		existing.content = content;
		return;
	}

	const meta = document.createElement("meta");
	meta.setAttribute(attribute, key);
	meta.content = content;
	document.head.append(meta);
}

export function updateDocumentSeo(route: Route, language: Language): void {
	if (typeof document === "undefined") return;

	const meta = getSeoMetadata(route, language);
	document.title = meta.title;

	setMeta("name", "description", meta.description);
	setMeta("property", "og:title", meta.title);
	setMeta("property", "og:description", meta.description);
	setMeta("property", "og:url", meta.canonical);
	setMeta("property", "og:image", meta.image);
	setMeta("property", "og:image:secure_url", meta.image);
	setMeta("property", "og:locale", meta.locale);
	setMeta("name", "twitter:title", meta.title);
	setMeta("name", "twitter:description", meta.description);
	setMeta("name", "twitter:image", meta.image);

	let canonical = document.head.querySelector<HTMLLinkElement>(
		'link[rel="canonical"]',
	);
	if (!canonical) {
		canonical = document.createElement("link");
		canonical.rel = "canonical";
		document.head.append(canonical);
	}
	canonical.href = meta.canonical;
}
