import api from "../services/api";
api.init();
export const product = {
	namespaced: true,
	state: {
		product: [],
		related: [],
	},
	actions: {
		getProduct({ commit }, slug) {
			return api.getAll("products/" + slug).then(
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
		getRelated({ commit }, { slug, sort }) {
			return api.create("related-sellers/" + slug, { sort: sort }).then(
				(res) => {
					commit("setRelated", res.data);
					return Promise.resolve(res.data);
				},
				(error) => {
					commit("setRelated", []);
					return Promise.reject(error);
				},
			);
		},
		getProductByCategory({ commit }, category) {
			return api.getAll("products-by-category/" + category).then(
				(res) => {
					commit("home/setDataSelling", res.data.data, { root: true });
					return Promise.resolve(res.data);
				},
				(error) => {
					commit("setHomeProduct", []);
					return Promise.reject(error);
				},
			);
		},
	},
	mutations: {
		setData(state, product) {
			state.product = product;
		},
		setRelated(state, product) {
			state.related = product;
		},
	},
};
