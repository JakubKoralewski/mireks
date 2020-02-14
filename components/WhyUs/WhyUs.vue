<template>
	<section
	 id="dlaczego-my"
	 ref="whyUs"
	>
		<h1>Dlaczego my?</h1>
		<div id="mireks-bg-container">
			<div id="grid-container">
				<div id="grid">
					<h1 ref="whyUsSubTitle">Firma z tradycjami</h1>
					<div
					 id="description"
					 ref="whyUsDescription"
					>
						Jesteśmy nowoczesną firmą z tradycją sięgająca 25 lat świadczenia usług rachunkowych
						oraz doradczych. Dążąc do wyznaczania nowych standardów obsługi klienta dbamy o komfort
						i jakość świadczonych przez nas usług. Szeroka gama ofert naszego biura
						specjalizuje się w świadczeniu usług rachunkowych w:<br /> małych i średnich przedsiębiorstwach,
						spółkach oraz jednoosobowych podmiotach gospodarczych.

						<br />
						<br />

						Obsługujemy te (i nie tylko) wyżej wymienione firmy w zakresie pełnej księgowości
						i obsługi kadrowo-płacowej włącznie z rozliczeniami do Urzędu Skarbowego (VAT, CIT, PIT)
						oraz ZUS (deklaracji rozliczeniowych). Służymy fachową poradą oraz pomocą na każdym
						etapie współpracy.
					</div>
					<div id="numbers-container">
						<div id="numbers">
							<div
							 id="changing-numbers"
							 ref="changingNumbers"
							>
								<!-- Last clone at beginning -->
								<div
								 class="changing-number"
								 id="-1 last-clone"
								 style="left: -100%"
								>
									<div id="number-description">
										{{numbers[numbers.length-1].description}}
									</div>
									<div id="number">
										{{numbers[numbers.length-1].number}}
									</div>
								</div>
								<div
								 v-for="(number, index) in numbers"
								 :key="index"
								 class="changing-number"
								 :id="index"
								 :style="`left: ${100* index}%`"
								>
									<div id="number-description">
										{{numbers[index].description}}
									</div>
									<div id="number">
										{{numbers[index].number}}
									</div>
								</div>
								<!-- First clone at end -->
								<div
								 class="changing-number"
								 :id="`${numbers.length} first-clone`"
								 :style="`left: ${100* numbers.length}%`"
								>
									<div id="number-description">
										{{numbers[0].description}}
									</div>
									<div id="number">
										{{numbers[0].number}}
									</div>
								</div>
							</div>
						</div>
						<div id="controls">
							<div
							 id="control-left"
							 class="circle controls"
							 ref="changingNumbersControlLeft"
							 :style="`transform: ${STARTING_LEFT_TRANSFORM};`"
							/>
							<div
							 id="control"
							 class="circle controls"
							 ref="changingNumbersControl"
							/>
							<div
							 id="control-right"
							 class="circle controls"
							 ref="changingNumbersControlRight"
							 :style="`transform: ${STARTING_RIGHT_TRANSFORM};`"
							/>
							<div id="circles">
								<div
								 v-for="(number, index) in numbers"
								 :key="index"
								 class="circle"
								 @click="changeNumber(index)"
								/>
							</div>
						</div>
					</div>
				</div>
				<img
				 svg-inline
				 src="@/other_assets/landing-page-bg.svg"
				 class="mireks-bg-shape"
				 preserveAspectRatio="none"
				/>
				<div id="picture">

					<picture id="mireks-bg-img">
						<source
						 srcset="/mireks_bg.webp"
						 type="image/webp"
						>
						<img
						 src="/mireks_bg.jpg"
						 alt="Siedziba firmy Mireks"
						>
					</picture>

				</div>
				<!-- <div
				 id="mireks-bg-img"
				 ref="bgImg"
				/> -->
			</div>
		</div>
	</section>
</template>

<script lang="ts" src="./WhyUs.ts"></script>
<style lang="scss" src="./WhyUs.scss" scoped></style>
