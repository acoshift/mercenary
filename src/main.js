import Vue from 'vue'
import Rxjs from 'rxjs/Rx'
import VueRx from 'vue-rx'
import App from './App'
import router from './router'
import '@/styles/main.scss'
import './filter'
Vue.config.productionTip = false

Vue.use(VueRx, Rxjs)

Vue.mixin({
  methods: {
    shortName: (name) => {
      if (!name) return ''
      const names = name.split(' ')
      return names.length >= 2 ? names[0].substring(0, 1) + '. ' + names[1] : names[0]
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
