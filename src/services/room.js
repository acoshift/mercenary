import Firebase from './firebase'
import firebase from 'firebase'
import * as User from './user'
import * as Boss from './boss'
import * as Job from './job'
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

export const getMemberRoom = () => User
  .getCurrentRoom()
  .flatMap(get)
  .flatMap((r) => Observable.forkJoin(
    User.get(r.host),
    Boss.get(r.boss),
    Observable.from(Object.keys(r.member).map((id) => ({ id, job: r.member[id] })))
      .flatMap((m) =>
        Observable.forkJoin(
          User.get(m.id),
          Job.get(m.job)
        ),
        (m, [ u, job ]) => ({ ...m, ...u, job })
      )
      .toArray()
  ), (r, [ host, boss, member ]) => ({ ...r, host, boss, member }))
  .do((r) => {
    const m = r.member
    r.member = [null, null, null, null, null]
    const me = m.findIndex((x) => x.id === firebase.auth().currentUser.uid)
    r.member[0] = m[me]
    m[me] = null
    let i = 1
    m.forEach((x) => {
      if (x) {
        r.member[i] = x
        i++
      }
    })
  })
