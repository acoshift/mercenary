import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyB4182glIobO1V4xHx7tD1fWB1wvgxBqXo',
  authDomain: 'mercenary-714ba.firebaseapp.com',
  databaseURL: 'https://mercenary-714ba.firebaseio.com',
  projectId: 'mercenary-714ba',
  storageBucket: 'mercenary-714ba.appspot.com',
  messagingSenderId: '665723839060'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
