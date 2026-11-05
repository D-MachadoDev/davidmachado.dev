import { describe, expect, it } from "vitest";
import { HERO_SHARKS } from "./world";

describe("hero shark roster", () => {
	it("keeps three classic sharks and one hammerhead", () => {
		expect(HERO_SHARKS).toHaveLength(4);
		expect(HERO_SHARKS.filter((shark) => shark.kind === "classic")).toHaveLength(3);
		expect(HERO_SHARKS.filter((shark) => shark.kind === "hammerhead")).toHaveLength(1);
	});

	it("keeps every shark at a usable relative size", () => {
		for (const shark of HERO_SHARKS) {
			expect(shark.size).toBeGreaterThan(0);
			expect(shark.size).toBeLessThanOrEqual(1);
		}
	});
});
