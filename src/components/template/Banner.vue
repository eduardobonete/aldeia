<script>
import Glide from '@glidejs/glide'
export default {
	props: {
		sliders: Array,
	},
    mounted() {
        new Glide('.glide', {autoplay: 5000}).mount();
        let body = document.querySelector('html').clientWidth;
        let elements = document.querySelector('.gs_banner').getElementsByClassName('gs_item').length;
        let fullWidth = body * elements;
        document.querySelector('.gs_banner').style.width = fullWidth+'px';
        let el = document.getElementsByClassName('gs_item');
        for (var i = 0; i < el.length; i++) {
        	el[i].style.width = body+'px';
        }
    }
};
</script>
<template>
    &nbsp;
    <div>
        <div class="glide">
            <div class="glide__track" data-glide-el="track">
                <ul class="glide__slides gs_banner">
                    <li class="glide__slide gs_item" v-for="slider in sliders">
                    	<a href="#"><div class="banner"><img :src="slider.bg_image.image_1905x464" class="img-banner"></div></a>
                    </li>
                </ul>
            </div>
            <div class="glide__arrows slid-btns" data-glide-el="controls">
                <span class="glide__arrow glide__arrow--left slid-btn prev-arrow" data-glide-dir="<"><i class="fa-solid fa-angle-left"></i></span>
                <span class="glide__arrow glide__arrow--right slid-btn next-arrow" data-glide-dir=">"><i class="fa-solid fa-angle-right"></i></span>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import '@glidejs/glide/dist/css/glide.core.min.css';
</style>