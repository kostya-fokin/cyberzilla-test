import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { API_URL } from '@/constants'

const axiosInstance = axios.create({
  baseURL: API_URL
});

Vue.use(VueAxios, axiosInstance)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
