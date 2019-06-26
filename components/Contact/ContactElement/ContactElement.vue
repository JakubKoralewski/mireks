<template>
	<div
	 :class="[
	 {
		'hover': contact.hover,
	 	'selected': contact.selected,
		'small-viewport': smallViewport,
		'big-viewport': !smallViewport
	}, 'contact']"
	 :id="contact.id"
	 :index="index"
	 @[!smallViewport?`mouseenter`:`touchstart`]="contact.hover = true"
	 @[!smallViewport?`mouseleave`:`touchend`]="contact.hover = false"
	 @[!smallViewport?`click`:``]="clicked"
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
		<div class="copy">
			<font-awesome-icon
			 :icon="[ 'far', 'copy' ]"
			 :class="{'copy-in-progress': copyInProgress}"
			 @[!smallViewport?`click`:`touchstart`]="copyClicked"
			 :title="copyText"
			 @mouseleave="copyTextReset"
			/>
			<span id="copy-text">{{copyText}}</span>
		</div>
		<font-awesome-icon
		 icon="times"
		 :class="{'visible': contact.selected}"
		 @click="closeButtonClicked"
		/>
	</div>
</template>

<script lang="ts" src="./ContactElement.ts"></script>
<style lang="scss" src="./ContactElement.scss"></style>
