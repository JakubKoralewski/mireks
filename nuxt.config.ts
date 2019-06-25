import NuxtConfiguration from "@nuxt/config";
// tslint:disable-next-line: no-var-requires
const pkg = require("./package");
import services from "./components/ServicesSearch/services";

const offerItemListElement: any[] = [];

for (const service of services) {
	offerItemListElement.push({
		"@type": "Offer",
		itemOffered: {
			"@type": "Service",
			name: service.title,
			alternateName: service.shortTitle,
			serviceType: "Usługa rachunkowa",
			provider: {
				"@id": "mireks_org"
			},
			availableChannel: {
				"@type": "ServiceChannel",
				availableLanguage: {
					"@type": "Language",
					name: "Polish",
					alternateName: "pl"
				},
				serviceLocation: {
					"@id": "mireks_place"
				},
				servicePhone: {
					"@id": "mireks_contact_point"
				},
				servicePostalAddress: {
					"@id": "address"
				}
			}
		}
	});
}

const structuredJSONData = {
	"@context": "http://schema.org",
	"@graph": [
		{
			"@context": "http://schema.org",
			"@id": "mireks_org",
			"@type": "Organization",
			legalName: "Firma Handlowo-Usługowa Mireks Mirosław Koralewski",
			name: "Mireks",
			alternateName: "FHU MIREKS"
		},
		{
			"@id": "mireks_place",
			"@type": "Place",
			address: {
				"@id": "address"
			}
		},
		{
			"@id": "address",
			"@type": "PostalAddress",
			streetAddress: "Nakwasińska 1",
			addressLocality: "Koźminek",
			addressRegion: "Wielkopolska",
			postalCode: "62-840",
			addressCountry: "Poland"
		},
		{
			"@id": "mireks_contact_point",
			"@type": "ContactPoint",
			availableLanguage: {
				"@type": "Language",
				name: "Polish",
				alternateName: "pl"
			},
			contactType: "Customer service",
			email: "mireks40@poczta.onet.pl",
			telephone: "+48 62 763 74 10",
			areaServed: "Poland"
		}
	],
	"@type": "AccountingService",
	"@id": "mireks_accounting_service",
	name: "Mireks",
	contactPoint: {
		"@id": "mireks_contact_point"
	},
	address: {
		"@id": "address"
	},
	photo: "/mireks_bg.jpg",
	image: "/mireks_og.jpg",
	currenciesAccepted: "PLN",
	email: "mireks40@poczta.onet.pl",
	telePhone: "+48 62 763 74 10",
	paymentAccepted: ["cash", "check", "credit card"],
	openingHours: "Mo,Tu,We,Th,Fr 08:00-16:00",
	openingHoursSpecification: [
		{
			"@type": "OpeningHoursSpecification",
			dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
			opens: "08:00",
			closes: "16:00"
		}
	],
	geo: {
		"@type": "GeoCoordinates",
		latitude: "51.7956549,",
		longitude: "18.336128"
	},
	priceRange: "$",
	hasOfferCatalog: {
		"@type": "OfferCatalog",
		name: "Usługi",
		itemListElement: offerItemListElement
	}
};

const TITLE = "FHU Mireks - Biuro Rachunkowe";
const KEYWORDS =
	"biuro rachunkowe, księgowy, księgowa, koźminek, mirosław koralewski, mireks, fhu, mirex, kalisz, polska, biuro";
const DESCRIPTION =
	"Strona internetowa biura rachunkowego FHU Mireks znajdującego się w Koźminku (k. Kalisza) na ulicy Nakwasińskiej 1.";
const URL = "https://fhumireks.pl";

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
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				hid: "description",
				name: "description",
				content: DESCRIPTION
			},
			{
				hid: "keywords",
				name: "keywords",
				content: KEYWORDS
			},
			{
				name: "keyword",
				content: KEYWORDS
			},
			{
				name: "msapplication-TileColor",
				content: "#0a1020"
			},
			{
				name: "msapplication-TileImage",
				content: "/icon192.png"
			},
			{
				name: "msapplication-config",
				content: "/browserconfig.xml"
			},
			{
				name: "theme-color",
				content: "#0a1020"
			},
			{
				name: "og:image",
				content: "/mireks_og.jpg"
			},
			{
				name: "og:url",
				content: URL
			},
			{
				name: "og:title",
				content: TITLE
			},
			{
				name: "og:description",
				content: DESCRIPTION
			},
			{
				name: "fb:app_id",
				content: "331204421139475"
			},
			{
				name: "twitter:description",
				content: DESCRIPTION
			},
			{
				name: "twitter:title",
				content: TITLE
			},
			{
				name: "twitter:image",
				content: "/mireks_og.jpg"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		script: [
			{
				type: "application/ld+json",
				innerHTML: JSON.stringify(structuredJSONData)
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
					"https://fonts.googleapis.com/css?family=Montserrat:100,300,400,500,600,800,900&display=swap"
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
	modules: ["@nuxtjs/sitemap", "@nuxtjs/style-resources" /* , "nuxt-svg "*/],

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
