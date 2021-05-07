import React, { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router'

import Home from './Home'
import Info from './Info'
import Pricing from './Pricing'
import routes from './routes'

import { useSetRecoilState, useRecoilState } from 'recoil'
import { sessionState, loginDialogState, snackbarState } from '../state'

import firebase, { auth } from '../firebase'

import Wrapper from '../components/Wrapper'
import AppBar from '../components/AppBar'
import HomeBar from '../components/HomeBar'
import Signin from '../components/Signin'
import LaunchScreen from '../components/LaunchScreen'
import Footer from '../components/Footer'

import Box from '@material-ui/core/Box'
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

  if (session.isAuthenticating === true) {
    return <LaunchScreen />
  }
  if (!session.user) {
    return (
      <>
        <HomeBar />
        <Signin
          open={loginDialog.open}
          signIn={loginDialog.signIn}
          onClose={() =>
            setLoginDialog(prev => ({ open: false, signIn: prev.signIn }))
          }
          setSnackbar={message => setSnackbar({ open: true, message })}
        />
        <Snackbar
          autoHideDuration={5000}
          message={snackbar.message}
          open={snackbar.open}
          onClose={() => setSnackbar({ open: false, message: '' })}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
        <Switch>
          <Route path={routes.home} children={<Home />} exact />
          <Route path={routes.info} children={<Info />} />
          <Route path={routes.pricing} children={<Pricing />} />
          <Route path={routes.tou} children={<div>TERMS OF USE</div>} />
          <Redirect to={routes.home} />
        </Switch>
        <Footer />
      </>
    )
  }

  return (
    <Wrapper>
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
    </Wrapper>
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
