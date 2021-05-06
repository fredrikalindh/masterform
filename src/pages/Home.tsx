import React from 'react'
import { Box, Typography, Container, Snackbar } from '@material-ui/core'
import { Switch, Route, Redirect } from 'react-router-dom'
import routes from './routes'
import Signin from '../components/Signin'
import HomeBar from '../components/HomeBar'
import { useRecoilState } from 'recoil'
import { loginDialogState, snackbarState } from '../state'

const Home = () => {
  const [loginDialog, setLoginDialog] = useRecoilState(loginDialogState)
  const [snackbar, setSnackbar] = useRecoilState(snackbarState)

  return (
    <Container>
      <HomeBar />
      <Signin
        open={loginDialog.open}
        onClose={() => setLoginDialog({ open: false, signIn: false })}
        setSnackbar={message => setSnackbar({ open: true, message })}
      />
      <Snackbar
        autoHideDuration={5000}
        message={snackbar.message}
        open={snackbar.open}
        onClose={() => setSnackbar({ open: false, message: '' })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />

      <Box display='flex' justifyContent='center' alignItems='center'>
        <Box width={700}>
          <Typography paragraph variant='h1'>
            Minds meeting minds is how great ideas meet the world
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default Home
