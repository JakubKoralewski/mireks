declare module "*.scss" {
	const styles: any;
	export default styles;
}

import Vue from "vue";
declare module "vue/types/vue" {
	interface Vue {
		$sentry: any;
	}
}