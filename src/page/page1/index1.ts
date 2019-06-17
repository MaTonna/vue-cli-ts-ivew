import Vue from 'vue';
import VueRouter from 'vue-router';
import 'iview/dist/styles/iview.css';
import App from '@component/App1.vue';
import routes from '@router/router.ts';
const router = new VueRouter({
  base: '/page1/index1',
  mode: 'history',
  routes
})
Vue.use(VueRouter);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
