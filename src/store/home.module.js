import api from '../services/api';
api.init();
export const home = {
	namespaced: true,
	state: {
		homeData: {
			home_page_best_selling_products: [],
			sliders: [],
			home_page_top_categories: [],
			home_page_banner_new_pet: [],
			home_page_banner: [],
			home_page_best_selling_products: [],
			home_page_popular_brands: [],
			home_page_cat_categories: [],
			home_page_dog_categories: [],
		},
	},
	actions: {
		getData({commit}) {
			return api.getAll('settings/home-page').then(res => {
				commit('setData', res.data);
				return Promise.resolve(res.data);
			}, 
			error => {
				commit('setData', []);
				return Promise.reject(error)
			})
		},

		setDataSelling({commit}, data) {
			commit('setDataSelling', data);
		}
	},
	mutations: {
		setData(state, data) {
			state.homeData = data
		},
		setDataSelling(state, data) {
			state.homeData.home_page_best_selling_products = data
		},
	}
}