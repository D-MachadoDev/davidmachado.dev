import { lazy, Suspense, useEffect, useState } from "react";
import type { Theme } from "../theme";

const AsciiOcean = lazy(() =>
  import("../vendor/ascii-sharks/react").then((module) => ({ default: module.AsciiOcean })),
);

/**
 * The pond: the ascii-sharks canvas is loaded after the first paint so the
 * name stays the LCP element. The engine handles reduced motion and pauses
 * itself when the tab or the canvas is off screen.
 */
export function OceanBackground({ theme }: { theme: Theme }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!ready) return null;

  return (
    <div className="fade-in" aria-hidden="true">
      <Suspense fallback={null}>
        <AsciiOcean theme={theme} />
      </Suspense>
    </div>
  );
}
