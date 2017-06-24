import Firebase from './firebase'
import firebase from 'firebase'
import ev from './event'

export const create = (bossId, jobId) => ev
  .push({
    a: 'create',
    bossId,
    jobId
  })
  // .push('room-member', {
  //   host: firebase.auth().currentUser.uid,
  //   boss: bossId,
  //   member: {
  //     [firebase.auth().currentUser.uid]: jobId
  //   }
  // })
  // .map((ref) => ref.key)
  // .do((roomId) => {
  //   User.setCurrentRoom(roomId).subscribe()
  // })

export const get = (id) => Firebase
  .onValue(`room-member/${id}`)

export const list = () => Firebase
  .onArrayValue('room-member')

export const leave = () => Firebase
  .push('event', {
    u: firebase.auth().currentUser.uid,
    a: 'leave'
  })
