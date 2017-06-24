import firebase from 'firebase'

export const create = (bossId) => {
  firebase.database()
    .ref('room-member')
    .push({
      host: firebase.auth().currentUser.uid,
      boss: bossId
    })
}
