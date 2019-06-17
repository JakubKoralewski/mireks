import { Component, Vue, Watch } from "nuxt-property-decorator";
import { TweenMax, Power4 } from "gsap";
import Service from "./Service/Service";
import services from "./services";
// import IService from "./IService";
import sleep from "@/components/sleep";

// const lowerServices = (services => {
// 	const newServices: IService[] = [];
// 	for (const service of services) {
// 		const newService = {} as IService;
// 		newService.id = service.id;
// 		newService.title = service.title.toLowerCase();
// 		newService.description = service.description.toLowerCase();
// 		if (service.hasOwnProperty("shortTitle")) {
// 			newService.shortTitle = service.shortTitle!.toLowerCase();
// 		}
// 		if (service.hasOwnProperty("keywords")) {
// 			newService.keywords = service.keywords!.map(keyword =>
// 				keyword.toLowerCase()
// 			);
// 		}
// 		newServices.push(newService);
// 	}
// 	/* Put shorter elements at beginning of array.*/
// 	newServices.sort((a, b) => {
// 		return a.title.length - b.title.length;
// 	});
// 	console.log(newServices);
// 	return newServices;
// })(services);

const SEARCH_PLACEHOLDER = "np.: VAT, CIT, PIT";
@Component({
	components: {
		Service
	}
})
export default class ServicesSearch extends Vue {
	searchText = "";
	// searchInput!: HTMLInputElement;
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
		// console.log(`last service ${visible ? "VISIBLE" : "NOT VISIBLE"}`);
		if (!this.wasSomethingFound) {
			console.log("Nothing found");
			this.displayNothingFoundDialog = true;

			// TweenMax.from(this.nothingFoundDialogElement, 2, {
			// 	y: "-20%",
			// 	autoAlpha: 0,
			// 	ease: Power4.easeOut
			// });
		}
	}

	mounted() {
		this.nothingFoundDialogElement = this.$refs
			.nothingFoundDialog as HTMLElement;
	}

	// get visibleServices() {
	// 	return this.searchServices();
	// }
	// searchServices() {
	// 	const searchedKeywords = this.searchText.toLowerCase().split(" ");
	// 	const visible: IService[] = [];
	// 	const append = (id: number) => visible.push(services[id]);
	// 	lowerServices.forEach(service => {
	// 		for (const sk of searchedKeywords) {
	// 			if (service.title.includes(sk)) {
	// 				append(service.id);
	// 				return true;
	// 			}
	// 			if (service.description.includes(sk)) {
	// 				append(service.id);
	// 				return true;
	// 			}
	// 			if (
	// 				service.hasOwnProperty("shortTitle") &&
	// 				service.shortTitle!.includes(sk)
	// 			) {
	// 				append(service.id);
	// 				return true;
	// 			}
	// 			if (service.hasOwnProperty("keywords")) {
	// 				for (const keyword of service.keywords!) {
	// 					if (keyword.includes(sk)) {
	// 						append(service.id);
	// 						return true;
	// 					}
	// 				}
	// 			}
	// 		}
	// 		return false;
	// 	});
	// 	return visible;
	// }
	// mounted() {
	// this.searchInput = this.$refs.searchInput as HTMLInputElement;
	// }
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
