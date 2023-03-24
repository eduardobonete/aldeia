import AuthService from "../services/auth.service";
import api from "@/services/api";
import { initializeApp } from "firebase/app";
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signOut,
	FacebookAuthProvider,
} from "firebase/auth";

const getFirebaseAuth = () => {
	const firebaseConfig = getFirebaseConfig();
	const app = initializeApp(firebaseConfig);
	return getAuth(app);
};

const getFirebaseConfig = () => {
	return {
		apiKey: "AIzaSyC27Gdo1nI4hbVXSrAo8rWdHy4btrkOA88",
		authDomain: "aldeiapet-34da9.firebaseapp.com",
		projectId: "aldeiapet-34da9",
		storageBucket: "aldeiapet-34da9.appspot.com",
		messagingSenderId: "936937594168",
		appId: "1:936937594168:web:dd59692d3e821ab2ccf5cd",
		measurementId: "G-Z3R92DWY60",
	};
};

const token = localStorage.getItem("token");

const initialState = token
	? { status: { loggedIn: true }, token: token }
	: { status: { loggedIn: false }, token: null };

export const auth = {
	namespaced: true,
	state: initialState,
	actions: {
		login({ commit }, user) {
			return AuthService.login(user).then(
				(res) => {
					commit("loginSuccess", res);
					api.init();
					return Promise.resolve(res);
				},
				(error) => {
					commit("loginFailure", error);
					return Promise.reject(error);
				},
			);
		},
		logout({ commit }) {
			AuthService.logout();
			commit("logout", null);
		},
		socialLogin({ commit }, provider) {
			const auth = getFirebaseAuth();
			let loginProvider = null;

			switch (provider) {
				case "google":
					loginProvider = new GoogleAuthProvider();
					break;

				case "facebook":
					loginProvider = new FacebookAuthProvider();
					break;

				default:
					loginProvider = new GoogleAuthProvider();
					break;
			}

			return signInWithPopup(auth, loginProvider)
				.then((res) => res.user.getIdToken())
				.then((token) => {
					if (!token) throw new Error("Missing token");

					return api.create("social-login", {
						firebase_token: token,
					});
				})
				.then((res) => {
					var keys = Object.keys(res.data.data);
					keys.forEach(function (k) {
						localStorage.setItem(k, res.data.data[k]);
					});

					commit("loginSuccess", res.data.data.token);
					return Promise.resolve(res);
				})
				.catch((error) => {
					commit("loginFailure", error);
					return Promise.reject(error);
				});
		},
	},
	mutations: {
		loginSuccess(state, token) {
			state.status.loggedIn = true;
			state.token = token;
		},
		loginFailure(state, error) {
			state.status.loggedIn = false;
			state.token = null;
		},
		logout(state) {
			state.status.loggedIn = false;
		},
	},
};
