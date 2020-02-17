import { Component, Vue, Watch } from "nuxt-property-decorator";
import ContactElement from "./ContactElement/ContactElement";
import IContact from "./IContact";
import contacts from "./contacts";
import sleep from "~/components/sleep";

import cssVariables from "./ContactElement/ContactElement.scss";

for (const key of Object.keys(cssVariables)) {
	let cssVar = cssVariables[key];
	cssVariables[key] = parseFloat(cssVar.substring(0, cssVar.length - 1));
}

interface ICSSVariables {
	durationSelectedReverseLast: number;
	durationSelectedReverse: number;
	durationSelectedLast: number;
	durationSelected: number;
}

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
			this.smallViewport = window.innerWidth <= 600;
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

	async contactClosed(index: number) {
		console.groupCollapsed("Contact closed");
		this.contacts[index].reverse = true;
		this.reverseIndex = index;
		this.contacts[index].selected = false;
		const isLast = index === this.contacts.length - 1;
		let sleepTime: number;
		if (isLast) {
			sleepTime =
				(cssVariables as ICSSVariables).durationSelectedReverseLast *
				1000;
		} else {
			sleepTime =
				(cssVariables as ICSSVariables).durationSelectedReverse * 1000;
		}
		console.log("Sleeping for ", sleepTime);
		await sleep(sleepTime);
		this.contacts[index].reverse = false;
		this.reverseIndex = -1;
		this.selected = -1;
		console.groupEnd();
	}

	contactClicked(options: { state: boolean; index: number }) {
		console.group(`contactClicked: selected change of`, options.index, `to`, options.state);
		if (this.selected !== -1 && this.selected !== options.index) {
			/* Other is currently selected */
			console.log("Other is currently selected ");
			// TODO: if other is currently selected but not ready...
			if (this.contacts[options.index].ready) {
				// Animation to center has finished
				this.contacts[this.selected].reverse = true;
				this.reverseIndex = this.selected;
				this.contacts[this.selected].selected = false;
			} else {
				// Animation to center of the other selected
				// has not finished
			}
		}
		if (options.state) {
			/* Clicked is true */
			console.log("clicked is true");
			this.selected = options.index;
		} else {
			/* Clicked is false */
			console.log("Clicked is false");
			this.contactClosed(options.index);
		}
		console.groupEnd();
	}
}
