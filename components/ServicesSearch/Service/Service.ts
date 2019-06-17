import { Component, Vue, Prop } from "nuxt-property-decorator";
import IService from "../IService";
@Component
export default class Service extends Vue {
	lowerService!: IService;
	@Prop()
	service!: IService;
	@Prop()
	searchText!: string;
	@Prop()
	isLast!: boolean;

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

	isVisible(searchText: string) {
		const searchedKeywords = searchText.toLowerCase().split(" ");
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
		return isVisible;
	}
}
