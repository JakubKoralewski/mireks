<template>
	<section id="landing-page">
		<img
		 svg-inline
		 src="@/other_assets/landing-page-bg.svg"
		 class="landing-page-bg"
		/>
		<div id="landing-page-container">
			<div id="text-container">
				<h1><small>FHU</small> MIREKS</h1>
				<h2>Mirosław Koralewski</h2>
				<div id="description-container">
					<div id="description">
						<div id="main-description">
							Jesteśmy doświadczonym biurem rachunkowym z tradycją.
							Od 25 lat firma prowadzona jest przez Mirosława Koralewskiego bezustannie
							w tym samym miejscu - na ulicy Nakwasińskiej 1 w Koźminku.
						</div>
						<br />
						Zapraszamy!
					</div>
				</div>

				<div id="buttons">
					<div
					 class="button"
					 id="dowiedz-sie-wiecej"
					 @click="() => this.$emit('findOutMoreClick')"
					 @mouseenter="findOutMoreButtonMouseEnter"
					 @mouseleave="findOutMoreButtonMouseLeave"
					 ref="findOutMoreButton"
					>
						Dowiedz się więcej
					</div>

					<div
					 class="button"
					 id="zadzwon"
					 ref="callButton"
					>
						<font-awesome-icon icon="phone" />
						Zadzwoń
					</div>
				</div>

			</div>
			<div id="logotype">
				<img
				 svg-inline
				 src="@/other_assets/logo.svg"
				 class="logo"
				 ref="logo"
				/>
				<img
				 svg-inline
				 src="@/other_assets/logo-text.svg"
				 class="logo-text"
				 ref="logoText"
				/>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { TimelineLite, Power4, Sine } from "gsap";
	import { SplitText, SplitTextSplit } from "@/plugins/SplitText";

	type LogoElements = {
		left: SVGPathElement;
		right: SVGPathElement;
		middle: SVGPathElement;
	};

	@Component
	export default class LandingPage extends Vue {
		logoSVG!: HTMLElement;
		logoTextSVG!: HTMLElement;
		logoElements: LogoElements = {} as LogoElements;
		findOutMoreButtonTimeline = new TimelineLite();
		findOutMoreButton!: HTMLDivElement;
		findOutMoreButtonSplitText!: SplitTextSplit;
		tl = new TimelineLite();
		created() {}
		mounted() {
			this.findOutMoreButton = this.$refs.findOutMoreButton as HTMLDivElement;
			let st = new SplitText({
				words: 1,
				chars: 1,
				spacing: "0.33em"
			});
			this.findOutMoreButtonSplitText = st.split(this.findOutMoreButton);
			console.log("splittext: ", this.findOutMoreButtonSplitText);
			this.logoSVG = this.$refs.logo as HTMLElement;
			((this.logoSVG.querySelector("g#logo") as SVGGElement)
				.childNodes as NodeListOf<SVGPathElement>).forEach(child => {
				if (!child.id) return;
				console.log(`${child.id} added.`);
				this.logoElements[child.id] = child;
			});
			this.logoTextSVG = this.$refs.logoText as HTMLElement;
			// this.animateSVG();
			// this.animateButtons();
		}
		findOutMoreButtonMouseLeave() {
			console.log("findOutMoreButtonMouseLeave");
			// this.findOutMoreButtonTimeline.reverse();
		}
		findOutMoreButtonMouseEnter() {
			console.log("findOutMoreButtonMouseEnter");
			this.findOutMoreButtonTimeline.reversed(false);
			// for(let char of this.findOutMoreButtonSplitText.chars) {
			// 	this.findOutMoreButtonTimeline.to(char, {fontS}
			// }

			this.findOutMoreButtonTimeline.staggerFromTo(
				this.findOutMoreButtonSplitText.chars,
				0.5,
				{ scale: 1, repeat: 1, yoyo: true },
				{ scale: 0.8, ease: Sine.easeInOut, repeat: 1, yoyo: true },
				0.01
			);
		}

		animateSVG() {
			console.log("animateSVG()");
			this.tl.addLabel("bigM", "0");
			this.tl.from(
				this.logoElements["left"],
				5,
				{
					y: +200,
					ease: Power4.easeOut
				},
				"bigM"
			);
			this.tl.from(
				this.logoElements["left"],
				5,
				{
					opacity: 0
				},
				"bigM"
			);
			this.tl.from(
				this.logoElements["right"],
				6,
				{
					y: +300,
					ease: Power4.easeOut
				},
				"bigM+=0.25"
			);
			this.tl.from(
				this.logoElements["right"],
				6,
				{
					opacity: 0
				},
				"bigM+=0.25"
			);
			this.tl.from(
				this.logoElements["middle"],
				6,
				{
					y: +300,
					ease: Power4.easeOut
				},
				"bigM+=0.5"
			);
			this.tl.from(
				this.logoElements["middle"],
				6,
				{
					opacity: 0
				},
				"bigM+=0.5"
			);
			let letters = (this.logoTextSVG.querySelector(
				"#letters"
			) as SVGGElement).children;
			this.tl.staggerFrom(
				letters,
				7,
				{ opacity: 0, ease: Power4.easeOut },
				0.5,
				"-=4"
			);
		}
		/** Gets timeline after animateSVG! */
		animateButtons() {
			console.log("this.animateButtons()");
			this.tl.addLabel("buttons", "-=7");
			this.tl.from(
				this.$refs.findOutMoreButton,
				4,
				{ y: 100, opacity: 0, ease: Power4.easeOut },
				"buttons"
			);
			this.tl.from(
				this.$refs.callButton,
				5,
				{ y: 100, opacity: 0, ease: Power4.easeOut },
				"buttons+=0.5"
			);
		}
	}
</script>

<style lang="scss">
	svg.landing-page-bg {
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0.01;
		height: 100vh;
		z-index: -5;
	}
	.invisible {
		opacity: 0;
	}
	#landing-page {
		height: calc(100vh - calc(#{$global-padding-vertical}* 2));

		#landing-page-container {
			display: flex;
			flex-direction: row;
			height: 100%;

			#text-container {
				display: flex;
				flex-direction: column;
				flex-basis: 61%;
				#buttons {
					display: flex;
					flex-direction: row;

					.button {
						cursor: pointer;
						font-weight: 400;
						padding: calc(0.8rem + 1vh) calc(0.8rem + 2vw);
						border-radius: 2rem;

						&#dowiedz-sie-wiecej {
							margin-right: calc(1rem + 1vw);
							border: 1.5px solid $vibrant-blue;
							color: $vibrant-blue;
						}

						&#zadzwon {
							display: flex;
							justify-content: center;
							align-items: center;
							background-color: $vibrant-blue;
							width: calc(5rem + 3vw);
							justify-content: space-between;
						}
					}
				}
				h1 {
					font-weight: 600;
					font-size: 2.5rem;

					small {
						font-size: inherit;
						font-weight: 100;
					}
				}
				h2 {
					color: $muted-white;
					font-weight: 300;
				}

				#description-container {
					height: 100%;

					#description {
						margin-top: 2rem;
						color: lighten($muted-white, 20%);
						font-size: 1.2rem;
						width: calc(61% + 5rem);
						display: flex;
						flex-direction: column;
						height: 70%;
						justify-content: center;

						#main-description {
							color: white;
							font-weight: 300;
						}
					}
				}
			}

			#logotype {
				display: flex;
				flex-direction: column;
				justify-content: center;

				flex-grow: 1;

				svg.logo {
					width: 100%;
					$logo-padding: 2rem;
					width: calc(100% - #{$logo-padding} * 2);
					height: auto;
					padding: $logo-padding;
					padding-bottom: 0;
				}

				svg.logo-text {
					align-self: center;
					margin-top: 1vh;
					width: 25%;
					height: auto;
				}
			}
		}
	}
</style>
