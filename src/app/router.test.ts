import { describe, expect, it } from "vitest";
import { parseRoute, routeKey } from "./router";

describe("parseRoute", () => {
  it("maps the root to the pond", () => {
    expect(parseRoute("/")).toEqual({ name: "home" });
  });

  it("maps the top-level pages", () => {
    expect(parseRoute("/projects")).toEqual({ name: "projects" });
    expect(parseRoute("/gallery")).toEqual({ name: "gallery" });
    expect(parseRoute("/about")).toEqual({ name: "about" });
  });

  it("maps a project case study", () => {
    expect(parseRoute("/projects/zentric")).toEqual({ name: "project", id: "zentric" });
  });

  it("decodes a project id", () => {
    expect(parseRoute("/projects/retail%20analytics")).toEqual({
      name: "project",
      id: "retail analytics",
    });
  });

  it("ignores a trailing slash", () => {
    expect(parseRoute("/projects/")).toEqual({ name: "projects" });
    expect(parseRoute("/projects/zentric/")).toEqual({ name: "project", id: "zentric" });
  });

  it("falls back to not found", () => {
    expect(parseRoute("/nope")).toEqual({ name: "notFound" });
    expect(parseRoute("/projects/a/b")).toEqual({ name: "notFound" });
  });
});

describe("routeKey", () => {
  it("distinguishes project pages", () => {
    expect(routeKey({ name: "project", id: "zentric" })).toBe("project:zentric");
    expect(routeKey({ name: "projects" })).toBe("projects");
  });
});
