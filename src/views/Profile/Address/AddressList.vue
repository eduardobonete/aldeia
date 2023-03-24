<script>
import Loading from "../../../components/layout/Loading.vue";

export default {
	components: { Loading },
	data() {
		return {
			addresses: [],
			addressActionsList: null,
			shouldShowDeleteModal: false,
			addressToDelete: null,
			isLoading: false,
		};
	},
	methods: {
		showAddressActionsList(id) {
			this.addressActionsList = id;
		},
		toggleDeleteModal() {
			this.shouldShowDeleteModal = !this.shouldShowDeleteModal;
		},
		shouldDelete(id) {
			this.addressActionsList = null;
			this.toggleDeleteModal();
			this.addressToDelete = id;
		},
		deleteAddress() {
			this.toggleDeleteModal();
			this.isLoading = true;

			this.$store.dispatch("address/deleteAddress", this.addressToDelete).then(() => {
				this.addresses = this.$store.state.address.addresses;
				this.isLoading = false;
			});
		},
		selectAddress(address) {
			this.isLoading = true;

			this.$store.dispatch("address/selectAddress", address).then(() => {
				this.addresses = this.$store.state.address.addresses;
				this.isLoading = false;
			});
		},
	},
	created() {
		this.isLoading = true;

		this.$store.dispatch("address/getAddresses").then(() => {
			this.addresses = this.$store.state.address.addresses;
			this.isLoading = false;
		});
	},
};
</script>
<template>
	<loading v-if="isLoading" />
	<div class="backdrop" v-if="shouldShowDeleteModal"></div>

	<div class="dialog" v-if="shouldShowDeleteModal">
		<div class="dialog-content">
			<h1 class="dialog-title">Exluir Endereço</h1>
			<p class="dialog-content-text">Deseja realmente exluir esse endereço?</p>

			<div class="dialog-btn-row">
				<button
					class="btn btn-danger"
					style="margin-right: 0.5rem"
					v-on:click="deleteAddress"
				>
					Sim
				</button>
				<button class="btn btn-primary" v-on:click="toggleDeleteModal">Não</button>
			</div>
		</div>
	</div>

	<div class="container mt-100" >
		<div
			v-bind:class="{ 'yellow-card': address.default_shipping }"
			class="address-card"
			v-for="address in addresses"
			v-bind:key="address.id"
		>
			<div class="left-block" v-on:click="selectAddress(address)">
				<h2>{{ address.name }}</h2>

				<div class="address-text">
					<i class="fa fa-map-marker address-icon" aria-hidden="true"></i>

					<h4>
						{{ address.address }}, {{ address.number }}, {{ address.city }} -
						{{ address.state }}, {{ address.postal_code }}
					</h4>
				</div>
			</div>
			<div class="right-block">
				<i
					class="fa fa-ellipsis-v"
					aria-hidden="true"
					v-on:click="showAddressActionsList(address.id)"
				>
					<ul v-if="addressActionsList === address.id" class="tool-menu">
						<li>
							<router-link
								:to="{ name: 'profile_address_edit', params: { id: address.id } }"
								>Editar</router-link
							>
						</li>

						<li v-on:click="shouldDelete(address.id)">Excluir</li>
					</ul>
				</i>
			</div>
		</div>
	</div>
	<router-link class="add-btn-container" :to="{ name: 'profile_address_create' }">
		<i class="fa fa-plus" aria-hidden="true"></i>
	</router-link>
</template>
<style scoped>
.container {
	padding: 1rem 1rem;
}

.address-card {
	border-radius: 10px;
	padding: 0.4rem 0.6rem;
	color: white;
	display: flex;
	align-items: center;
	color: var(--font-color);
	margin-bottom: 1rem;
	background: #eeeeee;
	position: relative;
}

.yellow-card {
	background-color: var(--main-color);
	color: white;
}

.address-card h2 {
	font-size: 1rem;
	margin-bottom: 0.4rem;
}

.address-text h4 {
	font-size: 0.7rem;
	margin-left: 0.5rem;
	font-weight: 600;
}

.address-text {
	display: flex;
	align-items: flex-start;
}

.address-text .address-icon {
	font-size: 0.7rem;
	position: relative;
	top: 0.15rem;
}

.left-block {
	width: 80%;
	padding-bottom: 0.6rem;
}

.right-block {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 20%;
}
</style>
