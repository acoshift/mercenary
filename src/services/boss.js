import Firebase from './firebase'

Firebase.cache('boss')

export const list = () => Firebase.onceArrayValue('boss')

export const get = (id) => Firebase.onceValue(`boss/${id}`)
