<template>
	<div class="modal" :class="{ 'modal-open': this.modal.open }" style="display: none">
		<div id="popups" style="visibility: hidden">
			<div class="box" style="margin-top: 3rem">
				<!--popup entrar-->
				<div
					id="entrar-pop"
					:class="{ 'modal-open': this.modal.open, active: this.modal.open }"
				>
					<form>
						<div class="arrow-up entrar-arrow"></div>
						<div class="pop-content">
							<p class="pop-close">
								<i @click="closepop()" class="fa-solid fa-xmark"></i>
							</p>
							<h2 class="pop-tit">Entrar</h2>
							<div class="col-12">
								<div class="form-group">
									<label
										class="form-label"
										for="first"
										@click="$refs.mail.focus()"
										>Email</label
									>
									<span class="form-icon-left">
										<i class="fa-solid fa-envelope grey"></i>
									</span>
									<input
										class="form-input"
										ref="mail"
										type="text"
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
							<a href="./reset-password" class="def-txt esqueceu"
								>Esqueceu sua senha?</a
							>
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
									<!-- &nbsp;
								<img src="@/assets/icons/apple.png" class="social-icon" /> -->
								</p>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import $ from "jquery";

export default {
	data() {
		return {
			type: "password",
			modal: {
				open: false,
			},
			form: {
				email: null,
				password: null,
			},
			errors: {
				email: false,
				password: false,
				return: null,
			},
		};
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
		closepop() {
			this.modal.open = false;
		},
		openModal() {
			this.modal.open = true;
		},
		changeType() {
			if (this.type == "password") {
				this.type = "text";
			} else {
				this.type = "password";
			}
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
					this.$toast.error(self.errors.return, { position: "top" });
				},
			);
		},
		afterLogin(response) {
			this.closepop();

			this.$store.dispatch("profile/getProfileData").then((user) => {
				this.$store.dispatch("address/getAddresses");
				this.$store.dispatch("cart/getCart");
				this.$store.dispatch("profile/getCards");
				this.$router.push({ name: "profile" });
			});
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
	},
	created() {},
};
</script>
<style scoped>
.modal-open {
	display: block !important;
}

.modal {
	display: none;
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.4);
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
</style>
