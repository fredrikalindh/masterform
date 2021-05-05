import React, { useEffect, useState } from 'react'
import firebase, { auth, firestore, analytics } from '../firebase'
import 'firebaseui/dist/firebaseui.css'
import { Box, Button } from '@material-ui/core'
import AppBar from '../components/AppBar'
import routes from './routes'
import Wrapper from '../components/Wrapper'

// import { Github as GitHubIcon } from "mdi-material-ui";
// import { Google as GoogleIcon } from "mdi-material-ui";

const authProviders = [
  {
    id: 'google.com',
    color: '#ea4335',
    // icon: <GoogleIcon />,
    name: 'Google'
  },
  {
    id: 'github.com',
    color: '#24292e',
    // icon: <GitHubIcon />,
    name: 'GitHub',
    scopes: ['repo']
  }
]

const initialState = {
  performingAction: false,
  email: '',
  password: '',
  errors: null
}

const Signin = () => {
  // const [user, setUser] = useState({
  //   email: '',
  //   password: '',
  //   displayName: '',
  //   confirmPassword: '',
  // })
  const [performingAction, setPerformingAction] = useState(false)
  const [errors, setErrors] = useState(null)

  const signInWithGoogle = async () => {
    const authProvider = new firebase.auth.OAuthProvider(authProviders[0].id)

    setPerformingAction(true)

    try {
      const value = await auth.signInWithPopup(authProvider)

      const user = value.user

      if (!user) throw new Error('No user')

      const uid = user.uid

      if (!uid) throw new Error('No uid')

      const userDocRef = firestore.doc(`users/${uid}`)

      const userDoc = await userDocRef.get({ source: 'server' })

      if (!userDoc.exists) {
        await userDocRef.set({})
      }
      setPerformingAction(false)
      // analytics.logEvent("login", {
      //   method: provider.id,
      // });
    } catch (error) {
      console.log(error)
      setErrors(error.code)
    }
  }

  return (
    <Box>
      <Button
        key={authProviders[0].id}
        // startIcon={authProviders[0].icon}
        onClick={() => signInWithGoogle()}
      >
        {authProviders[0].name}
      </Button>
    </Box>
  )
}

export default Signin
