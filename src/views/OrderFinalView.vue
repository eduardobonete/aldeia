<script>
	import moment from 'moment';
	export default {
		data() {
			return{
				done: false,
				moment: null,
			}
		},
		created() {
			this.moment = moment
			this.$store.dispatch('cart/emptyCart');
			if(this.type == 'card' || this.type == 'pix') {
				document.getElementById('header').style.display = 'none'
			}
		},
		computed: {
			result(){ 
				return this.$store.state.payment.result;
			},
			type(){ 
				return this.$store.state.payment.type;
			},
			email(){ 
				return localStorage.getItem('email');
			}
		},
		methods: {
			copyKey(val) {
				const el = document.createElement('textarea');   
				el.value= val;                                                    
		        document.body.appendChild(el);         
		        el.select();                                           
		        document.execCommand('copy');    
		        document.body.removeChild(el);      
				this.$toast.success('Pronto! Você copiou a linha digitável, agora basta inseri-la onde precisar.');
			},
			formatPrice(p) {
				p = parseFloat(p);
				p = p.toFixed(2);
				return p.replace(".", ",");
			},
			showHeader() {
				document.getElementById('header').style.display = 'block'
			}
		}
	};
</script>
<template>
	<div class="col col-12 mt-100" v-if="type=='boleto'">
		<div style="position:absolute; top: 25px; z-index: 9000; left: 100%; margin-left: -30px;">
			<router-link to="/pedidos" @click="showHeader()">
				<i class="fas fa-close primary"></i>
			</router-link>
		</div>
		<div class="col col-12">
			<h2 class="primary" style="padding-left: 15px;"> Boleto Gerado!</h2>
		</div>
		<div class="col col-12" style="padding-left: 15px;">
			<p class="small dark-grey">Uma cópia do boleto ja foi enviada para <b>{{email}}</b>, mas você pode usar os dados abaixo para pagar</p>
		</div>
		<div class="col col-12" style="padding-left: 15px;">
			<table class="table" border="0">
				<tr>
					<td> Valor<br> <span class="purple"><b>R$ {{ formatPrice(result.data.original_amount)}}</b></span></td>
					<td>Vencimento <br> <span class="purple"><b>{{ moment(result.data.payment_method.expiration_date).format("DD/MM/YYYY") }}</b></span></td>
				</tr>
				<tr>
					<td colspan="2">
						Código para pagamento <br>
						<span class="purple"><b>{{ result.data.payment_method.barcode }}</b></span>
					</td>
				</tr>
			</table>
		</div>
		<div class="col col-12" style="padding-left: 15px;">
			<router-link to="/order-final">
				<button class="btn btn-primary fullwidth large" @click="copyKey(result.data.payment_method.barcode);">Copiar linha digitável</button>
			</router-link>
		</div>
		<div class="col col-12" style="padding-left: 15px;">
			<router-link to="/order-final">
				<button class="btn btn-primary-inverted fullwidth large">Salvar em pdf</button>
			</router-link>
		</div>
		<div class="col col-12" style="padding-left: 15px;">
			<br>
			<h5>Como pagar seu boleto</h5>
			<br>
			<p class="dark-grey small"> - Utilize o <b>aplicativo do seu banco</b> copiando o número do código de barras</p>
			<p class="dark-grey small"> - Salve seu boleto, escaneie o código de barras ou abra p PDF no proprio <b>app do banco</b></p>
			<p class="dark-grey small"> - Imprima e pague seu boleto numa <b>casa lotérica, banco ou caixa eletrônico</b></p>
		</div>
	</div>
	<div v-if="type == 'pix'">
		<div class="col col-12">
			<div class="col-12 col text-center" style="padding: 30px;">
				<img src="@/assets/images/logo_pix.png" style="width: 70%;">
			</div>
			<div class="col col-12 text-center">
				<p class="small"><b>Pedido aguardando pagamento</b></p>
			</div>
		</div>
		<div class="col col-12 bg-purple">
			<div class="col col-12">
				<div class="col col-10">
					<p class="white medium">Pague R$ {{ formatPrice(result.data.original_amount)}} via pix para garantir sua compra</p>
				</div>
			</div>
		</div>
		<div class="col col-12" style="padding: 20px;">
			<h5 class="dark-grey">Copie este código para pagar</h5>
			<h6 class="small dark-grey">1. Acesse sua Internet Banking ou app de pagamentos.</h6>
			<h6 class="small dark-grey">2. Escolha pagar via Pix.</h6>
			<h6 class="small dark-grey">3. Cole o seguinte código.</h6>
		</div>
		<div class="col col-12" style="padding: 20px;" @click="copyKey(result.data.payment_method.key.value);">
			<span class="pix-code" ref="key">
				<p>{{ result.data.payment_method.key.value }}</p>
				<i class="fa-light fa-copy primary fa-2x"></i>
			</span>
		</div>
		<div class="col col-12" style="padding: 20px;" >
			<button class="btn btn-primary" style="width:100%;" @click="done = true">Já confirmei o pagamento</button>
			<p class="small text-center"><b>Pague até {{moment(result.data.expected_on).format("DD/MM/YYYY")}} às {{moment(result.data.expected_on).format("HH:mm")}}</b></p>
		</div>
	</div>
	<div class="payment-done" v-if="done || type == 'card'">
		<div class="col col-12">
			<router-link to="/" class="float-right white" @click="showHeader()">
				<p class="small"><i class="fas fa-home"></i> &nbsp; Ir para Home</p>
			</router-link>
		</div>
		<div class="col col-12 text-center mt-100">
			<img src="@/assets/images/rabbit.png">
		</div>
		<div class="col col-12 text-center">
			<h3 class="white">Pagamento Efetuado!</h3>
			<p class="white medium" style="padding: 20px;">
				Seu pagamento foi efetuado e os melhores produtos para seu Pet logo estarão a caminho!
			</p>
		</div>
		<div class="col col-12 text-center">
			<router-link to="/pedidos" @click="showHeader()" class="btn btn-primary-inverted"> Ver em meus pedidos</router-link>
		</div>
	</div>
		

</template>

<style scoped>
	h5, h6 {
		color: #666;
		margin-top: 10px;
	}

	.payment-done {
		position: absolute;
		background-color: var(--main-color);
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}

	.table {
		max-width: 100%;
		padding: 0;
		border-collapse: collapse; 
		table-layout: fixed;
	}

	.table tr td {
		border: 1px solid #333;
		margin: 0;
		padding: 10px;
		text-align: center;
		word-break: break-all;
		font-size: 11px;
	}
	.table tr td span {
		font-size: 12px !important;
	}

	span.pix-code {
		width: 100%;
		height: 35px;
		border: 1px solid var(--main-color);
		border-radius: 5px;
		float: left;
		padding: 8px;
		font-size: 12px;
		color: #666;
	}
	span.pix-code i {
		position: absolute;
		margin-top: -27px;
		margin-left: calc(100% - 70px);
	}
</style>