import api from "../services/api";
import checkoutApi from "../services/checkoutApi";

api.init();
checkoutApi.init();

export const profile = {
	namespaced: true,
	state: {
		user: {},
		pets: [],
		cards: [],
		localizationSellers: [],
	},
	actions: {
		getLocalizationUser({commit}, data) {
			return api.create('localizationUser', data).then(
				(res) => {
					commit('setLocaliationSeller', res.data.sellers);
				},
				(error) => {
					commit('setLocaliationSeller', []);
				})
		},
		getProfileData({ commit }) {
			return api.getAll("user/profile").then(
				(res) => {
					const user = res.data.data;

					commit("setUser", user);
					return Promise.resolve(user);
				},
				(error) => {
					commit("setUser", {});
					return Promise.reject(error);
				},
			);
		},
		getPetData({ commit, state }) {
			return api.getAll("user/getpets").then(
				(res) => {
					const pets = res.data.pets.map((pet) => {
						pet.profile_photo = JSON.parse(pet.profile_photo);
						return pet;
					});

					commit("setPets", pets);
					return Promise.resolve(pets);
				},
				(error) => {
					commit("setPets", []);
					return Promise.reject(error);
				},
			);
		},
		deletePet({ commit, state }, petToDelete) {
			return api.get("user/delete-pet", petToDelete).then(
				(res) => {
					const pets = state.pets.filter((pet) => pet.id !== petToDelete);

					commit("setPets", pets);
					return Promise.resolve(pets);
				},
				(error) => {
					commit("setPets", []);
					return Promise.reject(error);
				},
			);
		},
		getCards({ commit, state }) {
			return checkoutApi.get("cards", state.user.user_id).then(
				(res) => {
					const cards = res.data.map((card) => {
						card.card_brand_logo =
							window.location.origin +
							`/src/assets/icons/${card.card_brand}-logo.png`;
						return card;
					});

					commit("setCards", cards);
					return Promise.resolve(cards);
				},
				(error) => {
					commit("setCards", []);
					return Promise.reject(error);
				},
			);
		},
		deleteCard({ commit, state }, card) {
			return checkoutApi
				.delete("cards", card.card_id, { user_id: state.user.user_id })
				.then((res) => {
					const cards = state.cards.filter(
						(stateCard) => stateCard.card_id !== card.card_id,
					);
					commit("setCards", cards);
					return Promise.resolve(cards);
				});
		},
		updateProfile({ commit, state }, userForm) {
			const form = new FormData();

			form.append("first_name", userForm.first_name);
			form.append("last_name", userForm.last_name);
			form.append("cpf", userForm.cpf);
			form.append("phone", userForm.phone);
			form.append("whatsapp", userForm.whatsapp ? 1 : 0);
			form.append("sms", userForm.sms ? 1 : 0);
			form.append("gender", state.gender);
			form.append("email", userForm.email);

			if (userForm.profileImageFile) form.append("image", userForm.profileImageFile);

			return api.create("user/update-profile", form);
		},
	},
	mutations: {
		setUser(state, user) {
			state.user = user;
		},
		setPets(state, pets) {
			state.pets = pets;
		},
		setCards(state, cards) {
			state.cards = cards;
		},
		setLocaliationSeller(state, data) {
			state.localizationSellers = data;
		}
	},
};
