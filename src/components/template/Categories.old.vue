<script>
import Glide from "@glidejs/glide";
import api from "@/services/api";
export default {
	props: ["categories", "title"],
	methods: {
		showProducts(c) {
			if (c == 0) {
				api.create("products", { name: this.text }).then((res) => {
					this.$store.dispatch("home/setDataSelling", res.data.data);
				});
			} else {
				this.$store.dispatch("product/getProductByCategory", c);
			}
		},
	},
	mounted() {
		new Glide(".glide2", {
			type: "slider",
			perView: 5.5,
			breakpoints: {
				767: {
					perView: 5.5,
				},
				1023: {
					perView: 6,
				},
			},
		}).mount();

		new Glide(".glide2-no-mobi", {
			type: "slider",
			perView: 6,
		}).mount();
	},
};
</script>
<template>
	<div class="container" style="position: relative">
		<h2 class="subtt desk">Compre por pet</h2>
		<div class="glide2 mobi">
			<div class="glide__track" data-glide-el="track">
				<ul class="slider__slides glide__slides">
					<li class="slider__frame glide__slide pet-item mobi">
						<a @click="showProducts(0)">
							<img src="@/assets/images/foot.jpg" class="pet-img" alt="Cachorros" />
							<h3 class="pet-name"></h3>
						</a>
					</li>
					<li
						class="slider__frame glide__slide pet-item"
						v-for="c in categories"
						v-bind:key="c.id"
					>
						<a @click="showProducts(c.category_language[0].category_id)">
							<img
								:src="c.logo.original_image"
								class="pet-img"
								:alt="c.category_language.title"
							/>
							<!-- <h3 class="pet-name">{{ c.category_language[0].title }}</h3> -->
						</a>
					</li>
				</ul>
			</div>
		</div>

		<div class="glide2-no-mobi no-mobi box" style="overflow-x: visible; margin-top: 1rem">
			<div class="glide__track" data-glide-el="track">
				<ul class="slider__slides glide__slides">
					<li class="slider__frame glide__slide pet-item mobi">
						<a @click="showProducts(0)">
							<img src="@/assets/images/foot.jpg" class="pet-img" alt="Cachorros" />
							<h3 class="pet-name">Todos</h3>
						</a>
					</li>
					<li
						class="slider__frame glide__slide pet-item"
						v-for="c in categories"
						v-bind:key="c.id"
					>
						<a @click="showProducts(c.category_language[0].category_id)">
							<img
								:src="c.logo.original_image"
								class="pet-img"
								:alt="c.category_language.title"
							/>
							<!-- <h3 class="pet-name">{{ c.category_language[0].title }}</h3> -->
						</a>
					</li>
				</ul>
			</div>

			<div data-glide-el="controls" class="slid-btns-contained">
				<span
					class="slider__arrow slider__arrow--prev glide__arrow glide__arrow--prev slid-btn prev-arrow"
					data-glide-dir="<"
				>
					<i class="fa-solid fa-angle-left"></i>
				</span>

				<span
					class="slider__arrow slider__arrow--next glide__arrow glide__arrow--next slid-btn next-arrow"
					data-glide-dir=">"
				>
					<i class="fa-solid fa-angle-right"></i>
				</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
@import "@glidejs/glide/dist/css/glide.core.min.css";

.slid-btns-contained {
	width: 70%;
	left: 15%;
	margin-top: 1rem;
}

.subtt {
	font-size: 1.7rem;
}
</style>
