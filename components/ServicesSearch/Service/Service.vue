<template>
	<div
	 :class="[{visible: service.visible, 'only-list': ( oneVisibleInList && service.visible ) }, 'service']"
	>
		
		<div
		 class="title"
		 :style="`--size: ${40/(service.shortTitle ? service.shortTitle : service.title).length + 12}`"
		>
			{{service.shortTitle ? service.shortTitle : service.title}}
		</div>
		<div
		 class="description"
		 :style="`--size: ${50/service.description.length + 11}`"
		>
			{{service.description}}
		</div>
	</div>
</template>
<script lang="ts" src="./Service.ts"></script>
<style lang="scss" src="./Service.scss" scoped></style>
