<script>
import Loading from "../../../layout/Loading.vue";
export default {
	components: { Loading },
	props: ["showEditForm"],
	data() {
		return {
			actionToShow: null,
			addressToDelete: null,
			isLoading: false,
		};
	},
	computed: {
		addresses() {
			return this.$store.state.address.addresses;
		},
	},
	methods: {
		showActionsMenu(id) {
			this.actionToShow = id;
		},
		deleteAddress(address) {
			this.addressToDelete = address.id;

			if (confirm("Você quer mesmo apagar esse endereço?")) {
				this.isLoading = true;

				this.$store.dispatch("address/deleteAddress", this.addressToDelete).then(() => {
					this.isLoading = false;
				});
			}
		},
	},
};
</script>

<template>
	<loading v-if="isLoading" />
	<div
		class="the-address-box"
		v-for="address in addresses"
		v-bind:key="address.id"
		v-bind:class="{ 'address-selected': address.default_shipping }"
	>
		<div class="fc addr-pop-tit">
			<h4 class="address-nick">{{ address.name }}</h4>
			<i class="fa-solid fa-ellipsis-vertical" @click="showActionsMenu(address.id)"></i>
		</div>
		<p class="the-address">
			<i class="fa-solid fa-location-dot"></i>
			<span>
				{{ address.address }}, {{ address.number }}, {{ address.district }},
				{{ address.city }}, {{ address.state }} - {{ address.postal_code }}
			</span>
		</p>
		<ul class="actions-menu" v-if="actionToShow == address.id">
			<li @click="showEditForm(address)">
				Editar <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
			</li>
			<li @click="deleteAddress(address)">
				Deletar <i class="fa fa-trash-o" aria-hidden="true"></i>
			</li>
		</ul>
	</div>
</template>

<style>
.the-address-box {
	position: relative;
}

.actions-menu {
	right: -30%;
	z-index: 5000;
	top: 0.2rem;
	border-radius: 5px;
	box-shadow: none;
	position: absolute;
	list-style: none;
	background: white;
	overflow: hidden;
}

.actions-menu li {
	color: var(--font-color);
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 6.5rem;
	padding: 0 0.8rem;
	cursor: pointer;
}

.actions-menu li:active {
	background: rgb(241, 241, 241);
}

.actions-menu li:first-child {
	padding-bottom: 0.2rem;
	padding-top: 0.3rem;
}

.actions-menu li:last-child {
	padding-bottom: 0.3rem;
	padding-top: 0.2rem;
}

.actions-menu i {
	font-size: 0.8rem;
	color: var(--font-color) !important;
}
</style>
