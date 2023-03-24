<script>
import Loading from '@/components/layout/Loading.vue';
import api from '@/services/api';
import checkoutApi from '@/services/checkoutApi';
import Modal from '@/components/layout/SmallModal.vue';
export default {
    components: {
        Loading,
        Modal,
    },
    data() {
        return {
            loading: false,
            checkout: {
                order_trx_id: null,
                checkout_method: "2",
                coupon: [],
                coupon_discount: 0,
                discount_offer: 0,
                payment_type: "0",
                shipping_tax: null,
                sub_total: null,
                tax: 0,
                total: null,
                quantity: [],
                billing_address: {},
                shipping_address: {},
                installments: {},
                card: {
                    id: null
                }
            }
        }
    },
    computed: {
        cart() {
            return this.$store.state.cart;
        },
        calculations() {
            return this.$store.state.cart.cart.calculations;
        },
        address() {
            return this.$store.state.address.default;
        },
        payment() {
            return this.$store.state.payment;
        }
    },
    methods: {
        confirmOrder() {
            this.loading = true;
            var data = {
                trx_id: this.cart.cart.carts.trx_id,
                shipping_address: this.address,
            }
            api.create('user/confirm-order', data).then((res) => {
            	var param = '';
            	this.checkout.shipping_address = this.address;
            	this.checkout.billing_address = this.address;
            	this.checkout.order_trx_id = this.cart.cart.trx_id;
            	this.checkout.total = this.calculations.total
            	res.data.data.forEach((r) => {
            		this.checkout.quantity.push({seller_id: r.seller_id});
            	})
            	if(this.payment.type == 'card') {
            		this.checkout.installments = this.payment.parcelas;
            		this.checkout.card.id = this.payment.card.card_id;
            	} else {
            		param = '?t1='+this.payment.type;
            	}
            	checkoutApi.create('checkout'+param, this.checkout).then(res => {
            		this.$store.dispatch('payment/setResult', res.data);
            		this.loading = false;
            		this.$router.push({ path: 'order-final' })
            	}, error => {
                    this.$toast.error('Falha ao realizar o pagamento');
            		this.loading = false;
            	})
            	
            }, error => {
                this.$toast.error('Falha ao criar pedido');
            	this.loading = false;
            });

        }
    },
    created() {
        if (this.$store.state.payment.type == null) {
            this.$router.push({ name: 'pagamentos' })
        }
    }
};
</script>
<template>
    <Loading v-if="loading"></Loading>
    
    <div class="box-container mt-100">

        <div class="col-12 col">
            <div class="col col-12">
                <div class="col-8 col">
                    <p class="primary">Resumo da compra:</p>
                </div>
                <div class="col-4 col">
                    <button class="btn btn-grey  float-right">
                        <p class="small primary" @click="$refs.modal.open()">Ver lista > </p>
                    </button>
                </div>
            </div>
            <div class="col col-8">
                <p class="small mb-3">Valor dos produtos</p>
            </div>
            <div class="col col-4">
                <p class="small float-right mb-3">{{ calculations.formatted_sub_total }}</p>
            </div>
            <div class="col col-8">
                <p class="small mb-3">Frete</p>
            </div>
            <div class="col col-4">
                <p class="small float-right mb-3">{{ calculations.formatted_shipping_cost }}</p>
            </div>
            <div class="col col-8">
                <p class="small mb-3">Desconto</p>
            </div>
            <div class="col col-4">
                <p class="small float-right mb-3">-{{ calculations.formatted_discount }}</p>
            </div>
            <div class="col col-8">
                <p class="small">Cupom</p>
            </div>
            <div class="col col-4">
                <p class="small float-right">-{{ calculations.formatted_coupon_discount }}</p>
            </div>
            <div class="col col-8">
                <p class="primary medium float-right">Você pagará</p>
            </div>
            <div class="col col-4">
                <p class="float-right primary">
                    <b>{{ calculations.formatted_total }}</b>
                </p>
            </div>
        </div>
    </div>
    <div class="col col-12">
        <div class="col-12 col">
            <div class="col col-12">
                <p class="primary medium">Pagar como:</p>
            </div>
            <div class="como-pagar">
                <div class="the-address-box fc" v-if="payment.type == 'card'">
                    <div class="col col-12">
                        <b>
                            <p class="dark-grey">Cartão de crédito</p>
                        </b>
                    </div>
                    <img :src="payment.card.card_brand_logo" alt="" class="img-pag-form">
                    <p class=" medium address-nick pag-name dark-grey"><b>{{payment.card.first4 }} **** **** ****</b></p>
                </div>
                <div class="the-address-box fc" v-if="payment.type == 'pix'">
                    <img src="@/assets/icons/pix_icon.png" alt="" class="img-pag-form">
                    <h4 class="address-nick pag-name">Pix</h4>
                </div>
                <div class="the-address-box fc" v-if="payment.type == 'boleto'">
                    <img src="@/assets/icons/barcode-png.webp" alt="" style="width: 45px; height: 32px;"> &nbsp;
                    <h4 class="card-info-num">Boleto Bancário</h4>
                </div>
                <router-link to="/pagamentos" class="sel-another">Selecionar outra forma de pagamento</router-link>
            </div>
        </div>
    </div>
    <div class="finalize bg-white">
        <div class="col-12 col">
            <div class="col col-12">
                <p class="primary medium">Entregar em:</p>
            </div>
        </div>
        <div class="col-12 col">
            <div class="the-address-box">
                <h4 class="address-nick">{{address.name}}</h4>
                <p class="the-address"><i class="fa-solid fa-location-dot"></i><span>{{ address.address }}, {{ address.number }}, {{ address.district }}, {{ address.city }}, {{ address.state }}</span></p>
            </div>
            <router-link to="/perfil/endereco" class="sel-another">Selecionar outro endereço</router-link>
        </div>
        <div class="col col-12 fin-2">
            <div class="col col-12">
                <button class="btn btn-primary fullwidth large" @click="confirmOrder()">Confirmar compra</button>
            </div>
        </div>
    </div>
    <Modal id="cart-pop" ref="modal" class="modal-body">
        <slot>
            <div class="col-12 col" v-for="c in cart.cart.carts" v-if="cart">
                <div class="col col-12 text-center">
                    <img class="img-seller" :src="c.product.thumbnail.original_image">
                    <p class="dark-grey small"><b>{{ c.product.product_name }}</b></p>
                    <p class="dark-grey small"><b>Quantidade {{ c.quantity }}</b></p>
                </div>
            </div>
        </slot>
    </Modal>
</template>
<style scoped>
p.medium {
    font-size: 14px;
    padding: 3px;
}

p {
    color: #666;
}

.finalize {
    width: 100%;
    position: fixed;
    border-top: 1px solid #ccc;
    bottom: 0;
}

.img-seller {
    width: 70px;
}
</style>