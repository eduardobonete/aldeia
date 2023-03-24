<script>
	import Selling from '@/components/template/Selling.vue';
	import api from '@/services/api';
	import Loading from '@/components/layout/Loading.vue';

	export default {
		components: {
			Selling,
			Loading,
		},
		data() {
			return {
				text: null,
				selling: [],
				timeout: null,
				isLoading: false,
                fullPage: true,
                filter: {}
			}
		},
		methods: {
			search() {
				var self = this;
				window.clearTimeout(this.timeout);
				this.timeout = setTimeout(this.busca, 500);
			},
			busca() {
				this.isLoading = true;
				var self = this;
				this.filter.name = this.text;
				api.create('products', this.filter).then(function(res) {
					self.$store.dispatch('home/setDataSelling', res.data.data);
					self.isLoading = false;
				})
			},
		},
		computed: {
            productsSelling() {
                return this.$store.state.home.homeData.home_page_best_selling_products;
            },
            sellers() {
	            return this.$store.state.profile.localizationSellers;
	        },
        },
        created() {
        	this.filter = this.$route.query;
        	if(!this.filter.shop) {
        		this.filter.sellers = this.sellers;
        	}
        	this.busca();
        }
	};
</script>
<template>
	<Loading v-if="isLoading"></Loading>
	<div class="col col-12 mt-100">
		<div class="col-12 col text-center" v-if="this.$route.query.shop">
			<img class="img-seller" :src="productsSelling[0].seller_profile.logo.original_image">
			<p class="dark-grey small"><b>{{ productsSelling[0].seller_profile.shop_name }}</b></p><br>
		</div>
		<div class="search under fc box mobi">
			<span class="flex-label">Busque um produto</span>
            <input type="text" id="search-mobi" ref="text" v-model="text" autofocus @keyup="search()">
            <a href="#" class="search-btn"><i class="fa-solid fa-magnifying-glass"></i></a>
        </div>
	</div>
	<div class="col-12 col">
		<Selling :selling="productsSelling" v-if="productsSelling.length > 0"></Selling>
	</div>
</template>

<style scoped>
	.flex-label {
		position: absolute;
		background-color: #FFF;
		color: var(--main-color);
		font-size: 10px;
		margin-top: -34px;
		margin-left: 10px;
		padding: 0 5px;
	}

	.img-seller {
		border: 1px solid #333;
		border-radius: 100%;
		padding: 10px;
	}
</style>