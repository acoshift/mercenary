import firebase from 'firebase'
// import { Observable } from 'rxjs'

export const login = () => firebase.auth().signInWithRedirect(new firebase.auth.FacebookAuthProvider())
