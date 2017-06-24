import './firebase'
import firebase from 'firebase'
import { Observable, BehaviorSubject } from 'rxjs'
import axios from 'axios'

const initUser = {}
const $currentUser = new BehaviorSubject(initUser)

export const login = () => firebase.auth().signInWithRedirect(new firebase.auth.FacebookAuthProvider())

export const logout = () => Observable
  .fromPromise(firebase.auth().signOut())
  .do(() => { $currentUser.next(null) })

firebase.auth().onAuthStateChanged((user) => {
  $currentUser.next(user)

  if (user) {
    // add user data if not exists
    firebase.database().ref(`user/${user.uid}/profile`).once('value', (snapshot) => {
      const data = snapshot.val()
      if (!data) {
        // upload user image
        axios.get(user.photoURL, { responseType: 'blob' }).then((res) => {
          firebase.storage()
            .ref(`/user/${user.uid}`)
            .put(res.data, { cacheControl: 'public, max-age=7200' })
            .then((f) => {
              firebase.database().ref(`user/${user.uid}/profile`).set({
                name: user.displayName,
                photo: f.downloadURL
              })
            })
        })
      }
    })
  }
})

export const currentUser = $currentUser.asObservable().filter((x) => x !== initUser)
