<template>
	<div role="status" class="spinner-border"></div>
	<div class="spinner-internal"></div>	
</template>

<style scoped>
	.spinner-internal {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: #666;
		opacity: 0.5;
		z-index: 999;
	}

	.spinner-border {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -18px;
		margin-left: -18px;
		opacity: 1;
		z-index: 1000 !important;
	}
</style>