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
      marginTop: 20,
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
      marginBottom: 20
    },
    containedButton: {
      textTransform: 'none',
      backgroundColor: 'black',
      margin: '20px 0px'
    }
  })
)

const Signin = (dialogProps: Props) => {
  const classes = useStyles()

  const [performingAction, setPerformingAction] = useState(false)
  const [inputs, setInputs] = useState<Inputs>(initialState)
  const [errors, setErrors] = useState<any>({})

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
  const handleChange: React.ChangeEventHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputs(prev => ({ ...prev, [event.target.id]: event.target.value }))
  }

  const handleSubmit = () => {}

  return (
    <Dialog
      // fullWidth
      maxWidth='sm'
      disableBackdropClick={performingAction}
      disableEscapeKeyDown={performingAction}
      {...dialogProps}
      onKeyPress={handleKeyPress}
      onExited={handleExited}
    >
      <DialogContent>
        <Box
          whiteSpace={5}
          display='flex'
          flexDirection='column'
          justifyContent='center'
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
            size='large'
          >
            Sign in with Google
          </Button>
          <Typography variant='caption'>or</Typography>
          <input
            placeholder='Email'
            className={classes.input}
            type='email'
            id='email'
            value={inputs.email}
            onChange={handleChange}
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
            id='password'
            value={inputs.password}
            onChange={handleChange}
          />
          {errors.password && (
            <Typography variant='caption' color='primary'>
              Password is required.
            </Typography>
          )}
          <Button
            fullWidth
            variant='contained'
            color='primary'
            onClick={() => console.log(inputs)}
            className={classes.containedButton}
          >
            Login
          </Button>
          <Typography gutterBottom variant='caption' color='primary'>
            Forgot password?
          </Typography>
          <Typography gutterBottom variant='caption'>
            Already have an account?{' '}
            <Typography variant='caption' color='primary'>
              Log in
            </Typography>
          </Typography>
          <Typography gutterBottom variant='caption'>
            No account?{' '}
            <Typography variant='caption' color='primary'>
              Create one
            </Typography>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default Signin
