import NuxtConfiguration from "@nuxt/config";

import structuredJSONData from "./seo/structuredJSONData";
import metaTags from "./seo/metaTags";
import { TITLE, DESCRIPTION } from "./seo/variables";

// const SentryWebpackPlugin = require("@sentry/webpack-plugin");

const config: NuxtConfiguration = {
	mode: "universal",

	/*
	** Headers of the page
	*/
	head: {
		title: TITLE,
		htmlAttrs: {
			lang: "pl"
		},
		meta: metaTags,
		script: [
			{
				type: "application/ld+json",
				innerHTML: JSON.stringify(structuredJSONData)
			},
			{
				src:
					"https://www.googletagmanager.com/gtag/js?id=UA-142751142-1",
				async: true,
				type: "application/javascript"
			},
			{
				innerHTML: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-142751142-1');`,
				type: "application/javascript"
			},
			{
				innerHTML: `console.log('%c Created and designed by Jakub Koralewski!', 'font-weight: bold; font-size: 32px; color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');`,
				type: "application/javascript"
			}
		],
		__dangerouslyDisableSanitizers: ["script"],
		link: [
			{
				rel: "icon",
				type: "image/png",
				href: "/icon16.png",
				sizes: "16x16"
			},
			{
				rel: "icon",
				type: "image/png",
				href: "/icon192.png",
				sizes: "192x192"
			},
			{
				rel: "icon",
				type: "image/png",
				href: "/icon32.png",
				sizes: "32x32"
			},
			{
				rel: "stylesheet",
				href:
					"https://fonts.googleapis.com/css?family=Montserrat:100,300,400,500,600,800&display=swap"
			}
		]
	},

	/*
	** Customize the progress-bar color
	*/
	loading: { color: "#0a1020" },

	/*
	** Global CSS
	*/
	css: ["@fortawesome/fontawesome-svg-core/styles.css"],

	dev: process.env.NODE_ENV !== "production",

	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		"@/plugins/fontawesome.ts",
		{ src: "@/plugins/scrollmagic-plugin.ts", ssr: false }
		// { src: "@/plugins/vue-scrollmagic.ts", ssr: false }
	],

	/*
	** Nuxt.js modules
	*/
	modules: [
		"@nuxtjs/style-resources",
		"@nuxtjs/pwa",
		"@nuxtjs/sentry",
		"@nuxtjs/sitemap"
	],

	/*
	** Sentry
	*/

	sentry: {
		publishRelease: true
	},

	loadingIndicator: {
		color: "#0a1020",
		color2: "#0ec7ff"
	},

	/*
	** PWA
	*/
	manifest: {
		lang: "pl",
		name: "Jesteśmy z Tobą wszędzie!",
		short_name: "FHU Mireks",
		description: DESCRIPTION
	},

	/*
	** Sitemap
	*/
	sitemap: {
		hostname: "https://www.fhumireks.pl",
		gzip: true,
		routes: [
			{
				url: "/",
				changefreq: "monthly",
				priority: 1
			}
		]
	},

	/* Global SCSS variables etc.
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
		extend(config, { isClient, isDev }) {
			if (isClient && isDev) {
				config.devtool = "#cheap-module-eval-source-map";
			} else if (isClient && !isDev) {
				config.devtool = "#source-map"; // Sentry
			}

			// config.plugins += new SentryWebpackPlugin({
			// 	include: ".",
			// 	ignoreFile: ".sentrycliignore",
			// 	ignore: ["node_modules", "webpack.config.js", "nuxt.config.ts"]
			// });

			// config.mode = "production";

			/* Vue inline svg loader */
			const vueRule = (config as any).module.rules.find(rule =>
				rule.test.test(".vue")
			);
			vueRule.use = [
				{
					loader: vueRule.loader,
					options: vueRule.options
				},
				{
					loader: "vue-svg-inline-loader",
					options: {
						svgo: false
					}
				}
			];
			delete vueRule.loader;
			delete vueRule.options;
		},
		postcss: {
			plugins: {},
			preset: {
				autoprefixer: {}
			}
		},
		terser: {
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true
				}
			}
		} // ,
		// analyze: true
	}
};
export default config;
