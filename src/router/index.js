import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/containers/login'
import Home from '@/containers/home'
import Collection from '@/containers/collection'
import Lobby from '@/containers/lobby'
import Battle from '@/containers/battle'
import Create from '@/containers/create'
import Join from '@/containers/join'

import { Observable } from 'rxjs'
import { Auth, User, Room } from '@/services'

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
      path: '/lobby',
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
      path: '/join/:id',
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
    .flatMap((user) =>
      user
        ? User.getCurrentRoom()
          .flatMap((id) => id ? Room.get(id) : Observable.of(null))
        : Observable.of(user),
      (user, room) => ([ user, room ]))
    .subscribe(
      ([ user, room ]) => {
        if (user && (to.name !== 'Lobby' && to.name !== 'Battle') && room) {
          if (room.state === 'battle') {
            next({ name: 'Battle' })
            return
          }
          next({ name: 'Lobby' })
          return
        }
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
