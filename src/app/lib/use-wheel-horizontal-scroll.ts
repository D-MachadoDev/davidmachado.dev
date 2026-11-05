import { useEffect, useRef } from "react";
import { nextHorizontalScrollLeft, normalizeWheelDelta } from "./wheel-scroll";

export function useWheelHorizontalScroll<T extends HTMLElement>() {
	const ref = useRef<T>(null);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const onWheel = (event: WheelEvent) => {
			if (event.ctrlKey || event.defaultPrevented) return;
			if (!window.matchMedia("(min-width: 640px)").matches) return;
			if (event.deltaY === 0 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
				return;
			}

			const max = element.scrollWidth - element.clientWidth;
			if (max <= 0) return;

			const delta = normalizeWheelDelta(
				event.deltaY,
				event.deltaMode,
				element.clientWidth,
			);
			const next = nextHorizontalScrollLeft(element.scrollLeft, delta, max);

			if (next === element.scrollLeft) return;

			event.preventDefault();
			element.scrollLeft = next;
		};

		element.addEventListener("wheel", onWheel, { passive: false });
		return () => element.removeEventListener("wheel", onWheel);
	}, []);

	return ref;
}
