<template>
	<section id="footer">
		<div id="footer-container">

			<div id="logotype">
				<img
				 svg-inline
				 src="@/other_assets/logo.svg"
				 class="logo"
				 ref="logo"
				/>
				<span id="description">
					Firma Handlowo-Usługowa<br /> Mireks Mirosław Koralewski
				</span>
			</div>
			<div id="middle">

				<div id="nip-regon">
					<b>NIP:</b>
					6181009277<br />
					<b>REGON:</b>
					250454919<br />
					<b>Świadectwo kwalfikacyne:</b>
					nr 20113/2000
				</div>
				<div id="business-time">
					<b>Godziny otwarcia:</b>
					<span>Pon: 8:00-16:00</span>
					<span>Wt: 8:00-16:00</span>
					<span>Śr: 8:00-16:00</span>
					<span>Czw: 8:00-16:00</span>
					<span>Pt: 8:00-16:00</span>
					<span>Sob: zamknięte</span>
					<span>Nd: zamknięte</span>
				</div>
			</div>
			<div id="other">
				<div id="address">
					<b>Adres:</b>
					62-840 Koźminek,<br />
					ul.Nakwasińska 1
				</div>
				<div id="phone-number">
					<b>Telefon:</b>
					+48 62 763 74 10
				</div>
				<div id="e-mail">
					<b>Email:</b>
					mireks40<br />@poczta.onet.pl
				</div>
				<div id="fb">
					<b>Facebook:</b>
					<span>
						<font-awesome-icon icon="link" />
						<a href="https://fb.me/biurokoralewski">fb.me/biurokoralewski</a>
					</span>
					<b>Napisz do nas:</b>
					<span>
						<font-awesome-icon icon="link" />
						<a href="https://m.me/biurokoralewski">m.me/biurokoralewski</a>
					</span>
				</div>
			</div>
		</div>
		<a
		 id="credits"
		 href="https://jakubkoralewski.pl/pl"
		 target="_blank"
		>
			<div id="text">
				Strona wykonana przez <br />
				<b>Jakuba Koralewskiego</b>
			</div>
			<font-awesome-icon icon="external-link-alt" />
		</a>
		<font-awesome-icon icon="font-awesome" />
	</section>
</template>

<script lang="ts" src="./Footer.ts"></script>
<style lang="scss" src="./Footer.scss" scoped></style>
