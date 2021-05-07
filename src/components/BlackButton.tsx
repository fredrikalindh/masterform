import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // height: 48,
      // padding: '0 30px',
      borderRadius: 3
    },
    contained: {
      backgroundColor: 'black',
      color: 'white',
      '&:hover': {
        // backgroundColor: theme.palette.primary.main
        backgroundColor: 'black',
        '-webkit-transform': 'translateY(-1px)',
        transform: 'translateY(-1px)'
      }
    },
    outlined: {
      border: '3px solid black',
      color: 'black',
      '&:hover': {
        '-webkit-transform': 'translateY(-1px)',
        transform: 'translateY(-1px)'
      }
    },
    label: {
      textTransform: 'capitalize',
      fontFamily: 'Roboto',
      fontWeight: 700
    }
  })
)

const BlackButton = (props: any) => {
  const classes = useStyles()
  return (
    <Button
      classes={{
        root: classes.root,
        contained: classes.contained,
        outlined: classes.outlined,
        label: classes.label
      }}
      {...props}
    />
  )
}

export default BlackButton
