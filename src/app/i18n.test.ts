import { describe, expect, it } from "vitest";
import {
	detectLanguageFrom,
	languageOrder,
	LANGUAGE_STORAGE_KEY,
	persistLanguage,
	readStoredLanguage,
	t,
	translations,
} from "./i18n";

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

describe("language preference", () => {
	it("maps browser locales to supported languages", () => {
		expect(detectLanguageFrom("es-CO")).toBe("es");
		expect(detectLanguageFrom("pt-BR")).toBe("pt");
		expect(detectLanguageFrom("en-US")).toBe("en");
		expect(detectLanguageFrom(undefined)).toBe("en");
	});

	it("reads only supported stored languages", () => {
		const values = new Map<string, string>([[LANGUAGE_STORAGE_KEY, "pt"]]);
		const storage = {
			getItem: (key: string) => values.get(key) ?? null,
		};

		expect(readStoredLanguage(storage)).toBe("pt");
		expect(
			readStoredLanguage({ getItem: () => "fr" }),
		).toBeNull();
	});

	it("persists the selected language", () => {
		const values = new Map<string, string>();
		const storage = {
			setItem: (key: string, value: string) => values.set(key, value),
		};

		persistLanguage("es", storage);

		expect(values.get(LANGUAGE_STORAGE_KEY)).toBe("es");
	});

	it("survives storage failures", () => {
		const storage = {
			getItem: () => {
				throw new Error("blocked");
			},
			setItem: () => {
				throw new Error("blocked");
			},
		};

		expect(readStoredLanguage(storage)).toBeNull();
		expect(() => persistLanguage("en", storage)).not.toThrow();
	});
});
