import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ProductView from "@/views/ProductView.vue";
import ProductDetailView from "@/views/ProductDetailView.vue";
import CartView from "@/views/CartView.vue";
import AddressListView from "@/views/Profile/Address/AddressList.vue";
import AddressFormView from "@/views/Profile/Address/AddressForm.vue";
import SearchView from "@/views/SearchView.vue";
import ProfileView from "@/views/Profile/Profile.vue";
import ContactUsView from "@/views/Profile/ContactUs.vue";
import PetsListView from "@/views/Profile/Pets/PetsList.vue";
import PetsFormView from "@/views/Profile/Pets/PetsForm.vue";
import CardListView from "@/views/Profile/Cards/Cards.vue";
import CardFormView from "@/views/Profile/Cards/CardsForm.vue";
import RegisterFormView from "@/views/Profile/Register/RegisterForm.vue";
import ResetPasswordMobile from "@/views/Profile/ResetPassword/ResetPasswordMobile.vue";
import ProfileEditView from "@/views/Profile/EditProfile.vue";
import OrderView from "@/views/OrderView.vue";
import OrderDetail from "@/views/OrderDetail.vue";
import OrderConfirmView from "@/views/OrderConfirmView.vue";
import ShippingConfirmView from "@/views/ShippingConfirmView.vue";
import PagamentoView from "@/views/PagamentoView.vue";
import OrderFinalView from "@/views/OrderFinalView.vue";
import ParcelaView from "@/views/ParcelaView.vue";
import PixPaymentGenerateView from "@/views/Payment/Pix/PixPaymentGenerateView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_BASE_URL),
	scrollBehavior(to, from, savedPosition) {
		return { top: 0 };
	},
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/:slug",
			name: "product",
			component: ProductView,
		},
		{
			path: "/produto/:slug",
			name: "product_detail",
			component: ProductDetailView,
		},
		{
			path: "/cart",
			name: "cart",
			props: { title: "Carrinho de Compras" },
			component: CartView,
		},
		{
			path: "/perfil",
			name: "profile",
			component: ProfileView,
		},
		{
			path: "/cadastro",
			name: "profile_register",
			component: RegisterFormView,
		},
		{
			path: "/reset-password",
			name: "reset-password-mobile",
			component: ResetPasswordMobile,
		},
		{
			path: "/perfil/endereco",
			name: "profile_address",
			props: { title: "Endereços" },
			component: AddressListView,
		},
		{
			path: "/perfil/endereco/criar",
			name: "profile_address_create",
			component: AddressFormView,
		},
		{
			path: "/perfil/endereco/:id",
			name: "profile_address_edit",
			component: AddressFormView,
		},
		{
			path: "/perfil/contatos",
			name: "contact_us",
			component: ContactUsView,
		},
		{
			path: "/perfil/pets",
			name: "profile_pets",
			component: PetsListView,
		},
		{
			path: "/perfil/pets/criar",
			name: "profile_pets_create",
			component: PetsFormView,
		},
		{
			path: "/perfil/pets/:pet",
			name: "profile_pets_edit",
			component: PetsFormView,
		},
		{
			path: "/perfil/cards",
			name: "profile_cards",
			component: CardListView,
			props: { title: "Meus Cartões" },
		},
		{
			path: "/perfil/cards/criar",
			name: "profile_cards_create",
			component: CardFormView,
		},
		{
			path: "/perfil/edit",
			name: "profile_edit",
			component: ProfileEditView,
		},
		{
			path: "/busca",
			name: "search",
			component: SearchView,
		},
		{
			path: "/pedidos",
			name: "order",
			props: { title: "Pedidos" },
			component: OrderView,
		},
		{
			path: "/order-detail/:order",
			name: "order-detail",
			component: OrderDetail,
		},
		{
			path: "/pagamentos",
			name: "pagamentos",
			props: { title: "Formas de pagamento" },
			component: PagamentoView,
		},
		{
			path: "/order-confirm",
			name: "order-confirm",
			props: { title: "Confirme sua Compra" },
			component: OrderConfirmView,
		},
		{
			path: "/shipping-confirm",
			name: "shipping-confirm",
			props: { title: "Confirme sua entrega" },
			component: ShippingConfirmView,
		},
		{
			path: "/order-final",
			name: "order-final",
			props: { title: "Boleto Bancário" },
			component: OrderFinalView,
		},
		{
			path: "/parcela",
			name: "parcela",
			props: { title: "Em quantas vezes?" },
			component: ParcelaView,
		},
		{
			path: "/pix-payment-generate",
			name: "pix-payment-generate",
			props: { title: "" },
			component: PixPaymentGenerateView,
		},
	],
});

router.beforeEach((to, from, next) => {
	const publicPages = ["home", "profile_register", "profile", "search", "reset-password-mobile"];
	const authRequired = !publicPages.includes(to.name);
	const loggedIn = localStorage.getItem("token");

	// trying to access a restricted page + not logged in
	// redirect to login page
	if (authRequired && !loggedIn) {
		next("/");
	} else {
		next();
	}
});

export default router;
