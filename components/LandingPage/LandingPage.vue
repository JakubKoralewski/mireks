<template>
	<section id="landing-page">
		<img
		 svg-inline
		 src="@/other_assets/landing-page-bg.svg"
		 class="landing-page-bg"
		/>
		<div id="landing-page-container">
			<div id="text-container">
				<div id="text-inner-container">
					<h1><small>FHU</small> MIREKS</h1>
					<h2>Mirosław Koralewski</h2>
					<div id="description-container">
						<div id="description">
							<div id="main-description">
								Jesteśmy doświadczonym biurem rachunkowym z tradycją.
								Od 25 lat firma prowadzona jest przez Mirosława Koralewskiego niezmiennie
								w tym samym miejscu - na ulicy Nakwasińskiej 1 w Koźminku.
							</div>
							<br />
							Zapraszamy!
						</div>
					</div>
				</div>
				<div id="logotype">
					<transition name="fade">
						<Loading v-if="!beGoneVileManBeGoneFromMe" />
					</transition>
					<img
					 svg-inline
					 src="@/other_assets/logo.svg"
					 :class="['logo', { 'disappear-at-start': disappearAtStart }]"
					 ref="logo"
					/>
					<img
					 svg-inline
					 src="@/other_assets/logo-text.svg"
					 :class="['logo-text', { 'disappear-at-start': disappearAtStart }]"
					 ref="logoText"
					/>
				</div>

			</div>
			<div
			 id="buttons"
			 :class="{ 'disappear-at-start': disappearAtStart }"
			>
				<div
				 class="button"
				 id="dowiedz-sie-wiecej"
				 @click="() => this.$emit('findOutMoreClick')"
				 ref="findOutMoreButton"
				>
					Dowiedz się więcej
				</div>

				<a
				 class="button"
				 id="zadzwon"
				 ref="callButton"
				 @[!isTouchScreen?`click`:``]="() => this.$emit('callButtonClickScroll')"
				 :[isTouchScreen?`href`:``]="'tel:+48 62 763 74 10'"
				>
					<font-awesome-icon icon="phone" />
					Zadzwoń
				</a>
			</div>

		</div>
	</section>

</template>
<script lang="ts" src="./LandingPage.ts"></script>
<style lang="scss" src="./LandingPage.scss" scoped></style>
