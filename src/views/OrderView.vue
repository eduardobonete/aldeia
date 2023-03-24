<script>
import api from '@/services/api';
import Login from './Login/Login.vue';
import moment from "moment";
export default {
    components: { Login },
    data() {
        return {
            orders: [],
            meses: {
                "01": "janeiro",
                "02": "fevereiro",
                "03": "março",
                "04": "abril",
                "05": "maio",
                "06": "junho",
                "07": "julho",
                "08": "agosto",
                "09": "setembro",
                10: "outubro",
                11: "novembro",
                12: "dezembro",
            },
        };
    },
    created() {
        this.moment = moment;
        api.getAll("user/orders").then((res) => {
            this.orders = res.data.data.data;
        });
    },
    mounted() {
        if (!this.loggedIn) {
            this.$refs.loginComponent.openModal();
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    methods: {
        orderDetail(orderNumber) {
            this.$router.push({ 'name': 'order-detail', params: { 'order': orderNumber } })
        }
    },
};
</script>
<template>
    <Login ref="loginComponent" />
    <div class="mt-100 calc col-12">
        <div class="box-container" v-for="order in orders" v-if="loggedIn" @click="orderDetail(order.order.code)">
            <div class="col col-12">
                <div class="col col-4">
                    <p class="primary small">
                        <b>{{ moment(order.created_at).format("DD") }} de
                            {{ meses[moment(order.created_at).format("MM")] }}</b>
                    </p>
                </div>
                <div class="col col-2"></div>
                <div class="col col-6">
                    <p class="grey small" style="font-weight: 500">Pedido {{ order.order.code }}</p>
                </div>
                <hr />
            </div>
            <div class="col col-12">
                <div class="col col-2">
                    <img :src="order.product.thumbnail.image_72x72" style="width: 100%" />
                </div>
                <div class="col col-10" v-if="order.order.payment_status == 'paid'">
                    <p class="success small"><b>Sua compra foi confirmada</b></p>
                </div>
                <div class="col col-10" v-if="order.order.payment_status == 'refunded_to_wallet'">
                    <p class="purple small"><b>Sua compra foi reembolsada</b></p>
                </div>
                <div class="col col-10" v-if="order.order.payment_status == 'unpaid'">
                    <p class="danger small"><b>Pagamento pendente</b></p>
                    <p class="grey small">Pague para garantir sua compra</p>
                </div>
            </div>
        </div>
        <div class="col col-12" v-if="!loggedIn">
            <p class="grey text-center small">Usuário não autenticado</p>
        </div>
    </div>
</template>

<style scoped>
.calc {
    height: calc(100% - 210px);
    overflow: auto;
    position: absolute;
}

hr {
    border: 1px solid #ccc;
    border-top: none;
}
</style>
