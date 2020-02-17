import IContact from "./IContact";

const contacts: IContact[] = [
	{
		id: "address",
		icon: "map-marked-alt",
		subtitle: "Adres",
		info: "62-840 Koźminek,<br/> ul. Nakwasińska 1",
		hover: false,
		selected: false,
		reverse: false
	},
	{
		id: "fb",
		icon: ["fab", "facebook"],
		subtitle: "Facebook",
		info: "@biurokoralewski",
		link: "https://fb.me/biurokoralewski",
		hover: false,
		selected: false,
		reverse: false
	},
	{
		id: "phone",
		icon: "phone",
		subtitle: "Numer telefonu",
		info: "+48 62 763 74 10",
		link: "tel:+48 62 763 74 10",
		hover: false,
		selected: false,
		reverse: false
	},
	{
		id: "time",
		icon: "business-time",
		subtitle: "Godziny otwarcia",
		info: "Od poniedziałku do piątku:<br/> 8:00-16:00",
		hover: false,
		selected: false,
		reverse: false
	},
	{
		id: "e-mail",
		icon: "at",
		subtitle: "E-mail",
		info: "mireks40<br/>@poczta.onet.pl",
		link: "mailto:mireks40@poczta.onet.pl",
		hover: false,
		selected: false,
		reverse: false
	}
];

export default contacts;
