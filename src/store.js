import Vue from "vue";
import Vuex from "vuex";

import state from "./store/state";
import mutations from "./store/mutations";
import * as actions from "./store/actions";
import * as getters from "./store/getters";
import createDataLocalizePlugin from "./common/js/dataLocalizePlugin.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  plugins: [createDataLocalizePlugin]
});
