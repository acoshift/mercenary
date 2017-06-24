import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/containers/login'
import Home from '@/containers/home'
import Collection from '@/containers/collection'
import Lobby from '@/containers/lobby'
import Battle from '@/containers/battle'
import Create from '@/containers/create'
import Join from '@/containers/join'

import { Auth } from '@/services'

Vue.use(Router)

const router = new Router({
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
      component: Home,
      meta: { auth: true }
    },
    {
      path: '/collection',
      name: 'Collection',
      component: Collection,
      meta: { auth: true }
    },
    {
      path: '/lobby/{id}',
      name: 'Lobby',
      component: Lobby,
      props: (to) => ({ id: to.params.id }),
      meta: { auth: true }
    },
    {
      path: '/create',
      name: 'Create',
      component: Create,
      meta: { auth: true }
    },
    {
      path: '/join/{id}',
      name: 'Join',
      component: Join,
      props: (to) => ({ id: to.params.id }),
      meta: { auth: true }
    },
    {
      path: '/battle',
      name: 'Battle',
      component: Battle,
      meta: { auth: true }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  Auth.currentUser
    .first()
    .subscribe(
      (user) => {
        if (to.meta.auth && !user) {
          next('/')
          return
        }
        if (!to.meta.auth && user) {
          next('/home')
          return
        }
        next()
      }
    )
})

export default router
