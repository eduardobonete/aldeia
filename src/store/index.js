import { createStore } from "vuex";
import { auth } from "./auth.module";
import { home } from "./home.module";
import { product } from "./product.module";
import { cart } from "./cart.module";
import { address } from "./address.module";
import { profile } from "./profile.module";
import { payment } from "./payment.module";

const store = createStore({
	modules: {
		auth,
		home,
		product,
		cart,
		address,
		profile,
		payment,
	},
});

export default store;
