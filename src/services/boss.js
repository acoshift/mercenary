import firebase from 'firebase'
import { Observable } from 'rxjs'

// cache all bosses data
firebase.database().ref('boss').on('value', () => {})

export const list = () =>
  Observable.fromPromise(firebase.database().ref('boss').once('value'))

export const get = (id) =>
  Observable.fromPromise(firebase.database().ref(`boss/${id}`).once('value'))
