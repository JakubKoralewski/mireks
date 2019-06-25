<template>
	<div
	 :class="[{visible: isVisible(searchText)}, 'service']"
	 itemprop="itemOffered"
	 itemscope
	 itemtype="http://schema.org/Service"
	>
		<div
		 class="title"
		 :style="`--size: ${40/(service.shortTitle ? service.shortTitle : service.title).length + 12}`"
		 itemprop="name"
		>
			{{service.shortTitle ? service.shortTitle : service.title}}
		</div>
		<div
		 class="description"
		 :style="`--size: ${50/service.description.length + 11}`"
		 itemprop="description"
		>
			{{service.description}}
		</div>
	</div>
</template>
<script lang="ts" src="./Service.ts"></script>
<style lang="scss" src="./Service.scss" scoped></style>
