<template>
	<main class="global-padding">
		<LandingPage />
		<section id="about">

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

	.global-padding {
		padding: $global-padding-horizontal $global-padding-vertical;
	}

	#about {
		height: 600px;
	}

</style>
