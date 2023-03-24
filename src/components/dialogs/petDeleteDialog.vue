<script>
export default {
	props: ["shouldShowDeleteModal", "petToDelete", "toggleDeleteModal", "deletePet"],
};
</script>
<template>
	<div class="backdrop" v-if="shouldShowDeleteModal"></div>

	<div class="dialog" v-if="shouldShowDeleteModal">
		<div class="dialog-content">
			<div class="dialog-title-container">
				<p class="dialog-title">
					Deseja realmente excluir <strong>{{ petToDelete.name }}</strong> ?
				</p>
			</div>

			<div class="pet-icon-centered">
				<div class="pet-icon-container">
					<i class="fa fa-paw" aria-hidden="true"></i>
				</div>
			</div>

			<div class="dialog-btn-row">
				<button
					class="btn btn-transparent"
					style="margin-right: 0.5rem"
					v-on:click="toggleDeleteModal"
				>
					Cancelar
				</button>
				<button class="btn btn-primary" v-on:click="deletePet">Excluir</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.dialog-title-container {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.dialog-title {
	text-align: center;
	font-size: 0.9rem;
	width: 80%;
	color: black;
}

.dialog-content {
	width: 80%;
}

.pet-icon-centered {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
