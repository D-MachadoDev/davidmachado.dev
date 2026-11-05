import { describe, expect, it } from "vitest";
import {
	getSystemTheme,
	isThemePreference,
	persistTheme,
	readStoredTheme,
	resolveTheme,
	THEME_ORDER,
	THEME_STORAGE_KEY,
} from "./theme";

describe("theme preference", () => {
	it("accepts only supported preferences", () => {
		expect(isThemePreference("system")).toBe(true);
		expect(isThemePreference("light")).toBe(true);
		expect(isThemePreference("dark")).toBe(true);
		expect(isThemePreference("sepia")).toBe(false);
		expect(isThemePreference(null)).toBe(false);
	});

	it("resolves system preference against the current system theme", () => {
		expect(resolveTheme("system", "light")).toBe("light");
		expect(resolveTheme("system", "dark")).toBe("dark");
		expect(resolveTheme("light", "dark")).toBe("light");
		expect(resolveTheme("dark", "light")).toBe("dark");
	});

	it("defaults to system when storage is empty or invalid", () => {
		expect(readStoredTheme({ getItem: () => null })).toBe("system");
		expect(readStoredTheme({ getItem: () => "sepia" })).toBe("system");
	});

	it("reads a stored preference", () => {
		const values = new Map<string, string>([[THEME_STORAGE_KEY, "dark"]]);
		const storage = {
			getItem: (key: string) => values.get(key) ?? null,
		};

		expect(readStoredTheme(storage)).toBe("dark");
	});

	it("persists the selected preference", () => {
		const values = new Map<string, string>();
		const storage = {
			setItem: (key: string, value: string) => values.set(key, value),
		};

		persistTheme("light", storage);

		expect(values.get(THEME_STORAGE_KEY)).toBe("light");
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

		expect(readStoredTheme(storage)).toBe("system");
		expect(() => persistTheme("dark", storage)).not.toThrow();
	});

	it("keeps the three public preferences in order", () => {
		expect(THEME_ORDER).toEqual(["system", "light", "dark"]);
	});

	it("falls back to dark when the browser preference is unavailable", () => {
		expect(getSystemTheme()).toBe("dark");
	});
});
