<script>
import AddressList from "../Address/AddressList.vue";
import AddressListPartialScreen from "../../../components/profile/AddressListPartialScreen.vue";
import checkoutApi from "../../../services/checkoutApi";
import Loading from "../../../components/layout/Loading.vue";

const CARD_REGEX =
	/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

export default {
	components: { AddressList, AddressListPartialScreen, Loading },
	data() {
		return {
			cardForm: {
				number: "",
				ownerName: "",
				expireDate: "",
				securityCode: "",
			},
			shouldShowAddresses: false,
			addresses: [],
			chosenAddress: null,
			formErrors: {},
			isLoading: false,
		};
	},
	methods: {
		toggleAddressTab() {
			this.shouldShowAddresses = !this.shouldShowAddresses;
			this.formErrors = {};
		},
		chooseAddress(address) {
			this.chosenAddress = address;
			this.toggleAddressTab();
		},
		storeCard() {
			this.isLoading = true;

			try {
				this.formErrors = {};
				this.validateForm();

				const dateParts = this.cardForm.expireDate.split("/");

				checkoutApi
					.create(`cards/${this.$store.state.profile.user.user_id}`, {
						card: {
							card_number: this.cardForm.number,
							expiration_month: dateParts[0],
							expiration_year: dateParts[1],
							holder_name: this.cardForm.ownerName,
							security_code: this.cardForm.securityCode,
							user_id: this.$store.state.profile.user.user_id,
							uid_zoop: this.$store.state.profile.user.uid_zoop,
						},
						billing_address: this.chosenAddress,
					})
					.then(() => {
						this.isLoading = false;
						this.$router.replace({ name: "profile_cards" });
					});
			} catch (error) {
				this.isLoading = false;
				return;
			}
		},
		validateForm() {
			this.requiredFields();

			if (!CARD_REGEX.test(this.cardForm.number.replaceAll(" ", ""))) {
				this.formErrors.number = "invalid";
				throw new Error();
			}

			if (this.cardForm.securityCode.length <= 2) {
				this.formErrors.securityCode = "invalid";
				throw new Error();
			}
		},
		requiredFields() {
			if (
				!this.cardForm.number ||
				!this.cardForm.number.length ||
				!this.cardForm.ownerName ||
				!this.cardForm.ownerName.length ||
				!this.cardForm.expireDate ||
				!this.cardForm.expireDate.length ||
				!this.cardForm.securityCode ||
				!this.cardForm.securityCode.length ||
				!this.chosenAddress
			) {
				if (!this.cardForm.number || !this.cardForm.number.length)
					this.formErrors.number = "required";
				if (!this.cardForm.ownerName || !this.cardForm.ownerName.length)
					this.formErrors.ownerName = "required";
				if (!this.cardForm.expireDate || !this.cardForm.expireDate.length)
					this.formErrors.expireDate = "required";
				if (!this.cardForm.securityCode || !this.cardForm.securityCode.length)
					this.formErrors.securityCode = "required";
				if (!this.chosenAddress) this.formErrors.chosenAddress = "required";

				throw new Error();
			}
		},
	},
	created() {
		checkoutApi.init();

		this.$store.dispatch("address/getAddresses").then(() => {
			this.addresses = this.$store.state.address.addresses;
		});

		if (!this.$store.state.profile.user.user_id) this.$store.dispatch("profile/getProfileData");
	},
};
</script>

<template>
	<loading v-if="isLoading" />
	<div class="backdrop" v-if="shouldShowAddresses"></div>

	<address-list-partial-screen
		:addresses="addresses"
		:onClose="toggleAddressTab"
		:chooseAddress="chooseAddress"
		:shouldShowAddresses="shouldShowAddresses"
	/>

	<div class="card-page mt-100">
		<div class="card-container">
			<div class="cad-pet-info-field fc">
				<input
					type="text"
					placeholder="Número do Cartão"
					v-model="cardForm.number"
					v-maska
					data-maska="#### #### #### ####"
					v-bind:class="{
						'error-input':
							formErrors.number == 'required' || formErrors.number == 'invalid',
					}"
				/>
				<i class="fa fa-credit-card" aria-hidden="true"></i>
			</div>
			<p class="error-text" v-if="formErrors.number == 'required'">Campo obrigatório</p>
			<p class="error-text" v-if="formErrors.number == 'invalid'">
				Número de cartão inválido
			</p>
		</div>

		<div class="inputs-container">
			<div class="card-container w-48">
				<div class="cad-pet-info-field fc">
					<input
						type="text"
						placeholder="Validade"
						v-model="cardForm.expireDate"
						v-maska
						data-maska="##/##"
						v-bind:class="{
							'error-input': formErrors.expireDate == 'required',
						}"
					/>
				</div>

				<p class="error-text" v-if="formErrors.expireDate == 'required'">
					Campo obrigatório
				</p>
			</div>

			<div class="card-container w-48">
				<div class="cad-pet-info-field fc">
					<input
						type="text"
						placeholder="CVV"
						v-model="cardForm.securityCode"
						v-maska
						data-maska="####"
						v-bind:class="{
							'error-input':
								formErrors.securityCode == 'required' ||
								formErrors.securityCode == 'invalid',
						}"
					/>
				</div>

				<p class="error-text" v-if="formErrors.securityCode == 'required'">
					Campo obrigatório
				</p>
				<p class="error-text" v-if="formErrors.securityCode == 'invalid'">
					Código precisa ter 3 dígitos
				</p>
			</div>
		</div>

		<div class="card-container">
			<div class="cad-pet-info-field fc">
				<input
					type="text"
					placeholder="Nome do Titular"
					v-model="cardForm.ownerName"
					v-bind:class="{
						'error-input': formErrors.ownerName == 'required',
					}"
				/>
			</div>
			<p class="error-text" v-if="formErrors.ownerName == 'required'">Campo obrigatório</p>
		</div>

		<h2>Endereço da Fatura</h2>

		<button class="btn fullwidth" v-on:click="toggleAddressTab" v-if="!chosenAddress">
			<i class="fa fa-plus" aria-hidden="true"></i>
			Selecionar Endereço
		</button>

		<button
			class="btn fullwidth btn-address"
			v-on:click="toggleAddressTab"
			v-if="chosenAddress"
		>
			<h2>{{ chosenAddress.name }}</h2>

			<div class="address-text">
				<i class="fa fa-map-marker address-icon" aria-hidden="true"></i>

				<h4>
					{{ chosenAddress.address }}, {{ chosenAddress.number }},
					{{ chosenAddress.city }} - {{ chosenAddress.state }},
					{{ chosenAddress.postal_code }}
				</h4>
			</div>
		</button>

		<div class="btn-alter-address-container" v-if="chosenAddress">
			<button class="btn btn-transparent" v-on:click="toggleAddressTab">
				Alterar endereço
			</button>
		</div>

		<div class="btn-alter-address-container" v-if="formErrors.chosenAddress == 'required'">
			<p class="error-text">Campo obrigatório</p>
		</div>

		<div class="bottom-btn-row">
			<button class="btn btn-primary fullwidth" v-on:click="storeCard">
				Salvar Novo Cartão
			</button>
		</div>
	</div>
</template>

<style scoped>
.cad-pet-info-field {
	margin: 0;
}

.card-container {
	margin-bottom: 0.7rem;
}
.btn-alter-address-container {
	display: flex;
	justify-content: center;
}

.btn-alter-address-container .btn {
	background: transparent;
	color: var(--main-color);
}
.btn-address {
	padding: 0.5rem 1rem 0.8rem 1rem;
	color: var(--font-color);
}

.btn-address h2 {
	text-align: start;
	color: var(--profile-font-color);
}

h2 {
	color: var(--main-color);
	font-size: 0.9rem;
	margin-bottom: 0.7rem;
}

.card-page {
	padding: 0 1rem;
}

.inputs-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>
