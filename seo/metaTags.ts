import { TITLE, DESCRIPTION, KEYWORDS, URL } from "./variables";

export default [
	{ charset: "utf-8" },
	{
		name: "viewport",
		content: "width=device-width, initial-scale=1"
	},
	{
		hid: "description",
		name: "description",
		content: DESCRIPTION
	},
	{
		hid: "keywords",
		name: "keywords",
		content: KEYWORDS
	},
	{
		name: "keyword",
		content: KEYWORDS
	},
	{
		name: "msapplication-TileColor",
		content: "#0a1020"
	},
	{
		name: "msapplication-TileImage",
		content: "/icon192.png"
	},
	{
		name: "msapplication-config",
		content: "/browserconfig.xml"
	},
	{
		name: "theme-color",
		content: "#0ec7ff"
	},
	{
		name: "og:image",
		content: "/mireks_og.jpg"
	},
	{
		name: "og:url",
		content: URL
	},
	{
		name: "og:title",
		content: TITLE
	},
	{
		name: "og:description",
		content: DESCRIPTION
	},
	{
		name: "fb:app_id",
		content: "331204421139475"
	},
	{
		name: "twitter:description",
		content: DESCRIPTION
	},
	{
		name: "twitter:title",
		content: TITLE
	},
	{
		name: "twitter:image",
		content: "/mireks_og.jpg"
	},
	{
		name: "twitter:card",
		content: "summary_large_image"
	}
];
