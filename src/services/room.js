import Firebase from './firebase'
import firebase from 'firebase'

export const create = (bossId, jobId) => Firebase
  .push('room-member', {
    host: firebase.auth().currentUser.uid,
    boss: bossId,
    member: {
      [firebase.auth().currentUser.uid]: jobId
    }
  })
  .map((ref) => ref.key)

export const get = (id) => Firebase
  .onValue(`room-member/${id}`)
