import Vue from 'vue'
import Rxjs from 'rxjs/Rx'
import VueRx from 'vue-rx'
import App from './App'
import router from './router'
import '@/styles/main.scss'
Vue.config.productionTip = false

Vue.use(VueRx, Rxjs)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
