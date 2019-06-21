import { Component, Vue, Watch } from "nuxt-property-decorator";
import ContactElement from "./ContactElement/ContactElement";
import IContact from "./IContact";
import contacts from "./contacts";

interface FormSubmitEvent extends Event {
	type: "submit";
	target: HTMLFormElement;
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

	form = {
		name: "",
		email: "",
		body: "",
		honeypot: ""
	};

	encode(data: any) {
		return Object.keys(data)
			.map(
				key =>
					`${encodeURIComponent(key)}=${encodeURIComponent(
						data[key]
					)}`
			)
			.join("&");
	}

	get formHoneypotted() {
		const form = Object.assign({}, this.form);
		if (!form.honeypot) {
			delete form.honeypot;
			return form;
		}
		return this.form;
	}

	contactFormSubmit(formEvent: FormSubmitEvent) {
		console.log("Form submit vars: ", formEvent);
		fetch("/", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: this.encode({
				"form-name": "contact-form",
				...this.formHoneypotted
			})
		}).then(
			res => {
				alert(res.ok);
			},
			rej => {
				alert(rej);
			}
		);
	}

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
