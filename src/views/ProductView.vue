<script>
    import Modal from '@/components/layout/Modal.vue';
    export default {
        components: {
            Modal
        },
    	data() {
    		return {
    			data: {
    				id: null,
    			},
    			product_key: 0,
                related: [],
                selected: [],
                sort: "default"
    		}
    	},
        methods: {
            initVariant() {
                var self = this;
                this.related.forEach(function(row, key) {
                    var stock = [];
                    row.stock.forEach(function(s, k) {
                        stock.push({price: s.price, selected: k == 0});
                    })
                    self.selected.push(stock)
                })
            },
            formatPrice(p) {
                p = parseFloat(p);
                p = p.toFixed(2);
                return p.replace('.', ',');
            },
            addCart(r, key) {
                console.log(r)
                
                var self = this;
                r.forEach(function(row, k) {                    
                    if(self.selected[key][k].selected) {
                        var data = {
                            product_id: row.product_id, 
                            quantity: 1,
                            trx_id: self.$store.state.cart.trx_id,
                            variants_name: row.name,
                            variants_ids: row.variant_ids
                        }
                        self.$store.dispatch('cart/addProductCart', data).then(res=> {
                            self.$store.dispatch("cart/getCart");
                            self.$toast.success('Produto adicionado ao carrinho');
                            self.$router.push({'name' : 'cart'});
                        },
                        error => {
                            if(error.response) self.$toast.error(error.response.data.message);
                            else self.$toast.error(error.message);
                        });
                    }
                })
            },
            setSelected(key, k) {
                this.selected[key].forEach(function(r) {
                    r.selected = false;
                })
                this.selected[key][k].selected = true;
            },
            showDetail() {
                this.$refs.modal.open();
            },
            closepop() {
                document.querySelector("#pop").style.visibility = "hidden";
                document.querySelector("#ltbox").style.visibility = "hidden";
                document.querySelector("#produto-pop").classList.remove("active");
                document.querySelector("body").style.overflow = "auto";
            },
        },
		created() {
			var self = this;
			this.$store.dispatch('product/getProduct', this.$router.currentRoute.value.params.slug).then(function() {
				self.data = self.$store.state.product.product;
			});
            this.$store.dispatch('product/getRelated', {slug:this.$router.currentRoute.value.params.slug, sort: this.sort}).then(function() {
                self.related = self.$store.state.product.related;
                self.initVariant();
            });
		},
        watch:{
            sort(newVal, oldVal){
                this.$store.dispatch('product/getRelated', {slug:this.$router.currentRoute.value.params.slug, sort: newVal}).then(() => {
                    this.related = this.$store.state.product.related;
                    this.initVariant();
                });
            }
        }
	};
</script>
<template>
    <section>
        <div v-if="data.id != null" class="mt-100">
            <div class="box-container">
                <div class="detail" @click="showDetail()">
                    <div class="col col-3">
                        <img :src="data.thumbnail.image_72x72">
                    </div>
                    <div class="col col-9">
                        <p><b> {{ data.product_languages[0].name }}</b></p>
                    </div>
                </div>
            </div>
            <div class="box-container">
                <div class="col col-12 bordered-bottom">
                    <div class="col col-4"></div>
                    <div class="col col-8">
                        <span class="def-txt value mobi">Ordenar:</span> &nbsp;
                        <select name="sort" class="select-pop" v-model="sort">
                            <option value="price_low">Menor preço</option>
                            <option value="price_high">Maior preço</option>
                            <option value="newest">Mais novo</option>
                            <option value="oldest">Mais antigo</option>
                            <option value="top_selling">Mais vendido</option>
                        </select>
                    </div>
                </div>
                <div class="col col-12 bordered-bottom" v-for="(r, key) in related" v-bind:key="r.id">
                    <div class="col col-3 seller-logo">
                        <router-link :to="'/produto/'+r.slug">
                            <img :src="r.seller_profile.logo.original_image">
                        </router-link>
                    </div>
                    <div class="col col-9">
                        <h5>{{ r.seller_profile.shop_name}}</h5>
                        <p>
                            <i class="fa-solid fa-location-dot"></i>&nbsp;
                            <span class="def-txt">Loja a 1000.0km</span>
                        </p>
                        <p><span class="def-txt"><b>Frete R$ 5,00</b></span></p>
                        <p style="height: 30px;">
                            <div class="item-vars" v-if="selected.length > 0">
                                <template v-for="(s, k) in r.stock" v-bind:key="k">
                                    <div class="tick" @click="setSelected(key, k)" :class="[(selected[key][k].selected) ? 'active' : '' ]">{{ s.name }}</div> &nbsp; 
                                </template>
                            </div>
                        </p>
                        <p>
                            <div class="col-12">
                                <div class="col col-6">
                                    <span v-for="p in selected[key]" v-bind:key="p.id"> 
                                        <h3 class="the-unit-value" v-if="p.selected"> R${{ formatPrice(p.price) }}</h3>
                                    </span>
                                </div>
                                <div class="col col-6">
                                    <button type="button" class="btn btn-primary float-right" style="padding: 7px 10px;" @click="addCart(r.stock, key)">
                                        <span class="sel-loja-btn-text desk">Selecionar Loja</span>
                                        <i class="fa-solid fa-cart-shopping mobi"></i>
                                    </button>
                                </div>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <Modal id="produto-pop" ref="modal" v-if="data.id">
            <slot>
                <div class="image">
                    <img :src="data.thumbnail.image_320x320" style="width: 100%;">
                </div>
                <div class="info">
                    <h4>{{ data.product_languages[0].name }}</h4><br>
                    <p v-html="data.product_languages[0].short_description"> </p><br>
                    <div v-html="data.product_languages[0].description"> </div>
                </div>
            </slot>
        </Modal>
    </section>
</template>

<style scoped>
    .detail img {
        margin-top: 2px;
        margin-left: 5px;
    }
    .detail p {
        font-size: 11px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

    }

    .seller-logo img {
        width: 72px;
    }
    .detail p {
        max-width: 90%;
    }

    .info {
        color: #666;
        font-size: 11px;
    }
</style>