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
			 @submit.prevent="contactFormSubmit"
			 action=""
			 name="contact-form"
			 data-netlify="true"
			 data-netlify-recaptcha="true"
			 netlify-honeypot="nie-wpisuj-tego"
			>
				<label for="name">
					Twoje imię:
					<input
					 type="text"
					 id="name"
					 name="name"
					 v-model="form.name"
					>
				</label>
				<label for="mail">
					Twój e-mail:
					<input
					 type="text"
					 id="e-mail"
					 name="e-mail"
					 v-model="form.email"
					>
				</label>
				<label for="body">
					Twoja wiadomość:
					<textarea
					 id="body"
					 name="body"
					 v-model="form.body"
					></textarea>
				</label>
				<label
				 for="nie-wpisuj-tego"
				 class="hidden"
				>
					Nie wpisuj tego:
					<input
					 type="text"
					 name="nie-wpisuj-tego"
					 v-model="form.honeypot"
					>
				</label>
				<div data-netlify-recaptcha="true"></div>
				<button type="submit">Wyślij</button>
			</form>
		</div>
		<div id="map">

		</div>
	</section>
</template>

<script lang="ts" src="./Contact.ts"></script>
<style lang="scss" src="./Contact.scss" scoped></style>
