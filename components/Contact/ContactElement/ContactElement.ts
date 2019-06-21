import { Component, Vue, Prop, Watch } from "nuxt-property-decorator";
import IContact from "../IContact";
const DEFAULT_COPY_TEXT = "Skopiuj";
@Component
export default class ContactElement extends Vue {
	@Prop()
	contact!: IContact;

	copyText = DEFAULT_COPY_TEXT;

	@Prop()
	index!: number;

	hover = false;

	clicked() {
		console.log("Contact clicked");
		this.contact.selected = true;
		this.$emit("clicked", {
			state: this.contact.selected,
			index: this.index
		});
	}

	closeButtonClicked(event: MouseEvent) {
		console.log("Close button clicked");
		event.stopPropagation();
		this.$emit("closed", this.index);
	}

	copyTextReset() {
		this.copyText = DEFAULT_COPY_TEXT;
	}

	copyClicked(event: MouseEvent) {
		event.stopPropagation();
		navigator.clipboard.writeText(this.contact.info).then(
			() => {
				console.log("Async: Copying to clipboard was successful!");
				this.copyText = "Skopiowano";
			},
			err => {
				this.copyText = "Nie udało się skopiować";
				console.error("Async: Could not copy text: ", err);
			}
		);
	}
}
