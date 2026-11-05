import { describe, expect, it } from "vitest";
import { buildMailtoUrl, CONTACT_EMAIL } from "./mailto";

function parseMailto(url: string) {
	const parsed = new URL(url);
	return {
		protocol: parsed.protocol,
		to: parsed.pathname,
		subject: parsed.searchParams.get("subject"),
		body: parsed.searchParams.get("body"),
		raw: url,
	};
}

describe("buildMailtoUrl", () => {
	it("targets the contact address through the mailto protocol", () => {
		const draft = parseMailto(
			buildMailtoUrl({ name: "Ana", email: "ana@example.com", message: "Hi" }),
		);

		expect(draft.protocol).toBe("mailto:");
		expect(draft.to).toBe(CONTACT_EMAIL);
	});

	it("includes the sender name in the subject", () => {
		const draft = parseMailto(
			buildMailtoUrl({
				name: "  Ana Torres  ",
				email: "ana@example.com",
				message: "Hello",
			}),
		);

		expect(draft.subject).toBe("Portfolio contact — Ana Torres");
	});

	it("keeps name, email, and message in the body with line breaks", () => {
		const message = "Line one\nLine two";
		const draft = parseMailto(
			buildMailtoUrl({
				name: "Ana",
				email: "ana@example.com",
				message: `  ${message}  `,
			}),
		);

		expect(draft.body).toBe(
			"Name: Ana\nEmail: ana@example.com\n\nLine one\nLine two",
		);
	});

	it("encodes reserved characters so the URL stays valid", () => {
		const draft = parseMailto(
			buildMailtoUrl({
				name: "Ana & Luis",
				email: "ana+portfolio@example.com",
				message: 'Budget = 100% + "scope"',
			}),
		);

		expect(draft.raw).not.toContain(" ");
		expect(draft.raw).toContain("%26");
		expect(draft.raw).toContain("%3D");
		expect(draft.raw).toContain("%2B");
		expect(draft.subject).toBe("Portfolio contact — Ana & Luis");
		expect(draft.body).toContain('Budget = 100% + "scope"');
		expect(draft.body).toContain("Email: ana+portfolio@example.com");
	});
});
