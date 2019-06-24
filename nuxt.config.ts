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
				servicePhone: "+48 62 763 74 10",
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
		}
	],
	"@type": "AccountingService",
	name: "Mireks",
	contactPoint: {
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
	},
	address: {
		"@id": "address"
	},
	photo: "/mireks_bg.jpg",
	image: "/mireks_bg.jpg",
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
				type: "image/x-icon",
				href: "/favicon.ico"
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
