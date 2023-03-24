<script>
import Modal from '../components/layout/SmallModal.vue';


export default {
	data() {
		return {
			address: null,
			carts: null,
			modal: { title: '' }
		}
	},
	components: { Modal },
	methods: {
		formatPrice(p) {
			p = parseFloat(p);
			p = p.toFixed(2);
			return p.replace(".", ",");
		},
		showShippingDetail(title) {
			this.modal.title = title;
			this.$refs.modal.open();
		},
	},
	created() {
		this.address = this.$store.state.address.addresses;
		this.carts = this.$store.state.cart.cart.carts;
	}
};
</script>
<template>
	<div class="col-12 col mt-100">
		<h3 class="cont-oran-subtt" style="padding-left: 10px;">Entregar em:</h3>
	</div>
	<div class="col-12 col" style="padding: 10px;">
		<div class="the-address-box">
			<h4 class="address-nick">{{ address[0].name }}</h4>
			<p class="the-address"><i class="fa-solid fa-location-dot"></i><span>{{ address[0].address }}, {{
				address[0].number }}, {{ address[0].district }}, {{ address[0].city }}, {{ address[0].state }}</span>
			</p>
		</div>
	</div>
	<router-link to="/perfil/endereco" class="sel-another">Selecionar outro endereço</router-link>

	<div v-if="carts.length > 0">
		<div class="box-container" v-for="c in carts">
			<div class="col-12 col">
				<div class="col-2 col">
					<div class="img_logo">
						<img :src="c.seller.logo.original_image" />
					</div>
				</div>
				<div class="col-5 col middle">
					<p>
					<h5 class="purple">{{ c.seller.shop_name }}</h5>
					</p>
				</div>
				<div class="col col-5">
					<a @click="showShippingDetail(c.seller.shop_name)" class="sel-another small middle">Detalhes de envio
						&gt;</a>
				</div>
			</div>
			<div class="col-12 col">
				<div class="col-4 col">
					<div class="img_logo">
						<img :src="c.product.thumbnail.original_image" />
					</div>
				</div>
				<div class="col-6 col">
					<p class="small">{{ c.product.product_name }}</p>
					<h6 class="primary">R$ {{ formatPrice(c.product.price) }}</h6>
				</div>
			</div>
		</div>
	</div>
	<div class="col col-12 fin-2">
		<div class="col col-12">
			<router-link to="/order-confirm">
				<button class="btn btn-primary fullwidth large">Selecionar meio de pagamento</button>
			</router-link>
		</div>
	</div>
	<Modal id="produto-pop" ref="modal" class="modal-body">
		<slot>
			<div class="modal-title">
				Regras de envio da {{ modal.title }}
			</div>
			<div class="container-table">
				<div class="icon-col-width">
					<span class="period-adjust-width" style="font-size: 12px;">Dia</span>
					<span class="period-adjust-width" style="font-size: 12px;">Tarde</span>
					<span class="period-adjust-width" style="font-size: 12px;">Noite</span>
				</div>
			</div>
			<div class="container-table">
				<div class="weekday">Segunda-feira</div>
				<div class="icon-col-width">
					<span class="icon-adjust-width check-color"><i class="fa-solid fa-check"></i></span>
					<span class="icon-adjust-width check-color"><i class="fa-solid fa-check"></i></span>
					<span class="icon-adjust-width x-color"><i class="fa-solid fa-x"></i></span>
				</div>
			</div>
			<div class="container-table">
				<div class="weekday">Terça-feira</div>
				<div class="icon-col-width">
					<span class="icon-adjust-width check-color"><i class="fa-solid fa-check"></i></span>
					<span class="icon-adjust-width check-color"><i class="fa-solid fa-check"></i></span>
					<span class="icon-adjust-width x-color"><i class="fa-solid fa-x"></i></span>
				</div>
			</div>
			<div class="container-table">
				<div class="weekday">Quarta-feira</div>
				<div class="icon-col-width">
					<span class="icon-adjust-width check-color"><i class="fa-solid fa-check"></i></span>
					<span class="icon-adjust-width check-color"><i class="fa-solid fa-check"></i></span>
					<span class="icon-adjust-width x-color"><i class="fa-solid fa-x"></i></span>
				</div>
			</div>
			<div class="container-table">
				<div class="weekday">Quinta-feira</div>
				<div class="icon-col-width">
					<span class="icon-adjust-width check-color"><i class="fa-solid fa-check"></i></span>
					<span class="icon-adjust-width check-color"><i class="fa-solid fa-check"></i></span>
					<span class="icon-adjust-width x-color"><i class="fa-solid fa-x"></i></span>
				</div>
			</div>
			<div class="container-table">
				<div class="weekday">Sexta-feira</div>
				<div class="icon-col-width">
					<span class="icon-adjust-width check-color"><i class="fa-solid fa-check"></i></span>
					<span class="icon-adjust-width check-color"><i class="fa-solid fa-check"></i></span>
					<span class="icon-adjust-width x-color"><i class="fa-solid fa-x"></i></span>
				</div>
			</div>
			<div class="container-table">
				<div class="weekday">Sábado</div>
				<div class="icon-col-width">
					<span class="icon-adjust-width check-color"><i class="fa-solid fa-check"></i></span>
					<span class="icon-adjust-width check-color"><i class="fa-solid fa-check"></i></span>
					<span class="icon-adjust-width x-color"><i class="fa-solid fa-x"></i></span>
				</div>
			</div>
			<div class="container-table">
				<div class="weekday">Domingo</div>
				<div class="icon-col-width">
					<span class="icon-adjust-width check-color"><i class="fa-solid fa-x"></i></span>
					<span class="icon-adjust-width check-color"><i class="fa-solid fa-x"></i></span>
					<span class="icon-adjust-width x-color"><i class="fa-solid fa-x"></i></span>
				</div>
			</div>
		</slot>
	</Modal>
</template>

<style scoped>
.img_logo img {
	width: 100%;
}

a.small {
	font-size: 11px;
}

.fin-2 {
	position: fixed;
	bottom: 0;
	background: #fff;
	border: none;
	padding: 15px;
	box-shadow: 0 -3px 5px #00000010;
	border-radius: 0;
}

.icon-adjust-width {
	width: 26%;
	margin-left: 0.25rem;
	margin-right: 0.25rem;
	display: inline-block;
	text-align: left;
}

.period-adjust-width {
	width: 28%;
	margin-left: 0.25rem;
	margin-right: 0.25rem;
	display: inline-block;
	text-align: center;
	color: rgb(118 118 118);
}

.icon-col-width {
	width: 50%;
	text-align: right;
	margin-right: 0.75rem;
}

.container-table {
	width: 100%;
	display: flex;
	align-items: end;
	justify-content: right;
}

.weekday {
	width: 50%;
	text-align: left;
	margin-right: 0.75rem;
	margin-left: 0.75rem;
	font-size: 12px;
	color: rgb(118 118 118);
}

.modal-body {
	font-size: 12px;
	font-weight: 600;
}

.check-color {
	color: rgb(93 165 96);
}

.x-color {
	color: rgb(195, 40, 34);
}

.modal-title {
	text-align: center;
	margin-bottom: 0.5rem;
	font-size: 11px;
	width: 100%;
	color: rgb(118 118 118);
}
</style>
