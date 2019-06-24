<template>
	<main class="global-padding">
		<LandingPage @findOutMoreClick="findOutMoreClick" />
		<WhyUs ref="whyUs" />
		<Infographic />
		<ServicesSearch />
		<Contact />
		<Footer />
	</main>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";

	import LandingPage from "@/components/LandingPage/LandingPage";
	import WhyUs from "@/components/WhyUs/WhyUs";
	import Infographic from "@/components/Infographic/Infographic";
	import ServicesSearch from "@/components/ServicesSearch/ServicesSearch";
	import Contact from "@/components/Contact/Contact";
	import Footer from "@/components/Footer/Footer";

	@Component({
		components: {
			LandingPage,
			WhyUs,
			Infographic,
			ServicesSearch,
			Contact,
			Footer
		}
	})
	export default class Index extends Vue {
		findOutMoreClick() {
			console.log("findOutMoreClick()");
			document
				.querySelector("#dlaczego-my")!
				.scrollIntoView({ behavior: "smooth" });
		}
	}
</script>

<style lang="scss">
	html {
		background-color: $bg-color;
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
		overflow-x: hidden;
		
		@media screen and (max-width: 600px) {
			padding-top: $global-padding-top-override-amount;
		}
	}
</style>
