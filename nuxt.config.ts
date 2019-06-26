import NuxtConfiguration from "@nuxt/config";

import structuredJSONData from "./seo/structuredJSONData";
import metaTags from "./seo/metaTags";
import { TITLE } from "./seo/variables";

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
	loading: { color: "#fff" },

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
	modules: ["@nuxtjs/style-resources", "@nuxtjs/sitemap"],

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
			}

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
