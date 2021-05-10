import React, { useState } from 'react'

import clsx from 'clsx'

import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'

import AddIcon from '@material-ui/icons/Add'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addIconClose: {
      // animation: `$animationFrames 1000ms ${theme.transitions.easing.easeIn}`,
      transform: 'rotate(0deg)'
      // transformOrigin: "50% 50%",
      // position: absolute;
    },
    addIconOpen: {
      animation: `$animationFrames 100ms ${theme.transitions.easing.easeInOut}`,
      transform: 'rotate(45deg)'
      // transformOrigin: "50% 50%",
      // position: absolute;
    },
    '@keyframes animationFrames': {
      '0%': {
        transform: 'rotate(0deg)'
      },
      '100%': {
        transform: 'rotate(45deg)'
      }
    },
    blue: {
      color: 'blue'
    }
  })
)

type Props = {
  title: string
  text: string
}

const ExpandableText = (props: Props) => {
  const title: string = props.title
  const text: string = props.text

  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(false)

  const classes = useStyles()

  return (
    <Box py={1}>
      <Box
        display='flex'
        justifyContent='space-between'
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Typography
          variant='h6'
          color='initial'
          gutterBottom
          className={hover ? classes.blue : ''}
        >
          {title}
        </Typography>
        <AddIcon
          className={clsx(
            open ? classes.addIconOpen : classes.addIconClose,
            hover ? classes.blue : ''
          )}
        />
      </Box>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <Typography>{text}</Typography>
      </Collapse>
    </Box>
  )
}

export default ExpandableText
