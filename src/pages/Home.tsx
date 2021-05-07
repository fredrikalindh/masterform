import React from 'react'
import { Box, Typography, Button } from '@material-ui/core'
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
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Typography paragraph variant='h2'>
        Minds meeting minds is how great ideas meet the world
      </Typography>
      <Button variant='contained' color='secondary'>
        Try for free
      </Button>
      {/* <Box width="100%" height={500} style={{ backgroundColor: "blue" }} my={5} /> */}
    </Box>
  )
}

export default Home
