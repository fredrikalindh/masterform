import React, { ReactNode } from 'react'
import {
  AppBar as MaterialAppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  useScrollTrigger,
  Button,
  ButtonGroup
} from '@material-ui/core'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'

import { useSetRecoilState, useRecoilValue } from 'recoil'
import { sessionState, loginDialogState } from '../state'

import { auth } from '../firebase'

type Props = {
  title?: string
  backTo?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {}
  })
)

const AppBar = (props: Props) => {
  const classes = useStyles()

  const setLoginDialog = useSetRecoilState(loginDialogState)

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 40
  })

  return (
    <MaterialAppBar
      elevation={trigger ? 4 : 0}
      position='sticky'
      color='secondary'
    >
      <Toolbar>
        {props.backTo && (
          <IconButton
            component={Link}
            to={props.backTo}
            color='inherit'
            edge='start'
          >
            <ArrowBackIcon titleAccess='Navigate Back' />
          </IconButton>
        )}
        {!props.backTo && (
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
        )}
        <Box ml={3} flex='auto'>
          <Typography variant='h6'>masterform</Typography>
        </Box>
        {/* {!session.user && <>
          <Button onClick={() => setLoginDialog({ open: true, signIn: true })}>Sign In</Button>
          <Button onClick={() => setLoginDialog({ open: true, signIn: false })} variant="contained" color="secondary">Sign Up</Button>
        </>} */}
        {/* <Button onClick={() => auth.signOut()} >Sign Out</Button> */}
      </Toolbar>
    </MaterialAppBar>
  )
}

export default AppBar
