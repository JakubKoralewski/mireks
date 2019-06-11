<template>
	<main class="global-padding">
		<section id="landing-page">
			<object
			 data="landing-page-bg.svg"
			 type="image/svg+xml"
			 id="landing-page-bg"
			 ref="landing-page-bg"
			></object>
			<div id="landing-page-container">
				<div id="text-container">
					<h1>FHU MIREKS</h1>
					<h2>Mirosław Koralewski</h2>
					<div id="description">
						Jesteśmy doświadczonym biurem rachunkowym z tradycją.
						Od 25 lat firma prowadzona jest przez Mirosława Koralewskiego bezustannie
						w tym samym miejscu - na ulicy Nakwasińskiej 1 w Koźminku.
						<br />
						<br />
						Zapraszamy!
					</div>

					<div id="buttons">
						<div
						 class="button"
						 id="dowiedz-sie-wiecej"
						>
							Dowiedz się więcej
						</div>

						<div
						 class="button"
						 id="zadzwon"
						>
							<font-awesome-icon icon="phone" />
							Zadzwoń
						</div>
					</div>

				</div>
				<div id="logotype">
					<object
					 data="logo.svg"
					 type="image/svg+xml"
					 id="logo"
					></object>
					<object
					 data="logo-text.svg"
					 type="image/svg+xml"
					 id="logo-text"
					></object>
				</div>
			</div>
		</section>
		<section id="about">

		</section>

	</main>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	@Component({})
	export default class Index extends Vue {
		/* backgroundSVG!: HTMLElement;
			backgroundSVGObject!: HTMLObjectElement;
			mounted() {
				this.backgroundSVGObject = this.$refs[
					"landing-page-bg"
				] as HTMLObjectElement;

				if (this.backgroundSVGObject.getSVGDocument()) {
					// If it is already loaded
					this.backgroundSVGObjectLoaded();
				} else {
					this.backgroundSVGObject.onload = this.backgroundSVGObjectLoaded;
				}
			}
			backgroundSVGObjectLoaded() {
				this.backgroundSVG = this.backgroundSVGObject.getSVGDocument().documentElement;
				if (window.innerWidth > window.innerHeight) {
					// Width bigger than height

					this.backgroundSVG.style.width = window.innerWidth.toString();
					this.backgroundSVG.style.height = "";
				} else {
					console.log("setting height to ", window.innerHeight);
					this.backgroundSVGObject.style.height = window.innerHeight.toString();
					this.backgroundSVGObject.style.width = "";
				}
			 }*/
	}
</script>

<style lang="scss">
	html {
		background-color: #0a1020;
		color: white;
		font-weight: 200;
	}

	main {
		z-index: -10;
	}

	$muted-white: #8c8e93;
	$vibrant-blue: #0ec7ff;

	$global-padding-vertical: calc(10vw + 2rem);
	$global-padding-horizontal: calc(10vh + 2rem);

	.global-padding {
		padding: $global-padding-horizontal $global-padding-vertical;
	}

	#about {
		height: 600px;
	}

	#buttons {
		display: flex;
		flex-direction: row;

		margin-top: auto;

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
	#landing-page-bg {
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0.01;
		@media screen and (orientation: landscape) {
			width: 100vw;
		}
		@media screen and (orientation: portrait) {
			height: 100vh;
		}
		z-index: -5;
	}
	#landing-page {
		height: calc(100vh - #{$global-padding-vertical});

		#landing-page-container {
			display: flex;
			flex-direction: row;

			#text-container {
				display: flex;
				flex-direction: column;
				//flex-grow: 2;
				flex-basis: 61%;
				h1 {
					font-weight: 600;
					font-size: 2.5rem;
				}
				h2 {
					color: $muted-white;
					font-weight: 200;
				}

				#description {
					margin-top: 2rem;
					color: lighten($muted-white, 20%);
					font-size: 1.2rem;
					width: calc(61% + 5rem);

					br {
						@media screen and (max-width: 900px) {
							display: none;
						}
					}
				}
			}

			#logotype {
				//width: 39vw;
				display: flex;
				flex-direction: column;

				flex-grow: 1;

				#logo {
					width: 100%;
				}

				#logo-text {
					align-self: center;
					margin-top: 0.5rem;
					width: 30%;
				}
			}
		}
	}
* {
  border: 1px solid #f00 !important;
}
</style>
