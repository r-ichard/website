import Vue from 'vue'
import App from './apps/AdminAddPoll.vue'

Vue.component('page', require('./components/Page.vue'));
Vue.component('question', require('./components/Question.vue'));
Vue.component('propositionsRadio', require('./components/PropositionsRadio.vue'));
Vue.component('propositionsCheckbox', require('./components/PropositionsCheckbox.vue'));
Vue.component('propositionsLinearScale', require('./components/PropositionsLinearScale.vue'));

new Vue({
  el: '#app',
  render: h => h(App)
});