<script>
	export default {
		methods: {
			setPayment(type) {
				this.$store.dispatch('payment/setType', type).then(() => {
					this.$router.push({name: 'order-confirm'})
				})
			},
			setCard(card) {
				this.$store.dispatch('payment/setCard', card).then(() => {
					this.$store.dispatch('payment/setType', 'card').then(() => {
						this.$router.push({path: 'parcela'});
					});
				})
			}
		},
		computed: {
			cards() {
				return this.$store.state.profile.cards
			},
			cart() {
				return this.$store.state.cart.carts
			}
		}
	};
</script>
<template>
	<section class="content mobi mt-100">
			<div class="card-list" v-for="card in cards" @click="setCard(card)">
				<div class="el-card fc bg-primary">
					<div class="card-pic">
						<img :src="card.card_brand_logo" alt="" />
					</div>
					<div class="card-info">
						<h4 class="card-info-num white">{{ card.first4 }} **** **** ****</h4>
						<p class="def-txt pet-info-low white">
							Vencimento: {{ card.expiration_month }}/{{ card.expiration_year }}
						</p>
					</div>
					
				</div>
			</div>
			<router-link to="/perfil/cards/criar">
				<div class="card-list">
					<div class="el-card-grey fc">
						<div class="card-pic">
							<i class="fa-solid fa-credit-card fa-2x primary"></i>
						</div>
						<div class="card-info">
							<h4 class="card-info-num primary">Novo cartão de crédito</h4>
						</div>
						
					</div>
				</div>
			</router-link>

			<div class="card-list" @click="setPayment('pix')">
				<div class="el-card-grey fc">
					<div class="card-pic">
						<img src="@/assets/icons/pix_icon.png" alt="" style="width: 32px; ">
					</div>
					<div class="card-info">
						<h4 class="card-info-num">PIX</h4>
					</div>
					
				</div>
			</div>
			<div class="card-list" @click="setPayment('boleto')">
				<div class="el-card-grey fc">
					<div class="card-pic">
						<img src="@/assets/icons/barcode-png.webp" alt="" style="width: 45px; height: 32px;">
					</div>
					<div class="card-info">
						<h4 class="card-info-num">Boleto Bancário</h4>
					</div>
					
				</div>
			</div>
		</section>
</template>

<style scoped>
	.el-card-grey {
		border-radius: 5px;
		padding: 15px;
		margin-bottom: 30px;
		width: 100%;
		background-color: #EEE;
	}
</style>
