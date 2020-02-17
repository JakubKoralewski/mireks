// @ts-ignore
import test from "ava";
// @ts-ignore
import { Nuxt, Builder } from "nuxt";
// @ts-ignore
import { Configuration } from "@nuxt/types";
import { resolve } from "path";

// Init Nuxt.js and start listening on localhost:4000
test.serial.before("Init Nuxt.js", async t => {
	const rootDir = resolve(__dirname, "..");
	let config: Configuration = {};
	try {
		config = require(resolve(rootDir, "nuxt.config.ts")).default;
	} catch (e) {
		console.log("Config error: ", e);
	}
	// console.log("Nuxt config:\n", config);
	config.rootDir = rootDir; // project folder
	config.dev = false; // production build
	config.mode = "universal"; // Isomorphic application
	// config._typescript = { build: true };
	const nuxt = new Nuxt(config);
	t.context.nuxt = nuxt;
	console.log("Awaiting nuxt ready");
	await nuxt.ready();
	console.log("Nuxt now ready");
	await new Builder(nuxt).build();
	console.log("nuxt now built");
	await nuxt.listen(6969, "localhost");
	console.log("nuxt now listening", nuxt);
});

// Example of testing via DOM checking
test.serial.before("Index Route / loads", async t => {
	const nuxt = t.context.nuxt;
	console.log("Rendering window");
	console.log("Awaiting window");
	const window: Window = await nuxt.renderAndGetWindow(
		"http://localhost:6969",
		{},
		{ loadingTimeout: 120000 }
	);
	console.log("Window rendered and got");
	t.context.window = window;
});

test("Basic HTML preserved", t => {
	const window = t.context.window;

	const main: HTMLElement = window.document.querySelector(
		"main"
	) as HTMLElement;

	t.not(main, null, "main does not exist in DOM");
});

test("CSS classes applied", t => {
	const window = t.context.window;

	const main: HTMLElement = window.document.querySelector(
		"main"
	) as HTMLElement;

	t.true(
		main.classList.contains("global-padding"),
		"basic css classes not applied"
	);
});

// Close the Nuxt server
test.after("Closing server", t => {
	t.context.nuxt.close();
});
