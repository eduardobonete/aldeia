<script>
export default {
	props: ["newPet"],
};
</script>
<template>
	<div class="box df desk">
		<div class="fc img-row row-1">
			<a :href="n.url" v-for="n in newPet" v-bind:key="n.id">
				<img :src="n.thumbnail.original_image" alt="doguinho" />
			</a>
		</div>
	</div>
</template>
