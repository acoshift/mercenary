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

export default {
  cache,
  onceValue
}
