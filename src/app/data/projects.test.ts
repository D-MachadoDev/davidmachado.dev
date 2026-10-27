import { describe, expect, it } from "vitest";
import { projects } from "./projects";

const languages = ["en", "es", "pt"] as const;

describe("featured projects", () => {
	it("lists the three inspectable projects", () => {
		expect(projects).toHaveLength(3);
		expect(projects.map((project) => project.id)).toEqual([
			"zentric",
			"leaseflow",
			"retail-analytics",
		]);
	});

	it("keeps ids and evidence labels unique and complete", () => {
		expect(new Set(projects.map((project) => project.id)).size).toBe(
			projects.length,
		);

		for (const project of projects) {
			expect(project.evidence.length).toBeGreaterThanOrEqual(3);

			for (const item of project.evidence) {
				expect(item.value.trim().length).toBeGreaterThan(0);
				for (const language of languages) {
					expect(item.label[language].trim().length).toBeGreaterThan(0);
				}
			}
		}
	});

	it("states where the evidence lives for every project", () => {
		for (const project of projects) {
			if (project.status === "open_source") {
				expect(project.github).toMatch(
					/^https:\/\/github\.com\/D-MachadoDev\/[\w.-]+$/,
				);
			} else {
				expect(project.github).toBeUndefined();
				expect(project.link).toBeUndefined();
			}
		}
	});

	it("provides copy for every supported language", () => {
		for (const project of projects) {
			for (const language of languages) {
				expect(project.summary[language].trim().length).toBeGreaterThan(0);
				expect(project.description[language].trim().length).toBeGreaterThan(0);
				expect(project.architectureHighlights[language].length).toBeGreaterThan(
					0,
				);
			}
		}
	});

	it("does not carry retired or unverifiable claims", () => {
		const payload = JSON.stringify(projects).toLowerCase();
		const retired = [
			"faro",
			"virtualized",
			"redis",
			"cloud architect",
			"distributed",
		];

		for (const claim of retired) {
			expect(payload).not.toContain(claim);
		}
	});

	it("backs the Zentric evidence with the documented test count", () => {
		const zentric = projects.find((project) => project.id === "zentric");

		expect(zentric?.evidence.some((item) => item.value === "592")).toBe(true);
		expect(zentric?.tags).toContain(".NET");
		expect(zentric?.tags).toContain("C#");
		expect(zentric?.architectureBadge).toContain("Hexagonal");
	});
});
