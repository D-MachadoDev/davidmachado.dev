import { describe, expect, it } from "vitest";
import { HERO_SHARKS } from "./world";

describe("hero shark roster", () => {
	it("gives every shark in the hero its own silhouette", () => {
		const kinds = HERO_SHARKS.map((shark) => shark.kind);
		expect(new Set(kinds).size).toBe(kinds.length);
		expect(kinds).toContain("classic");
	});

	it("keeps every shark at a usable relative size", () => {
		for (const shark of HERO_SHARKS) {
			expect(shark.size).toBeGreaterThan(0);
			expect(shark.size).toBeLessThanOrEqual(1);
		}
	});
});
