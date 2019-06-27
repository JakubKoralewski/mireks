import { Component, Vue } from "nuxt-property-decorator";
import { Power4, TimelineLite } from "gsap";
import Loading from "@/components/LandingPage/Loading";
import sleepFunction from "@/components/sleep";

interface LogoElements {
	left: SVGPathElement;
	right: SVGPathElement;
	middle: SVGPathElement;
}

@Component({
	components: {
		Loading
	}
})
export default class LandingPage extends Vue {
	logoSVG!: HTMLElement;
	logoTextSVG!: HTMLElement;
	logoElements: LogoElements = {} as LogoElements;
	findOutMoreButtonTimeline = new TimelineLite();
	findOutMoreButton!: HTMLDivElement;
	buttons!: HTMLElement;
	tl = new TimelineLite();
	disappearAtStart = true;
	beGoneVileManBeGoneFromMe = false;
	mounted() {
		// Assigns types to $refs elements so less type asserting is necessary
		this.findOutMoreButton = this.$refs.findOutMoreButton as HTMLDivElement;
		this.logoTextSVG = this.$refs.logoText as HTMLElement;
		this.logoSVG = this.$refs.logo as HTMLElement;
		this.buttons = this.$refs.buttons as HTMLElement;

		// Create this.logoElements object
		((this.logoSVG.querySelector("g#logo") as SVGGElement)
			.childNodes as NodeListOf<SVGPathElement>).forEach(child => {
			if (!child.id) {
				return;
			}
			this.logoElements[child.id] = child;
		});
		this.disappearAtStart = false;
		this.beGoneVileManBeGoneFromMe = true;
		this.animateSVG();
		this.animateButtons();
	}

	animateSVG() {
		console.log("animateSVG()");
		this.tl.addLabel("bigM", "0");
		this.tl.from(
			this.logoElements.left,
			5,
			{
				y: +200,
				ease: Power4.easeOut
			},
			"bigM"
		);
		this.tl.from(
			this.logoElements.left,
			5,
			{
				opacity: 0
			},
			"bigM"
		);
		this.tl.from(
			this.logoElements.right,
			6,
			{
				y: +300,
				ease: Power4.easeOut
			},
			"bigM+=0.25"
		);
		this.tl.from(
			this.logoElements.right,
			6,
			{
				opacity: 0
			},
			"bigM+=0.25"
		);
		this.tl.from(
			this.logoElements.middle,
			6,
			{
				y: +300,
				ease: Power4.easeOut
			},
			"bigM+=0.5"
		);
		this.tl.from(
			this.logoElements.middle,
			6,
			{
				opacity: 0
			},
			"bigM+=0.5"
		);
		const letters = (this.logoTextSVG.querySelector(
			"#letters"
		) as SVGGElement).children;
		this.tl.addLabel("letters", "-=4");
		this.tl.staggerFrom(
			letters,
			7,
			{ opacity: 0, ease: Power4.easeOut },
			0.5,
			"letters"
		);
	}
	/** Gets timeline after animateSVG! */
	animateButtons() {
		console.log("this.animateButtons()");
		this.tl.from(
			this.$refs.findOutMoreButton,
			4,
			{ y: 100, opacity: 0, ease: Power4.easeOut },
			"letters+=0.5"
		);
		this.tl.from(
			this.$refs.callButton,
			5,
			{ y: 100, opacity: 0, ease: Power4.easeOut },
			"letters+=1"
		);
	}
}
