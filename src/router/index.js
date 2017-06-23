import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/containers/login'
import Home from '@/containers/home'
import Collection from '@/containers/collection'
import Lobby from '@/containers/lobby'
import Battle from '@/containers/battle'
import Classes from '@/containers/classes'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/collection',
      name: 'Collection',
      component: Collection
    },
    {
      path: '/lobby',
      name: 'Lobby',
      component: Lobby
    },
    {
      path: '/classes',
      name: 'Classes',
      component: Classes
    },
    {
      path: '/battle',
      name: 'Battle',
      component: Battle
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
