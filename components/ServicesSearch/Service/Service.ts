import { Component, Vue, Prop } from "nuxt-property-decorator";
import { TimelineLite, Power4 } from "gsap";
import IService from "../IService";
import sleep from "@/components/sleep";

interface NEWElement extends HTMLElement {
	backgroundColor: string;
}
@Component
export default class Service extends Vue {
	lowerService!: IService;
	@Prop()
	service!: IService;
	@Prop()
	searchText!: string;
	@Prop()
	isLast!: boolean;
	@Prop()
	container!: HTMLElement;

	active = false;
	opaque = false;
	newEl!: NEWElement;

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

	clicked() {
		console.log("Service", this.service.id, "clicked");
		this.active = !this.active;
		const tl = new TimelineLite();
		const contRect = this.container.getBoundingClientRect();
		const rect = this.$el.getBoundingClientRect();
		console.log("contRect: ", contRect, "rect: ", rect);
		const left = rect.left - contRect.left;
		const top = rect.top - contRect.top;
		console.log("left: ", left, "top: ", top);
		const width = rect.width - (window.innerWidth * 2) / 100;
		const height = rect.height - (window.innerHeight * 2) / 100;
		if (this.active) {
			this.newEl = this.$el.cloneNode(true) as NEWElement;
			console.log("new element: ", this.newEl);
			this.newEl.backgroundColor = this.newEl.style
				.backgroundColor as string;
			(this.$el.parentElement as Element).appendChild(this.newEl);
			this.newEl.classList.add("duplicate");
			this.newEl.addEventListener("click", this.clicked);
			tl.set(this.newEl, {
				position: "absolute",
				left,
				top,
				width: width,
				height: height,
				ease: Power4.easeOut
			});
			tl.call(() => {
				this.opaque = true;
			}).to(this.newEl, 2, {
				left: "50%",
				top: "50%",
				x: "-50%",
				y: "-50%",
				width: "unset",
				height: "unset",
				minWidth: width,
				minHeight: height
			});
		} else {
			tl.call(() => {
				this.newEl.classList.remove("duplicate");
			})
				.to(this.newEl, 2, {
					left,
					top,
					x: 0,
					y: 0,
					width: width,
					height: height,
					ease: Power4.easeOut,
					backgroundColor: this.newEl.backgroundColor
				})
				.call(
					() => {
						(this.newEl.parentElement as HTMLElement).removeChild(
							this.newEl
						);
						this.opaque = false;
					},
					undefined,
					undefined,
					"+=0.5"
				);
		}
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
