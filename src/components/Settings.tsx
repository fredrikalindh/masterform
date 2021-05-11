import React, { useState } from 'react'

import { useHistory } from 'react-router'

import firebase, { auth, firestore } from '../firebase'
// import 'firebaseui/dist/firebaseui.css'
import {
  Dialog,
  DialogProps,
  Button,
  DialogContent,
  Typography,
  Box,
  Avatar
} from '@material-ui/core'

import { useRecoilState } from 'recoil'
import { sessionState } from '../state'

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
  // settingsDialog: boolean
  onClose: () => void
  // setSnackbar: (message: string) => void
} & DialogProps

type Inputs = {
  email: string
  password: string
  confirmPassword: string
  username: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10)
    }
  })
)

const Settings = ({ ...dialogProps }: Props) => {
  const classes = useStyles()

  const history = useHistory()

  const [performingAction, setPerformingAction] = useState(false)

  const [session, setSession] = useRecoilState(sessionState)

  // const { register, handleSubmit, reset, errors } = useForm<Inputs>()

  const handleExited = () => {
    // reset()
  }
  if (
    !session ||
    !session.user ||
    !session.user.displayName ||
    !session.user.email
  ) {
    history.push('/')
    return null
  }
  return (
    <Dialog
      maxWidth='sm'
      disableBackdropClick={performingAction}
      disableEscapeKeyDown={performingAction}
      {...dialogProps}
      onExited={handleExited}
      PaperProps={{ style: { borderRadius: 0, width: 500 } }}
    >
      <DialogContent>
        <Box
          maxWidth={400}
          height={450}
          display='flex'
          justifyContent='space-around'
          // flexDirection='column'
          // alignItems='center'
          p={3}
        >
          <Box
            display='flex'
            // justifyContent="space-around"
            flexDirection='column'
            alignItems='center'
          >
            <Avatar
              sizes='large'
              src={session.user.avatarUrl ? session.user.avatarUrl : ''}
              className={classes.large}
            />
            <Typography variant='caption'>edit</Typography>
          </Box>
          <Box>
            <Typography variant='caption'>Name</Typography>
            <Typography variant='body1' gutterBottom>
              {session.user.displayName && session.user.displayName}
            </Typography>
            <Typography variant='caption'>Email</Typography>
            <Typography variant='body1' gutterBottom>
              {session.user.email && session.user.email}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default Settings
