<script>
import { RouterLink, RouterView } from "vue-router";
import Header from "@/components/template/Header/Header.vue";
import Footer from "@/components/template/Footer.vue";
export default {
	components: { Header, Footer },
	created() {
		if (this.$store.state.home.homeData.sliders.length == 0)
			this.$store.dispatch("home/getData");

		if (this.loggedIn) {
			this.$store.dispatch("profile/getProfileData").then((user) => {
				this.$store.dispatch("address/getAddresses").then(()=> {
					this.$store.dispatch("profile/getLocalizationUser",{zip: this.address.postal_code, numberLocation: this.address.number});
				});
				this.$store.dispatch("cart/getCart");
				this.$store.dispatch("profile/getCards");
				
			});
		}
	},
	computed: {
		loggedIn() {
			return this.$store.state.auth.status.loggedIn;
		},
		address() {
			return this.$store.state.address.defaultAddress;
		}
	},
};
</script>

<template>
	<main>
		<Header></Header>
		<RouterView />
		<br /><br />
		<Footer></Footer>
	</main>
</template>
