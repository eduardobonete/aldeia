<script>
import api from "@/services/api";
import Loading from "@/components/layout/Loading.vue";
import LoadingMin from "@/components/layout/LoadingMin.vue";
export default {
	components: {
		Loading,
		LoadingMin,
	},
	data() {
		return {
			masked: null,
			bindedObject: {},
			cupom: null,
			isLoading: false,
			load: false,
		};
	},
	created() {
		this.isLoading = true;
		this.$store.dispatch("cart/getCart").then(() => {
			this.isLoading = false;
		});
	},
	methods: {
		setValue(c, q, index = null) {
			c.quantity += q;
			this.load = true;
			if (q != 0) {
				this.$store
					.dispatch("cart/updateProductCart", { id: c.id, data: { quantity: q } })
					.then(() => {
						this.$store.dispatch("cart/getCart").then(() => {
							this.load = false;
						});
					});
			} else {
				this.$store.dispatch("cart/deleteProductCart", c.id).then(() => {
					this.$store.state.cart.cart.carts.splice(index, 1);
					this.$store.dispatch("cart/getCart").then(() => {
						this.load = false;
					});
				});
			}
		},
		formatPrice(p) {
			p = parseFloat(p);
			p = p.toFixed(2);
			return p.replace(".", ",");
		},
		applyCupom() {
			var data = {
				coupon_code: this.cupom,
				quantity: [],
				seller_id: []
			}
			this.carts.forEach((r) => {
				data.quantity.push(r);
				data.seller_id.push(r.seller_id);
			});

			api.create("apply_global_coupon", data).then(
				(res) => {
					this.load = true;
					if (res.data.error != undefined) {
						this.load = false;
						this.$toast.error(res.data.error);
					} else {
						this.$toast.success("Cupom aplicado com sucesso");
						this.$store.dispatch("cart/getCart").then(
							() => {
								this.load = false;
							},
							(error) => {
								this.load = false;
							},
						);
					}
				},
				(error) => {
					this.load = false;
					this.$toast.error(error);
				},
			);
		},
	},
	computed: {
		carts() {
			return this.$store.state.cart.cart.carts;
		},
		calculations() {
			return this.$store.state.cart.cart.calculations;
		},
	},
};
</script>
<template>
	<Loading v-if="isLoading"></Loading>
	<div v-if="carts.length > 0" class="calc mt-100">
		<div class="box-container" v-for="(c, k) in carts" v-bind:key="c.id">
			<div class="col-12 col">
				<div class="col-2 col">
					<div class="img_logo">
						<img :src="c.seller.logo.original_image" />
					</div>
				</div>
				<div class="col-7 col">
					<h5 class="purple">{{ c.seller.shop_name }}</h5>
					<h6 class="purple">
						Valor mínimo R$ {{ formatPrice(c.seller.minimum_value_cart) }}
					</h6>
				</div>
				<div class="col-3 col">
					<router-link :to="'/busca?shop='+c.seller_id">
						<button class="btn btn-purple float-right small">Ver loja</button>
					</router-link>
				</div>
			</div>
			<div class="col col-12"></div>
			<div class="col col-12">
				<div class="col-2 col">
					<div class="img_logo">
						<img :src="c.product.thumbnail.original_image" />
					</div>
				</div>
				<div class="col-6 col">
					<p class="small">{{ c.product.product_name }}</p>
					<h6 class="primary">R$ {{ formatPrice(c.product.price) }}</h6>
				</div>
				<div class="col-4 col">
					<br />
					<div class="input-count">
						<span class="bt" v-if="c.quantity <= 1" @click="setValue(c, 0, k)">
							<i class="fa-solid fa-trash primary"></i
						></span>
						<span class="bt" v-else @click="setValue(c, -1)"
							><p><i class="fa-solid fa-minus primary"></i></p
						></span>
						<span class="val"
							><p>{{ c.quantity }}</p></span
						>
						<span class="bt" @click="setValue(c, 1)"
							><p><i class="fa-solid fa-plus primary"></i></p
						></span>
					</div>
				</div>
			</div>
			<div class="col-12">
				<div class="col col-8"><p class="small float-right mb-3">Subtotal</p></div>
				<div class="col col-4">
					<h5 class="purple">R$ {{ formatPrice(c.product.price * c.quantity) }}</h5>
				</div>
			</div>
			<div class="col-12">
				<div class="col col-8"><p class="small float-right mb-3">Frete</p></div>
				<div class="col col-4">
					<h5 class="purple">R$ {{ formatPrice(c.shipping_cost) }}</h5>
				</div>
			</div>
		</div>
	</div>
	<div v-else class="mt-100 col col-12">
		<p class="text-center medium dark-grey">Carrinho vazio</p>
	</div>
	<div class="finalize bg-white" v-if="carts.length > 0">
		<LoadingMin v-if="load"></LoadingMin>
		<div class="col-12 col">
			<div class="col-9 col">
				<div class="input-group mb-3">
					<span class="input-group-text" id="basic-addon1">
						<i class="fa-solid fa-ticket primary"></i>
					</span>
					<input
						type="text"
						class="form-control"
						placeholder="Cupom AldeiaPet"
						v-model="cupom"
					/>
				</div>
			</div>
			<div class="col-3 col">
				<button class="btn btn-primary medium" @click="applyCupom()">Aplicar</button>
			</div>
		</div>
		<div class="col-12 col">
			<div class="col col-8"><p class="small float-right mb-3">Valor dos produtos</p></div>
			<div class="col col-4">
				<p class="small float-right mb-3">{{ calculations.formatted_sub_total }}</p>
			</div>

			<div class="col col-8"><p class="small float-right mb-3">Frete</p></div>
			<div class="col col-4">
				<p class="small float-right mb-3">{{ calculations.formatted_shipping_cost }}</p>
			</div>

			<div class="col col-8"><p class="small float-right mb-3">Desconto</p></div>
			<div class="col col-4">
				<p class="small float-right mb-3">-{{ calculations.formatted_discount }}</p>
			</div>

			<div class="col col-8"><p class="small float-right">Cupom</p></div>
			<div class="col col-4">
				<p class="small float-right">-{{ calculations.formatted_coupon_discount }}</p>
			</div>

			<div class="col col-8"><p class="small float-right">Valor Total</p></div>
			<div class="col col-4">
				<p class="float-right primary">
					<b>{{ calculations.formatted_total }}</b>
				</p>
			</div>
		</div>
		<div class="col col-12">
			<div class="col col-5">
				<div
					class="btn btn-primary-inverted fullwidth"
					@click="$router.go(-1)"
					style="text-align: center; font-size: 12px; padding: 0px 10px"
				>
					Continuar Comprando
				</div>
			</div>
			<div class="col col-7">
				<router-link to="/shipping-confirm">
					<button class="btn btn-primary fullwidth large" style="padding: 9px">
						Finalizar Compra
					</button>
				</router-link>
			</div>
		</div>
	</div>
</template>
<style scoped>

.calc {
	height: calc(100% - 386px);
	overflow: auto;
	position: absolute;
}



.img_logo img {
	width: 100%;
}

p.small {
	font-size: 10px;
}

.finalize {
	width: 100%;
	position: fixed;
	border-top: 1px solid #ccc;
	bottom: 0;
}
</style>
