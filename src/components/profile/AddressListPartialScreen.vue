<script>
import Loading from "../layout/Loading.vue";

export default {
	props: ["addresses", "onClose", "chooseAddress", "shouldShowAddresses"],
	components: { Loading },
	data() {
		return {};
	},
	methods: {
		deleteAddress() {
			this.toggleDeleteModal();
			this.isLoading = true;

			this.$store.dispatch("address/deleteAddress", this.addressToDelete).then(() => {
				this.addresses = this.$store.state.address.addresses;
				this.isLoading = false;
			});
		},
	},
	created() {},
};
</script>

<template>
	<div
		class="address-container"
		v-bind:class="{ hide: !shouldShowAddresses, show: shouldShowAddresses }"
	>
		<header class="fc mobi">
			<a class="back-icon-link" v-on:click="onClose">
				<div class="back-icon-cont">
					<i class="fa-solid fa-arrow-left"></i>
				</div>
			</a>
			<h2 class="page-title">Endereços</h2>
		</header>

		<div class="container">
			<div
				v-bind:class="{ 'yellow-card': address.default_shipping }"
				class="address-card"
				v-for="address in addresses"
				v-bind:key="address.id"
				v-on:click="chooseAddress(address)"
			>
				<div class="left-block">
					<h2>{{ address.name }}</h2>

					<div class="address-text">
						<i class="fa fa-map-marker address-icon" aria-hidden="true"></i>

						<h4>
							{{ address.address }}, {{ address.number }}, {{ address.city }} -
							{{ address.state }}, {{ address.postal_code }}
						</h4>
					</div>
				</div>
			</div>
		</div>

		<router-link class="add-btn-container" :to="{ name: 'profile_address_create' }">
			<i class="fa fa-plus" aria-hidden="true"></i>
		</router-link>
	</div>
</template>

<style scoped>
.hide {
	animation-name: slidedown;
	transform: translateY(100%);
	visibility: hidden;
}

.show {
	/* display: block; */
	visibility: visible;
	animation-name: slideup;
}

.page-title,
.back-icon-cont i {
	font-size: 1.1rem;
}

.address-container {
	height: 50vh;
	position: absolute;
	bottom: 0;
	overflow-y: scroll;
	z-index: 4000;
	left: 0;
	width: 100%;
	background: white;
	animation-duration: 400ms;
	animation-iteration-count: 1;
}

@keyframes slideup {
	from {
		transform: translateY(100%);
	}
	to {
		transform: translateY(0);
	}
}

@keyframes slidedown {
	from {
		transform: translateY(0);
	}
	to {
		transform: translateY(100%);
	}
}

.yellow-card {
	background-color: var(--main-color);
	color: white;
}

.left-block {
	width: 80%;
	padding-bottom: 0.6rem;
}
</style>
