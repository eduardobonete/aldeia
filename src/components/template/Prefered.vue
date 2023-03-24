<script>
import Glide from "@glidejs/glide";

export default {
	props: ["prefer", "title"],
	mounted() {
		new Glide(`#caes-carousel-${this.prefer[0].id}`, {
			type: "slider",
			perView: 5,
		}).mount();
	},
};
</script>
<template>
	<div class="box df desk">
		<div class="fc head-cats">
			<h2 class="subtt">{{ title }}</h2>
			<a href="#" class="fc ver-mais">
				<span>Procurar todas as categorias</span>
				<i class="fa-solid fa-arrow-right"></i>
			</a>
		</div>
		<!--items-->
		<div class="fc cats-items" :id="`caes-carousel-${prefer[0].id}`" style="position: relative">
			<div class="glide__track" data-glide-el="track">
				<ul class="slider__slides glide__slides">
					<li class="slider__frame glide__slide" v-for="p in prefer" v-bind:key="p.id">
						<!--Item-->
						<router-link :to="'categories/' + p.slug" class="cat-item">
							<div class="prod-img-pad">
								<img
									:src="p.logo.image_190x230"
									:alt="p.category_language[0].title"
									class="cat-img"
									height="150px"
								/>
							</div>

							<h3 class="cat-name">{{ p.category_language[0].title }}</h3>
						</router-link>
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

.cat-item {
	border: none;
	margin: 0;
	padding: 0 !important;
	border: none !important;
}

.cat-img {
	margin: 0;
	width: 100%;
}
.glide__slide {
	padding: 0 0.6rem 0 0.6rem;
	border: 1px solid #eee;
	/* height: 510px; */
	/* display: flex;
	align-content: flex-end; */
}
.glide__slide:hover {
	border: 1px solid var(--main-color);
}

.cat-name {
	padding-bottom: 0;
}
</style>
