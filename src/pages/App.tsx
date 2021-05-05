import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router'

import Home from './Home'
import routes from './routes'

import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil'
import { sessionState, loginDialogState, snackbarState } from '../state'

import firebase, { auth } from '../firebase'

import AppBar from '../components/AppBar'
import Signin from '../components/Signin'

import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Snackbar from '@material-ui/core/Snackbar'

const App = () => {
  const setSession = useSetRecoilState(sessionState)
  const [loginDialog, setLoginDialog] = useRecoilState(loginDialogState)
  const snackbar = useRecoilValue(snackbarState)

  // Subscribe to firebase auth
  useEffect(
    () =>
      auth.onAuthStateChanged(resultUser => {
        console.log('RESULT USER', resultUser)

        setSession({
          isAuthenticating: false,
          user: resultUser && {
            uid: resultUser.uid,
            email: resultUser.email,
            displayName: resultUser.displayName
          }
        })
      }),
    [setSession]
  )

  return (
    <Container>
      <AppBar
        title='masterform'
        actions={
          <Button
            color='primary'
            size='small'
            onClick={() => setLoginDialog({ open: true })}
            // variant='outlined'
          >
            Sign In
          </Button>
        }
      />
      <Signin
        open={loginDialog.open}
        onClose={() => setLoginDialog({ open: false })}
      />
      <Snackbar
        autoHideDuration={3000}
        message={snackbar.message}
        open={snackbar.open}
        onClose={() => setSnackbar({ open: false, message: '' })}
      />
      <Switch>
        <Route path={routes.home} children={<Home />} />
        <Redirect to={routes.home} />
      </Switch>
    </Container>
  )
}

export default App
