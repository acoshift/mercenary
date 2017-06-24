const firebase = require('firebase-admin')

firebase.initializeApp({
  credential: firebase.credential.applicationDefault(),
  databaseURL: 'https://mercenary-714ba.firebaseio.com'
})

firebase.database().ref('boss').push({
  name: 'hello'
})
