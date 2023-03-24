<script>
import Glide from "@glidejs/glide";

export default {
	props: ["brands"],
	mounted() {
		new Glide("#marcas-carousel", {
			type: "slider",
			perView: 5,
		}).mount();
	},
};
</script>
<template>
	<div class="box df desk">
		<div class="fc head-cats">
			<h2 class="subtt">Marca Popular</h2>
			<a href="#" class="fc ver-mais">
				<span>Procurar todas as marcas</span>
				<i class="fa-solid fa-arrow-right"></i>
			</a>
		</div>

		<!--items-->
		<div class="fc cats-items" id="marcas-carousel" style="position: relative">
			<div class="glide__track" data-glide-el="track">
				<ul class="slider__slides glide__slides">
					<a href="/" class="cat-item-marca" v-for="b in brands" v-bind:key="b.id">
						<li class="slider__frame glide__slide">
							<!--Item-->
							<div class="marca-img-pad">
								<img
									:src="b.image_130x93"
									:alt="b.current_language[0].title"
									class="cat-img"
								/>

								<!-- <img
									src="https://homologacaoaldeiapet.s3.us-east-1.amazonaws.com/images/20230318095517image_300x200_media_224.png"
									:alt="b.current_language[0].title"
									class="cat-img"
								/> -->
							</div>
							<h3 class="cat-name-marca">{{ b.current_language[0].title }}</h3>
						</li>
					</a>
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

.cat-img {
	width: 100%;
	height: 100%;
}
.marca-img-pad {
	height: 80%;
	padding: 0.1rem 0.5rem;
	width: 100%;
}
.cat-name-marca {
	background: var(--main-color);
	color: white !important;
	height: 20%;
	width: 102%;
	position: relative;
	left: -1%;
}

.cat-item-marca {
	border: none;
	padding: 0;
	height: 150px;
	border: 1px solid #eee;
}

.glide__slide {
	padding: 0;
}
</style>
