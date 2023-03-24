<script>
import Banner from "@/components/template/Banner.vue";
import Categories from "@/components/template/Categories.vue";
import Newpet from "@/components/template/Newpet.vue";
import Access from "@/components/template/Access.vue";
import Selling from "@/components/template/Selling.vue";
import Brands from "@/components/template/Brands.vue";
import Prefered from "@/components/template/Prefered.vue";
export default {
	components: {
		Banner,
		Categories,
		Newpet,
		Access,
		Selling,
		Brands,
		Prefered,
	},
	data() {
		return {};
	},
	computed: {
		productsSelling() {
			return this.$store.state.home.homeData.home_page_best_selling_products;
		},
		sliders() {
			return this.$store.state.home.homeData.sliders;
		},
		top_categories() {
			return this.$store.state.home.homeData.home_page_top_categories;
		},
		new_pet() {
			return this.$store.state.home.homeData.home_page_banner_new_pet;
		},
		access() {
			return this.$store.state.home.homeData.home_page_banner;
		},
		selling() {
			return this.$store.state.home.homeData.home_page_best_selling_products;
		},
		brands() {
			return this.$store.state.home.homeData.home_page_popular_brands;
		},
		prefered_cat() {
			return this.$store.state.home.homeData.home_page_cat_categories;
		},
		prefered_dog() {
			return this.$store.state.home.homeData.home_page_dog_categories;
		},
	},
};
</script>
<template>
	<Banner :sliders="sliders" v-if="sliders.length > 0"></Banner>
	<Categories :categories="top_categories" v-if="top_categories.length > 0"></Categories>
	<Newpet :newPet="new_pet" v-if="new_pet.length > 0"></Newpet>
	<Selling :selling="productsSelling" v-if="selling.length > 0"></Selling>
	<Access :access="access" v-if="access.length > 0"></Access>
	<Brands :brands="brands" v-if="brands.length > 0"></Brands>
	<Prefered
		:prefer="prefered_dog"
		v-if="prefered_dog.length > 0"
		title="Preferidos dos Cães"
	></Prefered>
	<Access :access="access" v-if="access.length > 0"></Access>
	<Prefered
		:prefer="prefered_cat"
		v-if="prefered_cat.length > 0"
		title="Preferidos dos Gatos"
	></Prefered>
</template>
