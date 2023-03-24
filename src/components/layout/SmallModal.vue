<script>
export default {
	props: ['id', 'title'],
	methods: {
		close() {
			document.querySelector("#modal-popup").style.visibility = "hidden";
			document.querySelector("#ltbox").style.visibility = "hidden";
			document.querySelector("body").style.overflow = "auto";
			document.querySelector("#" + this.id).classList.remove("active");
		},
		open() {
			document.querySelector("#modal-popup").style.visibility = "visible";
			document.querySelector("#ltbox").style.visibility = "visible";
			document.querySelector("body").style.overflow = "hidden";
			document.querySelector("#" + this.id).classList.add("active");
		}
	}
};
</script>
<template>
	<div id="modal-popup" style="visibility: hidden">
		<div class="box">
			<div :id="id" class="modal-card">
				<div class="modal-header">
					<div class="title">{{ title }} </div>
					<span class="close" @click="close()">
						<i class="fa fa-close"></i>
					</span>
				</div>
				<div class="modal-body">
					<slot></slot>
				</div>
				<div class="modal-footer"></div>
			</div>
		</div>
	</div>
	<div id="ltbox" style="visibility: hidden;" @click="close()"></div>
</template>
<style scoped>
#ltbox {
	background-color: #00000050;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 3;
	opacity: 1;
	transition: 0.4s;
}

#ltbox.active,
{
opacity: 1;
}

#modal-popup {
	z-index: 4;
}

.modal-card {
	position: absolute;
	top: 25vh;
	z-index: 4;
	visibility: hidden;
	opacity: 0;
	transition: 1s;
	background-color: #FFF;
	width: 90%;
	border: 1px solid #EFEFEF;
	border-radius: 7px;
}

.modal-card.active {
	visibility: visible;
	display: block;
	opacity: 1;
}

.modal-header {
	width: 100%;
	padding: 8px;
	font-weight: 400;
	color: var(--main-color);
	position: sticky;
}

.modal-header .title {
	max-width: 80%;
}

span.close {
	position: absolute;
	right: 6px;
	top: 6px;
	cursor: pointer;
}

.modal-body {
	background-color: #FFF;
	padding: 8px;
	overflow: auto;
}

.modal-footer {
	margin-bottom: 0.5rem;
}
</style>