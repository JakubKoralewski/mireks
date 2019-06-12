import NuxtConfiguration from "@nuxt/config";
// tslint:disable-next-line: no-var-requires
const pkg = require("./package");

const config: NuxtConfiguration = {
	mode: "universal",

	/*
	** Headers of the page
	*/
	head: {
		title: pkg.name,
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				hid: "description",
				name: "description",
				content: pkg.description
			}
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
			{
				rel: "stylesheet",
				href:
					"https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,900&display=swap"
			}
		]
	},

	/*
	** Customize the progress-bar color
	*/
	loading: { color: "#fff" },

	/*
	** Global CSS
	*/
	css: ["@fortawesome/fontawesome-svg-core/styles.css"],

	dev: process.env.NODE_ENV !== "production",

	/*
	** Plugins to load before mounting the App
	*/
	plugins: ["@/plugins/fontawesome.ts"],

	/*
	** Nuxt.js modules
	*/
	modules: ["@nuxtjs/sitemap", "@nuxtjs/style-resources"],

	/*
	** https://github.com/nuxt-community/style-resources-module/ 
	*/
	styleResources: {
		scss: ["@/assets/scss/*.scss"]
	},

	/*
	** Build configuration
	*/
	build: {
		/*
		** You can extend webpack config here
		*/
		postcss: {
			plugins: {},
			preset: {
				autoprefixer: {}
			}
		}
	}
};
export default config;
