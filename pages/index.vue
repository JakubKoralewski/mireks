<template>
	<main class="global-padding">
		<LandingPage @findOutMoreClick="findOutMoreClick" />
		<WhyUs ref="whyUs" />
	</main>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import { TweenMax, Elastic, Power4 } from "gsap";
	import ScrollToPlugin from "gsap/umd/ScrollToPlugin";
	import LandingPage from "@/components/LandingPage/LandingPage";
	import WhyUs from "@/components/WhyUs/WhyUs";

	ScrollToPlugin;

	@Component({
		components: {
			LandingPage,
			WhyUs
		}
	})
	export default class Index extends Vue {
		findOutMoreClick() {
			console.log("findOutMoreClick()");
			console.log(this.$refs.whyUs);
			const elementToScrollTo = (this.$refs.whyUs as Vue).$el;
			TweenMax.to(document.documentElement, 4, {
				scrollTo: { y: "#dlaczego-my", offsetY: 50 },
				ease: Power4.easeOut
			});
			// .scrollIntoView({
			// 	behavior: "smooth"
			// });
		}
	}
</script>

<style lang="scss">
	html {
		background-color: #0a1020;
		color: white;
		font-weight: 200;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	body {
		// scroll-snap-type: proximity;
		// scroll-snap-points-y: repeat(100vh);
		// scroll-snap-type: y proximity;
		overflow-x: hidden;
		overflow-y: scroll;
		// scroll-padding-top: $global-padding-vertical;
	}
</style>


<style lang="scss" scoped>
	main {
		z-index: -10;

		section {
			// scroll-snap-align: start;
			// scroll-snap-stop: normal;
		}
	}

	.global-padding {
		padding: $global-padding-vertical $global-padding-horizontal;
	}
</style>
