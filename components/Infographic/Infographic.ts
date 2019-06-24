import { Component, Vue } from "nuxt-property-decorator";
import { TimelineLite, Linear, Power3, Power4, TweenMax } from "gsap";
import { textWrap } from "d3plus-text";
import paths from "./paths";
import { items, IItem, TARGET_PATH } from "./items";
// import { faTintSlash } from "@fortawesome/free-solid-svg-icons";
import isElementInViewport from "@/components/isElementInViewport";
// import { ScrollMagic } from "scrollmagic";

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

const textWrapFuncBigText = textWrap()
	.fontFamily("Montserrat")
	.fontWeight("200")
	.fontSize("20")
	.width("100");

type ELEMENTS_ID =
	| "droga"
	| "dokumenty"
	| "comment"
	| "PIT"
	| "zus"
	| "krus"
	| "us"
	| "mireks"
	| "osoba";

type Elements = { [key in ELEMENTS_ID]: SVGGElement };
@Component
export default class Infographic extends Vue {
	public elements: Elements = {} as Elements;
	private svg!: HTMLElement;
	private comment!: SVGElement;
	private textElement!: SVGTextElement;
	infographicTitle!: HTMLHeadingElement;
	roundBG!: HTMLElement;
	private itemNumber = 0;
	private animationNumber = -1;
	private item: IItem = items[this.itemNumber];

	textWrapFunc = textWrapFunc;

	hasLoopBeenStarted = false;

	commentOriginalXValue = 113.94;
	commentOriginalYValue = 73.72;
	commentOriginalVBYMax = 262.33;
	defaultViewBox!: string;

	/** Changes waiting to happen */
	// changesQueue: any = [];

	checkIfSVGInViewport() {
		console.group("Is element in viewport?");
		if (isElementInViewport(this.roundBG)) {
			console.log("Yes");
			this.animationLoop(true);
			this.hasLoopBeenStarted = true;
			window.removeEventListener("scroll", this.checkIfSVGInViewport);
		}
		console.groupEnd();
	}
	filterNodes(nodes: NodeListOf<SVGGElement>) {
		return Array.from(nodes).filter(node => !["droga"].includes(node.id));
	}

	onResize(ev?: Event) {
		console.log("Resize event:", ev);
		if (window.innerWidth <= 900) {
			// Flip SVG
			console.log("this.svg: ", this.svg);
			TweenMax.set(this.svg, {
				rotation: 90,
				minWidth: this.roundBG.getBoundingClientRect().height,
				minHeight: this.roundBG.getBoundingClientRect().width
			});
			TweenMax.set(this.elements.comment, {
				scale: 0.7,
				x: 129,
				y: 40
			});

			// Make the comment appear above else
			(this.elements.comment.parentElement as HTMLElement).appendChild(
				this.elements.comment
			);

			// Modify viewBox for better centering on vertical devices
			const viewBox = this.defaultViewBox.split(" ");
			viewBox[3] = "212";
			console.log("Setting new viewBox to: ", viewBox.join(" "));
			this.svg.setAttribute("viewBox", viewBox.join(" "));

			// Rotate all the elements opposite way
			// to how the svg was rotated to now face
			// correctly.
			this.filterNodes(this.svg.childNodes as NodeListOf<
				SVGGElement
			>).forEach(child => {
				TweenMax.set(child, {
					transformOrigin: "center center",
					rotation: -90
				});
			});

			if (window.innerWidth <= 700) {
				this.textWrapFunc = textWrapFuncBigText;
			}
		} else {
			// Reverse whatever was done above
			this.svg.setAttribute("viewBox", this.defaultViewBox);
			this.filterNodes(this.svg.childNodes as NodeListOf<
				SVGGElement
			>).forEach(child => {
				TweenMax.set(child, {
					rotation: 0
				});
			});
			TweenMax.set(this.elements.comment, {
				scale: 1,
				transformOrigin: "0 0",
				x: this.commentOriginalXValue,
				y: this.commentOriginalYValue
			});
			(this.elements.comment.parentElement as HTMLElement).insertBefore(
				this.elements.comment,
				(this.elements.comment.parentElement as HTMLElement).firstChild
			);
			TweenMax.set(this.svg, { rotation: 0, minWidth: 0, minHeight: 0 });
		}
	}
	mounted() {
		console.groupCollapsed("Infographic mounted");
		console.log("Object loaded");
		this.svg = this.$refs.svg as HTMLElement;
		this.roundBG = this.$refs.roundBG as HTMLElement;
		this.infographicTitle = this.$refs
			.infographicTitle as HTMLHeadingElement;
		(this.svg.childNodes as NodeListOf<SVGGElement>).forEach(el => {
			if (el.id) {
				this.add(el);
			}
		});
		this.comment = this.elements.comment;
		this.textElement = this.comment.querySelector("text") as SVGTextElement;
		console.log("textElement: ", this.textElement);
		this.elements.dokumenty.setAttribute("x", "0");

		[this.svg, this.roundBG].forEach((el, index) => {
			const subtleAnimScene = new this.$ScrollMagic.Scene({
				triggerElement: this.infographicTitle,
				triggerHook: 0.5,
				duration: `${500 + 80 * index}px`,
				reverse: true
			}).setTween(
				TweenMax.from(el, 1, {
					y: "20%",
					autoAlpha: 0,
					ease: Power4.easeOut
				})
			);
			this.$ScrollMagic.Controller.addScene(subtleAnimScene);
		});

		this.defaultViewBox = this.svg.getAttribute("viewBox") as string;

		this.checkIfSVGInViewport();
		window.addEventListener("resize", this.onResize);
		window.addEventListener("scroll", this.checkIfSVGInViewport);
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
		console.log(
			"PITELEMENT WIDTH:",
			PITElement.getBoundingClientRect().width
		);
		console.log(
			"PITTEXTELEMENT WIDTH:",
			PITTextElement.getBoundingClientRect().width
		);

		tSpanElement.setAttribute(
			"x",
			`${PITElement.getBBox().width / 2 -
				PITTextElement.getBBox().width / 2 +
				1}`
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
		const wrappedText = this.textWrapFunc(new_text);
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
		console.log("timeline: ", tl);
		tl.timeScale(1);
		const commentYPosition = 20;
		this.setGlobalItem();
		console.groupCollapsed("animationLoop");
		this.setItemText();
		this.increaseAnimationCounter();

		// If animation iteration index
		// is beyond the supplied comments length use the last one.
		const commentTexts =
			allCommentTexts[
				this.animationNumber < allCommentTexts.length
					? this.animationNumber
					: allCommentTexts.length - 1
			];

		tl.call(this.onResize)
			.call(() => this.setCommentText(commentTexts[0]))
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
					// rotation: 0.001,
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
					ease: Linear.easeNone
				},
				"text_gone-=2"
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
		console.groupEnd();
	}
}
