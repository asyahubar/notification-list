import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import moment from 'moment'

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.moment = moment

new Vue({
  el: '#app',
  render: h => h(App)
})
