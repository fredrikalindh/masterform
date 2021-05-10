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
  useMediaQuery,
  Link,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  List
} from '@material-ui/core'
import clsx from 'clsx'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import { useHistory } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'

import { useSetRecoilState, useRecoilValue } from 'recoil'
import { sessionState, loginDialogState } from '../state'

import routes from '../pages/routes'

import Dropdown from './Dropdown'
import BlackButton from './BlackButton'

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
      marginRight: theme.spacing(0)
    },
    title: {
      flexGrow: 1
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
    link: {
      margin: theme.spacing(1, 1.5)
    }
    // content: {
    //   flexGrow: 1,
    //   padding: theme.spacing(3),
    //   transition: theme.transitions.create('margin', {
    //     easing: theme.transitions.easing.sharp,
    //     duration: theme.transitions.duration.leavingScreen
    //   }),
    //   marginLeft: -drawerWidth
    // },
    // contentShift: {
    //   transition: theme.transitions.create('margin', {
    //     easing: theme.transitions.easing.easeOut,
    //     duration: theme.transitions.duration.enteringScreen
    //   }),
    //   marginLeft: 0
    // }
  })
)

const HomeBar = (props: Props) => {
  const classes = useStyles()

  const history = useHistory()

  const setLoginDialog = useSetRecoilState(loginDialogState)

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
            <BlackButton
              onClick={() => setLoginDialog({ open: true, signIn: false })}
              variant='contained'
            >
              Sign Up
            </BlackButton>
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
        </Drawer>
      </>
    )
  }

  return (
    <AppBar color='default' position='static' elevation={0}>
      <Toolbar>
        <Typography
          variant='h6'
          className={classes.title}
          color='primary'
          onClick={() => history.push(routes.home)}
        >
          masterform
        </Typography>
        <nav>
          <Dropdown title='Products'>
            <Link href={routes.privacy}>Privacy</Link>
            <Link href={routes.pricing}>Pricing</Link>
            <Link href={routes.tou}>Terms of Use</Link>
          </Dropdown>
          <BlackButton href={routes.info} className={classes.link}>
            Info
          </BlackButton>
          <BlackButton href={routes.contact} className={classes.link}>
            Contact
          </BlackButton>

          <BlackButton
            className={classes.link}
            onClick={() => setLoginDialog({ open: true, signIn: true })}
          >
            Sign In
          </BlackButton>
          <BlackButton
            className={classes.link}
            onClick={() => setLoginDialog({ open: true, signIn: false })}
            variant='contained'
          >
            Sign Up
          </BlackButton>
        </nav>
      </Toolbar>
    </AppBar>
  )
}

export default HomeBar

// <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
//       <Toolbar className={classes.toolbar}>
//         <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
//           Company name
//           </Typography>
//         <nav>
//           <Link variant="button" color="textPrimary" href="#" className={classes.link}>
//             Features
//             </Link>
//           <Link variant="button" color="textPrimary" href="#" className={classes.link}>
//             Enterprise
//             </Link>
//           <Link variant="button" color="textPrimary" href="#" className={classes.link}>
//             Support
//             </Link>
//         </nav>
//         <Button href="#" color="primary" variant="outlined" className={classes.link}>
//           Login
//           </Button>
//       </Toolbar>
//     </AppBar>
