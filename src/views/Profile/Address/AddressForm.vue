<script>
import axios from "axios";
import api from "../../../services/api";
import Loading from "../../../components/layout/Loading.vue";

export default {
	components: { Loading },
	data() {
		return {
			addressForm: {
				name: "",
				state: "",
				postal_code: "",
				address: "",
				city: "",
				district: "",
				number: "",
				complement: "",
				phone_no: "",
			},
			postalCodeMaska: {},
			isEdit: false,
			isLoading: false,
		};
	},
	methods: {
		getCepInfo() {
			this.isLoading = true;

			this.$store
				.dispatch("address/getCepInfo", {
					cep: this.postalCodeMaska.unmasked,
					addressForm: this.addressForm,
				})
				.then((addressForm) => {
					this.addressForm = addressForm;
					this.isLoading = false;
				});
		},

		storeAddress() {
			this.isLoading = true;

			api.create("user/shipping-addresses", this.addressForm).then((res) => {
				this.$router.replace({ name: "profile_address" });
			});
		},

		updateAddress() {
			this.isLoading = true;

			axios
				.post(
					`user/shipping-addresses/${this.$router.currentRoute.value.params.id}`,
					this.addressForm,
				)
				.then((res) => {
					this.$router.replace({ name: "profile_address" });
				});
		},
	},
	created() {
		if (this.$router.currentRoute.value.params.id) {
			const address = this.$store.state.address.addresses.find(
				(ad) => ad.id == this.$router.currentRoute.value.params.id,
			);

			if (!address) {
				this.$router.replace({ name: "profile_address" });
				return;
			}

			this.addressForm = {
				name: address.name,
				state: address.state,
				postal_code: address.postal_code,
				address: address.address,
				city: address.city,
				district: address.district,
				number: address.number,
				complement: address.complement,
				phone_no: address.phone_no,
			};

			this.isEdit = true;
		}
	},
};
</script>

<template>
	<loading v-if="isLoading" />

	<div class="container mt-100">
		<div class="input-group-append-icon input-group mb-1">
			<span class="input-group-icon" id="basic-addon1">
				<i class="fa fa-home icon" aria-hidden="true"></i>
			</span>
			<input type="text" class="form-control" placeholder="Nome" v-model="addressForm.name" />
		</div>
		<div class="input-group-append-icon input-group mb-1">
			<span class="input-group-icon" id="basic-addon1">
				<i class="fa fa-phone icon" aria-hidden="true"></i>
			</span>
			<input
				type="text"
				class="form-control"
				placeholder="Telefone de contato"
				v-model="addressForm.phone_no"
				v-maska
				data-maska="(##)#####-####"
			/>
		</div>

		<input
			type="text"
			class="form-control mb-1"
			placeholder="CEP"
			v-model="addressForm.postal_code"
			v-on:change="getCepInfo"
			v-maska="postalCodeMaska"
			data-maska="##.###-###"
		/>
		<input
			type="text"
			class="form-control mb-1"
			placeholder="Rua"
			v-model="addressForm.address"
		/>
		<input
			type="text"
			class="form-control mb-1"
			placeholder="Bairro"
			v-model="addressForm.district"
		/>
		<input
			type="text"
			class="form-control mb-1"
			placeholder="Cidade"
			v-model="addressForm.city"
		/>
		<input
			type="number"
			class="form-control mb-1"
			placeholder="Número"
			v-model="addressForm.number"
		/>
		<input
			type="text"
			class="form-control mb-1"
			placeholder="Complemento"
			v-model="addressForm.complement"
		/>
		<input
			type="text"
			class="form-control mb-2"
			placeholder="Estado"
			v-model="addressForm.state"
		/>
		<button class="btn btn-primary fullwidth" v-on:click="storeAddress" v-if="!isEdit">
			Cadastrar Endereço
		</button>

		<button class="btn btn-primary fullwidth" v-on:click="updateAddress" v-if="isEdit">
			Atualizar Endereço
		</button>
	</div>
</template>
<style scoped>
.container {
	padding: 1rem 1rem;
}

.mb-1 {
	margin-bottom: 0.5rem;
}

.mb-2 {
	margin-bottom: 1rem;
}

.icon {
	color: #838383;
}
</style>
