/**
 * Define the different parts of your state here
 * using https://recoiljs.org/
 */
import { atom } from 'recoil'

export const sessionState = atom<{
  user: {
    uid: string
    email: string | null
    displayName: string | null
  } | null
  isAuthenticating: boolean
}>({
  key: 'session',
  default: {
    isAuthenticating: true,
    user: null
  }
})

export const loginDialogState = atom<{
  open: boolean
  signIn: boolean
}>({
  key: 'loginDialog',
  default: {
    open: false,
    signIn: false
  }
})

export const snackbarState = atom<{
  open: boolean
  message: string
}>({
  key: 'snackbar',
  default: {
    open: false,
    message: ''
  }
})
