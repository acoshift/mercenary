import firebase from 'firebase'
import { Observable } from 'rxjs'

firebase.initializeApp({
  apiKey: 'AIzaSyB4182glIobO1V4xHx7tD1fWB1wvgxBqXo',
  authDomain: 'mercenary-714ba.firebaseapp.com',
  databaseURL: 'https://mercenary-714ba.firebaseio.com',
  projectId: 'mercenary-714ba',
  storageBucket: 'mercenary-714ba.appspot.com',
  messagingSenderId: '665723839060'
})

const database = firebase.database()

export const cache = (path) => {
  database.ref(path).on('value', () => {})
}

export const onceArrayValue = (path) => Observable
  .fromPromise(database.ref(path).once('value'))
  .map((snapshots) => {
    const data = snapshots.val()
    if (!data) return null
    const r = []
    snapshots.forEach((snapshot) => {
      r.push({ ...snapshot.val(), $key: snapshot.key })
    })
    return r
  })

export const onceValue = (path) => Observable
  .fromPromise(database.ref(path).once('value'))
  .map((snapshot) => {
    const data = snapshot.val()
    if (!data) return data
    if (typeof data !== 'object') return data
    return {
      ...data,
      $key: snapshot.key
    }
  })

export const onValue = (path) => Observable
  .create((o) => {
    const ref = database.ref(path)
    const cb = ref.on(
      'value',
      (snapshot) => {
        const data = snapshot.val()
        if (!data) return data
        if (typeof data !== 'object') {
          o.next(data)
          return
        }
        o.next({
          ...data,
          $key: snapshot.key
        })
      },
      (err) => {
        if (err.code === 'PERMISSION_DENIED') {
          o.complete()
          return
        }
        o.error(err)
      }
    )
    return () => ref.off('value', cb)
  })

export const onArrayValue = (path) => Observable
  .create((o) => {
    const ref = database.ref(path)
    const cb = ref.on(
      'value',
      (snapshots) => {
        const r = []
        snapshots.forEach((snapshot) => {
          r.push({ ...snapshot.val(), $key: snapshot.key })
        })
        o.next(r)
      },
      (err) => { o.error(err) }
    )
    return () => ref.off('value', cb)
  })

export const push = (path, data) => Observable
  .fromPromise(database.ref(path).push(data))

export const set = (path, data) => Observable
  .fromPromise(database.ref(path).set(data))

export const remove = (path) => Observable
  .fromPromise(database.ref(path).remove())

export default {
  cache,
  onceValue,
  onceArrayValue,
  onValue,
  onArrayValue,
  push,
  set,
  remove
}
