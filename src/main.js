import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import router from "./router/route";
import store from "./store";

import * as lucide from "lucide-vue-next";

const savedTheme = localStorage.getItem("theme") || "light";

document.documentElement.classList.add(savedTheme);

const app = createApp(App);

Object.entries(lucide).forEach(([name, component]) => {
  app.component(name, component);
});

app.use(router);
app.use(store);
app.mount("#app");
