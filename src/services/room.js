import Firebase from './firebase'
import firebase from 'firebase'
import * as User from './user'
import * as Boss from './boss'
import * as Job from './job'
import { Observable } from 'rxjs'

export const create = (bossId, jobId) => Firebase // ev
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
  .onArrayValueRef(firebase.database().ref('room-member').orderByChild('state').equalTo(null))

export const leave = () => User
  .getCurrentRoom()
  .filter(Boolean)
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

export const getBattleRoom = () => User
  .getCurrentRoom()
  .flatMap((roomId) => Firebase.onValue(`room/${roomId}`))
  .filter(Boolean)
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

export const join = (roomId, jobId) => Firebase
  .set(`room-member/${roomId}/member/${firebase.auth().currentUser.uid}`, jobId)
  .flatMap(() => User.setCurrentRoom(roomId))

export const start = () => getMemberRoom()
  .flatMap((room) => Firebase.set(`room-member/${room.$key}/state`, 1), (room) => room)
  .flatMap((room) => Firebase.set(`room/${room.$key}`, {
    boss: {
      id: room.boss.$key,
      name: room.boss.name,
      photo: room.boss.photo,
      hp: room.boss.hp,
      maxHp: room.boss.hp,
      atk: room.boss.atk,
      def: room.boss.def,
      ct: room.boss.ct
    },
    member: room.member.map((x) => x ? ({
      id: x.id,
      name: x.name,
      photo: x.photo,
      hp: x.job.hp,
      maxHp: x.job.hp,
      jobPhoto: x.job.photo,
      atk: x.job.atk,
      def: x.job.def,
      skill: x.job.skill,
      skillCt: x.job.skillCt,
      skillAtk: x.job.skillAtk
    }) : null)
  }), (room) => room)
