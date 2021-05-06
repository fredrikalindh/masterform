import React from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import { CircularProgress } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    center: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center'
    }
  })
)

const LaunchingScreen = () => {
  const classes = useStyles()
  return (
    <div className={classes.center}>
      <CircularProgress />
    </div>
  )
}

export default LaunchingScreen
