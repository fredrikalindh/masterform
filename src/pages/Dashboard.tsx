import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CloseIcon from '@material-ui/icons/Close'

import AppBar from '../components/AppBar'
import Card from '../components/Card'

const drawerWidth = 250

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      paddingTop: 30
      // backgroundColor: "grey"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      marginTop: 40
    },
    drawerPaper: {
      width: drawerWidth
    },
    menu: {
      marginTop: 60
    }
  })
)

const Dashboard = () => {
  const classes = useStyles()

  const [open, setOpen] = useState(true) // if screen > md

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      <AppBar />
      <Box display='flex'>
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <List className={classes.menu}>
            {['Profile', 'Starred', 'Sign In', 'Sign Up'].map((text, index) => (
              <ListItem button key={text}>
                {/* <ListItemIcon><MailIcon /></ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Container className={classes.main} maxWidth='md'>
          <Grid container spacing={4}>
            <Grid item>
              <Card />
            </Grid>
            <Grid item>
              <Card />
            </Grid>
            <Grid item>
              <Card />
            </Grid>
            <Grid item>
              <Card />
            </Grid>
            <Grid item>
              <Card />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Dashboard
