import Firebase from './firebase'

export const get = (id) => Firebase
  .onceValue(`user/${id}/profile`)
