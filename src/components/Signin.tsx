import React, { useState } from 'react'
import firebase, { auth, firestore } from '../firebase'
// import 'firebaseui/dist/firebaseui.css'
import {
  Dialog,
  DialogProps,
  Button,
  DialogContent,
  Typography,
  Box
} from '@material-ui/core'

import { useSetRecoilState } from 'recoil'
import { loginDialogState } from '../state'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useForm } from 'react-hook-form'

import BlackButton from './BlackButton'

// import { Github as GitHubIcon } from 'mdi-material-ui'
import { Google as GoogleIcon } from 'mdi-material-ui'

const authProviders = [
  {
    id: 'google.com',
    color: '#ea4335',
    icon: <GoogleIcon />,
    name: 'Google'
  }
  // {
  //   id: 'github.com',
  //   color: '#24292e',
  //   icon: <GitHubIcon />,
  //   name: 'GitHub',
  //   scopes: ['repo']
  // }
]

type Props = {
  open: boolean
  signIn: boolean
  onClose: () => void
  setSnackbar: (message: string) => void
} & DialogProps

type Inputs = {
  email: string
  password: string
  confirmPassword: string
  username: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      margin: '10px 0px',
      border: '3px solid',
      padding: theme.spacing(1),
      width: '100%',
      borderRadius: 5,
      '&:focus': {
        borderColor: theme.palette.primary.main,
        outline: 'none'
      }
    },
    button: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1)
    },
    containedButton: {
      // marginTop: theme.spacing(1),
      marginBottom: theme.spacing(3)
    },
    text: {
      margin: '10px 0px'
    }
  })
)

const Signin = ({ signIn, setSnackbar, ...dialogProps }: Props) => {
  const classes = useStyles()

  const [performingAction, setPerformingAction] = useState(false)

  const setLoginDialog = useSetRecoilState(loginDialogState)

  const { register, handleSubmit, reset, errors } = useForm<Inputs>()

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
      dialogProps.onClose()
      setSnackbar('Successfully authenticated with Google')
      // analytics.logEvent("login", {
      //   method: provider.id,
      // });
    } catch (error) {
      console.log(error)
      setSnackbar(error.message)
    }
  }

  const handleExited = () => {
    reset()
  }

  const onSubmit = async (data: Inputs) => {
    console.log('DATA', data)

    try {
      let value
      setPerformingAction(true)
      if (signIn) {
        value = await auth.signInWithEmailAndPassword(data.email, data.password)
      } else {
        value = await auth.createUserWithEmailAndPassword(
          data.email,
          data.password
        )
        if (!value.user || !value.user.uid) throw new Error('No user or uid')
        const userRef = firestore.doc(`users/${value.user.uid}`)
        const user = await userRef.get()
        if (!user.exists) userRef.set({ email: data.email })
      }
      reset()
      setSnackbar(
        signIn ? 'Successfully logged in' : 'Successfully created account'
      )
      setPerformingAction(false)
      dialogProps.onClose()
    } catch (error) {
      setSnackbar(error.message)
      console.log(error.message)
      setPerformingAction(false)
    }
  }

  return (
    <Dialog
      maxWidth='sm'
      disableBackdropClick={performingAction}
      disableEscapeKeyDown={performingAction}
      {...dialogProps}
      onExited={handleExited}
      PaperProps={{ style: { borderRadius: 0 } }}
    >
      <DialogContent>
        <Box
          maxWidth={400}
          height={450}
          display='flex'
          flexDirection='column'
          alignItems='center'
          p={3}
        >
          <BlackButton
            fullWidth
            key={authProviders[0].id}
            variant='outlined'
            startIcon={authProviders[0].icon}
            onClick={() => signInWithGoogle()}
            className={classes.button}
          >
            Sign {signIn ? 'in' : 'up'} with Google
          </BlackButton>
          <Typography variant='caption' className={classes.text}>
            or
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder='Email'
              className={classes.input}
              type='email'
              name='email'
              ref={register({ required: true })}
            />
            {errors.email && (
              <Typography variant='caption' color='primary'>
                Email is required.
              </Typography>
            )}
            <input
              placeholder='Password'
              className={classes.input}
              type='password'
              name='password'
              ref={register({ required: true, minLength: 7 })}
            />
            {errors.password && (
              <Typography
                variant='caption'
                color='primary'
                className={classes.text}
              >
                {errors.password.type === 'required'
                  ? 'Password is required.'
                  : 'Password must be at least 7 characters.'}
              </Typography>
            )}
            <BlackButton
              fullWidth
              variant='contained'
              // color='primary'
              type='submit'
              className={classes.containedButton}
            >
              {signIn ? 'Sign In' : 'Create account'}
            </BlackButton>
          </form>
          {signIn ? (
            <>
              <Typography
                gutterBottom
                variant='caption'
                color='primary'
                className={classes.text}
              >
                Forgot password?
              </Typography>
              <Typography
                gutterBottom
                variant='caption'
                className={classes.text}
              >
                No account?{' '}
                <Typography
                  variant='caption'
                  color='primary'
                  onClick={() => setLoginDialog({ open: true, signIn: false })}
                >
                  Create one
                </Typography>
              </Typography>
            </>
          ) : (
            <Typography gutterBottom variant='caption' className={classes.text}>
              Already have an account?{' '}
              <Typography
                variant='caption'
                color='primary'
                onClick={() => setLoginDialog({ open: true, signIn: true })}
              >
                Log in
              </Typography>
            </Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default Signin
