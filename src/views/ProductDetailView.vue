<script>
	export default {
		data() {
			return {
				data: {},
				related: [],
                product: {
                    product_id: null,
                    quantity: 1,
                    variants_ids: null,
                    variants_name: null,
                    trx_id: null,
                },
				
				
                
			}
		},
        methods: {
            formatPrice(p) {
                p = parseFloat(p);
                p = p.toFixed(2);
                return p.replace(".", ",");
            },
            addCart() {
                this.product.trx_id= this.$store.state.cart.trx_id;
                this.product.product_id= this.data.product_languages[0].product_id;
                    
                this.$store.dispatch('cart/addProductCart', this.product).then(res=> {
                    this.$store.dispatch("cart/getCart");
                    this.$toast.success('Produto adicionado ao carrinho');
                    this.$router.push({'name' : 'cart'});
                },
                error => {
                    if(error.response) self.$toast.error(error.response.data.message);
                    else this.$toast.error(error.message);
                });
            },
            shopNow() {
                this.product.trx_id= this.$store.state.cart.trx_id;
                this.product.product_id= this.data.product_languages[0].product_id;
                this.$store.dispatch("cart/emptyCart");
                    
                this.$store.dispatch('cart/addProductCart', this.product).then(res=> {
                    this.$store.dispatch("cart/getCart");
                    this.$toast.success('Produto adicionado ao carrinho');
                    this.$router.push({path : '/order-confirm'});
                },
                error => {
                    if(error.response) self.$toast.error(error.response.data.message);
                    else this.$toast.error(error.message);
                });
            },
        },
		created() {
			this.$store.dispatch('product/getProduct', this.$router.currentRoute.value.params.slug).then(() => {
				this.data = this.$store.state.product.product;
                this.product.variants_ids = this.data.selected_variants_ids[0]
			});
            this.$store.dispatch('product/getRelated', {slug:this.$router.currentRoute.value.params.slug, sort: this.sort}).then(() => {
                this.related = this.$store.state.product.related;
            });
		},
	};
</script>
<template>
	<section class="content mt-100">
        <div class="box side-colum df">
            <div class="det-col-1">
                <!--Detalhes-->
                <div class="dets">
                    <!--Foto-->
                    <div class="det-col1-img">
                        <img :src="data.thumbnail.original_image" alt="">
                    </div>
                    <div class="det-col1-dets">
                        <h2 class="el-name">{{ data.product_languages[0].name }}</h2>
                        <p class="def-txt det-desc" v-html="data.product_languages[0].short_description"></p>
                        <!--opção e quantidade-->
                        <div class="col-12 col">
                        	<div class="col-8 col">
                        		<p class="dark-grey small">Selecione a quantidade:</p>
								<div class="input-count">
									<span class="bt" v-if="product.quantity == 1">- </span>
									<span class="bt" v-else @click="product.quantity -= 1"
										><p><i class="fa-solid fa-minus primary"></i></p
									></span>
									<span class="val"
										><p>{{ product.quantity }}</p></span
									>
									<span class="bt" @click="product.quantity += 1"
										><p><i class="fa-solid fa-plus primary"></i></p
									></span>
								</div>
							</div>
                        </div>

                        <div class="col-12 col">
                        	<div class="col-8 col">
                        		<p class="dark-grey small">Selecione a opção:</p>
								<template v-for="(s, k) in data.stock" v-bind:key="k">
                                    <div class="tick" @click="product.variants_ids = s.variant_ids; product.variants_name = s.name" :class="[product.variants_ids == s.variant_ids ? 'active' : '']">{{ s.name }}</div> &nbsp;
                                </template>
							</div>
                        </div>
                        
                        <!--Valor-->
                        <div class="det-value">
                            <div class="the-value">
                                <p class="def-txt det-tot-val">Valor total:</p>
                                <h3 class="det-value-final">R$ {{ formatPrice(data.price) }}</h3>
                                <p class=" def-txt frete">+ Frete R$ {{ formatPrice(data.seller_shipping.value) }}</p>
                            </div>
                            <a class="sel-loja-btn add-to-cart" @click="addCart()">
                                <span class="sel-loja-btn-text">Adicionar ao carrinho <i class="fa-solid fa-cart-shopping"></i></span>
                            </a>
                            <a class="sel-loja-btn">
                                <span class="sel-loja-btn-text" @click="shopNow()">Comprar agora</span>
                            </a>
                        </div><br>
                        <div style="position: absolute; left: 0; height: 10px; width: 100%; background: #666;">
                        </div>
                        <br>
                        <div class="col col-12">
                            <p class="dark-grey small" v-html="data.product_languages[0].description"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>