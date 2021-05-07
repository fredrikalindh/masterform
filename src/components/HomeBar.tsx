import React, { ReactNode } from 'react'
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  useScrollTrigger,
  Button,
  Drawer,
  MenuItem,
  Menu,
  useMediaQuery
} from '@material-ui/core'
import clsx from 'clsx'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Divider from '@material-ui/core/Divider'

import MailIcon from '@material-ui/icons/Mail'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'

import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'

import { useSetRecoilState, useRecoilValue } from 'recoil'
import { sessionState, loginDialogState } from '../state'

import routes from '../pages/routes'

import Dropdown from './Dropdown'

type Props = {
  title?: string
  backTo?: string
}

const drawerWidth = 250

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: 'flex'
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    signUp: {
      // top: 2,
      // position: "sticky",
      marginRight: 10
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -drawerWidth
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    }
  })
)

const HomeBar = (props: Props) => {
  const classes = useStyles()

  const setLoginDialog = useSetRecoilState(loginDialogState)

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))

  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  if (isMobile) {
    return (
      <>
        <AppBar color='default' position='static' elevation={0}>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              masterform
            </Typography>
            <Button
              onClick={() => setLoginDialog({ open: true, signIn: false })}
              variant='contained'
              color='secondary'
              className={classes.signUp}
            >
              Sign Up
            </Button>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant='temporary'
          anchor='right'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronRightIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Profile', 'Starred', 'Sign In', 'Sign Up'].map((text, index) => (
              <ListItem button key={text}>
                {/* <ListItemIcon><MailIcon /></ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          {/* <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
        </Drawer>
      </>
    )
  }

  return (
    <AppBar color='default' position='static' elevation={0}>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          masterform
        </Typography>
        <Box>
          <Dropdown title='Products'>
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
          </Dropdown>
          <Button
            href={routes.info}
            // href="/info"
          >
            Info
          </Button>

          <Button onClick={() => setLoginDialog({ open: true, signIn: true })}>
            Sign In
          </Button>
          <Button
            onClick={() => setLoginDialog({ open: true, signIn: false })}
            variant='contained'
            color='secondary'
            className={classes.signUp}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default HomeBar
