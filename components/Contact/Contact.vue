<template>
	<section id="contact">
		<h1>Skontaktuj się z nami!</h1>
		<div
		 id="contact-container"
		 :style="`--length: ${contacts.length}; ${anyHover ? `--hoverIndex: ${hoverIndex}` : ''}`"
		 :class="{
			'active-hover': anyHover && hoverIndex !== (contacts.length - 1),
			'active-selected': anySelected,
			'small-viewport': smallViewport,
			'big-viewport': !smallViewport
		 }"
         ref="contacts"
		>
			<ContactElement
			 v-for="( contact, index ) in contacts"
			 :class="{
				'last': index + 1 === contacts.length,
			 	'reverse': contact.reverse,
			 }"
			 :index="index"
			 :key="contact.id"
			 :contact="contact"
			 :style="`--index: ${index};`"
			 :smallViewport="smallViewport"
			 :title="(!contact.selected && index !== (contacts.length - 1)) ? contact.subtitle : ``"
			 @clicked="contactClicked"
			 @closed="contactClosed"
			/>
		</div>
		<div id="contact-form">

		</div>
		<div id="map">
			<div id="map-container">
				<div class="overlay" />
				<iframe
				 id="gmap_canvas"
				 src="https://maps.google.com/maps?q=mireks%20ko%C5%BAminek&t=&z=14&ie=UTF8&iwloc=&output=embed"
				 frameborder="0"
				 scrolling="no"
				 marginheight="0"
				 marginwidth="0"
				>
				</iframe>
			</div>
		
		</div>
	</section>
</template>

<script lang="ts" src="./Contact.ts"></script>
<style lang="scss" src="./Contact.scss" scoped></style>
