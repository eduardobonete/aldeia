<script>
import api from '@/services/api';
import Login from './Login/Login.vue';
import moment from "moment";
import axios from "axios";
export default {
    components: { Login },
    data() {
        return {
            order: {
                order_details: [],
                order_status: ''
            },
            radio: {
                checked: 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z',
                unchecked: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'
            }
        };
    },
    created() {
        this.moment = moment;
    },
    mounted() {
        if (!this.loggedIn) {
            this.$refs.loginComponent.openModal();
        }

        this.orderDetail(this.$route.params.order);
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    methods: {
        orderDetail(orderNumber) {
            axios({
                method: "get",
                baseURL: import.meta.env.VITE_API_URL,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                url: "user/track-order",
                params: {
                    invoice_no: orderNumber,
                }
            }).then(({ data }) => {
                this.order = data.data.order
            });
        }
    },
};
</script>
<template>
    <Login ref="loginComponent" />
    <div class="mt-80 calc col-12">
        <div class="col col-12 primary" style="margin-left: 5%;margin-bottom: 0.5rem;">
            <p>Status da <b>Compra</b></p>
        </div>

        <div class="col col-12 ">
            <div class="col col-8">
                <div class="col col-8 grey">
                    <p class="ml-container">{{ order.order_details.length }} Produtos ></p>
                </div>
                <div class="col col-8 color-purple" style="font-size: 11px;">
                    <p class="ml-container">Ver Pedido ></p>
                </div>
            </div>
            <div class="col col-4"></div>
        </div>
        <div class="box-container">
            <div class="col col-12">
                <div class="col col-12" style="display:flex;align-items: center; margin-bottom: 0.5rem;">
                    <div class="col col-6" style="font-size: 20px">
                        <b class="color-purple">Chega hoje</b>
                    </div>
                    <div class="col col-6 color-purple" style="font-size: 14px;display:flex;justify-content: end;">
                        De 08:35 as 9:35
                    </div>
                </div>
                <div class="col col-12">
                    <div class="col col-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="icon-grey"
                            :class="{ 'icon-green': order.order_status == 'pending' }">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path :d="order.order_status == 'pending' ? radio.checked : radio.unchecked" />
                        </svg>
                    </div>
                    <div class="col col-10 grey " :class="{ 'color-green': order.order_status == 'pending' }"> Em preparação
                    </div>
                </div>
                <div class="col col-12">
                    <div class="col col-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="icon-grey"
                            :class="{ 'icon-green': order.order_status == 'confirmed' }">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path :d="order.order_status == 'confirmed' ? radio.checked : radio.unchecked" />
                        </svg>
                    </div>
                    <!-- peding, delivered -->
                    <div class="col col-10 grey" :class="{ 'color-green': order.order_status == 'confirmed' }"> A Caminho
                    </div>
                </div>
                <div class="col col-12">
                    <div class="col col-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" class="icon-grey"
                            :class="{ 'icon-green': order.order_status == 'delivered' }">
                            {{ order }}
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path :d="order.order_status == 'delivered' ? radio.checked : radio.unchecked" />
                        </svg>
                    </div>
                    <div class="col col-10 grey " :class="{ 'color-green': order.order_status == 'delivered' }"> Entregue
                    </div>
                </div>
            </div>

            <hr />
            <div class="col col-12" style="text-align: center;">
                <button class="btn btn-transparent">Cancelar compra</button>
            </div>
        </div>

    </div>
    <div class="col col-12" v-if="!loggedIn">
        <p class="grey text-center small">Usuário não autenticado</p>
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



.mt-80 {
    margin-top: 80px;
}

.ml-container {
    margin-left: 5%;
}

.color-purple {
    color: rgb(102 66 149);
}

.color-green {
    color: rgb(18 187 94) !important;
}

.icon-grey {
    fill: #999
}

.icon-green {
    fill: rgb(18 187 94) !important
}

.btn-transparent {
    background: transparent;
    color: var(--main-color);
    border: solid 1px rgb(102 66 149);
    color: rgb(102 66 149);
    width: 90%;
    margin: 0.5rem;
}
</style>
