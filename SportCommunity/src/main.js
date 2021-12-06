import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router/router";
import vuetify from "./plugins/vuetify";
import {auth} from "./store/auth.module";
/* eslint-disable */

Vue.config.productionTip = false;

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		auth,
	},
});

new Vue({
	router,
	vuetify,
	store: store,
	render: (h) => h(App),
}).$mount("#app");
