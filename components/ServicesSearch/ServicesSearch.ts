import { Component, Vue } from "nuxt-property-decorator";
import {} from "gsap";
import services from "./services";
import sleep from "@/components/sleep";

const SEARCH_PLACEHOLDER = "np.: VAT, CIT, PIT";
@Component
export default class ServicesSearch extends Vue {
	searchText = "";
	searchInput!: HTMLInputElement;
	searchPlaceholder = SEARCH_PLACEHOLDER;
	services = services;
	mounted() {
		this.searchInput = this.$refs.searchInput as HTMLInputElement;
	}
	search() {
		console.log("Searching: ", this.searchText);
	}
	handleSearchInput() {
		console.log("Input");
	}
	async searchInputFocus() {
		for (let i = this.searchPlaceholder.length; i >= 0; i--) {
			this.searchPlaceholder = this.searchPlaceholder.slice(0, i);
			await sleep(Math.log(i) * 10);
		}
	}
	searchInputBlur() {
		this.searchPlaceholder = SEARCH_PLACEHOLDER;
	}
}
