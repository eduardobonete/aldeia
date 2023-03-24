<script>
import PetDeleteDialog from "../../../components/dialogs/petDeleteDialog.vue";
import Loading from "../../../components/layout/Loading.vue";
import api from "../../../services/api";

export default {
	components: { Loading, PetDeleteDialog },
	data() {
		return {
			petTypes: [
				{ title: "Cachorro", value: "dog" },
				{ title: "Gato", value: "cat" },
				{ title: "Pássaros", value: "passaros" },
				{ title: "Peixes", value: "peixes" },
				{ title: "Coelhos", value: "coelhos" },
				{ title: "Tartaruga", value: "tartaruga" },
				{ title: "Hamster", value: "hamster" },
				{ title: "Twister", value: "twister" },
				{ title: "Porquinho da índia", value: "porquinho" },
				{ title: "Chinchila", value: "chinchilas" },
				{ title: "Gerbil", value: "gerbil" },
				{ title: "Furão", value: "furao" },
				{ title: "Lagarto", value: "lagartos" },
			],
			shouldShowPetTypesModal: false,
			selectedPetType: { title: "" },
			petName: "",
			isLoading: false,
			isEdit: false,
			petImage: null,
			shouldShowDeleteModal: false,
			petId: null,
			petWeight: "",
			petBirthDate: "",
			petImageFile: null,
		};
	},
	methods: {
		togglePetTypesModal() {
			this.shouldShowPetTypesModal = !this.shouldShowPetTypesModal;
		},
		selectPetType(petType) {
			this.selectedPetType = petType;
			this.togglePetTypesModal();
		},
		storePet() {
			this.isLoading = true;

			const form = new FormData();

			form.append("name", this.petName);
			form.append("type", this.selectedPetType.value);
			form.append("weight", this.petWeight);
			form.append("birthdate", this.petBirthDate);
			if (this.petImage) form.append("image", this.petImageFile);

			api.create("user/create-pet", form).then((res) => {
				this.isLoading = false;
				this.$router.replace({ name: "profile_pets" });
			});
		},
		updatePet() {
			this.isLoading = true;

			const form = new FormData();

			form.append("name", this.petName);
			form.append("type", this.selectedPetType.value);
			form.append("weight", this.petWeight);
			form.append("birthdate", this.petBirthDate);
			if (this.petImage) form.append("image", this.petImageFile);
			form.append("id", this.$router.currentRoute.value.params.pet);

			api.create("user/create-pet", form).then((res) => {
				this.isLoading = false;
				this.$router.replace({ name: "profile_pets" });
			});
		},
		toggleDeleteModal() {
			this.shouldShowDeleteModal = !this.shouldShowDeleteModal;
		},
		deletePet() {
			this.toggleDeleteModal();
			this.isLoading = true;

			this.$store.dispatch("profile/deletePet", this.petId).then(() => {
				this.isLoading = false;
				this.$router.replace({ name: "profile_pets" });
			});
		},
		selectPetImage() {
			const input = this.$refs.fileInput;
			const files = input.files;
			if (files && files[0]) {
				this.petImageFile = new File(files, "image");
				const reader = new FileReader();
				reader.onload = (e) => {
					this.petImage = e.target.result;
				};
				reader.readAsDataURL(files[0]);
				this.$emit("input", files[0]);
			}
		},
	},
	created() {
		api.init();

		if (this.$router.currentRoute.value.params.pet) {
			const pet = this.$store.state.profile.pets.find(
				(pet) => pet.id == this.$router.currentRoute.value.params.pet,
			);

			if (!pet) {
				this.$router.replace({ name: "profile_pets" });
				return;
			}

			this.petName = pet.name;
			this.selectedPetType = {
				value: pet.type,
				title: this.petTypes.find((type) => type.value == pet.type).title,
			};
			this.petImage = pet.image;
			this.petId = pet.id;
			this.petWeight = pet.weight;
			this.petBirthDate = pet.birthdate;

			this.isEdit = true;
		}
	},
};
</script>

<template>
	<pet-delete-dialog
		:shouldShowDeleteModal="shouldShowDeleteModal"
		:deletePet="deletePet"
		:toggleDeleteModal="toggleDeleteModal"
		:pet-to-delete="{ name: petName, id: petId }"
	/>

	<loading v-if="isLoading" />
	<div class="backdrop" v-if="shouldShowPetTypesModal"></div>

	<div class="dialog" v-if="shouldShowPetTypesModal">
		<div class="dialog-content">
			<ul class="cat-list">
				<li
					v-for="petType in petTypes"
					v-bind:key="petType.value"
					class="cat-list-item"
					v-on:click="selectPetType(petType)"
				>
					{{ petType.title }}
				</li>
			</ul>
		</div>
	</div>

	<div class="cad-pet-page mt-100">
		<p class="not-mobile desk">Página apenas mobile.</p>

		<section class="content mobi">
			<label for="camera">
				<div class="pet-picture">
					<div class="pet-icon-container" v-if="!petImage">
						<i class="fa fa-paw" aria-hidden="true"></i>
					</div>
					<img :src="petImage" alt="" v-if="petImage" class="pet-image" />
					<i class="fa-solid fa-camera"></i>
				</div>
			</label>

			<input
				type="file"
				accept="image/*"
				capture="camera"
				name="camera"
				id="camera"
				hidden
				@input="selectPetImage"
				ref="fileInput"
			/>

			<div class="cad-pet-info">
				<div class="cad-pet-info-field fc" v-on:click="togglePetTypesModal">
					<input
						type="text"
						name="qual-pet"
						id="qual-pet"
						placeholder="Qual é o seu pet?"
						:value="selectedPetType.title"
						disabled
					/>
					<i class="fa fa-caret-down select-arrow" aria-hidden="true"></i>
				</div>
				<div class="cad-pet-info-field fc">
					<input
						type="text"
						name="pet-name"
						id="pet-name"
						placeholder="Nome do pet"
						v-model="petName"
					/>
					<i class="fa-solid fa-font"></i>
				</div>
				<div class="cad-pet-info-field fc">
					<input
						type="date"
						name="nasc"
						id="nasc"
						placeholder="Data de nascimento (opcional)"
						v-model="petBirthDate"
					/>
					<i class="fa-solid fa-calendar-days"></i>
				</div>
				<div class="cad-pet-info-field fc">
					<input
						type="number"
						name="peso"
						id="peso"
						placeholder="Peso (opcional)"
						v-model="petWeight"
					/>
					<i class="fa-solid fa-weight-scale"></i>
				</div>
			</div>

			<div class="bottom-btn-row">
				<button class="btn btn-primary fullwidth" v-on:click="storePet" v-if="!isEdit">
					Cadastrar pet
				</button>

				<button class="btn btn-primary fullwidth" v-on:click="updatePet" v-if="isEdit">
					Salvar alterações
				</button>

				<button
					class="btn btn-transparent fullwidth"
					v-on:click="toggleDeleteModal"
					v-if="isEdit"
				>
					Remover pet
				</button>
			</div>
		</section>
	</div>
</template>

<style scoped>
.btn-transparent {
	margin-top: 0.5rem;
}
.pet-icon-container {
	border-radius: 50%;
	box-shadow: 0 4px 10px #00000050;
	margin: 0;
	height: 6rem;
	width: 6rem;
}

.pet-image {
	height: 6rem;
	width: 6rem;
}
.cat-list {
	list-style: none;
}

.cat-list-item {
	font-size: 0.9rem;
	color: var(--profile-font-color);
}

.cat-list-item:not(:last-child) {
	margin-bottom: 1.5rem;
}

.dialog-content {
	max-height: 80vh;
	overflow-y: scroll;
}

input:disabled {
	background: transparent;
}

.select-arrow {
	color: var(--profile-font-color);
	font-size: 1rem;
}
</style>
