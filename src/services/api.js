import axios from "axios";

class ApiService {
	getAll(service) {
		return this.axios.get(service);
	}

	get(service, id) {
		return this.axios.get(`${service}/${id}`);
	}

	create(service, data = null) {
		return this.axios.post(service, data);
	}

	update(service, id, data) {
		return this.axios.put(`${service}/${id}`, data);
	}

	delete(service, id) {
		return this.axios.delete(`${service}/${id}`);
	}

	deleteAll(service) {
		return this.axios.delete(service);
	}

	findBy(service, title) {
		return this.axios.get(`${service}?find=${title}`);
	}

	login(user_id) {
		return this.axios.get("aluno/" + user_id + "/token");
	}

	init() {
		this.axios = axios.create({
			baseURL: import.meta.env.VITE_API_URL,
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		});
	}
}

export default new ApiService();
