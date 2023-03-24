import axios from 'axios';

class AuthService {
	login(user) {
		return axios.post(import.meta.env.VITE_API_URL+'login', user).then(res => {
			if(res.data.success) {
				var keys = Object.keys(res.data.data);
				keys.forEach(function(k) {
					localStorage.setItem(k, res.data.data[k]);
				})
			}
			return res;
			
		});
	}
	logout() {
    	localStorage.removeItem('user');
    	localStorage.removeItem('token');
  	}
}
export default new AuthService();
