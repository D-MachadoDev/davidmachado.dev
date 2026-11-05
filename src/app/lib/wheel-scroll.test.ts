import { describe, expect, it } from "vitest";
import { nextHorizontalScrollLeft, normalizeWheelDelta } from "./wheel-scroll";

describe("normalizeWheelDelta", () => {
	it("keeps pixel deltas unchanged", () => {
		expect(normalizeWheelDelta(120, 0, 900)).toBe(120);
	});

	it("converts line deltas to pixels", () => {
		expect(normalizeWheelDelta(3, 1, 900)).toBe(48);
	});

	it("converts page deltas using the viewport width", () => {
		expect(normalizeWheelDelta(2, 2, 900)).toBe(1800);
	});

	it("ignores non-finite input", () => {
		expect(normalizeWheelDelta(Number.NaN, 0, 900)).toBe(0);
		expect(normalizeWheelDelta(Number.POSITIVE_INFINITY, 0, 900)).toBe(0);
	});
});

describe("nextHorizontalScrollLeft", () => {
	it("moves within the scroll range", () => {
		expect(nextHorizontalScrollLeft(100, 250, 600)).toBe(350);
	});

	it("clamps at both edges", () => {
		expect(nextHorizontalScrollLeft(100, -250, 600)).toBe(0);
		expect(nextHorizontalScrollLeft(500, 250, 600)).toBe(600);
	});

	it("never returns a negative position", () => {
		expect(nextHorizontalScrollLeft(0, -100, 0)).toBe(0);
	});
});
