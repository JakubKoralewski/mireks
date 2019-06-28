<template>
	<main class="global-padding">
		<LandingPage
		 @findOutMoreClick="findOutMoreClick"
		 @callButtonClickScroll="callButtonClickScroll"
		/>
		<WhyUs />
		<Infographic />
		<ServicesSearch />
		<Contact ref="contact" />
		<Footer />
	</main>
</template>

<script lang="ts">
	import { Component } from "nuxt-property-decorator";

	import LandingPage from "@/components/LandingPage/LandingPage";
	import WhyUs from "@/components/WhyUs/WhyUs";
	import Infographic from "@/components/Infographic/Infographic";
	import ServicesSearch from "@/components/ServicesSearch/ServicesSearch";
	import Contact from "@/components/Contact/Contact";
	import Footer from "@/components/Footer/Footer";

	import IsTouchScreen from "@/components/mixins/IsTouchScreen";

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
	export default class Index extends IsTouchScreen {
		findOutMoreClick() {
			console.log("findOutMoreClick()");
			document
				.querySelector("#dlaczego-my")!
				.scrollIntoView({ behavior: "smooth" });
		}
		callButtonClickScroll() {
			console.log("callButtonClickScroll");
			const contact = this.$refs.contact as Contact;
			(contact.$el as HTMLElement).scrollIntoView();
			contact.showPhoneNumber();
		}
		
		mounted() {
			const xd = this.$refs.xd;
			( xd as any ).xd.xd.xd = "XD";
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
		overflow-x: hidden;
		overflow-y: scroll;
		// scroll-padding-top: $global-padding-vertical;
	}
</style>


<style lang="scss" scoped>
	main {
		z-index: -10;
		scroll-snap-type: y mandatory;

		&::v-deep section {
			scroll-snap-align: start;
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
