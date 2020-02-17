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

	// shouldHaveHref: boolean;
	shouldHaveHrefHref!: "href" | "";

	infoElement!: HTMLElement;

	copyText = DEFAULT_COPY_TEXT;
	copyInProgress = false;

	mounted() {
		const shouldHaveHref =
			(this.isTouchScreen && this.contact.id === "phone");
		this.shouldHaveHrefHref = shouldHaveHref ? `href` : ``;
		this.infoElement = this.$refs.info as HTMLElement;
	}

	// Only may possible fire on !smallViewport
	clicked() {
		console.log("Contact clicked");
		this.contact.selected = true;
		this.$emit("clicked", {
			state: this.contact.selected,
			index: this.index
		});

		this.$ga.event("Contact", "contact-clicked", this.contact.id, 0.5);
	}

	async closeButtonClicked(event: MouseEvent) {
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
		const copyText =
			this.infoElement.textContent || this.infoElement.innerText;
		if (!navigator.clipboard) {
			this.fallbackCopyTextToClipboard(copyText);
			return;
		}
		navigator.clipboard.writeText(copyText).then(
			async () => {
				console.log("Async: Copying to clipboard was successful!");
				if (this.copyInProgress) {
					console.log("Copy animation still happening sorry!");
					return;
				} else {
					console.log("Copy animation under way!");
				}
				this.copyInProgress = true;
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
				this.fallbackCopyTextToClipboard(copyText);
			}
		);
	}
	/**
	 * @author Peter Mortensen and Dean Taylor
	 * https://stackoverflow.com/a/30810322/10854888
	 */
	fallbackCopyTextToClipboard(text: string) {
		const textArea = document.createElement("textarea");

		//
		// *** This styling is an extra step which is likely not required. ***
		//
		// Why is it here? To ensure:
		// 1. the element is able to have focus and selection.
		// 2. if element was to flash render it has minimal visual impact.
		// 3. less flakyness with selection and copying which **might** occur if
		//    the textarea element is not visible.
		//
		// The likelihood is the element won't even render, not even a
		// flash, so some of these are just precautions. However in
		// Internet Explorer the element is visible whilst the popup
		// box asking the user for permission for the web page to
		// copy to the clipboard.
		//

		// Place in top-left corner of screen regardless of scroll position.
		textArea.style.position = "fixed";
		textArea.style.top = "0";
		textArea.style.left = "0";

		// Ensure it has a small width and height. Setting to 1px / 1em
		// doesn't work as this gives a negative w/h on some browsers.
		textArea.style.width = "2em";
		textArea.style.height = "2em";

		// We don't need padding, reducing the size if it does flash render.
		textArea.style.padding = "0";

		// Clean up any borders.
		textArea.style.border = "none";
		textArea.style.outline = "none";
		textArea.style.boxShadow = "none";

		// Avoid flash of white box if rendered for any reason.
		textArea.style.background = "transparent";

		textArea.value = text;
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		try {
			const successful = document.execCommand("copy");
			const msg = successful ? "successful" : "unsuccessful";
			console.log("Fallback: Copying text command was " + msg);
		} catch (err) {
			console.error("Fallback: Oops, unable to copy", err);
			this.$sentry.captureException(
				new Error("Both clipboard copying ways were unsuccessful.")
			);
		}

		document.body.removeChild(textArea);
	}
}
