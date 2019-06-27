import { Component, Vue, Watch } from "nuxt-property-decorator";
import ContactElement from "./ContactElement/ContactElement";
import IContact from "./IContact";
import contacts from "./contacts";

@Component({
	components: {
		ContactElement
	}
})
export default class Contact extends Vue {
	anyHover = false;
	hoverIndex = -1;
	selected: number = -1;
	anySelected = false;
	contacts = contacts;
	reverseIndex = -1;

	smallViewport = false;

	@Watch("contacts", { deep: true })
	onContactsChange(newValue: IContact[]) {
		console.log("contacts change");
		let anyHoverFound = false;
		let index = 0;
		for (const x of newValue) {
			if (x.hover) {
				this.anyHover = true;
				anyHoverFound = true;
				this.hoverIndex = index;
				break;
			}
			index++;
		}
		if (!anyHoverFound) {
			this.hoverIndex = -1;
			this.anyHover = false;
		}
		this.anySelected = newValue.some(x => x.selected);
	}

	mounted() {
		const checkViewportSize = () => {
			if (window.innerWidth <= 600) {
				this.smallViewport = true;
			} else {
				this.smallViewport = false;
			}
		};
		window.addEventListener("resize", checkViewportSize);
		checkViewportSize();
	}

	showPhoneNumber() {
		let index = -1;
		this.contacts.find((el, i) => {
			if (el.id === "phone") {
				index = i;
				return true;
			}
		});
		this.contacts.forEach((contact, index) => {
			if (contact.selected) {
				this.reverseIndex = index;
				contact.selected = false;
			}
		});
		this.selected = index;
		this.anySelected = true;
		this.anyHover = true;
		this.hoverIndex = index;
		this.contacts[index].selected = true;
	}

	contactClosed(index: number) {
		this.contacts[index].reverse = true;
		this.reverseIndex = index;
		this.contacts[index].selected = false;
	}

	contactClicked(options: { state: boolean; index: number }) {
		console.group(`selected change of`, options.index, `to`, options.state);
		if (this.selected !== -1) {
			/* Previously was selected */
			console.log("Previously was selected");
			if (options.index !== this.selected) {
				this.contacts[this.selected].reverse = true;
				this.reverseIndex = this.selected;
				this.contacts[this.selected].selected = false;
			}
		}
		if (options.state) {
			/* Clicked is true */
			console.log("clicked is true");
			if (
				options.index !== this.selected &&
				this.reverseIndex === options.index
			) {
				this.reverseIndex = -1;
			}
			this.selected = options.index;
		} else {
			/* Clicked is false */
			console.log("Clicked is false");
			// this.selected = -1;
		}
		console.groupEnd();
	}
}
