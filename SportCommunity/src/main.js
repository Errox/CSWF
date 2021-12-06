import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
import router from './router/router'
import vuetify from './plugins/vuetify'
import { auth } from './store/auth.module';


Vue.config.productionTip = false
console.log('main.js')

Vue.use(Vuex);
console.log('store vuex auth');

const store = new Vuex.Store({
  modules: {
    auth
  }
});

new Vue({
  router,
  vuetify,
  store: store,
  render: h => h(App)
}).$mount('#app')
