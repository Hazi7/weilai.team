import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "@/assets/styles/index.scss";
import router from "./router";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Alert from '@/components/login/Alert.vue'
// import useSSE from './features/message/composables/sse';
// const { connect, disconnect, subscribe, unsubscribe, isConnected } = useSSE();

const pinia = createPinia()
const app = createApp(App);
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router);
app.component('Alert', Alert)
app.mount("#app");
// createApp(App).use(router).mount("#app");
