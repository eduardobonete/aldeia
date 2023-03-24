<script>
import Login from '../../views/Login/Login.vue';
import * as popup from "@/assets/js/popup.js";
import Glide from "@glidejs/glide";

export default {
    props: ['selling'],
    components: { Login },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    methods: {
        openloja(s) {
            //this.$store.dispatch('product/setProduct', s)
            /*document.querySelector('#popups').style.visibility = "visible";
            document.querySelector('#lightbox').classList.add("active");
            document.querySelector('body').style.overflow = "hidden";
            document.querySelector('#loja-pop').classList.add("active");
            */
            return false
        },
        openProduct(slug) {
            if (!this.loggedIn) {
                this.$refs.loginComponent.openModal();
                return;
            }

            this.$router.push({ 'name': 'product', params: { 'slug': slug } })
        },
        formatPrice(p) {
            p = parseFloat(p);
            p = p.toFixed(2);
            return p.replace('.', ',');
        }
	},
	created() {
		this.popups = popup;
	},
	mounted() {
		new Glide("#prods-carousel", {
			type: "slider",
			perView: 5,
		}).mount();
	},
};
</script>
<template>
    <Login ref="loginComponent" />
	<div class="box df">
		<div class="fc head-cats desk">
			<h2 class="subtt">Produtos mais vendidos</h2>
			<a href="#" class="fc ver-mais desk">
				<span>Mais produtos</span>
				<i class="fa-solid fa-arrow-right"></i>
			</a>
		</div>
		<!--items-->
		<div class="fc cats-items mobi" style="padding-bottom: 1rem">
			<a class="cat-item-prod" @click="openloja(s)" v-for="s in selling" v-bind:key="s.id">
				<div>
					<div class="prod-img-pad">
						<img
							:src="s.meta_image.image_190x230"
							class="cat-img"
							width="150px"
							height="150px"
							v-if="s.category_id != undefined"
						/>
						<img :src="s.image" class="cat-img" width="150px" height="150px" v-else />
					</div>
					<!-- <div class="cat-name-prod-container"> -->
					<h3 class="cat-name-prod">
						{{ s.category_id != undefined ? s.product_languages[0].name : s.title }}
					</h3>
				</div>

				<div class="buy">
					<p class="a-partir def-txt">A partir de</p>
					<p class="value-1">R${{ formatPrice(s.price) }}</p>
					<span class="comprar-btn" @click="openProduct(s.slug)" v-if="loggedIn">
						Comprar
					</span>
					<span class="comprar-btn" @click="popups.openentrar()" v-else>Comprar</span>
				</div>
			</a>
		</div>

		<div class="fc cats-items no-mobi" id="prods-carousel" style="position: relative">
			<div class="glide__track" data-glide-el="track">
				<ul class="slider__slides glide__slides">
					<li class="slider__frame glide__slide" v-for="s in selling" v-bind:key="s.id">
						<a class="cat-item-prod" @click="openloja(s)">
							<div class="prod-img-pad">
								<img
									:src="s.meta_image.image_190x230"
									class="cat-img"
									width="150px"
									v-if="s.category_id != undefined"
								/>
								<img :src="s.image" class="cat-img" width="150px" v-else />
							</div>
							<!-- <div class="cat-name-prod-container"> -->
							<h3 class="cat-name-prod">
								{{
									s.category_id != undefined
										? s.product_languages[0].name
										: s.title
								}}
							</h3>

							<div class="buy">
								<p class="a-partir def-txt">A partir de</p>
								<p class="value-1">R${{ formatPrice(s.price) }}</p>
								<span
									class="comprar-btn"
									@click="openProduct(s.slug)"
									v-if="loggedIn"
								>
									Comprar
								</span>
								<span class="comprar-btn" @click="popups.openentrar()" v-else
									>Comprar</span
								>
							</div>
						</a>
					</li>
				</ul>
			</div>

			<div data-glide-el="controls" class="slid-btns slid-btns-contained slid-btn-main-color">
				<span
					class="slider__arrow slider__arrow--prev glide__arrow glide__arrow--prev slid-btn prev-arrow"
					data-glide-dir="<"
				>
					<i class="fa fa-chevron-circle-left" aria-hidden="true"></i>
				</span>

				<span
					class="slider__arrow slider__arrow--next glide__arrow glide__arrow--next slid-btn next-arrow"
					data-glide-dir=">"
				>
					<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>
				</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
@import "@glidejs/glide/dist/css/glide.core.min.css";

@media (min-width: 1024px) {
	.cat-item-prod {
		width: 100%;
		border: none;
		padding: 0;
		margin: 0;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.prod-img-pad {
		padding: 0;
	}
}

.glide__slide {
	padding: 0.6rem 0.6rem 0.8rem 0.6rem;
	border: 1px solid #eee;
	height: 510px;
	display: flex;
	align-content: flex-end;
}

.glide__slide:hover {
	border: 1px solid var(--main-color);
}
</style>
