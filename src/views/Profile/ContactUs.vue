<!-- TODO ligar dados dessa página para config no banco de dados definida pelo admin -->

<script>
export default {
	data() {
		return {};
	},
	methods: {},
	created() { },
};
</script>

<template>
	<div class="contact-page mt-100">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
		<a href="https://wa.me/55(aqui seu numero com ddd | tudo junto)?text=Texto" style="" class="btn-wpp"
			target="_blank">
			<i style="margin-top:16px" class="fa fa-whatsapp"></i>
		</a>
		<p class="not-mobile desk">Página apenas mobile.</p>

		<section class="content mobi">
			<h3 class="cont-oran-subtt">Contate-nos</h3>

			<!--Telefone-->
			<div class="group-data">
				<h3 class="cont-oran-subtt"><i class="fa-solid fa-phone"></i> Telefone</h3>
				<a href="tel:08002227700" class="def-txt underline">0800 222 7700</a>
			</div>

			<!--Email-->
			<div class="group-data">
				<h3 class="cont-oran-subtt"><i class="fa-regular fa-envelope"></i> E-mail</h3>
				<a href="mailto:sac@aldeiapet.com.br" class="def-txt underline">
					sac@aldeiapet.com.br
				</a>
			</div>

			<!--Endereço-->
			<div class="group-data">
				<h3 class="cont-oran-subtt"><i class="fa-solid fa-location-dot"></i> Endereço</h3>
				<a href="https://go.gl/" class="def-txt">
					Rua Getúlio de Morais, S/N, Jardim Indaia, Nerópolis - Goiás
				</a>
			</div>
		</section>
	</div>
</template>

<style scoped>
.btn-wpp {
	position: fixed;
	width: 60px;
	height: 60px;
	bottom: 25px;
	right: 30px;
	background-color: #25d366;
	color: #FFF;
	border-radius: 50px;
	text-align: center;
	font-size: 30px;
	box-shadow: 1px 1px 2px #888;
	z-index: 1000;
}
</style>
