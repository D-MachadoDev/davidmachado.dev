import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { createServer } from "vite";

const root = process.cwd();
const dist = join(root, "dist");
const server = await createServer({
	root,
	configFile: join(root, "vite.config.ts"),
	server: { middlewareMode: true },
	appType: "custom",
	optimizeDeps: { noDiscovery: true },
	logLevel: "error",
});

try {
	const { applySeoToHtml, getSeoMetadata, staticRoutes } = await server.ssrLoadModule(
		"/src/app/seo.ts",
	);
	const template = await readFile(join(dist, "index.html"), "utf8");
	const generated = [];

	for (const { path, route } of staticRoutes) {
		const meta = getSeoMetadata(route, "en");
		const html = applySeoToHtml(template, meta);
		const output =
			path === "/"
				? join(dist, "index.html")
				: join(dist, `${path.replace(/^\//, "")}.html`);

		await mkdir(dirname(output), { recursive: true });
		await writeFile(output, html, "utf8");
		generated.push(path);
	}

	console.log(`Generated ${generated.length} static SEO documents: ${generated.join(", ")}`);
} finally {
	await server.close();
}
