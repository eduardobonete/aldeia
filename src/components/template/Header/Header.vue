<script>
import $ from "jquery";
import AddressList from "./AddressModal/AddressList.vue";
import AddressModalForm from "./AddressModal/AddressModalForm.vue";

import * as popup from "@/assets/js/popup.js";

export default {
	components: { AddressList, AddressModalForm },
	data() {
		return {
			type: "password",
			form: {
				email: null,
				password: null,
			},
			errors: {
				email: false,
				password: false,
				return: null,
			},
			popups: null,
			hideRoutes: [
				"product",
				"product_detail",
				"profile_register",
				"reset-password-mobile",
				"cart",
				"search",
				"profile_address",
				"profile_address_create",
				"profile_address_edit",
				"profile",
				"contact_us",
				"profile_pets",
				"profile_pets_create",
				"profile_pets_edit",
				"order",
				"order-confirm",
				"shipping-confirm",
				"profile_cards",
				"profile_cards_create",
				"profile_edit",
				"pagamentos",
				"order-final",
				"product",
				"parcela",
				"pix-payment-generate",
				"order-detail",
			],
			addressModalTypes: {
				WITHOUT_ADDRESS: "WITHOUT_ADDRESS",
				WITH_ADDRESS: "WITH_ADDRESS",
				NEW_ADDRESS: "NEW_ADDRESS",
				EDIT_ADDRESS: "EDIT_ADDRESS",
			},
			addressModalType: "WITHOUT_ADDRESS",
			addressToEdit: null,
			isLoading: false,
		};
	},
	computed: {
		loggedIn() {
			return this.$store.state.auth.status.loggedIn;
		},
		userName() {
			return localStorage.getItem("first_name");
		},
		token() {
			return localStorage.getItem("token");
		},
		addresses() {
			return this.$store.state.address.addresses;
		},
		cart() {
			return this.$store.state.cart.cart.carts;
		},
		groupedCart() {
			return this.$store.state.cart.cart.sellerGroupedCart;
		},
		cartCalculations() {
			return this.$store.state.cart.cart.calculations;
		},
		address() {
			return this.$store.state.address.default;
		},
		title() {
			var list = this.$route.matched[0];
			if (list != undefined) {
				return list.props.default;
			} else {
				return false;
			}
		},
		defaultAddress() {
			return this.$store.state.address.defaultAddress;
		},
	},
	created() {
		this.popups = popup;
	},
	mounted() {
		if (this.loggedIn) this.$store.dispatch("address/getAddresses");
	},
	methods: {
		focus(e) {
			$(e).parents(".form-group").addClass("focused");
		},
		blur(e) {
			var inputValue = $(e).val();
			if (inputValue == "") {
				$(e).removeClass("filled");
				$(e).parents(".form-group").removeClass("focused");
			} else {
				$(e).addClass("filled");
			}
		},
		changeType() {
			if (this.type == "password") {
				this.type = "text";
			} else {
				this.type = "password";
			}
		},
		ishidden() {
			return this.hideRoutes.indexOf(this.$route.name) >= 0;
		},
		openaddress() {
			this.popups.openpopups();
			if (this.addresses.length) this.addressModalType = this.addressModalTypes.WITH_ADDRESS;
			else this.addressModalType = this.addressModalTypes.WITHOUT_ADDRESS;
			document.querySelector("#endereco-pop").classList.add("active");
		},
		logout() {
			this.$store.dispatch("auth/logout");
		},
		redirect() {
			this.$router.push({ name: "search" });
		},
		login() {
			this.errors.email =
				this.form.email == null || this.form.email == "" ? "Email inválido" : false;
			this.errors.password =
				this.form.password == null || this.form.password == ""
					? "Campo obrigatório"
					: false;

			var self = this;
			this.$store.dispatch("auth/login", this.form).then(
				(res) => this.afterLogin(res),
				(error) => {
					self.errors.return = "Credenciais inválidas";
					setTimeout(function () {
						self.errors.return = null;
					}, 3000);
				},
			);
		},
		afterLogin(response) {
			popup.closepop();

			this.$store.dispatch("profile/getProfileData").then((user) => {
				this.$store.dispatch("address/getAddresses");
				this.$store.dispatch("cart/getCart");
				this.$store.dispatch("profile/getCards");
				this.$router.push({ name: "profile" });
			});
		},
		googleLogin() {
			this.socialLogin("google");
		},
		facebookLogin() {
			this.socialLogin("facebook");
		},
		dealWithSocialLoginError(error) {
			if (error.response?.data?.error)
				this.$toast.error(response.data.error, { position: "top" });
		},
		socialLogin(provider) {
			this.$store
				.dispatch("auth/socialLogin", provider)
				.then((response) => this.afterLogin(response))
				.catch((error) => this.dealWithSocialLoginError(error));
		},
		resetPasswordRedirect() {
			if ("ontouchstart" in document.documentElement) {
				window.location.href = "./reset-password";
				return;
			}
		},
		accountRegister() {
			if ("ontouchstart" in document.documentElement) {
				window.location.href = "./cadastro";
				return;
			}
		},
		showNewAddressForm() {
			this.addressModalType = this.addressModalTypes.NEW_ADDRESS;
			this.addressToEdit = null;
		},
		showEditForm(address) {
			this.addressModalType = this.addressModalTypes.EDIT_ADDRESS;
			this.addressToEdit = address;
		},
		formatPrice(price) {
			return price.toLocaleString("pt-br", {
				style: "currency",
				currency: "BRL",
			});
		},
		updateCart(cartItem, quantity) {
			this.isLoading = true;

			if (quantity === 0) {
				this.$store.dispatch("cart/deleteProductCartSync", cartItem.id).then(() => {
					this.isLoading = false;
				});

				return;
			}

			this.$store
				.dispatch("cart/updateProductCartSync", {
					id: cartItem.id,
					data: { quantity: quantity },
				})
				.then(() => {
					this.isLoading = false;
				});
		},
	},
};
</script>
<template>
	<header id="header">
		<!--Layer 1-->
		<div class="upper fc box header-padding-fix">
			<!--Logo-->
			<div class="back-icon-cont" @click="$router.go(-1)" v-if="$route.name != 'home'">
				<i class="fa-solid fa-arrow-left"></i>
			</div>
			<div style="width: 90%" v-if="title != false">
				<p class="primary">{{ title.title }}</p>
			</div>
			<div class="logo fc" v-if="title == false">
				<router-link to="/">
					<img
						src="@/assets/icons/logo_horizontal.png"
						width="150px"
						alt="AldeiaPet logo"
					/>
				</router-link>
			</div>
			<!--Barra de busca-->
			<div class="search fc desk">
				<input type="text" name="search" id="search" placeholder="Buscar Produto" />
				<a href="#" class="search-btn"><i class="fa-solid fa-magnifying-glass"></i></a>
			</div>
			<!--Entrar / Carrinho-->
			<div class="btns fc" v-if="title == false">
				<div class="entrar">
					<a class="entre fc" id="entrar" @click="popups.openentrar()" v-if="!loggedIn">
						<i class="fa-solid fa-user desk"></i>
						<i class="fa-solid fa-arrow-right-to-bracket mobi"></i>
						<span class="desk" v-if="loggedIn">{{ userName }}</span>
						<span class="desk">Entre ou Cadastre-se</span>
						<i class="fa-solid fa-angle-down desk"></i>
					</a>

					<router-link class="entre fc" v-if="loggedIn" :to="{ name: 'profile' }">
						<i class="fa-solid fa-user desk"></i>
						<span class="desk" style="text-decoration: none">{{ userName }}</span>
					</router-link>
				</div>
				<div class="car" v-if="loggedIn">
					<span class="count" v-if="cart.length > 0 && loggedIn">{{ cart.length }}</span>
					<router-link to="/cart" class="mobi">
						<i class="fa-solid fa-cart-shopping"></i>
					</router-link>

					<a class="no-mobi" @click="popups.opencart()">
						<i class="fa-solid fa-cart-shopping"></i>
					</a>
				</div>
				<div class="car" v-else>
					<a @click="popups.openentrar()"><i class="fa-solid fa-cart-shopping"></i></a>
				</div>
			</div>
		</div>

		<!--Layer 2-->
		<div class="user_name search" v-if="loggedIn && !ishidden()">
			Olá, <b>{{ userName }}</b>
		</div>
		<div class="under fc box desk header-padding-fix">
			<div class="address">
				<a href="#" id="cads" @click="openaddress()">
					<i class="fa-solid fa-location-dot"></i>
					<span>Cadastrar <b>Endereço</b></span>
				</a>
			</div>
			<div class="other-btns fc">
				<div class="btn-one fc">
					<router-link :to="{ name: 'order' }" id="acompanhe" class="fc">
						<i class="fa-solid fa-truck"></i>
						<span>Acompanhe seu pedido</span>
					</router-link>
				</div>
				<div class="btn-two fc">
					<a
						href="https://api.whatsapp.com/send?phone=08002227700"
						id="whatsapp"
						class="fc"
					>
						<i class="fa-brands fa-whatsapp"></i>
						<span>Fale conosco</span>
					</a>
				</div>
			</div>
		</div>
		<!--Menu-->
		<div class="menu desk" style="padding-right: 1rem">
			<div class="menu-inner box fc">
				<div class="items fc">
					<div class="todos">
						<a href="#" class="cats-name">
							<i class="fa-solid fa-bars"></i>
							<span>Todas as Categorias</span>
						</a>
					</div>
					<a href="#" class="cats-name">Mais vendidos</a>
					<a href="#" class="cats-name">Novidades</a>
					<a href="#" class="cats-name">Promoções</a>
					<a href="#" class="cats-name">Lojas parceiras</a>
				</div>
				<!--Cadastro lojista-->
				<a href="/seller/register" class="cadastre" v-if="!loggedIn">
					<span class="el-texto"><b>É um lojista?</b> Cadastre-se</span>
				</a>
			</div>
		</div>
	</header>

	<div class="search under fc box mobi" style="margin-top: 120px" v-if="!ishidden()">
		<div class="searc-inp" @click="redirect()">Buscar Produto</div>
		<!--<input type="text" name="search" id="search-mobi" onclick="window.location.replace('file:///E:/Trabalho/Temp/AldeiaPet/search.html');" placeholder="Buscar Produto">-->
		<a href="#" class="search-btn"><i class="fa-solid fa-magnifying-glass"></i></a>
	</div>

	<div class="col-12 col address-area" v-if="defaultAddress && loggedIn && !ishidden()">
		<div class="col-1 col"><i class="fas fa-location-dot"></i></div>
		<div class="col-10 col">
			{{ defaultAddress.address }}, {{ defaultAddress.number }},
			{{ defaultAddress.district }}, {{ defaultAddress.city }}, {{ defaultAddress.state }}
		</div>
	</div>

	<div id="popups" style="visibility: hidden">
		<div class="box">
			<!--popup entrar-->
			<div id="entrar-pop" class="">
				<div class="arrow-up entrar-arrow"></div>
				<div class="pop-content">
					<form>
						<p class="pop-close">
							<i @click="popups.closepop()" class="fa-solid fa-xmark"></i>
						</p>
						<h2 class="pop-tit">Entrar</h2>

						<div class="col-12">
							<div class="form-group">
								<label class="form-label" for="first" @click="$refs.mail.focus()"
									>Email</label
								>
								<span class="form-icon-left">
									<i class="fa-solid fa-envelope grey"></i>
								</span>
								<input
									class="form-input"
									ref="mail"
									type="email"
									name="email"
									v-model="form.email"
									:class="{ 'is-invalid': errors.email != false }"
									@focus="focus($refs.mail)"
									@blur="blur($refs.mail)"
								/>
							</div>
						</div>
						<div class="error" v-if="errors.email != false">{{ errors.email }}</div>
						<div class="col-12">
							<div class="form-group">
								<label class="form-label" @click="$refs.pass.focus()"
									>Password</label
								>
								<span class="form-icon-left">
									<i class="fa-solid fa-lock grey"></i>
								</span>
								<input
									class="form-input"
									ref="pass"
									:type="type"
									name="password"
									v-model="form.password"
									:class="{ 'is-invalid': errors.password != false }"
									@focus="focus($refs.pass)"
									@blur="blur($refs.pass)"
								/>
								<span class="form-icon-rigth" @click="changeType()">
									<i class="fa-solid fa-eye grey"></i>
								</span>
							</div>
						</div>
						<div class="error" v-if="errors.password != false">
							{{ errors.password }}
						</div>
						<router-link to="/reset-password" @click="popups.closepop()" class="def-txt esqueceu">Esqueceu sua senha?</router-link>
						<a @click="login()" rel="noopener noreferrer"
							><span class="pop-btn entrar-btn">Entrar</span></a
						>
						<p class="def-txt">
							Não tem conta? <a href="./cadastro"><b>Cadastre-se agora</b></a>
						</p>
						<div class="col-12">
							<p class="def-txt">
								<img
									src="@/assets/icons/facebook.png"
									class="social-icon"
									@click="facebookLogin"
								/>
								&nbsp;
								<img
									src="@/assets/icons/google.png"
									class="social-icon"
									@click="googleLogin"
								/>
							</p>
						</div>
					</form>
				</div>
			</div>

			<!--popup endereço-->
			<div id="endereco-pop" class="">
				<div class="arrow-up endereco-arrow"></div>
				<div class="pop-content">
					<p class="pop-close">
						<i @click="popups.closepop()" class="fa-solid fa-xmark"></i>
					</p>
					<div class="limit">
						<!--Sem endereço-->
						<div v-if="addressModalType == addressModalTypes.WITHOUT_ADDRESS">
							<h2 class="pop-tit">Endereços</h2>
							<p class="no-add"><i class="fa-solid fa-location-dot"></i></p>
							<h3 class="subtt no-add">Ainda não há Endereços Cadastrados</h3>
							<a class="sel-loja-btn" @click="showNewAddressForm" v-if="loggedIn">
								<span class="sel-loja-btn-text">Cadastrar Novo</span>
							</a>
							<a class="sel-loja-btn" @click="openentrar" v-else>
								<span class="sel-loja-btn-text">Cadastrar Novo</span>
							</a>
						</div>

						<!--Tem endereços-->
						<div v-if="addressModalType == addressModalTypes.WITH_ADDRESS">
							<h2 class="pop-tit">Endereços</h2>

							<address-list :showEditForm="(address) => showEditForm(address)" />

							<a class="sel-loja-btn reversed" @click="showNewAddressForm">
								<span class="sel-loja-btn-text reversed">Cadastrar Novo</span>
							</a>
						</div>

						<!--Cadastrar novo-->
						<div
							v-if="
								addressModalType == addressModalTypes.NEW_ADDRESS ||
								addressModalType == addressModalTypes.EDIT_ADDRESS
							"
						>
							<address-modal-form
								:addressToEdit="addressToEdit"
								@openAddress="() => openaddress()"
							/>
						</div>
					</div>
				</div>
			</div>

			<!--popup carrinho-->
			<div id="carrinho-pop" class="">
				<div class="arrow-up carrinho-arrow"></div>
				<div class="pop-content cart-top">
					<p class="pop-close">
						<i @click="popups.closepop()" class="fa-solid fa-xmark"></i>
					</p>
					<h2 class="pop-tit">Items do Carrinho</h2>
					<div class="limit">
						<h3 class="def-txt" v-if="!cart.length" style="margin: 0.5rem 0 2rem 0">
							Você não tem items no carrinho
						</h3>
						<!--Agrupamento-->
						<div
							class="by-mark"
							v-for="group in groupedCart"
							v-bind:key="group[0].seller.id"
						>
							<!--marca-->
							<div class="mark fc">
								<img
									:src="group[0].seller.logo.image_320x320"
									alt="Ícone da loja"
								/>
								<span class="def-txt">{{ group[0].seller.shop_name }}</span>
							</div>

							<!--item-->
							<div class="cart-item fc" v-for="item in group" v-bind:key="item.id">
								<div class="item-pic">
									<img
										:src="item.product.thumbnail.image_320x320"
										:alt="item.product.product_name"
									/>
								</div>
								<div class="texts">
									<p class="def-txt">{{ item.product.product_name }}</p>
									<p class="def-txt value">
										{{ formatPrice(item.price) }}
									</p>
								</div>
								<div class="quantidade fc">
									<i
										class="fa fa-minus"
										v-if="item.quantity > 1"
										@click="updateCart(item, -1)"
									></i>
									<i
										class="fa-solid fa-trash"
										v-else
										@click="updateCart(item, 0)"
									></i>

									<input
										type="number"
										name="quantity"
										id="this.quantity"
										:value="item.quantity"
										disabled
									/>
									<i class="fa-solid fa-plus" @click="updateCart(item, 1)"></i>
								</div>
							</div>

							<!--subtotal-->
							<p class="def-txt subtot">
								Subtotal:
								<b> {{ formatPrice(group.reduce((a, b) => a + b.price, 0)) }}</b>
							</p>
						</div>
					</div>
				</div>
				<!--Total-->
				<div class="pop-content cart-footer" v-if="cart.length">
					<div class="value-tot fc">
						<span class="def-txt">Valor Total:</span>
						<span class="def-txt">
							<b v-if="isLoading">Carregando...</b>
							<b v-else>{{
								cartCalculations.sub_total
									? formatPrice(cartCalculations.sub_total)
									: ""
							}}</b>
						</span>
					</div>
					<div class="cart-f-btns fc">
						<router-link
							:to="{ name: 'cart' }"
							rel="noopener noreferrer"
							@click="popups.closepop()"
						>
							<span class="pop-btn toent-btn">Finalizar</span>
						</router-link>
					</div>
				</div>
			</div>

			<!--Popup selecionar Loja-->
			<div id="loja-pop" class="">
				<div class="pop-content">
					<p class="pop-close">
						<i @click="popups.closepop()" class="fa-solid fa-xmark"></i>
					</p>
					<!--Selected item-->
					<a href="./detalhes.html">
						<div class="fc sel-item pedido-item">
							<div class="sel-item-img">
								<img
									src="@/assets/images/20221003181202image_190x230-120.png"
									alt=""
								/>
							</div>
							<div class="sel-item-dets">
								<h3 class="def-txt">
									Ração Fórmula Natural Life Super Premium para Cães Adultos Raças
									Mini e Pequena
								</h3>
								<p class="def-txt value">Encontrado em <b>8</b> lojas</p>
							</div>
						</div>
					</a>
					<!--Titulo e short-->
					<div class="fc loja-head">
						<h2 class="pop-tit">Selecione a <b>opção:</b></h2>
						<select name="sort" id="sort">
							<option value="cheaper">Menor valor</option>
							<option value="expansive">Maior valor</option>
							<option value="distance">Mais próximo</option>
							<option value="date">Mais recente</option>
						</select>
					</div>
					<!--List-->
					<div class="lojas-list limit">
						<!--Item-->
						<div class="by-mark">
							<!--Loja-->
							<div class="fc la-loja">
								<div class="la-loja-img">
									<img src="@/assets/icons/gauss-big.png" alt="" />
								</div>
								<div class="la-loja-dets">
									<h3 class="subtt">Gauss Pet</h3>
									<i class="fa-solid fa-location-dot"></i>
									<span class="def-txt">Loja a 6.0km</span>
								</div>
							</div>
							<!--Compra-->
							<div class="loja-compra" id="item-var">
								<!--Radio-->
								<div class="item-vars">
									<input type="radio" id="500g" name="item-var" checked />
									<label for="500g">500g</label>
									<input type="radio" id="1kg" name="item-var" />
									<label for="1kg">1kg</label>
									<input type="radio" id="5kg" name="item-var" />
									<label for="5kg">5kg</label>
								</div>
								<!--Valor-->
								<div class="the-value">
									<p class="unit-value">Valor unitário</p>
									<h3 class="the-unit-value">R$150,00</h3>
								</div>
								<a href="./finalizar.html" class="sel-loja-btn">
									<span class="sel-loja-btn-text">Selecionar Loja</span>
								</a>
							</div>
						</div>
						<!--Item-->
						<div class="by-mark">
							<!--Loja-->
							<div class="fc la-loja">
								<div class="la-loja-img">
									<img src="@/assets/icons/gauss-big.png" alt="" />
								</div>
								<div class="la-loja-dets">
									<h3 class="subtt">Gauss Pet</h3>
									<i class="fa-solid fa-location-dot"></i>
									<span class="def-txt">Loja a 6.0km</span>
								</div>
							</div>
							<!--Compra-->
							<div class="loja-compra">
								<!--Radio-->
								<div class="item-vars" id="item-var-1">
									<input type="radio" id="500g" name="item-var-1" checked />
									<label for="500g">500g</label>
									<input type="radio" id="1kg" name="item-var-1" />
									<label for="1kg">1kg</label>
									<input type="radio" id="5kg" name="item-var-1" />
									<label for="5kg">5kg</label>
								</div>
								<!--Valor-->
								<div class="the-value">
									<p class="unit-value">Valor unitário</p>
									<h3 class="the-unit-value">R$150,00</h3>
								</div>
								<a href="./finalizar.html" class="sel-loja-btn">
									<span class="sel-loja-btn-text">Selecionar Loja</span>
								</a>
							</div>
						</div>
						<!--Item-->
						<div class="by-mark">
							<!--Loja-->
							<div class="fc la-loja">
								<div class="la-loja-img">
									<img src="@/assets/icons/gauss-big.png" alt="" />
								</div>
								<div class="la-loja-dets">
									<h3 class="subtt">Gauss Pet</h3>
									<i class="fa-solid fa-location-dot"></i>
									<span class="def-txt">Loja a 6.0km</span>
								</div>
							</div>
							<!--Compra-->
							<div class="loja-compra">
								<!--Radio-->
								<div class="item-vars" id="item-var-2">
									<input type="radio" id="500g" name="item-var-2" checked />
									<label for="500g">500g</label>
									<input type="radio" id="1kg" name="item-var-2" />
									<label for="1kg">1kg</label>
									<input type="radio" id="5kg" name="item-var-2" />
									<label for="5kg">5kg</label>
								</div>
								<!--Valor-->
								<div class="the-value">
									<p class="unit-value">Valor unitário</p>
									<h3 class="the-unit-value">R$150,00</h3>
								</div>
								<a href="./finalizar.html" class="sel-loja-btn">
									<span class="sel-loja-btn-text">Selecionar Loja</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="lightbox" class="" @click="popups.closepop()"></div>
	</div>
	<div class="error_message" v-if="errors.return != null">{{ errors.return }}</div>
</template>

<style scoped>
.menu-inner {
	width: 100%;
}

.is-invalid {
	border: 1px solid #f00;
}

.error {
	color: #f00;
	font-size: 9px;
	margin-top: 3px;
	font-family: Poppins;
}

.error_message {
	background-color: #f00;
	width: 300px;
	height: 35px;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -17px;
	margin-left: -150px;
	z-index: 1000;
	color: #fff;
	font-family: Poppins;
	text-align: center;
	padding: 5px;
	border-radius: 7px;
}

.user_name {
	color: #f26b2c;
	font-family: Poppins;
	padding: 2px 15px;
}

.searc-inp {
	width: 90%;
	height: 35px;
	border: 1px solid #ccc;
	border-radius: 5px;
	font-family: Poppins;
	padding: 7px;
	font-size: 12px;
}

.address-area {
	color: #fff;
	background-color: var(--main-color);
	min-height: 30px;
	margin-bottom: -15px;
	font-size: 12px;
	padding: 10px;
}

.back-icon-cont {
	margin-left: -10px;
}

@media (min-width: 1030px) {
	.user_name,
	.address-area {
		display: none;
	}
}

.limit {
	overflow-y: scroll;
	overflow-x: visible;
}
span.count {
	width: 17px;
	height: 17px;
	background-color: #f00;
	position: absolute;
	color: #fff;
	font-size: 9px;
	border-radius: 100%;
	text-align: center;
	padding-top: 3px;
	margin-left: 15px;
	margin-top: -5px;
}

.header-padding-fix {
	padding-right: 1rem;
	padding-left: 1rem;
}
</style>
