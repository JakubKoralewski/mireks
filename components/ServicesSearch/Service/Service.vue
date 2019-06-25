<template>
	<div
	 :class="[{visible: isVisible(searchText)}, 'service']"
	 itemprop="itemOffered"
	 itemscope
	 itemtype="http://schema.org/Service"
	>
		<div
		 class="title"
		 :style="`--length: ${50/(service.shortTitle ? service.shortTitle : service.title).length + 10}`"
		 itemprop="name"
		>
			{{service.shortTitle ? service.shortTitle : service.title}}
		</div>
		<div
		 class="description"
		 :style="`--length: ${100/service.description.length + 7}`"
		 itemprop="description"
		>
			{{service.description}}
		</div>
	</div>
</template>
<script lang="ts" src="./Service.ts"></script>
<style lang="scss" src="./Service.scss" scoped></style>
