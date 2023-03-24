<script>
import Loading from "../../components/layout/Loading.vue";
import { CPF_REGEX, PHONE_REGEX } from "../../constants/regex";
import api from "../../services/api";

export default {
	components: { Loading },
	data() {
		return {
			userForm: {
				first_name: "",
				last_name: "",
				email: "",
				cpf: "",
				phone: "",
				whatsapp: false,
				sms: false,
				profileImage: null,
				profileImageFile: null,
			},
			formErrors: {},
			isLoading: false,
			shouldDeleteUser: false,
		};
	},
	methods: {
		saveChanges() {
			this.formErrors = {};
			this.isLoading = true;

			try {
				this.validateForm();
				this.$store
					.dispatch("profile/updateProfile", this.userForm)
					.then(() => this.$store.dispatch("profile/getProfileData"))
					.then((user) => {
						this.populateForm(user);
						this.isLoading = false;
					});
			} catch (error) {
				this.isLoading = false;
				return;
			}
		},
		validateForm() {
			this.requiredFields();

			if (!CPF_REGEX.test(this.userForm.cpf)) {
				this.formErrors.cpf = "invalid";

				throw new Error();
			}

			if (!PHONE_REGEX.test(this.userForm.phone)) {
				this.formErrors.phone = "invalid";

				throw new Error();
			}
		},
		requiredFields() {
			if (
				!this.userForm.first_name ||
				!this.userForm.first_name.length ||
				!this.userForm.last_name ||
				!this.userForm.last_name.length ||
				!this.userForm.email ||
				!this.userForm.email.length ||
				!this.userForm.cpf ||
				!this.userForm.cpf.length ||
				!this.userForm.phone ||
				!this.userForm.phone.length
			) {
				if (!this.userForm.first_name || !this.userForm.first_name.length)
					this.formErrors.first_name = "required";
				if (!this.userForm.last_name || !this.userForm.last_name.length)
					this.formErrors.last_name = "required";
				if (!this.userForm.email || !this.userForm.email.length)
					this.formErrors.email = "required";
				if (!this.userForm.cpf || !this.userForm.cpf.length)
					this.formErrors.cpf = "required";
				if (!this.userForm.phone || !this.userForm.phone.length)
					this.formErrors.phone = "required";

				throw new Error();
			}
		},
		populateForm(user) {
			console.log(user);

			this.userForm.first_name = user.first_name;
			this.userForm.last_name = user.last_name;
			this.userForm.email = user.email;
			this.userForm.cpf = user.cpf;
			this.userForm.phone = user.phone;
			this.userForm.whatsapp = !!user.whatsapp;
			this.userForm.sms = !!user.sms;
			this.userForm.profileImage = user.image;
		},
		selectProfileImage() {
			const input = this.$refs.fileInput;
			const files = input.files;
			if (files && files[0]) {
				this.userForm.profileImageFile = new File(files, "image");
				const reader = new FileReader();
				reader.onload = (e) => {
					this.userForm.profileImage = e.target.result;
				};
				reader.readAsDataURL(files[0]);
				this.$emit("input", files[0]);
			}
		},
		toggleShouldDeleteModal() {
			this.shouldDeleteUser = !this.shouldDeleteUser;
		},
		deleteUser() {
			this.toggleShouldDeleteModal();
			this.isLoading = true;

			api.getAll("user/finish-account").then((res) => {
				this.$store.dispatch("auth/logout");
				this.isLoading = false;
				this.$router.push({ name: "home" });
			});
		},
	},
	created() {
		api.init();

		if (!this.$store.state.profile.user.user_id) {
			this.$store.dispatch("profile/getProfileData").then((user) => {
				this.populateForm(user);
			});

			return;
		}

		this.populateForm(this.$store.state.profile.user);
	},
};
</script>

<template>
	<div class="backdrop" v-if="shouldDeleteUser"></div>
	<div class="dialog" v-if="shouldDeleteUser">
		<div class="dialog-content">
			<h1 class="dialog-title">Deseja realmente excluir essa conta?</h1>

			<p class="dialog-text">
				Lembre-se: Uma vez que a conta é excluída, não será possível recuperá-la e todos os
				dados serão perdidos
			</p>

			<div class="dialog-btn-row">
				<button
					class="btn btn-transparent"
					style="margin-right: 0.5rem"
					v-on:click="deleteUser"
				>
					Sim
				</button>
				<button class="btn btn-primary" v-on:click="toggleShouldDeleteModal">Não</button>
			</div>
		</div>
	</div>

	<loading v-if="isLoading" />
	<div class="edit-profile-page mt-100">
		<p class="not-mobile desk">Página apenas mobile.</p>

		<section class="content mobi">
			<label for="file-input">
				<div class="your-picture">
					<img src="@/assets/images/foot.jpg" alt="" v-if="!userForm.profileImage" />
					<img :src="userForm.profileImage" alt="" v-if="userForm.profileImage" />
				</div>
			</label>

			<input
				type="file"
				id="file-input"
				name="camera"
				hidden
				@input="selectProfileImage"
				ref="fileInput"
			/>

			<div class="cad-your-info">
				<div class="card-container">
					<div class="cad-your-info-field fc">
						<input
							type="text"
							name="seu-nome"
							placeholder="Nome"
							v-model="userForm.first_name"
							v-bind:class="{ 'error-input': formErrors.first_name }"
						/>
						<i class="fa-solid fa-user"></i>
					</div>
					<p class="error-text" v-if="formErrors.first_name == 'required'">
						Campo obrigatório
					</p>
				</div>

				<div class="card-container">
					<div class="cad-your-info-field fc">
						<input
							type="text"
							name="sobrenome"
							placeholder="Sobrenome"
							v-model="userForm.last_name"
							v-bind:class="{ 'error-input': formErrors.last_name }"
						/>
						<i class="fa-solid fa-user"></i>
					</div>
					<p class="error-text" v-if="formErrors.last_name == 'required'">
						Campo obrigatório
					</p>
				</div>

				<div class="card-container">
					<div class="cad-your-info-field fc">
						<input
							type="email"
							name="email"
							placeholder="E-mail"
							v-model="userForm.email"
							v-bind:class="{ 'error-input': formErrors.email }"
						/>
						<i class="fa-solid fa-at"></i>
					</div>
					<p class="error-text" v-if="formErrors.email == 'required'">
						Campo obrigatório
					</p>
				</div>

				<div class="card-container">
					<div class="cad-your-info-field fc">
						<input
							type="text"
							name="cpf"
							placeholder="CPF"
							v-model="userForm.cpf"
							v-maska
							data-maska="###.###.###-##"
							v-bind:class="{ 'error-input': formErrors.cpf }"
						/>
					</div>
					<p class="error-text" v-if="formErrors.cpf == 'required'">Campo obrigatório</p>
					<p class="error-text" v-if="formErrors.cpf == 'invalid'">CPF inválido</p>
				</div>

				<div class="card-container">
					<div class="cad-your-info-field fc">
						<input
							type="tel"
							name="celular"
							placeholder="Celular com DDD"
							v-model="userForm.phone"
							v-maska
							data-maska="(##) #####-####"
							v-bind:class="{ 'error-input': formErrors.phone }"
						/>
						<i class="fa-solid fa-phone"></i>
					</div>
					<p class="error-text" v-if="formErrors.phone == 'required'">
						Campo obrigatório
					</p>
					<p class="error-text" v-if="formErrors.phone == 'invalid'">Telefone inválido</p>
				</div>
			</div>

			<div class="notifies">
				<h3 class="how-notify">Receber notificações via:</h3>
				<label class="fc"
					><span>Whatsapp</span>
					<input type="checkbox" name="yes-wpp" v-model="userForm.whatsapp"
				/></label>
				<label class="fc"
					><span>SMS</span> <input type="checkbox" name="yes-sms" v-model="userForm.sms"
				/></label>
			</div>

			<button class="btn btn-primary fullwidth" v-on:click="saveChanges">Salvar</button>
			<button
				class="btn btn-transparent fullwidth"
				style="margin-top: 0.5rem"
				v-on:click="toggleShouldDeleteModal"
			>
				Deletar Conta
			</button>
		</section>
	</div>
</template>

<style scoped>
.cad-your-info-field {
	margin: 0;
}

.card-container {
	margin-bottom: 0.7rem;
}

.your-picture {
	margin-bottom: 0.5rem;
}

.your-picture img {
	width: 6rem;
	height: 6rem;
}

.dialog-text {
	font-size: 0.8rem;
	color: var(--profile-font-color);
}
</style>
