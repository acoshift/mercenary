import Firebase from './firebase'
import firebase from 'firebase'
import * as User from './user'
import { Observable } from 'rxjs'
// import ev from './event'

export const create = (bossId, jobId) => Firebase // ev
  // .push({
  //   a: 'create',
  //   bossId,
  //   jobId
  // })
  .push('room-member', {
    host: firebase.auth().currentUser.uid,
    boss: bossId,
    member: {
      [firebase.auth().currentUser.uid]: jobId
    }
  })
  .map((ref) => ref.key)
  .do((roomId) => {
    User.setCurrentRoom(roomId).subscribe()
  })

export const get = (id) => Firebase
  .onValue(`room-member/${id}`)

export const list = () => Firebase
  .onArrayValue('room-member')

export const leave = () => User
  .getCurrentRoom()
  .flatMap((roomId) => get(roomId).first())
  .flatMap((room) => Observable.forkJoin(
    User.setCurrentRoom(null),
    room.host === firebase.auth().currentUser.uid
      ? Firebase.remove(`room-member/${room.$key}`)
      : Firebase.set(`room-member/${room.$key}/member/${firebase.auth().currentUser.uid}`, null)
  ))
