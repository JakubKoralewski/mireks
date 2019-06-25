import { Vue, Component } from "nuxt-property-decorator";
@Component
export default class IsTouchScreen extends Vue {
	isTouchScreen = false;

	/** If is touch screen this property's value will be: `href`.
	 *
	 *  If not touch screen this property's value will be an empty string.
	 */
	isTouchScreenHref: "href" | "" = "href";
	mounted() {
		this.isTouchScreen = window.matchMedia("(pointer: coarse)").matches;
		if (!this.isTouchScreen) {
			this.isTouchScreenHref = "";
		}
	}
}
