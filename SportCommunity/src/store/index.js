import Vue from "vue";
import Vuex from "vuex";

import {auth} from "./auth.module";

Vue.use(Vuex);
console.log("store vuex auth");

export default new Vuex.Store({
	modules: {
		auth,
	},
});
