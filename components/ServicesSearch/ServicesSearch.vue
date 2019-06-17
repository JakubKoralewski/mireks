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
					 v-model="searchText"
					 ref="searchInput"
					 @keyup.enter="search()"
					 @input="handleSearchInput()"
					 @focus="searchInputFocus()"
					 @blur="searchInputBlur()"
					/>
					<font-awesome-icon
					 icon="search"
					 @click="search()"
					/>
				</div>
				<div
				 id="view-type"
				 class="round"
				>
					<font-awesome-icon icon="list" />
					<font-awesome-icon icon="th-large" />
				</div>
			</div>

			<transition-group
			 id="services-container"
			 tag="div"
			 name="services-group"
			>
				<div
				 v-for="service in services"
				 :key="service.title"
				 class="service"
				>
					<div class="title">
						{{service.title}}
					</div>
					<div class="description">
						{{service.description}}
					</div>
				</div>
			</transition-group>
		</div>
	</section>
</template>

<script lang="ts" src="./ServicesSearch.ts"></script>
<style lang="scss" src="./ServicesSearch.scss"></style>
