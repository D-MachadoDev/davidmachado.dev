const LINE_HEIGHT_PX = 16;

export function normalizeWheelDelta(
	deltaY: number,
	deltaMode: number,
	viewportWidth: number,
): number {
	if (!Number.isFinite(deltaY)) return 0;

	if (deltaMode === 1) return deltaY * LINE_HEIGHT_PX;
	if (deltaMode === 2) return deltaY * Math.max(viewportWidth, 1);
	return deltaY;
}

export function nextHorizontalScrollLeft(
	current: number,
	delta: number,
	max: number,
): number {
	const limit = Math.max(max, 0);
	return Math.min(Math.max(current + delta, 0), limit);
}
