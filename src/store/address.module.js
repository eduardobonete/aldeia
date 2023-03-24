import axios from "axios";
import api from "../services/api";
api.init();

export const address = {
	namespaced: true,
	state: {
		addresses: [],
		defaultAddress: null,
	},
	actions: {
		getAddresses({ commit }) {
			return api.getAll("user/shipping-addresses").then(
				(res) => {
					const addresses = res.data.data.addresses;
					const defaultAddress = addresses.find((address) => address.default_shipping);

					commit("setData", addresses);
					commit("setDefault", defaultAddress);
					return Promise.resolve(addresses);
				},
				(error) => {
					commit("setData", []);
					commit("setDefault", null);
					return Promise.reject(error);
				},
			);
		},
		deleteAddress({ commit, state }, addressToDelete) {
			return api.delete("user/shipping-addresses", addressToDelete).then(
				(res) => {
					const addresses = state.addresses.filter(
						(address) => address.id !== addressToDelete,
					);

					commit("setData", addresses);
					return Promise.resolve(addresses);
				},
				(error) => {
					commit("setData", []);
					return Promise.reject(error);
				},
			);
		},
		selectAddress({ commit, state }, address) {
			return api
				.create(`user/shipping-addresses/${address.id}`, {
					...address,
					default_shipping: 1,
				})
				.then((res) => {
					const addressToReplace = state.addresses.find((add) => add.default_shipping);

					if (addressToReplace)
						return api.create(`user/shipping-addresses/${addressToReplace.id}`, {
							...addressToReplace,
							default_shipping: 0,
						});

					return new Promise((resolve, reject) => resolve());
				})
				.then(
					() => {
						const addresses = state.addresses.slice();
						let addressIndex = addresses.findIndex((add) => add.default_shipping);
						if (addressIndex != -1)
							addresses[addressIndex] = {
								...addresses[addressIndex],
								default_shipping: 0,
							};

						addressIndex = addresses.findIndex((add) => add.id === address.id);
						addresses[addressIndex] = {
							...addresses[addressIndex],
							default_shipping: 1,
						};

						commit("setData", addresses);
						return Promise.resolve(addresses);
					},
					(error) => {
						commit("setData", []);
						return Promise.reject(error);
					},
				);
		},
		getCepInfo({ commit }, { cep, addressForm }) {
			return axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((res) => {
				const data = res.data;

				addressForm.address = data.logradouro;
				addressForm.complement = data.complemento;
				addressForm.district = data.bairro;
				addressForm.city = data.localidade;
				addressForm.state = data.uf;

				return Promise.resolve(addressForm);
			});
		},
	},
	mutations: {
		setData(state, address) {
			state.addresses = address;
			address.forEach((row) => {
				if (row.default_shipping == 1) {
					state.default = row;
				}
			});
		},
		setDefault(state, address) {
			state.defaultAddress = address;
		},
	},
};
