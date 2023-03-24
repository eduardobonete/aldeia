<script>
export default {
	props: ["access"],
};
</script>
<template>
	<div class="box df desk">
		<div class="fc img-row row-1">
			<a :href="a.url" v-for="a in access" v-bind:key="a.id">
				<img :src="a.thumbnail.image_320x320" />
			</a>
		</div>
	</div>
</template>
