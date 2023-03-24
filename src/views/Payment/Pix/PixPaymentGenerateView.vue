<script>
import { mapActions } from 'vuex';
import Loading from "@/components/layout/Loading.vue";
export default {
	components: { Loading },
	data() {
		return {
			carts: [],
			sellers: [],
			isLoading: false,
			modal: {
				open: false,
				installments: 0,
				totalValue: 0,
				sellerArrayId: null,
			}
		}
	},
	computed: {
		calculations() {
			return this.$store.state.cart.cart.calculations;
		},
	},
	mounted() {
		this.getCart().then((data) => {
			this.carts = (data.carts);
			this.carts.forEach((cart) => {
				const cartObject = (JSON.parse(JSON.stringify(cart)));
				if (this.verifyAndSumValue(cartObject)) {
					this.sellers.push({
						installments: cartObject.seller.installments,
						sellerId: cartObject.seller.id,
						totalValue: cartObject.shipping_cost + (cartObject.price * cartObject.quantity),
						sellerImage: cartObject.seller.logo.image_72x72,
						selectedInstallment: null,
					});
				}

			})

			if (this.sellers.length == 1) {
				this.openModal(0);
			}

			this.isLoading = false;
		});
	},
	methods: {
		...mapActions('cart', ['getCart']),
		formatPrice(p) {
			p = parseFloat(p);
			p = p.toFixed(2);
			return p.replace(".", ",");
		},
		setParcelas(i) {
			this.$store.dispatch('payment/setParcelas', i).then(() => {
				this.$router.push({ path: '/order-confirm' })
			})
		},
		saveInstallment(index) {
			this.sellers[this.modal.sellerArrayId].selectedInstallment = index;
			this.resetModal();
			this.verifySellersInstallments();

		},
		openModal(index) {
			this.modal.open = true;
			this.modal.totalValue = this.sellers[index].totalValue;
			this.modal.installments = parseInt(this.sellers[index].installments);
			this.modal.sellerArrayId = index;
		},
		getCardMessage(index) {
			return this.sellers[index].selectedInstallment !== null ? `${this.sellers[index].selectedInstallment} x R$ ${this.formatPrice(this.sellers[index].totalValue / this.sellers[index].selectedInstallment)}` : 'Selecionar parcelas';

		},
		verifyAndSumValue(receivedSeller) {
			let newRegister = true;
			if (this.sellers.length == 0) {
				return true;
			}

			this.sellers.forEach((seller, index) => {
				if (seller.sellerId == receivedSeller.seller.id) {
					this.sellers[index].totalValue += (receivedSeller.price * receivedSeller.quantity)
					newRegister = false;
				}
			})

			return newRegister;
		},
		verifySellersInstallments() {
			let FinishInstallmentChoice = true;
			this.sellers.forEach((seller) => {
				seller.selectedInstallment == null ? FinishInstallmentChoice = false : null;
			})

			if (FinishInstallmentChoice) {
				this.setParcelas(this.sellers);
			}
		},
		resetModal() {
			this.modal = {
				open: false,
				installments: 0,
				totalValue: 0,
				sellerArrayId: null,
			}
		}
	}
};
</script>
<template>
	<loading v-if="isLoading" />
	<div>
		<div id="myModal" class="modal" :class="{ 'modal-open': this.modal.open }" style="display: none">

			<div class="modal-content">

				<div v-for="index in modal.installments" :key="index" @click="saveInstallment(index)"
					style="width: 100;display: flex; margin-top: 1rem; margin-bottom: 1rem;">
					<span style="width: 65%;">
						<p class="medium">{{ index }} x R$ {{ formatPrice(modal.totalValue / index) }}</p>
					</span>
					<span style="width: 25%;text-align: end;">
						<p class="grey small">R$ {{ formatPrice(modal.totalValue) }}</p>
					</span>

					<span style="width: 10%;text-align: end;">
						<p class="grey small"> > </p>
					</span>
				</div>
			</div>

		</div>
		<div>
			<div
				style="display: flex; text-align: center; background-color: rgb(102,66,148)); color: #FFFFFF;font-size: 12px;padding-top: 1rem; padding-bottom: 1rem  ;">
				<p>Pague R$400,00 via pix para garantir sua compra.</p>
			</div>
			<div class="box-container" v-for="( seller, index) in sellers" :key="seller" style="margin-top: 1rem;">
				<div class="col col-12" @click="openModal(index)">
					<div class="col col-9">
						<p class="grey small" style="margin-top: 0.25rem;margin-left: 0.25rem;">{{ index + 1 }}° pagamento
						</p>
						<p style="margin-left: 0.25rem;">R$ {{ formatPrice(seller.totalValue) }}</p>
					</div>
					<div class="col col-3">
						<img data-v-ca0bd3a6="" :src="seller.sellerImage">
					</div>
					<div class="col col-12" style="padding: 0!important;">
						<hr class="grey" style="height: 1px;background-color: red;">
					</div>
					<div class="col col-12">
						<div class="col col-11">
							<p class="small grey">{{ getCardMessage(index) }}</p>
						</div>
						<div class="col col-1">
							<p class="grey small">> </p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
hr {
	display: block;
	height: 1px;
	border: 0;
	border-top: 1px solid #ccc;
	margin-bottom: 0.25rem;
	/* margin: 1em 0; */
	padding: 0;
}

.modal {
	display: none;
	position: fixed;
	z-index: 1;
	left: 0;
	top: 13;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.4);

}

.modal-content {
	border-radius: 7px;
	background-color: #fefefe;
	margin: 15% auto;
	padding-left: 20px;
	padding-right: 20px;
	border: 1px solid #888;
	width: 80%;
}


.modal-open {
	display: block !important;
}
</style>