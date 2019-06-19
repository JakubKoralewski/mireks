import { Component, Vue } from "nuxt-property-decorator";
import { TweenMax, Elastic, Power4 } from "gsap";
import { AssertionError } from "assert";
import isElementInViewport from "@/components/isElementInViewport";
import sleep from "@/components/sleep";
// import { ScrollMagic } from "scrollmagic";

interface ChangingNumber {
	number: number | string;
	description: string;
	shouldBeUpdatedEveryYear?: boolean;
}
/** Founding date of FHU MIREKS  */
const FOUNDING_DATE = new Date(1994, 9, 1);

function diffYears(date1: Date, date2: Date): number {
	return date1.getFullYear() - date2.getFullYear();
}

/** Time needed to change number (in seconds).  */
const NUMBER_STATIONARY = 2;
const NUMBER_ANIMATING = 3;
const NUMBER_COOLDOWN = NUMBER_STATIONARY + NUMBER_ANIMATING;
const CHANGING_NUMBERS_TRANSITION = `transform ${NUMBER_ANIMATING}s ease-in-out`;

interface ChangingNumbersControl {
	left: HTMLElement;
	middle: HTMLElement;
	right: HTMLElement;
}

@Component
export default class WhyUs extends Vue {
	whyUsElement!: HTMLElement;
	whyUsSubTitleElement!: HTMLElement;
	whyUsDescriptionElement!: HTMLElement;

	byWhat: 1 | -1 = 1;
	wasCancelled = false;

	changingNumbersElement!: HTMLElement;
	changingNumbersControl: ChangingNumbersControl = {} as ChangingNumbersControl;
	currentNumberIndex = 0;
	isCountdownStarted = false;

	STARTING_LEFT_TRANSFORM = "translateX(-100%)";

	numbers: ChangingNumber[] = [
		{
			description: "klientów w regionie",
			number: "100+"
		},
		{
			description: "tyle lat jesteśmy z Wami",
			number: 25,
			shouldBeUpdatedEveryYear: true
		}
	];

	STARTING_RIGHT_TRANSFORM = `translateX(calc(${100 *
		this.numbers.length}% + ${0.25 * (this.numbers.length - 1)}rem)`;

	created() {
		// Calculate current year from founding date
		const numberObjectNeedingToUpdate = this.numbers.find(number => {
			if (number.shouldBeUpdatedEveryYear) {
				return true;
			}
		});
		if (!numberObjectNeedingToUpdate) {
			throw new AssertionError({
				message: "no number object needing to update"
			});
		} else {
			const now = new Date();
			numberObjectNeedingToUpdate.number = diffYears(now, FOUNDING_DATE);
		}
	}

	onScrollCheckIfNumbersInViewport() {
		if (isElementInViewport(this.$refs.changingNumbers as HTMLElement)) {
			this.startCountdown();
			window.removeEventListener(
				"scroll",
				this.onScrollCheckIfNumbersInViewport
			);
		}
	}
	/** The numbers should start changing only once they first become visible!  */
	async startCountdown() {
		if (this.isCountdownStarted) {
			console.log("Refusing to start countdown second time.");
			return;
		}
		this.isCountdownStarted = true;
		while (1) {
			if (this.wasCancelled) {
				this.isCountdownStarted = false;
				return;
			}
			await sleep(NUMBER_COOLDOWN * 1000);
			this.changeCurrentNumber();
		}
	}

	changeNumber(newIndex: number) {
		console.groupCollapsed("Change number clicked. New number: ", newIndex);
		this.wasCancelled = true;
		this.changeCurrentNumber(newIndex);
		console.groupEnd();
	}

	async changeCurrentNumber(newIndex?: number) {
		if (newIndex !== undefined) {
			this.currentNumberIndex = newIndex;
		} else {
			if (this.wasCancelled) {
				return;
			}
			this.currentNumberIndex += this.byWhat;
		}
		console.groupCollapsed("changing number to: ", this.currentNumberIndex);
		console.log(
			`Simply moving ${this.byWhat === 1 ? "forwards" : "backwards"}`
		);
		this.changingNumbersElement.style.transition = CHANGING_NUMBERS_TRANSITION;
		this.changingNumbersElement.style.transform = `translateX(${-100 *
			this.currentNumberIndex}%)`;
		this.changingNumbersControl.middle.style.transform = `translateX(calc(${100 *
			this.currentNumberIndex}% + ${0.25 * this.currentNumberIndex}rem)`;

		// Reset changing numbers transitions to be turned on
		// in case it was turned off last time to move itself
		// in onTransitionEnd() callback.
		console.log("Resetting transitions on controls");
		Object.values(this.changingNumbersControl).forEach(el => {
			console.log(el);
			el.style.transition = CHANGING_NUMBERS_TRANSITION;
		});

		if (this.currentNumberIndex == this.numbers.length) {
			this.changingNumbersControl.left.style.transform = `translateX(0)`;
			const left = this.changingNumbersControl.left;
			this.changingNumbersControl.left = this.changingNumbersControl.middle;
			this.changingNumbersControl.middle = left;
		} else if (this.currentNumberIndex == -1) {
			this.changingNumbersControl.right.style.transform = `translateX(calc(${100 *
				(this.numbers.length - 1)}% + ${0.25 *
				(this.numbers.length - 1)}rem))`;
			const right = this.changingNumbersControl.right;
			this.changingNumbersControl.right = this.changingNumbersControl.middle;
			this.changingNumbersControl.middle = right;
		}
		console.groupEnd();
	}

	onTransitionEnd() {
		console.groupCollapsed(
			"onTransitionEnd() - index: ",
			this.currentNumberIndex
		);
		if (this.wasCancelled) {
			this.wasCancelled = false;
			this.startCountdown();
			console.groupEnd();
			return;
		}
		if (this.currentNumberIndex >= this.numbers.length) {
			console.log("Resetting to beginning");

			this.changingNumbersElement.style.transition = "none";
			const cssTransform = `translateX(0)`;
			this.changingNumbersElement.style.transform = cssTransform;

			console.log("Position: ", cssTransform);
			this.currentNumberIndex = 0;

			console.log("Resetting the left control to the starting position");
			this.changingNumbersControl.left.style.transition = "none";
			this.changingNumbersControl.left.style.transform = this.STARTING_LEFT_TRANSFORM;
		} else if (this.currentNumberIndex < 0) {
			console.log("Going back to end");

			this.changingNumbersElement.style.transition = "none";
			const cssTransform = `translateX(${-100 *
				(this.numbers.length - 1)}%)`;
			this.changingNumbersElement.style.transform = cssTransform;

			console.log("Position: ", cssTransform);
			this.currentNumberIndex = this.numbers.length - 1;

			console.log("Resetting the right control to the starting position");
			this.changingNumbersControl.right.style.transition = "none";
			this.changingNumbersControl.right.style.transform = this.STARTING_RIGHT_TRANSFORM;
		}

		console.groupEnd();
	}

	mounted() {
		// Start numbers countdown when element enters viewport
		this.onScrollCheckIfNumbersInViewport();
		window.addEventListener(
			"scroll",
			this.onScrollCheckIfNumbersInViewport
		);
		this.changingNumbersElement = this.$refs.changingNumbers as HTMLElement;

		this.changingNumbersControl.left = this.$refs
			.changingNumbersControlLeft as HTMLElement;

		this.changingNumbersControl.middle = this.$refs
			.changingNumbersControl as HTMLElement;

		this.changingNumbersControl.right = this.$refs
			.changingNumbersControlRight as HTMLElement;

		this.changingNumbersControl.left.style.transition = CHANGING_NUMBERS_TRANSITION;
		this.changingNumbersControl.middle.style.transition = CHANGING_NUMBERS_TRANSITION;
		this.changingNumbersControl.right.style.transition = CHANGING_NUMBERS_TRANSITION;
		this.changingNumbersElement.addEventListener(
			"transitionend",
			this.onTransitionEnd
		);

		this.whyUsElement = this.$refs.whyUs as HTMLElement;
		this.whyUsSubTitleElement = this.$refs.whyUsSubTitle as HTMLElement;
		this.whyUsDescriptionElement = this.$refs
			.whyUsDescription as HTMLElement;
		const fadeInWhyUsScene = new this.$ScrollMagic.Scene({
			triggerElement: this.whyUsElement,
			triggerHook: 0.9,
			duration: "50%",
			reverse: false
		});
		this.$ScrollMagic.Controller.addScene(
			fadeInWhyUsScene.setTween(
				TweenMax.from(this.whyUsElement, 20, {
					autoAlpha: 0,
					ease: Power4.easeIn
				})
			)
		);

		const parallaxWhyUsBG = new this.$ScrollMagic.Scene({
			triggerElement: this.whyUsElement,
			triggerHook: 1,
			duration: "200%"
		}).setTween(
			TweenMax.fromTo(
				this.whyUsElement.querySelector(
					"#mireks-bg-img"
				) as HTMLDivElement,
				1,
				{
					y: "-70%"
				},
				{
					y: "00%"
				}
			)
		);
		// .addIndicators({
		// 	name: "Parallax",
		// 	colorTrigger: "re"
		// });
		this.$ScrollMagic.Controller.addScene(parallaxWhyUsBG);

		// Subtle move up and opacity elements
		[this.whyUsSubTitleElement, this.whyUsDescriptionElement].forEach(
			(el, index) => {
				const subtleAnimScene = new this.$ScrollMagic.Scene({
					triggerElement: this.whyUsElement,
					triggerHook: 0.5,
					duration: `${500 + 30 * index}px`,
					reverse: true
				}).setTween(
					TweenMax.from(el, 1, {
						y: "20%",
						autoAlpha: 0,
						ease: Power4.easeOut
					})
				);
				// .addIndicators({
				// 	name: el.id || el.classList[0]
				// });
				this.$ScrollMagic.Controller.addScene(subtleAnimScene);
			}
		);
	}
}
