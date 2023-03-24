<script>
import PetDeleteDialog from "../../../components/dialogs/petDeleteDialog.vue";
import Loading from "../../../components/layout/Loading.vue";
export default {
	components: { Loading, PetDeleteDialog },
	data() {
		return {
			pets: [],
			isLoading: false,
			dotsActionsList: null,
			shouldShowDeleteModal: false,
			petToDelete: null,
		};
	},
	methods: {
		showDotsActionsList(id) {
			this.dotsActionsList = id;
		},
		toggleDeleteModal() {
			this.shouldShowDeleteModal = !this.shouldShowDeleteModal;
			this.dotsActionsList = null;
		},
		shouldDelete(pet) {
			this.dotsActionsList = null;
			this.toggleDeleteModal();
			this.petToDelete = pet;
		},
		deletePet() {
			this.toggleDeleteModal();
			this.isLoading = true;

			this.$store.dispatch("profile/deletePet", this.petToDelete.id).then(() => {
				this.pets = this.$store.state.profile.pets;
				this.isLoading = false;
			});
		},
	},
	created() {
		this.isLoading = true;

		this.$store.dispatch("profile/getPetData").then((pets) => {
			this.pets = this.$store.state.profile.pets;
			this.isLoading = false;
		});
	},
};
</script>

<template>
	<loading v-if="isLoading" />

	<pet-delete-dialog
		:shouldShowDeleteModal="shouldShowDeleteModal"
		:deletePet="deletePet"
		:toggleDeleteModal="toggleDeleteModal"
		:pet-to-delete="petToDelete"
	/>

	<div class="pets-page">
		<p class="not-mobile desk">Página apenas mobile.</p>

		<section class="content mobi mt-100">
			<div class="centered" v-if="!pets.length">
				<h1>Você não possui nenhum pet cadastrado</h1>
			</div>

			<div class="pet-list">
				<div class="el-pet fc" v-for="pet in pets" v-bind:key="pet.id">
					<div class="pet-pic">
						<div class="pet-icon-container" v-if="!pet.profile_photo">
							<i class="fa fa-paw" aria-hidden="true"></i>
						</div>

						<img :src="pet.profile_photo.image_40x40" alt="" v-if="pet.profile_photo" />
					</div>
					<div class="pet-info">
						<h4 class="pet-info-name">{{ pet.name }}</h4>
						<p class="def-txt pet-info-low">{{ pet.type }}</p>
						<p class="def-txt pet-info-low">{{ pet.birthdate }}</p>
					</div>
					<div class="edit-icon">
						<i
							class="fa-solid fa-ellipsis-vertical"
							v-on:click="showDotsActionsList(pet.id)"
						>
							<ul v-if="dotsActionsList === pet.id" class="tool-menu">
								<li>
									<router-link
										:to="{
											name: 'profile_pets_edit',
											params: { pet: pet.id },
										}"
										>Editar</router-link
									>
								</li>

								<li v-on:click="shouldDelete(pet)">Excluir</li>
							</ul>
						</i>
					</div>
				</div>
			</div>
		</section>

		<router-link class="add-btn-container" :to="{ name: 'profile_pets_create' }">
			<i class="fa fa-plus" aria-hidden="true"></i>
		</router-link>
	</div>
</template>

<style scoped>
.pet-icon-container {
	width: 2.5rem;
	height: 2.5rem;
	margin: 0;
}

.centered {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 70vh;
}
.centered h1 {
	font-size: 0.8rem;
	color: var(--profile-font-color);
}

.edit-icon i {
	position: relative;
}

.tool-menu {
	top: 0;
	right: 0;
}
</style>
