import Vue from 'vue';
import App from './App.vue';
import setupVue from './setupVue';

setupVue();

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
