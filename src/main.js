import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
// import "normalize.css";

Vue.config.productionTip = true;

import * as Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
