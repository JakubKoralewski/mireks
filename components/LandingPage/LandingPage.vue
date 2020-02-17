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
								Od 25 lat firma prowadzona jest przez Mirosława Koralewskiego
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
				<a
				 class="button"
				 id="napisz-do-nas"
				 @click="fbMessageClick"
				 ref="fbMessageButton"
				 href="https://m.me/biurokoralewski"
				 target="_blank"
				>
					<font-awesome-icon :icon="['fab', 'facebook-messenger']" />
					Napisz<br> do nas
					<font-awesome-icon icon="external-link-alt" />
				</a>

				<a
				 class="button"
				 id="zadzwon"
				 ref="callButton"
				 @click="callButtonClickScroll"
				 :[isTouchScreen?`href`:``]="'tel:+48 62 763 74 10'"
				>
					<font-awesome-icon icon="phone"  />
					Zadzwoń
				</a>
			</div>

		</div>
	</section>

</template>
<script lang="ts" src="./LandingPage.ts"></script>
<style lang="scss" src="./LandingPage.scss" scoped></style>
