<template>
	<div
	 :class="[{visible: isVisible(searchText)}, 'service']"
	 itemprop="itemOffered"
	 itemscope
	 itemtype="http://schema.org/Service"
	>
		<span
		 itemprop="provider"
		 itemscope
		 itemtype="http://schema.org/AccountingService"
		>
			<meta
			 itemprop="itemid"
			 content="mireks_accounting_service"
			/>
		</span>
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
