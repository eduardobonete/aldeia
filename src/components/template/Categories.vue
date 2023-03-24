<template>
    <div class="box df">
        <h2 class="subtt desk">Compre por pet</h2>
        <div class="pos">
            <!--Carousel-->
            <div class="pets-carousel">
                <!--Item todos mobile-->
                <a @click="showProducts(0)" class="pet-item mobi">
					<img src="@/assets/images/foot.jpg" class="pet-img" alt="Cachorros" />
					<h3 class="pet-name"></h3>
				</a>

                <!--Item-->
                <template v-for="c in categories" class="pet-item">
                	<a @click="showProducts(c.category_language[0].category_id)">
						<img
							:src="c.logo.original_image"
							class="pet-img"
							:alt="c.category_language.title"
						/>
						<!-- <h3 class="pet-name">{{ c.category_language[0].title }}</h3> -->
					</a>
                </template>
                    

            </div>
            <div class="slid-btns btns-slider" id="das-btns">
                <span class="slid-btn prev-arrow"><i class="fa-solid fa-angle-left"></i></span>
                <span class="slid-btn next-arrow"><i class="fa-solid fa-angle-right"></i></span>
            </div>
        </div>
    </div>
</template>
<script>
	import $ from 'jquery';
	import * as glider from 'https://cdn.jsdelivr.net/npm/glider-js@1/glider.min.js';
	import * as slider from '@/assets/js/slider';
	import api from "@/services/api";
	export default {
		props: ['categories', 'id', 'breakpoints', 'view'],
		data() {
			return {
				item_size: 0,
				total_size: 0,
			}
		},
		methods: {
			showProducts(c) {
				var filter = {
					sellers: this.sellers
				}
				if (c == 0) {
					api.create("products", filter).then((res) => {
						this.$store.dispatch("home/setDataSelling", res.data.data);
					});
				} else {
					filter.category = c;
					api.create("products", filter).then((res) => {
						this.$store.dispatch("home/setDataSelling", res.data.data);
					});
				}
			},
		},
		computed: {
			sellers() {
	            return this.$store.state.profile.localizationSellers;
	        },				
		},
		mounted() {
			slider.startglider();
		}
	};
</script>

<style scoped>
	@import 'https://cdn.jsdelivr.net/npm/glider-js@1/glider.min.css';
	.slid-btns {
		display: flex !important;
	}
	.btns-slider {
		width: 100vw;
		position: absolute;
		margin-left: -1.1em;
		display: flex;
    	justify-content: space-between;
	}
	.btns-slider .next-arrow {
		margin-right: -2px;
	}
	.glider-slide {
		margin: 3px;
	}
</style>