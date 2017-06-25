const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send('Hello from Firebase!')
// })

/**
 * when hero attack boss
 * 1. add data to /room/{roomId}/send
 *    { a: 'action_type', u: uid }
 * 2. calculate damage amount (ramdom)
 * 3. decrease boss hp
 * 4. add data to /room/{roomId}/receive
 *    { a: 'action_type', u: uid, t: 'time_stamp', d: damange_amt }
 */
// exports.attack = functions.database.ref('/room/{roomId}/send').onWrite(event => {
//   // Grab the current value of what was written to the Realtime Database.
//   const original = event.data.val()
//   console.log('attack', event.params.roomId, original)

//   // Calculate damage
//   const damage = 200
//   return event.data.ref.parent.child('receive').push({
//     a: original.a,
//     t: admin.database.ServerValue.TIMESTAMP,
//     u: original.u,
//     d: damage
//   }).then(() => {
//     return event.data.ref.parent.child('boos/hp').once('value')
//       .then((snapshot) => {
//         let newHp = snapshot.val() - damage
//         return event.data.ref.parent.child('boss/hp').set(newHp)
//       })
//   })
// })

/**
 * create room
 * - push data to room-member => get room id
 * - set current room to user
 */
// exports.eventHandler = functions.database.ref('event/{eventId}').onWrite((event) => {
//   const eventData = event.data.val()
//   switch (eventData.a) {
//     case 'start':
//       return startRoom(eventData, event.params.eventId)
//   }
//   // console.log('createRoom', event.params.eventId, eventData)
//   // return admin.database().ref('room-member').push({
//   //   boss: eventData.bossId,
//   //   host: eventData.u,
//   //   member: {
//   //     [eventData.u]: eventData.jobId
//   //   }
//   // }).then((snapshot) => {
//   //   const roomId = snapshot.key
//   //   return admin.database().ref('user/' + eventData.u + '/current-room').set(roomId)
//   // })
//   // .then(() => {
//   //   return admin.database().ref('event/' + event.params.eventId).remove()
//   // })
// })

// function startRoom (eventData, eventId) {
//   console.log('call startRoom', eventId, eventData)
//   return admin.database().ref('room-member').push({
//     boss: eventData.bossId,
//     host: eventData.u,
//     member: {
//       [eventData.u]: eventData.jobId
//     }
//   }).then((snapshot) => {
//     const roomId = snapshot.key
//     return admin.database().ref('user/' + eventData.u + '/current-room').set(roomId)
//   })
//   .then(() => {
//     return admin.database().ref('event/' + eventId).remove()
//   })
// }

/**
 * join room
 * - set room-member/{roomId}/member/{userId} to jobId
 * - set user current room to roomId
 */
// exports.joinRoom = functions.database.ref('/').onWrite(event => {
//   const eventData = event.data.val()
//   console.log('joinRoom', eventData)
// })

/**
 * leaveroom
 * case 1: host leave
 * case 2: member leave
 */
// exports.leaveRoom = functions.database.ref('/event').onWrite(event => {
//   const eventData = event.data.val()
//   console.log('leaveRoom', eventData)
// })
