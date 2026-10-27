import { describe, expect, it } from "vitest";
import { languageOrder, t, translations } from "./i18n";

const englishKeys = Object.keys(translations.en).sort();

describe("translations", () => {
	it("keeps the same key set in every language", () => {
		for (const language of languageOrder) {
			expect(Object.keys(translations[language]).sort()).toEqual(englishKeys);
		}
	});

	it("has no empty strings", () => {
		for (const language of languageOrder) {
			for (const [key, value] of Object.entries(translations[language])) {
				expect(value.trim(), `${language}:${key}`).not.toHaveLength(0);
			}
		}
	});

	it("resolves keys per language and falls back to the key itself", () => {
		expect(t("es", "projects.badge")).toBe(translations.es["projects.badge"]);
		expect(t("pt", "meta.title")).toBe(translations.pt["meta.title"]);
	});

	it("keeps SEO metadata and the four hero subtitles", () => {
		for (const language of languageOrder) {
			expect(translations[language]["meta.title"]).toContain("David Machado");
			expect(translations[language]["meta.description"].length).toBeGreaterThan(
				80,
			);
			for (const key of [
				"hero.subtitle1",
				"hero.subtitle2",
				"hero.subtitle3",
				"hero.subtitle4",
			] as const) {
				expect(translations[language][key].trim().length).toBeGreaterThan(0);
			}
		}
	});

	it("does not reintroduce retired positioning or projects", () => {
		const payload = JSON.stringify(translations).toLowerCase();
		const retired = [
			"cloud architect",
			"distributed systems",
			"faro",
			"virtualized data explorer",
			"redis",
		];

		for (const claim of retired) {
			expect(payload).not.toContain(claim);
		}
	});
});
