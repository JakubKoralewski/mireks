<template>
	<div
	 :class="[{'hover': contact.hover, 'selected': contact.selected}, 'contact']"
	 :id="contact.id"
	 :index="index"
	 @mouseenter="contact.hover = true"
	 @mouseleave="contact.hover = false"
	 @click="clicked"
	>
		<font-awesome-icon
		 class="icon"
		 :icon="contact.icon"
		/>
		<div class="info-container">
			<div class="subtitle">{{contact.subtitle}}</div>
			<div
			 v-if="!contact.link"
			 class="info"
			 v-html="contact.info"
			/>
			<a
			 v-else
			 class="info"
			 :[isTouchScreenHref]="contact.link"
			 target="_blank"
			 v-html="contact.info"
			/>
		</div>
		<font-awesome-icon
		 :icon="[ 'far', 'copy' ]"
		 @click="copyClicked"
		 :title="copyText"
		 @mouseleave="copyTextReset"
		/>
		<font-awesome-icon
		 icon="times"
		 :class="{'visible': contact.selected}"
		 @click="closeButtonClicked"
		/>
	</div>
</template>

<script lang="ts" src="./ContactElement.ts"></script>
<style lang="scss" src="./ContactElement.scss"></style>
