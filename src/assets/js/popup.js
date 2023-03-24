function openpopups() {
	document.querySelector("#popups").style.visibility = "visible";
	document.querySelector("#lightbox").classList.add("active");
	document.querySelector("body").style.overflow = "hidden";
}
function openentrar() {
	this.openpopups();
	document.querySelector("#entrar-pop").classList.add("active");
}
function opencart() {
	this.openpopups();
	document.querySelector("#carrinho-pop").classList.add("active");
}
function closepop() {
	document.querySelector("#popups").style.visibility = "hidden";
	document.querySelector("#lightbox").classList.remove("active");
	document.querySelector("#endereco-pop").classList.remove("active");
	document.querySelector("#entrar-pop").classList.remove("active");
	document.querySelector("#carrinho-pop").classList.remove("active");
	document.querySelector("#loja-pop").classList.remove("active");
	document.querySelector("body").style.overflow = "auto";
}


export { openpopups, openentrar, opencart, closepop };
