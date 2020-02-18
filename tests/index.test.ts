import test, { TestInterface } from "ava";
import { Nuxt, Builder } from "nuxt";
import { Configuration } from "@nuxt/types";
import { resolve } from "path";

interface IBeforeContext {
	nuxt?: Nuxt;
	window?: Window;
}

interface IContext {
	nuxt: Nuxt;
	window: Window;
}

type IBeforeTestInterface = TestInterface<IBeforeContext>;
type ITestInterface = TestInterface<IContext>;

(test as IBeforeTestInterface).serial.before("Init Nuxt.js", async t => {
	const rootDir = resolve(__dirname, "..");
	let config: Configuration = {};
	try {
		config = require(resolve(rootDir, "nuxt.config.ts")).default;
	} catch (e) {
		console.log("Config error: ", e);
	}
	config.rootDir = rootDir; // project folder
	config.dev = false; // production build
	config.mode = "universal"; // Isomorphic application
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
(test as ITestInterface).serial.before("Index Route / loads", async t => {
	const nuxt = t.context.nuxt as Nuxt;
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

(test as ITestInterface)("Basic HTML preserved", t => {
	const window = t.context.window;

	const main: HTMLElement = window.document.querySelector(
		"main"
	) as HTMLElement;

	t.assert(null !== main, "main does not exist in DOM");
});

(test as ITestInterface)("HTML tests are not cheating on me", t => {
	const window = t.context.window;

	const main: HTMLElement = window.document.querySelector(
		"main"
	) as HTMLElement;

	t.assert(null == main, "main does not exist in DOM");
});

(test as ITestInterface)("CSS classes applied", t => {
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
(test as ITestInterface).after("Closing server", t => {
	t.context.nuxt.close();
});
