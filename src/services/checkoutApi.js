import axios from "axios";

class CheckoutApiService {
	getAll(service) {
		return this.axios.get(service);
	}

	get(service, id) {
		return this.axios.get(`${service}/${id}`);
	}

	create(service, data = null) {
		return this.axios.post(service, data);
	}

	delete(service, itemId, body) {
		return this.axios.delete(`${service}/${itemId}`, { data: body });
	}

	deleteAll(service) {
		return this.axios.delete(service);
	}

	init() {
		this.axios = axios.create({
			baseURL: import.meta.env.VITE_CHECKOUT_API_URL,
			// headers: {
			// 	apiKey: "123",
			// },
		});
	}
}

export default new CheckoutApiService();
