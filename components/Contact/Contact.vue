<template>
	<section id="contact">
		<h1>Skontaktuj się z nami!</h1>
		<div
		 id="contact-container"
		 :style="`--length: ${contacts.length}; ${anyHover ? `--hoverIndex: ${hoverIndex}` : ''}`"
		 :class="{'active-hover': anyHover, 'active-selected': anySelected}"
		>
			<ContactElement
			 v-for="( contact, index ) in contacts"
			 :class="{'last': index + 1 === contacts.length, 'reverse': reverseIndex === index}"
			 :index="index"
			 ref="contacts"
			 :key="contact.id"
			 :contact="contact"
			 :style="`--index: ${index};`"
			 @clicked="contactClicked"
			 @closed="contactClosed"
			/>
		</div>
		<div id="contact-form">

		</div>
		<div id="map">

		</div>
	</section>
</template>

<script lang="ts" src="./Contact.ts"></script>
<style lang="scss" src="./Contact.scss" scoped></style>
