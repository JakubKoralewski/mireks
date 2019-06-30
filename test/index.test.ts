import test from "ava";
import { Nuxt, Builder } from "nuxt";
import NuxtConfiguration from "@nuxt/config";
import { resolve } from "path";
import vars from "../assets/scss/_variables";
// import variables from "@/components/Contact/Contact";
// We keep a reference to Nuxt so we can close
// the server at the end of the test
let nuxt;

const url = (path?: string) => `http://localhost:4000${path || ""}`;

// Init Nuxt.js and start listening on localhost:4000
test.before("Init Nuxt.js", async t => {
	const rootDir = resolve(__dirname, "..");
	let config: NuxtConfiguration = {};
	config = require(resolve(rootDir, "nuxt.config.ts")).default;
	config.rootDir = rootDir; // project folder
	config.dev = false; // production build
	// config._typescript = { build: true };
	nuxt = new Nuxt(config);
	await new Builder(nuxt).build();
	await nuxt.server.listen(4000, "localhost");
	await nuxt.ready();
});

// Example of testing only generated html
test("Route / exits and render HTML", async t => {
	const context = {};
	const { html }: { html: string } = await nuxt.renderRoute("/", context);
	t.true(html.includes("mireks"));
});

// Example of testing via DOM checking
test("Route / exists and renders HTML with CSS applied", async t => {
	console.log("Rendering window");
	const window: Window = await nuxt.server.renderAndGetWindow(url("/"));
	const main: HTMLElement = window.document.querySelector(
		"main"
	) as HTMLElement;
	t.not(main, null);
	t.true(main.classList.contains("global-padding"));
	t.is(main.style.paddingLeft, vars.globalPaddingHorizontal);
	t.is(main.style.paddingRight, vars.globalPaddingHorizontal);
});

// Close the Nuxt server
test.after("Closing server", t => {
	nuxt.close();
});
