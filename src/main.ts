/*
 * @Description: main
 * @Author: Sunly
 * @Date: 2023-08-05 04:07:11
 */
import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import "@mdi/font/css/materialdesignicons.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).mount("#app");
