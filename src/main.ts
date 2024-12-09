import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "@/assets/styles/index.scss";
import router from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import Alert from "@/pages/Alert.vue";

const pinia = createPinia();
const app = createApp(App);
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.component("Alert", Alert);
app.mount("#app");
// createApp(App).use(router).mount("#app");
