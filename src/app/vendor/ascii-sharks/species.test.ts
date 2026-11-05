import { describe, expect, it } from "vitest";
import { pickSpecies, SPECIES } from "./species";

describe("ascii fish species", () => {
	it("gives every species a visible one-cell glyph", () => {
		for (const species of SPECIES) {
			expect(species.glyph.trim(), species.name).not.toHaveLength(0);
			expect([...species.glyph], species.name).toHaveLength(1);
		}
	});

	it("includes the needlefish as a fast, small school with direction glyphs", () => {
		const needlefish = SPECIES.find((species) => species.name === "needlefish");

		expect(needlefish).toBeDefined();
		expect(needlefish?.glyph).toBe(">");
		expect(needlefish?.leftGlyph).toBe("<");
		expect(needlefish?.schoolSize[1]).toBeLessThanOrEqual(7);
		expect(needlefish?.cruise).toBeGreaterThan(50);
	});

	it("keeps every school size and weight usable", () => {
		for (const species of SPECIES) {
			expect(species.weight, species.name).toBeGreaterThan(0);
			expect(species.schoolSize[0], species.name).toBeGreaterThan(0);
			expect(species.schoolSize[1], species.name).toBeGreaterThanOrEqual(
				species.schoolSize[0],
			);
		}
	});

	it("picks a valid species index", () => {
		expect(pickSpecies()).toBeGreaterThanOrEqual(0);
		expect(pickSpecies()).toBeLessThan(SPECIES.length);
	});
});
