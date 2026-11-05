import { useEffect, useRef } from "react";
import { OceanEngine } from "./engine";
import type { AsciiTheme } from "./renderer";
import type { SharkSpec } from "./world";

/** Glyphs come from the canvas's font-family, so give it (or a parent) a monospace font. */
export function AsciiOcean({
	className,
	sharks,
	theme = "dark",
}: {
	className?: string;
	sharks?: SharkSpec[];
	theme?: AsciiTheme;
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const engine = new OceanEngine(canvas, sharks, theme);
		return () => engine.destroy();
		// The roster and theme are fixed for the life of one canvas; a theme
		// change deliberately starts a fresh engine with the matching palette.
	}, [sharks, theme]);

	return <canvas ref={canvasRef} aria-hidden="true" className={`ascii-ocean ${className ?? ""}`} />;
}
