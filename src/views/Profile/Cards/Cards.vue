<script>
import Loading from "@/components/layout/Loading.vue";
export default {
	components: { Loading },
	data() {
		return {
			cards: [],
			isLoading: false,
			cardActionsList: null,
			shouldShowDeleteModal: false,
			cardToDelete: null,
		};
	},
	methods: {
		getCards() {
			this.$store.dispatch("profile/getCards").then((cards) => {
				this.cards = this.$store.state.profile.cards;
				this.isLoading = false;
			});
		},
		showCardActionsList(id) {
			this.cardActionsList = id;
		},
		toggleDeleteModal() {
			this.shouldShowDeleteModal = !this.shouldShowDeleteModal;
		},
		shouldDelete(card) {
			this.cardToDelete = card;
			this.toggleDeleteModal();
		},
		deleteCard() {
			this.toggleDeleteModal();
			this.isLoading = true;
			this.$store.dispatch("profile/deleteCard", this.cardToDelete).then((cards) => {
				this.cards = this.$store.state.profile.cards;
				this.isLoading = false;
			});
		},
	},
	created() {
		this.isLoading = true;

		if (!this.$store.state.profile.user.user_id) {
			this.$store.dispatch("profile/getProfileData").then((user) => {
				this.getCards();
			});
		} else this.getCards();
	},
};
</script>

<template>
	<loading v-if="isLoading" />
	<div class="backdrop" v-if="shouldShowDeleteModal"></div>

	<div class="dialog" v-if="shouldShowDeleteModal">
		<div class="dialog-content">
			<p class="dialog-title">
				Deseja realmente excluir <strong>{{ cardToDelete.first4 }} **** **** ****?</strong>
			</p>

			<div class="dialog-btn-row">
				<button
					class="btn btn-transparent"
					style="margin-right: 0.5rem"
					v-on:click="toggleDeleteModal"
				>
					Cancelar
				</button>
				<button class="btn btn-primary" v-on:click="deleteCard">Excluir</button>
			</div>
		</div>
	</div>

	<div class="card-page mt-100">
		<p class="not-mobile desk">Página apenas mobile.</p>

		<section class="content mobi">
			<div class="card-list" v-for="card in cards">
				<div class="el-card fc">
					<div class="card-pic">
						<img :src="card.card_brand_logo" alt="" />
					</div>
					<div class="card-info">
						<h4 class="card-info-num">{{ card.first4 }} **** **** ****</h4>
						<p class="def-txt pet-info-low">
							Vencimento: {{ card.expiration_month }}/{{ card.expiration_year }}
						</p>
					</div>
					<div class="edit-icon fc">
						<i class="fa-solid fa-check"></i>
						<i
							class="fa-solid fa-ellipsis-vertical"
							v-on:click="showCardActionsList(card.card_id)"
							style="position: relative"
						>
							<ul v-if="cardActionsList === card.card_id" class="tool-menu">
								<li v-on:click="shouldDelete(card)">Excluir</li>
							</ul>
						</i>
					</div>
				</div>
			</div>
		</section>

		<router-link class="add-btn-container" :to="{ name: 'profile_cards_create' }">
			<i class="fa fa-plus" aria-hidden="true"></i>
		</router-link>
	</div>
</template>

<style scoped>
.tool-menu {
	top: 0;
	right: 0;
}

.dialog-title {
	color: black;
	font-size: 0.8rem;
	font-weight: normal;
	width: 100%;
	text-align: center;
	padding: 0 1rem;
}
</style>
