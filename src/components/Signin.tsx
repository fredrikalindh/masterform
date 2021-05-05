import React, { useState } from 'react'
import firebase, { auth, firestore } from '../firebase'
import 'firebaseui/dist/firebaseui.css'
import {
  Dialog,
  DialogProps,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Typography,
  Box
} from '@material-ui/core'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useForm } from 'react-hook-form'

import { Github as GitHubIcon } from 'mdi-material-ui'
import { Google as GoogleIcon } from 'mdi-material-ui'

const authProviders = [
  {
    id: 'google.com',
    color: '#ea4335',
    icon: <GoogleIcon />,
    name: 'Google'
  },
  {
    id: 'github.com',
    color: '#24292e',
    icon: <GitHubIcon />,
    name: 'GitHub',
    scopes: ['repo']
  }
]

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  username: ''
}

type Props = {
  open: boolean
  onClose: () => void
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
      padding: 10,
      width: '100%',
      borderRadius: 4,
      '&:focus': {
        borderColor: theme.palette.primary.main,
        outline: 'none'
      }
    },
    button: {
      border: '3px solid',
      textTransform: 'none',
      marginTop: 20,
      marginBottom: 10
    },
    containedButton: {
      textTransform: 'none',
      backgroundColor: 'black',
      marginTop: 10,
      marginBottom: 30
    },
    text: {
      margin: '10px 0px'
    }
  })
)

const Signin = (dialogProps: Props) => {
  const classes = useStyles()

  const [performingAction, setPerformingAction] = useState(false)

  const [signIn, setSignIn] = useState(true)

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
      // analytics.logEvent("login", {
      //   method: provider.id,
      // });
    } catch (error) {
      console.log(error)
      // setErrors(error.message)
    }
  }

  const handleExited = () => {
    // setUser(initialState);
  }

  const handleKeyPress: React.KeyboardEventHandler = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    // const { email, password } = user;
    // if (!email && !password) {
    //   return;
    // }
    // const key = event.key;
    // if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
    //   return;
    // }
    // if (key === "Enter") {
    //   if (email && !password) {
    //     // this.sendSignInLinkToEmail();
    //   } else {
    //     // this.signIn();
    //   }
    // }
  }
  // const handleChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputs(prev => ({ ...prev, [event.target.id]: event.target.value }))
  // }

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
      }
      reset()
      setPerformingAction(false)
    } catch (error) {
      // setSnackbar(error.message)
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
      onKeyPress={handleKeyPress}
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
          padding={3}
        >
          <Button
            fullWidth
            key={authProviders[0].id}
            variant='outlined'
            startIcon={authProviders[0].icon}
            onClick={() => signInWithGoogle()}
            className={classes.button}
          >
            Sign {signIn ? 'in' : 'up'} with Google
          </Button>
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
            <Button
              fullWidth
              variant='contained'
              color='primary'
              type='submit'
              className={classes.containedButton}
            >
              {signIn ? 'Sign In' : 'Create account'}
            </Button>
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
                  onClick={() => setSignIn(false)}
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
                onClick={() => setSignIn(true)}
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
