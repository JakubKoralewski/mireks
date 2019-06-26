import { Component } from "nuxt-property-decorator";
import Service from "./Service/Service";
import services from "./services";
import sleep from "@/components/sleep";
import IsTouchScreen from "@/components/mixins/IsTouchScreen";

const SEARCH_PLACEHOLDER = "np.: VAT, CIT, PIT";

interface SearchInputEvent extends InputEvent {
	target: HTMLInputElement;
}
/** ServicesSearch
 *
 *  ### How searching works:
 *
 *  1. The `input#search-bar` `InputEvent` is sent through the `searchInput` function.
 *    1. It modifies the `searchText` property (only if it's changed).
 *       1. The prop passed to each `Service` is updated in each element.
 *       2. Each service reruns its computed `Service.isVisible()` getter according to the new value of
 *          `searchText`.
 *       3. The visibility boolean state is stored inside each `Service`, but:
 *       4. The event of visibility being true is sent through the `serviceVisible` event:
 *         5. It is then handled by the `foundVisibleService` method.
 *         6. Which: sets `wasSomethingFound` to `true`.
 *         7. Makes sure the `nothingFoundDialog` is not visible.
 *       5. The event of last `Service` checking its visibility state is sent through the `lastServiceVisible` event:
 *         1. It is then handled by the `lastServiceVisible` method:
 *         2. Which (based on whether `wasSomethingFound`) handles displaying the `nothingFoundDialog`.
 *
 *    2. It resets `wasSomethingFound` to `true`.
 *    3. It resets `amountVisible` to `0`.
 */
@Component({
	components: {
		Service
	}
})
export default class ServicesSearch extends IsTouchScreen {
	searchTextWasPreviousSpace = false;
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
	amountVisible = 0;

	oneVisibleInList = false;

	// @Watch("searchText")
	// onSearchTextChange() {
	// 	this.wasSomethingFound = false;
	// 	this.amountVisible = 0;
	// }

	searchInput(event: SearchInputEvent) {
		// TODO: don't trigger search if a space was added or already not found and it's just adding more characters
		console.log("Search input event: ", event);
		if (this.searchText !== event.target.value) {
			// If anything has changed
			if (
				!this.wasSomethingFound && // If nothing was found previously
				this.searchText !== "" && // but it can't be the first time
				!this.searchTextWasPreviousSpace // and allow to have different keywords separated by spaces
			) {
				if (this.searchText.length <= event.target.value.length) {
					// If new characters are added when nothing was found previuosly then
					// there is no point in trying.
					this.searchTextWasPreviousSpace = true;
				} else {
					// Characters were removed
					this.searchText = event.target.value;
					this.wasSomethingFound = false;
					this.amountVisible = 0;
				}

				// }else if (event.data === " ") {
				// 	// If only a space was added:
				// 	// do nothing.
			} else {
				this.searchTextWasPreviousSpace = false;
				this.searchText = event.target.value;
				this.wasSomethingFound = false;
				this.amountVisible = 0;
			}
		}
		console.log("Input event:", event);
	}

	/** Event  */
	foundVisibleService(id: number) {
		this.wasSomethingFound = true;
		this.displayNothingFoundDialog = false;
		this.amountVisible++;

		this.oneVisibleInList =
			this.amountVisible === 1 && this.viewType === this.VIEW_TYPES.LIST;
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
