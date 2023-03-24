<script>
export default {
	data() {
		return {
			hideRoutes: [
				"product",
				"cart",
				"profile_address",
				"reset-password-mobile",
				"profile_address_create",
				"profile_address_edit",
				"contact_us",
				"profile_pets",
				"profile_pets_create",
				"profile_pets_edit",
				"shipping-confirm",
				"order-confirm",
				"profile_cards",
				"profile_cards_create",
				"profile_edit",
				"pagamentos",
				"order-final",
				"product",
				"parcela",
			],
			usefulLinks: [
				{
					label: "Aviso de privacidade",
					url: "/page/privacy-policy",
				},
				{
					label: "Política de Cookies",
					url: "/page/cookies-policy",
				},
				{
					label: "Política de trocas e devoluções",
					url: "/page/refund-policy",
				},
				{
					label: "Política de compra",
					url: "/page/buy-policy",
				},
				{
					label: "Política de ética e conduta",
					url: "/page/codigo-etica-conduta",
				},
				{
					label: "Política de frete e entrega",
					url: "/page/delivery-policy",
				},
				{
					label: "Termos e Condições",
					url: "/page/terms-conditions",
				},
			],
			originLink: "",
		};
	},
	methods: {
		isHidden() {
			return this.hideRoutes.indexOf(this.$route.name) >= 0;
		},
	},
	mounted() {
		this.originLink = window.location.origin;
	},
};
</script>
<template>
	<div class="low-nav-bar fc mobi" v-if="!isHidden()">
		<!--Btn-->
		<div class="itens-lnb">
			<router-link to="/" class="this-btn">
				<i class="fa-solid fa-house"></i>
				<p>Início</p>
			</router-link>
		</div>

		<!--Btn-->
		<div class="itens-lnb">
			<router-link to="/busca" class="this-btn">
				<i class="fa-solid fa-magnifying-glass"></i>
				<p>Buscar</p>
			</router-link>
		</div>

		<!--Btn-->
		<div class="itens-lnb">
			<router-link to="/pedidos" class="this-btn">
				<i class="fa-solid fa-clipboard-list"></i>
				<p>Pedidos</p>
			</router-link>
		</div>

		<!--Btn-->
		<div class="itens-lnb">
			<router-link to="/perfil" class="this-btn">
				<i class="fa-solid fa-user"></i>
				<p>Perfil</p>
			</router-link>
		</div>
	</div>
	<footer class="desk">
		<div class="box">
			<!--Logo-->
			<img class="logo-footer" src="@/assets/images/logo-89x33.png" alt="logo white" />
			<hr class="def-divider" />
			<div class="fc rows-footer">
				<!--Coluna-->
				<div class="row-item-foo">
					<div class="bloco">
						<h3 class="subtt white">Como podemos ajudar você?</h3>
						<p class="def-txt white">
							Conheça mais sobre nossa empresa, políticas e tenha o melhor atendimento
							do mercado pet.
						</p>
					</div>
					<div class="bloco">
						<h3 class="subtt white">Central de atendimento</h3>
						<a class="fc contact-link" href="#">
							<i class="fa-regular fa-envelope"></i>
							<span>E-mail</span>

							<a class="contact-link">
								<span>Sac@aldeiapet.com.br</span>
							</a>

							<a class="fc contact-link" href="#">
								<i class="fa-solid fa-phone"></i>
								<span>Telefone</span>
							</a>
							<span class="contact-link"> 08002227700 </span>
							<span class="contact-link">
								<a
									href="https://api.whatsapp.com/send?phone=08002227700"
									style="margin-left: 0.5rem; font-size: 1.1rem"
								>
									<i class="fa fa-whatsapp" aria-hidden="true"></i>
								</a>
							</span>
						</a>
					</div>

					<div class="bloco">
						<h3 class="subtt white" style="margin-bottom: 1rem">
							Horário de atendimento
						</h3>
						<span style="color: white"> Segunda a Sexta: 8:00 às 17:30 </span>
						<br />
						<span style="color: white">Sábados: 8:00 às 11:30</span>
					</div>

					<div class="bloco">
						<h3 class="subtt white">Selos</h3>
						<div class="fc selos-row">
							<a
								href="https://transparencyreport.google.com/safe-browsing/search?url=aldeiapet.com.br"
							>
								<img src="@/assets/images/safe.png" alt="Selo Google" />
							</a>
							<a href="https://www.ebit.com.br/reputacao-de-lojas">
								<img src="@/assets/images/ebit.png" alt="Selo ebit" />
							</a>
							<a href="https://www.reclameaqui.com.br/ranking/">
								<img src="@/assets/images/ra100.png" alt="Selo Reclame Aqui" />
							</a>
						</div>
					</div>
				</div>
				<!--Coluna-->
				<div class="row-item-foo">
					<div class="bloco">
						<h3 class="subtt white">Onde Estamos</h3>
					</div>
					<div class="bloco">
						<h3 class="subtt white">Baixe o App</h3>
						<a href="https://play.google.com/store/apps/details?id=br.com.aldeiapet">
							<img
								src="@/assets/images/play-store-logo.png"
								alt="Download na Play Store"
								class="download-img"
							/>
						</a>
						<a href="https://apps.apple.com/us/app/aldeiapet/id1626154879">
							<img
								src="@/assets/images/app-store-logo.png"
								alt="Download na App Store"
								class="download-img"
							/>
						</a>
					</div>
				</div>
				<!--Coluna-->
				<div class="row-item-foo">
					<div class="bloco" v-if="originLink">
						<h3 class="subtt white">Institucional</h3>
						<a :href="originLink + '/page/about'" class="menu-foo def-txt white">
							Empresa
						</a>
						<a
							:href="originLink + '/page/terms-conditions'"
							class="menu-foo def-txt white"
						>
							Termos de uso e condições
						</a>
						<a :href="originLink + '/page/ethic'" class="menu-foo def-txt white">
							Canal de ética e conduta
						</a>
					</div>
					<div class="bloco">
						<h3 class="subtt white">Opções do Lojista</h3>
						<a href="/seller/login" class="menu-foo def-txt white"
							>Entrar como lojista</a
						>
						<a href="/seller/register" class="menu-foo def-txt white"
							>Cadastre-se como Lojista</a
						>
					</div>
				</div>
				<!--Coluna-->
				<div class="row-item-foo">
					<div class="bloco" v-if="originLink">
						<h3 class="subtt white">Links Úteis</h3>

						<ul class="links-list">
							<li v-for="link in usefulLinks" v-bind:key="link.label">
								<a :href="originLink + link.url">
									{{ link.label }}
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<hr class="def-divider" />
			<div class="fc logos-row">
				<img src="@/assets/icons/visa.svg" alt="visa" />
				<img src="@/assets/icons/master-card.svg" alt="mastercard" />
				<img src="@/assets/icons/amazon-pay.svg" alt="amazon-pay" />
				<img src="@/assets/icons/elo.png" alt="elo" />
				<img src="@/assets/icons/banescard.png" alt="banescard" />
				<img src="@/assets/icons/hiper.png" alt="hiper" />
				<img src="@/assets/icons/hipercard.png" alt="hipercard" />
				<img src="@/assets/icons/jcb.png" alt="jcb" />
				<img src="@/assets/icons/amex.png" alt="amex" />
				<img src="@/assets/icons/aura.png" alt="aura" />
			</div>
			<p class="copyright def-txt">
				ALDEIAPET MARKETPLACE LTDA - CNPJ 43327577000115, R GETULIO DE MORAIS S/N QUADRA
				004A LOTE 0004, JARDIM INDAIA, NEROPOLIS - GOIAS , 75.460-000, Compra segura - A
				Aldeia Pet garante segurança para suas informações pessoais e financeiras
			</p>
		</div>
	</footer>
</template>

<style scoped>
.links-list {
	list-style: none;
	color: white;
	margin-top: 1rem;
}

.links-list li {
	margin: 0.5rem 0;
}

.links-list li:hover,
.links-list li:active {
	cursor: pointer;
	color: var(--main-color);
}

.contact-link {
	cursor: default;
}
</style>
