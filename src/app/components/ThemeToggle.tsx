import { t, type Language } from "../i18n";
import { THEME_LABELS, THEME_ORDER, type ThemePreference } from "../theme";

/**
 * The light itself. A real switch: pressing the fixture turns the room dark,
 * pressing it again brings the daylight back, so the lamp is the theme control
 * it already looks like.
 */
export function ThemeLamp({
	lit,
	label,
	onToggle,
	className,
}: {
	lit: boolean;
	label: string;
	onToggle: () => void;
	className?: string;
}) {
	return (
		<button
			type="button"
			onClick={onToggle}
			aria-pressed={lit}
			aria-label={label}
			title={label}
			className={`nav-lamp ${lit ? "is-lit" : ""} ${className ?? ""}`}
		>
			<span aria-hidden="true" className="nav-lamp__wire" />
			<span aria-hidden="true" className="nav-lamp__shade" />
			<span aria-hidden="true" className="nav-lamp__bulb" />
			<span aria-hidden="true" className="nav-lamp__cone" />
		</button>
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
