import { Component, Vue, Watch } from "nuxt-property-decorator";
import Service from "./Service/Service";
import services from "./services";
import sleep from "@/components/sleep";

const SEARCH_PLACEHOLDER = "np.: VAT, CIT, PIT";
@Component({
	components: {
		Service
	}
})
export default class ServicesSearch extends Vue {
	searchText = "";
	services = services;
	searchPlaceholder = SEARCH_PLACEHOLDER;
	wasSomethingFound = false;
	displayNothingFoundDialog = false;
	nothingFoundDialogElement!: HTMLElement;
	VIEW_TYPES = {
		GRID: 0,
		LIST: 1
	};
	viewType = this.VIEW_TYPES.GRID;

	@Watch("searchText")
	onSearchTextChange() {
		this.wasSomethingFound = false;
	}
	/** Event  */
	foundVisibleService(id: number) {
		// console.log("found visible service:", id);
		this.wasSomethingFound = true;
		this.displayNothingFoundDialog = false;
	}
	/** Event */
	lastServiceVisible(visible: boolean) {
		if (!this.wasSomethingFound) {
			console.log("Nothing found");
			this.displayNothingFoundDialog = true;
		}
	}

	mounted() {
		this.nothingFoundDialogElement = this.$refs
			.nothingFoundDialog as HTMLElement;
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
