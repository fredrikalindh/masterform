import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router'

import Home from './Home'
import routes from './routes'

import { useSetRecoilState, useRecoilState } from 'recoil'
import { sessionState, loginDialogState, snackbarState } from '../state'

import firebase, { auth } from '../firebase'

import AppBar from '../components/AppBar'
// import Signin from '../components/Signin'
import LaunchScreen from '../components/LaunchScreen'

import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Snackbar from '@material-ui/core/Snackbar'

const App = () => {
  const [session, setSession] = useRecoilState(sessionState)
  const [loginDialog, setLoginDialog] = useRecoilState(loginDialogState)
  const [snackbar, setSnackbar] = useRecoilState(snackbarState)

  // Subscribe to firebase auth
  useEffect(
    () =>
      auth.onAuthStateChanged(resultUser => {
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
  console.log('SESSION', session)

  if (session.isAuthenticating === true) {
    return <LaunchScreen />
  }
  if (!session.user) {
    return (
      <Switch>
        <Route path={routes.home} children={<Home />} />
        <Route path={routes.info} children={<Home />} />
        <Redirect to={routes.home} />
      </Switch>
    )
  }

  return (
    <Container>
      <AppBar />
      <Snackbar
        autoHideDuration={5000}
        message={snackbar.message}
        open={snackbar.open}
        onClose={() => setSnackbar({ open: false, message: '' })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
      <Switch>
        <Route path={routes.app}>
          <Container>LOGGED IN</Container>
        </Route>
        <Redirect to={routes.app} />
      </Switch>
    </Container>
  )
  // return (
  //   <Container>
  //     <AppBar />
  //     {!session.user && <Signin
  //       open={loginDialog.open}
  //       onClose={() => setLoginDialog({ open: false, signIn: false })}
  //       setSnackbar={(message) => setSnackbar({ open: true, message })}
  //     />}
  //     <Snackbar
  //       autoHideDuration={5000}
  //       message={snackbar.message}
  //       open={snackbar.open}
  //       onClose={() => setSnackbar({ open: false, message: '' })}
  //       anchorOrigin={{ vertical: "top", horizontal: "center" }}
  //     />
  //     <Switch>
  //       <Route path={routes.home} exact>
  //         {!session.user ? <Home /> : <Redirect to={routes.app} />}
  //       </Route>
  //       <Route path={routes.app}>
  //         {session.user ? <Container>LOGGED IN</Container> : <Redirect to="/" />}
  //       </Route>
  //       <Route><div>Not found</div></Route>
  //       {/* <Redirect to={routes.home} /> */}
  //     </Switch>
  //   </Container>
  // )
}

export default App
