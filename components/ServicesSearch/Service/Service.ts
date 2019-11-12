import { Component, Vue, Prop, Watch } from "nuxt-property-decorator";
import { IService } from "../IService";

@Component
export default class Service extends Vue {
	lowerService!: IService;
	@Prop()
	service!: IService;
	@Prop()
	searchText!: string;

	/** If the service is last in the array it can signal when
	 *  the search is finished to the parent ServicesSearch.
	 */
	@Prop()
	isLast!: boolean;
	@Prop()
	oneVisibleInList!: boolean;

	/** The Service.created function:
	 *
	 *  1. Creates a lowercase version of its data.
	 *    - it removes the need of converting to lowercase on each search
	 */
	created() {
		const lowerService = {} as IService;
		lowerService.id = this.service.id;
		lowerService.title = this.service.title.toLowerCase();
		lowerService.description = this.service.description.toLowerCase();
		if (this.service.hasOwnProperty("shortTitle")) {
			lowerService.shortTitle = this.service.shortTitle!.toLowerCase();
		}
		if (this.service.hasOwnProperty("keywords")) {
			lowerService.keywords = this.service.keywords!.map(keyword =>
				keyword.toLowerCase()
			);
		}
		this.lowerService = lowerService;
	}

	@Watch("searchText")
	isVisible() {
		const searchedKeywords = this.searchText.toLowerCase().split(" ");
		let isVisible = false;
		for (const sk of searchedKeywords) {
			if (this.lowerService.title.includes(sk)) {
				isVisible = true;
				break;
			}
			if (this.lowerService.description.includes(sk)) {
				isVisible = true;
				break;
			}
			if (
				this.lowerService.hasOwnProperty("shortTitle") &&
				this.lowerService.shortTitle!.includes(sk)
			) {
				isVisible = true;
				break;
			}
			if (this.lowerService.hasOwnProperty("keywords")) {
				for (const keyword of this.lowerService.keywords!) {
					if (keyword.includes(sk)) {
						isVisible = true;
						break;
					}
				}
			}
		}
		if (isVisible) {
			this.$emit("serviceVisible", this.service.id);
		}
		if (this.isLast) {
			this.$emit("lastServiceVisible", isVisible);
		}
		this.service.visible = isVisible;
	}
}
