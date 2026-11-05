import { describe, expect, it } from "vitest";
import {
	applySeoToHtml,
	getSeoMetadata,
	OG_IMAGE_URL,
	routePath,
	SITE_URL,
	staticRoutes,
} from "./seo";

const template = `<!doctype html>
<html>
  <head>
    <title>Old title</title>
    <meta name="description" content="Old description" />
    <link rel="canonical" href="https://old.example/" />
    <meta property="og:title" content="Old title" />
    <meta property="og:description" content="Old description" />
    <meta property="og:url" content="https://old.example/" />
    <meta property="og:image" content="https://old.example/image.png" />
    <meta property="og:image:secure_url" content="https://old.example/image.png" />
    <meta property="og:locale" content="en_US" />
    <meta name="twitter:title" content="Old title" />
    <meta name="twitter:description" content="Old description" />
    <meta name="twitter:image" content="https://old.example/image.png" />
  </head>
</html>`;

describe("routePath", () => {
	it("maps app routes to canonical paths", () => {
		expect(routePath({ name: "home" })).toBe("/");
		expect(routePath({ name: "projects" })).toBe("/projects");
		expect(routePath({ name: "project", id: "zentric" })).toBe(
			"/projects/zentric",
		);
		expect(routePath({ name: "gallery" })).toBe("/gallery");
		expect(routePath({ name: "about" })).toBe("/about");
	});
});

describe("static SEO routes", () => {
	it("covers every indexable route once", () => {
		const paths = staticRoutes.map((entry) => entry.path);

		expect(new Set(paths).size).toBe(paths.length);
		expect(paths).toEqual([
			"/",
			"/projects",
			"/projects/zentric",
			"/projects/faroo",
			"/projects/retail-analytics",
			"/gallery",
			"/about",
		]);
	});
});

describe("getSeoMetadata", () => {
	it("uses localized metadata and canonical URLs", () => {
		const home = getSeoMetadata({ name: "home" }, "es");
		const projects = getSeoMetadata({ name: "projects" }, "en");
		const project = getSeoMetadata({ name: "project", id: "zentric" }, "en");

		expect(home.canonical).toBe(`${SITE_URL}/`);
		expect(home.locale).toBe("es_CO");
		expect(projects.canonical).toBe(`${SITE_URL}/projects`);
		expect(project.title).toBe("Zentric — David Machado");
		expect(project.canonical).toBe(`${SITE_URL}/projects/zentric`);
		expect(project.image).toBe(OG_IMAGE_URL);
	});

	it("falls back to 404 metadata for an unknown project", () => {
		expect(getSeoMetadata({ name: "project", id: "missing" }, "en").title).toBe(
			"404 — David Machado",
		);
	});
});

describe("applySeoToHtml", () => {
	it("replaces every route-level SEO tag", () => {
		const meta = getSeoMetadata({ name: "project", id: "zentric" }, "en");
		const html = applySeoToHtml(template, meta);

		expect(html).toContain(`<title>${meta.title}</title>`);
		expect(html).toContain(`href="${meta.canonical}"`);
		expect(html).toContain(`content="${meta.description}"`);
		expect(html).toContain(`content="${meta.image}"`);
		expect(html).not.toContain("https://old.example/");
	});

	it("fails loudly when the HTML template loses a required tag", () => {
		expect(() => applySeoToHtml("<title>Only title</title>", getSeoMetadata({ name: "home" }, "en"))).toThrow(
			"SEO template is missing description",
		);
	});
});
