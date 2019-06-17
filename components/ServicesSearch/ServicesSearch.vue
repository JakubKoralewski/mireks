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
					 placeholder="Jestem zainteresowany VATem"
					 spellcheck="false"
					 v-model="searchText"
					 @keyup.enter="search()"
					 @input="handleSearchInput()"
					/>
					<font-awesome-icon
					 icon="search"
					 @click="search()"
					/>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts" src="./ServicesSearch.ts"></script>
<style lang="scss" src="./ServicesSearch.scss"></style>
