import { t, type Language } from "../i18n";
import { THEME_LABELS, THEME_ORDER, type ThemePreference } from "../theme";

/**
 * The light itself. A decorative fixture that hangs over the theme control and
 * switches on with the dark palette, so the whole site reads as one room.
 */
export function ThemeLamp({
	lit,
	className,
}: {
	lit: boolean;
	className?: string;
}) {
	return (
		<div
			aria-hidden="true"
			className={`nav-lamp ${lit ? "is-lit" : ""} ${className ?? ""}`}
		>
			<span className="nav-lamp__wire" />
			<span className="nav-lamp__shade" />
			<span className="nav-lamp__bulb" />
			<span className="nav-lamp__cone" />
		</div>
	);
}

export function ThemeToggle({
	language,
	preference,
	onChange,
	className,
}: {
	language: Language;
	preference: ThemePreference;
	onChange: (preference: ThemePreference) => void;
	className?: string;
}) {
	return (
		<fieldset
			className={`m-0 min-w-0 border-0 p-0 ${className ?? ""}`}
			aria-label={t(language, "nav.theme")}
		>
			{THEME_ORDER.map((value, index) => (
				<span key={value} className="inline-flex items-center">
					{index > 0 && <span className="mx-1.5 text-muted/40">/</span>}
					<button
						type="button"
						onClick={() => onChange(value)}
						aria-pressed={value === preference}
						className={`font-mono text-[11px] lowercase transition-colors ${
							value === preference
								? "text-foreground"
								: "text-muted/80 hover:text-foreground"
						}`}
					>
						{THEME_LABELS[value]}
					</button>
				</span>
			))}
		</fieldset>
	);
}
