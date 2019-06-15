import { Component, Vue } from "nuxt-property-decorator";
import { TimelineLite, Linear, Power3, TweenLite } from "gsap";
import { textWrap } from "d3plus-text";
import paths from "./paths";
import { items, IItem, TARGET_PATH } from "./items";
console.log("toZUS === toUS", paths.toUS === paths.toZUS);

/* tslint:disable max-classes-per-file*/

type BezierPath = Array<{ x: number; y: number }>;

function alignPathInRelation(path: BezierPath, elem: SVGGraphicsElement) {
	const elem_bbox = elem.getBBox();
	const new_path: BezierPath = [];
	for (const xy of path) {
		new_path.push({
			x: xy.x - elem_bbox.x - elem_bbox.width / 2,
			y: xy.y - elem_bbox.y - elem_bbox.height / 2
		});
	}
	return new_path;
}

const allCommentTexts = [
	["Dostarczasz nam swoje dokumenty...", "A my zajmujemy się resztą."],
	["I znowu dostarczasz dokumenty...", "A my znowu robimy, to co trzeba."],
	["I znowu...", "Każdego miesiąca."],
	["I znowu...", "I znowu..."]
];

/** This function will take care of wrapping text
 *  inside the SVG's #comment text rectangle.
 */
const textWrapFunc = textWrap()
	.fontFamily("Montserrat")
	.fontWeight("200")
	.fontSize("13.89")
	.width("120");

interface Elements {
	[id: string]: SVGGElement;
}
@Component
export default class LandingPage extends Vue {
	public elements: Elements = {} as Elements;
	private svg!: HTMLElement;
	private comment!: SVGElement;
	private textElement!: SVGTextElement;
	private itemNumber = 0;
	private animationNumber = -1;
	private item: IItem = items[this.itemNumber];
	mounted() {
		console.groupCollapsed("SVGElements.onLoaded()");
		console.log("Object loaded");
		this.svg = this.$refs.svg as HTMLElement;
		(this.svg.childNodes as NodeListOf<SVGGElement>).forEach(el => {
			if (el.id) {
				this.add(el);
			}
		});

		this.comment = this.elements.comment;
		this.textElement = this.comment.querySelector("text") as SVGTextElement;
		console.log("textElement: ", this.textElement);
		this.elements.dokumenty.setAttribute("x", "0");

		this.animationLoop(true);
		console.groupEnd();
	}
	private setItemText() {
		console.groupCollapsed("setItemText");
		const PITElement = this.elements.PIT;
		const PITTextElement = PITElement.querySelector(
			"text"
		) as SVGTextElement;
		while (PITTextElement.lastChild) {
			PITTextElement.removeChild(PITTextElement.lastChild);
		}

		const fontSize = this.item.fontSize.toString();

		const tSpanElement = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"tspan"
		);

		tSpanElement.setAttribute("font-size", fontSize);
		tSpanElement.textContent = this.item.name;
		PITTextElement.appendChild(tSpanElement);

		tSpanElement.setAttribute(
			"x",
			`${PITElement.getBoundingClientRect().width / 2 -
				PITTextElement.getBoundingClientRect().width / 2}`
		);
		console.log("getBBox", PITTextElement.getBBox());
		console.log("getBBoxParent", PITElement.getBBox());
		console.log("getBounding", PITTextElement.getBoundingClientRect());
		console.log("PIT tspan: ", tSpanElement);
		console.groupEnd();
	}

	private setGlobalItem() {
		this.item = items[this.itemNumber];
		console.log("this.item set to: ", this.item);
	}

	private increaseAnimationCounter() {
		this.itemNumber++;
		this.animationNumber++;
		if (this.itemNumber >= items.length) {
			this.itemNumber = 0;
		}
	}

	private setCommentText(new_text: string) {
		console.groupCollapsed("setCommentText");
		while (this.textElement.lastChild) {
			this.textElement.removeChild(this.textElement.lastChild);
		}
		const wrappedText = textWrapFunc(new_text);
		console.log("textWrap:", wrappedText.lines);
		for (const line of wrappedText.lines) {
			const tSpanElement = document.createElementNS(
				"http://www.w3.org/2000/svg",
				"tspan"
			);
			tSpanElement.setAttribute("dy", "15");
			tSpanElement.setAttribute("x", "0");
			tSpanElement.textContent = line;
			this.textElement.appendChild(tSpanElement);
		}
		console.groupEnd();
	}
	private add(svgGroupElement: SVGGElement) {
		if (this.elements.hasOwnProperty(svgGroupElement.id)) {
			throw Error("Already exists");
		}
		this.elements[svgGroupElement.id] = svgGroupElement;
	}
	private animationLoop(isFirstTime: boolean) {
		const tl = new TimelineLite();
		tl.timeScale(2);
		const commentYPosition = 20;
		this.setGlobalItem();
		console.groupCollapsed("animationLoop");
		this.setItemText();
		this.increaseAnimationCounter();

		// Basically if animation iteration variable
		// is beyond the supplied comments, then use the last one.
		const commentTexts =
			allCommentTexts[
				this.animationNumber < allCommentTexts.length
					? this.animationNumber
					: allCommentTexts.length - 1
			];

		tl.call(() => this.setCommentText(commentTexts[0]))
			.addLabel("start", "0")
			// Move text from above
			.fromTo(
				this.textElement,
				2.5,
				{
					y: -100,
					ease: Power3.easeOut
				},
				{
					y: 20
				},
				"start"
			)
			.fromTo(
				this.textElement,
				2.5,
				{
					autoAlpha: 0,
					ease: Power3.easeOut
				},
				{
					autoAlpha: 1
				},
				"start+=0.5"
			)
			// Move the documents along the road
			.to(
				this.elements.dokumenty,
				isFirstTime ? 7 : 4,
				{
					bezier: {
						values: alignPathInRelation(
							paths.toMireks,
							this.elements.dokumenty
						),
						type: "cubic"
					},
					rotation: 0.001,
					ease: Linear.easeNone
				},
				"start"
			)
			.addLabel("documents_arrived", "+=0")
			// Move the text to the bottom and fade out
			.to(
				this.textElement,
				2.5,
				{
					y: 100,
					ease: Power3.easeIn
				},
				"documents_arrived"
			)
			.to(
				this.textElement,
				2,
				{
					autoAlpha: 0,
					ease: Power3.easeIn
				},
				"documents_arrived+=0.5"
			)
			.addLabel("text_gone", "+=0")
			.call(() => this.setCommentText(commentTexts[1]))
			// Move the text to the original position from the top
			.fromTo(
				this.textElement,
				2.5,
				{
					y: -100,
					ease: Power3.easeOut
				},
				{
					y: commentYPosition,
					ease: Power3.easeOut
				}
			)
			.fromTo(
				this.textElement,
				2.5,
				{
					autoAlpha: 0,
					ease: Power3.easeOut
				},
				{
					autoAlpha: 1
				},
				"text_gone"
			)
			// Start the PIT element on its bezier path
			.to(
				this.elements.PIT,
				(() => {
					switch (this.item.target) {
						case TARGET_PATH.KRUS:
							console.log("target is krus");
							return 8;
						case TARGET_PATH.ZUS:
							console.log("target is zus");
							return 7;
						case TARGET_PATH.US:
							console.log("target is us");
							return 10;
					}
					return 10;
				})(),
				{
					bezier: {
						values: alignPathInRelation(
							paths[this.item.target],
							this.elements.PIT
						),
						type: "cubic"
					},
					rotation: 0.001,
					ease: Linear.easeNone
				},
				"text_gone"
			)
			// Move the text to the bottom again
			.addLabel("PIT_arrived", "-=2.5")
			.to(
				this.textElement,
				2.5,
				{
					y: 100,
					ease: Power3.easeOut
				},
				"PIT_arrived"
			)
			.to(
				this.textElement,
				2.5,
				{
					autoAlpha: 0,
					ease: Power3.easeOut
				},
				"PIT_arrived"
			)
			.call(() => console.groupEnd())
			.call(this.animationLoop, [false], this);
	}
}
