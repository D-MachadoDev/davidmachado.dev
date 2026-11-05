export type Theme = "light" | "dark";
export type ThemePreference = "system" | Theme;

export const THEME_STORAGE_KEY = "davidmachado.theme";

export const THEME_ORDER: ThemePreference[] = ["system", "light", "dark"];

export const THEME_LABELS: Record<ThemePreference, string> = {
	system: "auto",
	light: "light",
	dark: "dark",
};

export const THEME_COLORS: Record<Theme, string> = {
	dark: "#050505",
	light: "#F4F2EC",
};

export function isThemePreference(value: string | null): value is ThemePreference {
	return value === "system" || value === "light" || value === "dark";
}

function getBrowserStorage(): Storage | null {
	if (typeof window === "undefined") return null;
	try {
		return window.localStorage;
	} catch {
		// Storage can be unavailable in private browsing or locked-down embeds.
		return null;
	}
}

export function readStoredTheme(
	storage: Pick<Storage, "getItem"> | null = getBrowserStorage(),
): ThemePreference {
	try {
		const value = storage?.getItem(THEME_STORAGE_KEY) ?? null;
		return isThemePreference(value) ? value : "system";
	} catch {
		return "system";
	}
}

export function persistTheme(
	preference: ThemePreference,
	storage: Pick<Storage, "setItem"> | null = getBrowserStorage(),
): void {
	try {
		storage?.setItem(THEME_STORAGE_KEY, preference);
	} catch {
		// A blocked storage write must not break theme switching.
	}
}

export function resolveTheme(preference: ThemePreference, systemTheme: Theme): Theme {
	return preference === "system" ? systemTheme : preference;
}

export function getSystemTheme(): Theme {
	if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
		return "dark";
	}
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme, root: HTMLElement = document.documentElement): void {
	root.dataset.theme = theme;
	root.style.colorScheme = theme;

	if (typeof document !== "undefined") {
		const meta = document.querySelector('meta[name="theme-color"]');
		meta?.setAttribute("content", THEME_COLORS[theme]);
	}
}
