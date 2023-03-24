<script>
import axios from "axios";
import api from "../../../../services/api";
import Loading from "../../../layout/Loading.vue";

export default {
	components: { Loading },
	props: ["addressToEdit"],
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
			formErrors: {},
			isLoading: false,
		};
	},
	computed: {
		addresses() {
			return this.$store.state.address.addresses;
		},
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
				})
				.catch((err) => (this.isLoading = false));
		},
		storeAddress() {
			this.isLoading = true;

			try {
				this.formErrors = {};
				this.requiredFields();
			} catch (error) {
				this.isLoading = false;
				return;
			}

			api.create("user/shipping-addresses", this.addressForm).then((res) => {
				this.navigateBackToList();
			});
		},
		updateAddress() {
			this.isLoading = true;

			try {
				this.formErrors = {};
				this.requiredFields();
			} catch (error) {
				this.isLoading = false;
				return;
			}

			api.create(`user/shipping-addresses/${this.addressToEdit.id}`, this.addressForm).then(
				(res) => {
					this.navigateBackToList();
				},
			);
		},
		requiredFields() {
			if (this.requiredFieldsValidationRule()) {
				if (!this.addressForm.number || !this.addressForm.number.length)
					this.formErrors.number = "required";
				if (!this.addressForm.name || !this.addressForm.name.length)
					this.formErrors.name = "required";
				if (!this.addressForm.state || !this.addressForm.state.length)
					this.formErrors.state = "required";
				if (!this.addressForm.postal_code || !this.addressForm.postal_code.length)
					this.formErrors.postal_code = "required";
				if (!this.addressForm.address || !this.addressForm.address.length)
					this.formErrors.address = "required";
				if (!this.addressForm.city || !this.addressForm.city.length)
					this.formErrors.city = "required";
				if (!this.addressForm.district || !this.addressForm.district.length)
					this.formErrors.district = "required";
				if (!this.addressForm.phone_no || !this.addressForm.phone_no.length)
					this.formErrors.phone_no = "required";

				throw new Error();
			}
		},
		requiredFieldsValidationRule() {
			return (
				!this.addressForm.number ||
				!this.addressForm.number.length ||
				!this.addressForm.name ||
				!this.addressForm.name.length ||
				!this.addressForm.state ||
				!this.addressForm.state.length ||
				!this.addressForm.address ||
				!this.addressForm.address.length ||
				!this.addressForm.city ||
				!this.addressForm.city.length ||
				!this.addressForm.district ||
				!this.addressForm.district.length ||
				!this.addressForm.phone_no ||
				!this.addressForm.phone_no.length
			);
		},
		navigateBackToList() {
			this.$store.dispatch("address/getAddresses");
			this.$emit("openAddress");
			this.isLoading = false;
		},
	},
	emits: ["openAddress"],
	created() {
		api.init();

		if (this.addressToEdit) {
			this.addressForm = {
				name: this.addressToEdit.name,
				state: this.addressToEdit.state,
				postal_code: this.addressToEdit.postal_code,
				address: this.addressToEdit.address,
				city: this.addressToEdit.city,
				district: this.addressToEdit.district,
				number: this.addressToEdit.number,
				complement: this.addressToEdit.complement,
				phone_no: this.addressToEdit.phone_no,
			};
		}
	},
};
</script>

<template>
	<loading v-if="isLoading" />
	<h2 class="pop-tit" v-if="addressToEdit">Editar Endereço</h2>
	<h2 class="pop-tit" v-else>Cadastrar Novo</h2>

	<div class="cad-pet-info-field">
		<div class="fc">
			<input
				type="text"
				placeholder="Nome"
				v-model="addressForm.name"
				v-bind:class="{ 'input-error': formErrors.name }"
			/>
			<i class="fa-solid fa-house"></i>
		</div>

		<p class="error-text" v-if="formErrors.name == 'required'">Campo obrigatório</p>
	</div>

	<div class="cad-pet-info-field">
		<input
			type="text"
			placeholder="Telefone"
			v-model="addressForm.phone_no"
			v-bind:class="{ 'input-error': formErrors.phone_no }"
		/>

		<p class="error-text" v-if="formErrors.phone_no == 'required'">Campo obrigatório</p>
	</div>

	<div class="cad-pet-info-field">
		<input
			type="text"
			placeholder="CEP"
			v-model="addressForm.postal_code"
			v-bind:class="{ 'input-error': formErrors.postal_code }"
			v-on:change="getCepInfo"
			v-maska="postalCodeMaska"
			data-maska="##.###-###"
		/>

		<p class="error-text" v-if="formErrors.postal_code == 'required'">Campo obrigatório</p>
	</div>

	<div class="cad-pet-info-field">
		<input
			type="text"
			placeholder="Rua"
			v-model="addressForm.address"
			v-bind:class="{ 'input-error': formErrors.address }"
		/>

		<p class="error-text" v-if="formErrors.address == 'required'">Campo obrigatório</p>
	</div>

	<div class="cad-pet-info-field">
		<input
			type="text"
			placeholder="Bairro"
			v-model="addressForm.district"
			v-bind:class="{ 'input-error': formErrors.district }"
		/>

		<p class="error-text" v-if="formErrors.district == 'required'">Campo obrigatório</p>
	</div>

	<div class="cad-pet-info-field">
		<input
			type="text"
			placeholder="Cidade"
			v-model="addressForm.city"
			v-bind:class="{ 'input-error': formErrors.city }"
		/>

		<p class="error-text" v-if="formErrors.city == 'required'">Campo obrigatório</p>
	</div>

	<div class="cad-pet-info-field">
		<input
			type="text"
			placeholder="Número"
			v-model="addressForm.number"
			v-bind:class="{ 'input-error': formErrors.number }"
		/>

		<p class="error-text" v-if="formErrors.number == 'required'">Campo obrigatório</p>
	</div>

	<div class="cad-pet-info-field">
		<input type="text" placeholder="Complemento" v-model="addressForm.complement" />
	</div>

	<div class="cad-pet-info-field">
		<input
			type="text"
			placeholder="Estado"
			v-model="addressForm.state"
			v-bind:class="{ 'input-error': formErrors.state }"
		/>

		<p class="error-text" v-if="formErrors.state == 'required'">Campo obrigatório</p>
	</div>

	<a class="sel-loja-btn" v-if="addressToEdit" @click="updateAddress">
		<span class="sel-loja-btn-text">Salvar alterações</span>
	</a>

	<a class="sel-loja-btn" v-else @click="storeAddress">
		<span class="sel-loja-btn-text">Cadastrar Endereço</span>
	</a>
</template>

<style></style>
