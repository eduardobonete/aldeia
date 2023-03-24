<script>
import axios from "axios";
import api from "../../../services/api";
import Loading from "../../../components/layout/Loading.vue";
import RulesMixin from 'Support/mixins/rules-mixin';

export default {
	components: { Loading },
	data() {
		return {
			registerForm: {
				first_name: "",
				last_name: "",
				cpf: "",
				email: "",
				phone: "",
				password: "",
				password_confirmation: "",
				gender: "male",
				confirmation: false
			},
			errors: [],
			isLoading: false,
		};
	},
	mixins: [RulesMixin],
	methods: {
		storeUser() {
			this.isLoading = true;
			this.errors = [];

			Object.entries(this.registerForm).forEach(element => {
				const [key, value] = element;
				if (value == '') {
					this.errors.push(key);
				}

			});


			if (this.errors.length == 0 && this.registerForm.confirmation) {
				if (this.registerForm.password !== this.registerForm.password_confirmation) {
					this.$toast.error('As senhas não coincidem', { duration: 3000, position: 'top' });
					this.isLoading = false;
					return
				}

				api.create("register", this.registerForm).then((res) => {
					this.isLoading = false
					this.$toast.success('Registro realizado com sucesso', {
						onClose: () => {
							this.$router.replace({ name: "home" });
						},
						duration: 2000,
					});
				});

				return
			}
			this.isLoading = false;
			this.$toast.info('Por favor, aceite os termos de uso', { duration: 3000, position: 'top' });


		},

	},
};
</script>

<template>
	<loading v-if="isLoading" />

	<div class="container mt-100">
		<div class="input-group-append-icon input-group" :class="{ 'mb-1': !errors.includes('first_name') }">
			<span class="input-group-icon icon-index" id="basic-addon1">
				<i class="fa-solid fa-user icon"></i>
			</span>
			<input type="text" class="form-control" :class="{ 'input-error-border': errors.includes('first_name') }"
				placeholder="Nome" required v-model="registerForm.first_name" />
		</div>
		<span v-if="errors.includes('first_name')" class="mb-2 input-error">Nome é obrigatório</span>
		<div class="input-group-append-icon input-group" :class="{ 'mb-1': !errors.includes('last_name') }">
			<span class="input-group-icon icon-index" id="basic-addon1">
				<i class="fa-solid fa-user icon"></i>
			</span>
			<input type="text" class="form-control" placeholder="Sobrenome"
				:class="{ 'input-error-border': errors.includes('last_name') }" v-model="registerForm.last_name" />
		</div>
		<span v-if="errors.includes('last_name')" class="mb-2 input-error">Sobrenome é obrigatório</span>
		<div class="input-group-append-icon input-group" :class="{ 'mb-1': !errors.includes('cpf') }">
			<span class="input-group-icon icon-index" id="basic-addon1">
				<i class="fa fa-address-card icon" aria-hidden="true"></i>
			</span>
			<input type="text" class="form-control" v-maska data-maska="###.###.###-##"
				:class="{ 'input-error-border': errors.includes('cpf') }" placeholder="CPF" v-model="registerForm.cpf" />
		</div>
		<span v-if="errors.includes('cpf')" class="mb-2 input-error">CPF é obrigatório</span>
		<div class="input-group-append-icon input-group" :class="{ 'mb-1': !errors.includes('email') }">
			<span class="input-group-icon icon icon-index" id="basic-addon1">
				<i class="fa fa-at icon" aria-hidden="true"></i>
			</span>
			<input type="text" class="form-control" :class="{ 'input-error-border': errors.includes('email') }"
				placeholder="E-mail" v-model="registerForm.email" />
		</div>
		<span v-if="errors.includes('email')" class="mb-2 input-error">E-mail é obrigatório</span>

		<div class="input-group-append-icon input-group" :class="{ 'mb-1': !errors.includes('phone') }">
			<span class="input-group-icon icon-index" id="basic-addon1">
				<i class="fa fa-phone icon" aria-hidden="true"></i>
			</span>
			<input type="text" class="form-control" :class="{ 'input-error-border': errors.includes('phone') }"
				placeholder="Celular com DDD" v-model="registerForm.phone" v-maska data-maska="(##)#####-####" />
		</div>
		<span v-if="errors.includes('phone')" class="mb-2 input-error">Celular é obrigatório</span>

		<div class="input-group-append-icon input-group" :class="{ 'mb-1': !errors.includes('password') }">
			<span class="input-group-icon icon-index" id="basic-addon1">
				<i class="fa-solid fa-eye-slash icon "></i>
			</span>
			<input type="password" class="form-control" :class="{ 'input-error-border': errors.includes('password') }"
				placeholder="Senha" v-model="registerForm.password" />
		</div>
		<span v-if="errors.includes('password')" class="mb-2 input-error">Senha é obrigatório</span>

		<div class="input-group-append-icon input-group" :class="{ 'mb-1': !errors.includes('password_confirmation') }">
			<span class="input-group-icon icon-index" id="basic-addon1">
				<i class="fa-solid fa-eye-slash icon"></i>
			</span>
			<input type="password" class="form-control" placeholder="Confirmar Senha"
				:class="{ 'input-error-border': errors.includes('password_confirmation') }"
				v-model="registerForm.password_confirmation" />
		</div>
		<span v-if="errors.includes('password_confirmation')" class="mb-2 input-error">Confirmar senha é obrigatório</span>
		<div class="primary bold font-size mt-2">
			Gênero
		</div>
		<div class="col-12 mt-2 font-size">
			<input type="radio" id="male" name="item-var" value="male" class="gender-radio" v-model="registerForm.gender" />
			<label for="male" class="gender-space primary bold">Masculino</label>
		</div>
		<div class="col-12 mt-2 font-size">
			<input type="radio" id="female" name="item-var" value="female" class="gender-radio"
				v-model="registerForm.gender" />
			<label for="female" class="gender-space primary bold">Feminino</label>
		</div>
		<div class="col-12 mt-2 font-size">
			<input type="radio" id="without" name="item-var" value="UNDEFINED" class="gender-radio"
				v-model="registerForm.gender" />
			<label for="without" class="gender-space primary bold">Não Informar</label>
		</div>

		<div class="font-size mt-2 mb-2">
			<input type="checkbox" id="confirmation" name="confirmation" v-model="registerForm.confirmation">
			<label class="ml-2" for="confirmation">Eu aceito os <span class="bold">Termos de uso</span></label>
		</div>

		<div class="input-group-append-icon input-group mb-1">

			<button class="btn btn-primary fullwidth" @click="storeUser">
				Cadastrar
			</button>

		</div>
	</div>
</template>
<style scoped>
.container {
	padding: 1rem 1rem;
}

.mb-1 {
	margin-bottom: 0.5rem;
}

.mb-2 {
	margin-bottom: 1rem;
}

.mt-1 {
	margin-top: 0.5rem;
}

.mt-2 {
	margin-top: 1rem;
}

.ml-1 {
	margin-left: 0.5rem;
}

.ml-2 {
	margin-left: 1rem;
}

.icon {
	color: #838383;
}

.gender-space {
	margin-left: 23px;
}

.gender-radio {
	accent-color: var(--main-color);
}

.bold {
	font-weight: 600;
}

.font-size {
	font-size: 12px;
}

.form-control {
	font-size: 12px;
}

.icon-index {
	z-index: 1 !important;
}

.input-error {
	font-size: 10px;
	color: rgb(184, 0, 0);
	padding-bottom: 0.5rem;
}

.input-error-border {
	border-color: rgb(184, 0, 0);
}
</style>
