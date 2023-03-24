export const payment = {
	namespaced: true,
	state:{ 
		type: null,
		card: null,
		parcelas: {},
		result: null,
	},
	actions: {
		setType({commit}, type) {
			commit('setType', type);
		},
		setCard({commit}, card) {
			commit('setCard', card);
		},
		setParcelas({commit}, data) {
			commit('setParcelas', data);
		},
		setResult({commit}, data) {
			commit('setResult', data);
		}
	},
	mutations: {
		setType(state, type) {
			state.type = type;
		},
		setCard(state, card) {
			state.card = card;
		},
		setParcelas(state, data) {
			state.parcelas = data;
		},
		setResult(state, data) {
			state.result = data;
		}
	}
}
