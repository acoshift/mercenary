import Firebase from './firebase'

Firebase.cache('job')

export const list = () => Firebase.onceArrayValue('job')

export const get = (id) => Firebase.onceValue(`job/${id}`)
