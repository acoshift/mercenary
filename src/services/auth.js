import './init'
import firebase from 'firebase'
import { BehaviorSubject } from 'rxjs'
import axios from 'axios'

export const login = () => firebase.auth().signInWithRedirect(new firebase.auth.FacebookAuthProvider())

const initUser = {}
const $currentUser = new BehaviorSubject(initUser)
firebase.auth().onAuthStateChanged((user) => {
  $currentUser.next(user)
  // add user data if not exists
  firebase.database().ref(`user/${user.uid}`).once('value', (snapshot) => {
    const data = snapshot.val()
    if (!data) {
      // upload user image
      axios.get(user.photoURL, { responseType: 'blob' }).then((res) => {
        firebase.storage()
          .ref(`/user/${user.uid}`)
          .put(res.data, { cacheControl: 'public, max-age=7200' })
          .then((f) => {
            firebase.database().ref(`user/${user.uid}`).set({
              name: user.displayName,
              photo: f.downloadURL
            })
          })
      })
    }
  })
})

export const currentUser = $currentUser.asObservable().filter((x) => x !== initUser)
