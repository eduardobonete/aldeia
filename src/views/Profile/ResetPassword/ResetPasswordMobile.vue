<script>
import axios from "axios";
import api from "../../../services/api";
import Loading from "../../../components/layout/Loading.vue";
import RulesMixin from "Support/mixins/rules-mixin";

export default {
	components: { Loading },
	data() {
		return {
			email: "",
			isLoading: false,
		};
	},
	mixins: [RulesMixin],
	methods: {
		resetPassword() {
			if (this.validateEmail(this.email)) {
				this.isLoading = true;
				api.create("reset-password", { email: this.email }).then(({ data }) => {
					this.isLoading = false;

					if (typeof data.success === "undefined") {
						this.$toast.error(data.error, { duration: 2000 });
						return;
					}
					this.$toast.success(data.success, {
						onClose: () => {
							this.$router.replace({ name: "home" });
						},
						duration: 3000,
					});
				});
			}
		},
	},
};
</script>

<template>
	<loading v-if="isLoading" />

	<div class="container container-adjusts mt-100">
		<div>
			<div class="col-12">
				<div class="mx-2 icon text-email-style text-margin-botton">
					Digite o email que utilizou para se registrar, que enviaremos um email para você
					criar sua nova senha de acesso
				</div>
			</div>
			<div class="input-group-prepend-icon input-group mb-1">
				<span class="input-group-icon icon-index" id="basic-addon1">
					<i class="fa fa-at primary" aria-hidden="true"></i>
				</span>
				<input
					type="email"
					class="form-control"
					placeholder="Digite seu email"
					v-model="email"
				/>
			</div>
		</div>

		<div style="">
			<div class="reset-button-align">
				<button class="btn btn-primary" @click="resetPassword">Recuperar senha</button>
			</div>
		</div>
	</div>
</template>
<style scoped>
.input-group input {
	border-radius: 5px !important;
	border-left: 1px solid #ced4da !important;
}
.container {
	padding: 1rem;
}

.mb-1 {
	margin-bottom: 0.5rem;
}

.mx-2 {
	margin-right: 1rem;
	margin-left: 1rem;
}

.icon {
	color: #838383;
}

.form-control {
	font-size: 12px;
}

.text-email-style {
	text-align: justify;
	font-size: 14px;
}

.text-margin-botton {
	margin-bottom: 2.5rem;
}

.reset-button-align {
	display: flex;
	justify-content: center;
	align-items: flex-end;
}

.container-adjusts {
	height: 83vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: stretch;
}
</style>
