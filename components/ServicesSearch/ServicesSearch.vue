<template>
	<section id="services-search">
		<h1>Sprawdź, czy mamy to czego szukasz</h1>

		<div class="round-bg round">
			<div id="top-part">
				<div id="search-bar">
					<input
					 type="text"
					 id="search-bar"
					 class="round"
					 :placeholder="searchPlaceholder"
					 spellcheck="false"
					 ref="searchInput"
					 @input="searchInput"
					 @focus="searchInputFocus()"
					 @blur="searchInputBlur()"
					/>
					<font-awesome-icon icon="search" />
				</div>
				<div
				 id="view-type"
				 class="round"
				>
					<font-awesome-icon
					 icon="list"
					 :class="{active: viewType === VIEW_TYPES.LIST}"
					 @click="viewType = VIEW_TYPES.LIST"
					/>
					<font-awesome-icon
					 icon="th-large"
					 :class="{active: viewType === VIEW_TYPES.GRID}"
					 @click="viewType = VIEW_TYPES.GRID"
					/>
				</div>
			</div>

			<div
			 id="services-container"
			>
				
				<div
				 id="nothing-found"
				 ref="nothingFoundDialog"
				 :class="{visible: displayNothingFoundDialog}"
				>
					<div id="title">
						Nie znalazłeś(aś) oferty dla Siebie?
					</div>
					<div id="description">
						Przykro nam. Skontaktuj się z nami, może coś razem wymyślimy!
					</div>
					<div id="buttons">
						<a
						 :[isTouchScreenHref]="'tel:+48 62 763 74 10'"
						 id="call-us"
						>
							<font-awesome-icon icon="phone" />
							+48 62 763 74 10
						</a>

						<a
						 id="email-us"
						 :href="
							 `mailto:mireks40@poczta.onet.pl
							 	?subject=Nie mogłem(am) znaleźć szukanej przeze mnie oferty
								&body=${new Date().getHours() > 18 ? 'Dobry Wieczór' : 'Dzień Dobry' }!%0A%0A
								
								W waszej ofercie znaleźć nie mogłem(am) znaleźć terminu: %22${searchText}%22.%0A
								Czy można mimo wszystko coś na to poradzić?%0A`
							 "
						 target="_blank"
						>
							<font-awesome-icon icon="at" />
							mireks40<br />@poczta.onet.pl
						</a>
					</div>
				</div>
				<transition-group
				 tag="div"
				 name="services-group"
				 id="services-group"
				 :class="{'nothing-found': displayNothingFoundDialog}"
				>
					<Service
					 v-for="( service, index ) in services"
					 :key="service.title"
					 :class="{list: viewType === VIEW_TYPES.LIST}"
					 :isLast="index + 1 === services.length"
					 :service="service"
					 :searchText="searchText"
					 :oneVisibleInList="oneVisibleInList"
					 @serviceVisible="foundVisibleService"
					 @lastServiceVisible="lastServiceVisible"
					>
					</Service>
				</transition-group>
			</div>
			<div id="gradient-overlay" />
		</div>
	</section>
</template>

<script lang="ts" src="./ServicesSearch.ts"></script>
<style lang="scss" src="./ServicesSearch.scss"></style>
