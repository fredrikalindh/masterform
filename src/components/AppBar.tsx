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
import Settings from './Settings'

type Props = {
  title?: string
  backTo?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      zIndex: theme.zIndex.drawer + 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    paper: {
      marginTop: 35,
      backgroundColor: theme.palette.grey[800],
      color: '#fff'
    }
  })
)

const AppBar = (props: Props) => {
  const classes = useStyles()

  const [settingsDialog, setSettingsDialog] = useState(false)

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
    <>
      <MaterialAppBar
        elevation={trigger ? 4 : 0}
        position='sticky'
        color='secondary'
        className={classes.root}
      >
        <Toolbar variant='dense'>
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
          {/* {!props.backTo && (
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
        )} */}
          <Box ml={3} flex='auto'>
            {/* <ExpandableSearch placeholder="Search..." onChangeValue={(val) => console.log(val)} /> */}
            {/* <Typography variant='h6'>masterform</Typography> */}
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
              classes={{
                paper: classes.paper
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose()
                  setSettingsDialog(true)
                }}
              >
                Settings
              </MenuItem>
              <MenuItem onClick={() => auth.signOut()}>Sign Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </MaterialAppBar>
      <Settings
        open={settingsDialog}
        onClose={() => setSettingsDialog(false)}
      />
    </>
  )
}

export default AppBar
