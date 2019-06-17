import Vue from "vue";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
	faPhone,
	faSearch,
	faFile,
	faList,
	faThLarge,
	faUser,
	faAt,
	faBusinessTime,
	faMapMarkedAlt
} from "@fortawesome/free-solid-svg-icons";

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false;

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(
	faPhone,
	faSearch,
	faFile,
	faList,
	faThLarge,
	faUser,
	faAt,
	faBusinessTime,
	faMapMarkedAlt
);

// Register the component globally
Vue.component("font-awesome-icon", FontAwesomeIcon);
