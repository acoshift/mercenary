import './init'
import firebase from 'firebase'
import { BehaviorSubject } from 'rxjs'

export const login = () => firebase.auth().signInWithRedirect(new firebase.auth.FacebookAuthProvider())

const initUser = {}
const $currentUser = new BehaviorSubject(initUser)
firebase.auth().onAuthStateChanged((user) => $currentUser.next(user))

export const currentUser = $currentUser.asObservable().filter((x) => x !== initUser)
