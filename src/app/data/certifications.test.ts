import { describe, expect, it } from "vitest";
import { certifications } from "./certifications";

describe("certifications", () => {
  it("defines unique, non-empty entries", () => {
    const ids = new Set(certifications.map((cert) => cert.id));
    expect(ids.size).toBe(certifications.length);
    for (const cert of certifications) {
      expect(cert.title.trim()).not.toBe("");
      expect(cert.issuer.trim()).not.toBe("");
      expect(cert.short.trim()).not.toBe("");
    }
  });

  it("only marks a credential issued when it has a verification link", () => {
    for (const cert of certifications) {
      if (cert.status === "issued") {
        expect(cert.credentialUrl).toMatch(/^https:\/\//);
      }
    }
  });
});
