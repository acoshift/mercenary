import Firebase from './firebase'

Firebase.cache('boss')

export const list = () => Firebase.onceValue('boss')

export const get = (id) => Firebase.onceValue(`boss/${id}`)
