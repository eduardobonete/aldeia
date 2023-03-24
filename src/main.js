import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toaster from "@meforma/vue-toaster";
import { vMaska } from "maska";

import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(Toaster, { position: "bottom", duration: 3000 });
app.directive("maska", vMaska);

app.mount("#app");
