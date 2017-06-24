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

export const onceValue = (path) => Observable
  .fromPromise(database.ref(path).once('value'))
  .map((snapshot) => snapshot.val())

export const onValue = (path) => Observable
  .create((o) => {
    const ref = database.ref(path)
    const cb = ref.on(
      'value',
      (snapshot) => { o.next(snapshot.val()) },
      (err) => { o.error(err) }
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

export default {
  cache,
  onceValue,
  onValue,
  onArrayValue,
  push
}
