import Firebase from './firebase'
import * as Auth from './auth'

export const push = (data) => Auth
  .currentUser
  .first()
  .flatMap((user) => Firebase
    .push('event', {
      ...data,
      u: user.uid
    })
  )

export default {
  push
}
