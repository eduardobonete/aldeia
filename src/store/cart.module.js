import api from "../services/api";
export const cart = {
	namespaced: true,
	state: {
		cart: {
			carts: [],
			calculations: {},
			sellerGroupedCart: [],
		},
		trx_id: "",
	},
	actions: {
		getCart({ commit, state }) {
			return api.getAll("carts").then(
				(res) => {
					commit("setData", res.data);
					return Promise.resolve(res.data);
				},
				(error) => {
					commit("setData", []);
					return Promise.reject(error);
				},
			);
		},
		emptyCart({ comit }) {
			return api.delete("user", "cart").then(
				(res) => {
					commit("setData", []);
					return Promise.resolve(res.data);
				},
				(error) => {
					commit("setData", []);
					return Promise.reject(error);
				},
			);
		},
		updateProductCart({ commit }, data) {
			return api.create("cart-update/" + data.id, data.data).then(
				(res) => {
					return Promise.resolve(res.data);
				},
				(error) => {
					commit("setData", []);
					return Promise.reject(error);
				},
			);
		},
		updateProductCartSync({ commit, state, dispatch }, data) {
			const cart = state.cart;
			const index = cart.carts.findIndex((item) => item.id == data.id);
			const cartItem = cart.carts[index];
			cartItem.quantity += data.data.quantity;
			cart.carts[index] = cartItem;

			commit("setData", cart);

			return api
				.create("cart-update/" + data.id, data.data)
				.then((res) => dispatch("getCart"))
				.catch((error) => {
					commit("setData", []);
					return Promise.reject(error);
				});
		},
		deleteProductCart({ commit }, id) {
			return api.delete("cart-delete", id).then(
				(res) => {
					return Promise.resolve(res.data);
				},
				(error) => {
					return Promise.reject(error);
				},
			);
		},
		deleteProductCartSync({ commit, state, dispatch }, id) {
			const cart = state.cart;
			const newCarts = cart.carts.filter((item) => item.id !== id);
			cart.carts = newCarts;

			commit("setData", cart);

			return api
				.delete("cart-delete", id)
				.then((res) => dispatch("getCart"))
				.catch((error) => {
					commit("setData", []);
					return Promise.reject(error);
				});
		},
		addProductCart({ commit }, product) {
			return api.create("cart-store", product).then(
				(res) => {
					return Promise.resolve(res.data);
				},
				(error) => {
					return Promise.reject(error);
				},
			);
		},
		updateTrx({ commit }, trx_id) {
			commit();
		},
		setCart({ commit }, value) {
			commit("setValue", value);
		},
	},
	mutations: {
		setData(state, cart) {
			const groupedCartArr = [];

			if (cart.carts.length) {
				const groupedCartObj = {};

				for (const cartObj of cart.carts) {
					if (!groupedCartObj[cartObj.seller_id]) groupedCartObj[cartObj.seller_id] = [];
					groupedCartObj[cartObj.seller_id].push(cartObj);
				}

				for (const key in groupedCartObj) {
					groupedCartArr.push(groupedCartObj[key]);
				}
			}

			cart.sellerGroupedCart = groupedCartArr;

			state.cart = cart;
		},
		setTrx(state, trx) {
			state.trx = trx;
		},
		setValue(state, value) {
			state.payment = value;
		},
	},
};
