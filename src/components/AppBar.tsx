import React, { useState } from 'react'
import {
  AppBar as MaterialAppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  useScrollTrigger,
  Button,
  Avatar,
  MenuItem,
  Menu
} from '@material-ui/core'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import AccountCircle from '@material-ui/icons/AccountCircle'

import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'

import { auth } from '../firebase'

type Props = {
  title?: string
  backTo?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
)

const AppBar = (props: Props) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState<any>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
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
        <div>
          <IconButton
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleMenu}
            color='inherit'
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </MaterialAppBar>
  )
}

export default AppBar
