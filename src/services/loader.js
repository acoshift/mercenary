import { BehaviorSubject } from 'rxjs'

const $loader = new BehaviorSubject(false)

export const isLoading = $loader.asObservable()

export const start = () => {
  $loader.next(true)
}

export const stop = () => {
  $loader.next(false)
}
