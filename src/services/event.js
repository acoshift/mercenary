import firebase from 'firebase'
import Firebase from './firebase'

export const push = (data) => Firebase
  .push('event', {
    ...data,
    u: firebase.auth().currentUser.uid
  })

export default {
  push
}
