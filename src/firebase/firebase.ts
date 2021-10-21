import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'
import 'firebase/auth'

// firebase config can be found in your firebase project
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}

firebase.initializeApp(firebaseConfig)
// if (process.env.NODE_ENV !== 'production') {
//   firebase.auth().useEmulator('http://localhost:9099')
//   firebase
//     .auth()
//     .signInWithCredential(
//       firebase.auth.EmailAuthProvider.credential('john@doe.com', '123123')
//     )
// }

export default firebase

export const auth = firebase.auth()

// export const firestore = firebase.firestore()

export let analytics: undefined | firebase.analytics.Analytics

if (process.env.NODE_ENV !== 'test') {
  analytics = firebase.analytics()
}
