<template>
	<main class="global-padding">
		<LandingPage @findOutMoreClick="findOutMoreClick" />
		<section id="dlaczego-my" ref="whyUs">
			<h1>Dlaczego my?</h1>
			<img
			 src="mireks_bg.jpg"
			 alt="Siedziba biura rachunkowego Mireks"
			>
		</section>

	</main>
</template>

<script lang="ts">
	import { Component, Vue } from "nuxt-property-decorator";
	import LandingPage from "@/components/LandingPage.vue";

	@Component({
		components: {
			LandingPage
		}
	})
	export default class Index extends Vue {
		findOutMoreClick() {
			console.log('findOutMoreClick()');
			( this.$refs.whyUs as HTMLElement ).scrollIntoView({behavior: "smooth"});
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
		scroll-snap-type: proximity;
		scroll-snap-points-y: repeat(100vh);
		scroll-snap-type: y proximity;
		overflow-x: hidden;
		overflow-y: scroll;
		scroll-padding-top: $global-padding-vertical;
	}

	main {
		z-index: -10;

		section {
			scroll-snap-align: start;
			scroll-snap-stop: normal;
		}
	}

	.global-padding {
		padding: $global-padding-vertical $global-padding-horizontal;
	}

	#dlaczego-my {
		margin-top: calc(#{$global-padding-vertical} * 2);
		height: 100vh;

		img {
			position: absolute;
			transform: translate(-50%, 0);
			width: 100vw;
			left: 50%;
			object-fit: cover;
			height: 80vh;
		}
	}
</style>
