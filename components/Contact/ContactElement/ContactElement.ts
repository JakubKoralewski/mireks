import { Component, Vue, Prop } from "nuxt-property-decorator";
import IsTouchScreen from "@/components/mixins/IsTouchScreen";
import IContact from "../IContact";
import sleep from "~/components/sleep";
const DEFAULT_COPY_TEXT = "Skopiuj";
@Component
export default class ContactElement extends IsTouchScreen {
	@Prop()
	contact!: IContact;
	@Prop()
	smallViewport!: boolean;
	@Prop()
	index!: number;

	infoElement!: HTMLElement;

	copyText = DEFAULT_COPY_TEXT;
	copyInProgress = false;

	mounted() {
		// Only overwrite for phone, leave email link intact
		if (this.contact.id !== "phone") {
			this.isTouchScreenHref = "href";
		}

		this.infoElement = this.$refs.info as HTMLElement;
	}

	clicked() {
		console.log("Contact clicked");
		this.contact.selected = true;
		this.$emit("clicked", {
			state: this.contact.selected,
			index: this.index
		});

		this.$ga.event("Contact", "contact-clicked", this.contact.id, 0.5);
	}

	closeButtonClicked(event: MouseEvent) {
		console.log("Close button clicked");
		event.stopPropagation();
		this.$emit("closed", this.index);
	}

	async copyTextReset() {
		if (this.copyText === "Skopiowano") {
			let removeIndex = this.copyText.length;
			for (const _ of "owano".split("")) {
				await sleep(100);
				this.copyText = this.copyText.slice(0, removeIndex - 1);
				removeIndex--;
			}
			let i = 0;
			for (const letter of "uj".split("")) {
				this.copyText = this.copyText + letter;
				await sleep(100 / i + 1);
				i++;
			}
		} else {
			this.copyText = DEFAULT_COPY_TEXT;
		}
	}

	copyClicked(event: MouseEvent) {
		event.stopPropagation();
		navigator.clipboard
			.writeText(
				this.infoElement.textContent || this.infoElement.innerText
			)
			.then(
				async () => {
					console.log("Async: Copying to clipboard was successful!");
					if (this.copyInProgress) {
						console.log("Copy animation still happening sorry!");
						return;
					} else {
						console.log("Copy animation under way!");
					}
					this.copyInProgress = true;
					// this.copyText = "Skopiowano";
					for (let i = 0; i < 2; i++) {
						const end = this.copyText.length;
						this.copyText = this.copyText.slice(0, end - 1);
						await sleep(100 / i + 1);
					}
					for (const letter of "owano".split("")) {
						await sleep(100);
						this.copyText = this.copyText + letter;
					}
					await sleep(2000);
					this.copyTextReset();
					this.copyInProgress = false;
					this.contact.hover = false;
					this.$ga.event(
						"Contact",
						"contact-copied-succesfully",
						this.contact.id,
						0
					);
				},
				err => {
					this.copyText = "Nie udało się skopiować";
					console.error("Async: Could not copy text: ", err);
					this.$ga.event(
						"Contact",
						"contact-copied-fail",
						this.contact.id,
						0
					);
				}
			);
	}
}
