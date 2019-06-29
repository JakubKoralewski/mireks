declare module "*.scss" {
	const styles: any;
	export default styles;
}

import Vue from "vue";
declare module "vue/types/vue" {
	interface Vue {
		$sentry: {
			captureException(err: Error): void
		}
	}
}

declare class VueAnalytics {
	static install(Vue: Vue, options: any): void;
	analyticsMiddleware: any;
	onAnalyticsReady: any;
	event: any;
	ecommerce: any;
	set: any;
	page: any;
	query: any;
	screenview: any;
	time: any;
	require: any;
	exception: any;
	social: any;
	disable: any;
	enable: any;
}

declare module "vue/types/vue" {
	interface Vue {
		$ga: VueAnalytics;
	}
}
