<script>
import Login from '../Login/Login.vue';

export default {
	data() {
		return {
			user: {
				first_name: "User Name",
				last_name: "",
				email: "default@email.com",
			},
		};
	},
	components: { Login },
	computed: {
		loggedIn() {
			return this.$store.state.auth.status.loggedIn;
		},
	},
	methods: {
		logout() {
			this.$store.dispatch("auth/logout");
			this.$router.push({ path: "/" });
		},
	},
	created() {
		if (!this.$store.state.profile.user.user_id) {
			this.$store.dispatch("profile/getProfileData").then((user) => {
				this.user = user;
			});

			return;
		}

		this.user = this.$store.state.profile.user;
	},
	computed: {
		loggedIn() {
			return this.$store.state.auth.status.loggedIn;
		},
	},
};
</script>

<template>
	<div class="mt-100 col-12">
		<Login />
		<p class="not-mobile desk">Página apenas mobile.</p>
		<section class="content mobi">
			<!--User Info-->
			<div class="fc user-info-head" v-if="loggedIn">
				<div class="profile-pic">
					<img src="@/assets/images/user.jpg" alt="" v-if="!user.image" />
					<img :src="user.image" alt="" v-if="user.image" />
				</div>
				<div class="user-info">
					<h2 class="user-name">{{ user.first_name + " " + user.last_name }}</h2>
					<p class="def-prof-txt">{{ user.email }}</p>
				</div>
			</div>

			<!--The Link-->
			<div class="profile-links" v-if="loggedIn">
				<router-link class="fc" :to="{ name: 'profile_edit' }">
					<div class="profile-link-icon">
						<i class="fa-solid fa-user"></i>
					</div>
					<div class="profile-link-info">
						<h3 class="profile-link-name">Meus dados</h3>
						<p class="def-prof-txt">Minhas informações de usuário</p>
					</div>
					<div class="just-arrow">
						<i class="fa-solid fa-chevron-right"></i>
					</div>
				</router-link>
			</div>

			<!--The Link-->
			<div class="profile-links" v-if="loggedIn">
				<router-link :to="{ name: 'profile_pets' }" class="fc">
					<div class="profile-link-icon">
						<i class="fa-solid fa-paw"></i>
					</div>
					<div class="profile-link-info">
						<h3 class="profile-link-name">Pets</h3>
						<p class="def-prof-txt">Meus animais de estimação</p>
					</div>
					<div class="just-arrow">
						<i class="fa-solid fa-chevron-right"></i>
					</div>
				</router-link>
			</div>

			<!--The Link-->
			<div class="profile-links" v-if="loggedIn">
				<router-link :to="{ name: 'profile_address' }" class="fc">
					<div class="profile-link-icon">
						<i class="fa-solid fa-location-dot"></i>
					</div>
				<div class="profile-link-info">
					<h3 class="profile-link-name">Endereços</h3>
					<p class="def-prof-txt">Meus endereços de entrega</p>
				</div>
				<div class="just-arrow">
					<i class="fa-solid fa-chevron-right"></i>
				</div>
			</router-link>
		</div>

		<!--The Link-->
		<div class="profile-links" v-if="loggedIn">
			<router-link :to="{ name: 'profile_cards' }" class="fc">
					<div class="profile-link-icon">
						<i class="fa-regular fa-credit-card"></i>
					</div>
					<div class="profile-link-info">
						<h3 class="profile-link-name">Cartões</h3>
						<p class="def-prof-txt">Meus cartões de crédito</p>
					</div>
					<div class="just-arrow">
						<i class="fa-solid fa-chevron-right"></i>
					</div>
				</router-link>
			</div>

			<!--The Link-->
			<div class="profile-links" v-if="loggedIn && false">
				<a href="#" class="fc">
					<div class="profile-link-icon">
						<i class="fa-solid fa-bell"></i>
					</div>
					<div class="profile-link-info">
						<h3 class="profile-link-name">Notificações</h3>
						<p class="def-prof-txt">Meu histórido de notificações</p>
					</div>
					<div class="just-arrow">
						<i class="fa-solid fa-chevron-right"></i>
					</div>
				</a>
			</div>

			<!--The Link-->
			<!-- <div class="profile-links">
					<a href="#" class="fc">
						<div class="profile-link-icon">
							<i class="fa-solid fa-icons"></i>
						</div>
						<div class="profile-link-info">
							<h3 class="profile-link-name">Categorias</h3>
							<p class="def-prof-txt">Busque por categoria</p>
						</div>
						<div class="just-arrow">
							<i class="fa-solid fa-chevron-right"></i>
						</div>
					</a>
				</div> -->

			<!--The Link-->
			<div class="profile-links">
				<router-link :to="{ name: 'contact_us' }" class="fc">
					<div class="profile-link-icon">
						<i class="fa-solid fa-headset"></i>
					</div>
					<div class="profile-link-info">
						<h3 class="profile-link-name">Fale conosco</h3>
					</div>
					<div class="just-arrow">
						<i class="fa-solid fa-chevron-right"></i>
					</div>
				</router-link>
			</div>

			<!--The Link-->
			<div class="profile-links" v-if="loggedIn">
				<a href="#" class="fc" v-on:click="logout">
					<div class="profile-link-icon">
						<i class="fa-solid fa-arrow-right-from-bracket"></i>
					</div>
					<div class="profile-link-info">
						<h3 class="profile-link-name">Sair</h3>
					</div>
					<div class="just-arrow">
						<i class="fa-solid fa-chevron-right"></i>
					</div>
				</a>
			</div>
		</section>
	</div>
</template>

<style scoped></style>
