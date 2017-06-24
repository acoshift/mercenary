const functions = require('firebase-functions')
const firebase = require('firebase-admin')

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})

/**
 * when hero attack boss
 * 1. add data to /room/{roomId}/send
 *    { a: 'action_type', u: uid }
 * 2. calculate damage amount (ramdom)
 * 3. decrease boss hp
 * 4. add data to /room/{roomId}/receive
 *    { a: 'action_type', u: uid, t: 'time_stamp', d: damange_amt }
 */
exports.attack = functions.database.ref('/room/{roomId}/send').onWrite(event => {
  // Grab the current value of what was written to the Realtime Database.
  const original = event.data.val()
  console.log('attack', event.params.pushId, original)

  // Calculate damage
  const damage = 200
  return event.data.ref.parent.child('receive').push({
    a: original.a,
    t: firebase.database.ServerValue.TIMESTAMP,
    u: original.u,
    d: damage
  }).then(() => {
    return event.data.ref.parent.child('boos/hp').once('value')
      .then((snapshot) => {
        let newHp = snapshot.val() - damage
        return event.data.ref.parent.child('boss/hp').set(newHp)
      })
  })
})
