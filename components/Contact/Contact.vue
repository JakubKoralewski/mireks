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
			<form
			 name="contact-form"
			 data-netlify="true"
			 data-netlify-recaptcha="true"
			 netlify-honeypot="nie-wpisuj-tego"
			 @submit.prevent="contactFormSubmit"
			>
				<label for="name">
					Twoje imię:
				</label>
					<input
					 type="text"
					 name="name"
					 v-model="form.name"
					>
				<label for="e-mail">
					Twój e-mail:
				</label>
					<input
					 type="text"
					 name="e-mail"
					 v-model="form.email"
					>
				<label for="body">
					Twoja wiadomość:
				</label>
					<textarea
					 name="body"
					 v-model="form.body"
					></textarea>
				<label for="nie-wpisuj-tego">
					Nie wpisuj tego:
				</label>
					<input
					 type="text"
					 name="nie-wpisuj-tego"
					 v-model="form.honeypot"
					>
				<div data-netlify-recaptcha="true"></div>
				<button>Wyślij</button>
			</form>
		</div>
		<div id="map">

		</div>
	</section>
</template>

<script lang="ts" src="./Contact.ts"></script>
<style lang="scss" src="./Contact.scss" scoped></style>
