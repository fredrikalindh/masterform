import React, { useState, useRef } from 'react'
import Grid from '@material-ui/core/Grid'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListSubheader from '@material-ui/core/ListSubheader'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Hidden from '@material-ui/core/Hidden'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CloseIcon from '@material-ui/icons/Close'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFileOutlined'
import ClockIcon from '@material-ui/icons/Schedule'
import CircleIcon from '@material-ui/icons/FiberManualRecord'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'
import StopIcon from '@material-ui/icons/Stop'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import AppBar from '../components/AppBar'
import Card from '../components/Card'
import VerticalTabs from '../components/VerticalTabs'

const drawerWidth = 250

const drawerActions = [
  {
    title: 'Recent',
    icon: <ClockIcon />
    // handleClick: () => { }
  },
  {
    title: 'Draft',
    icon: <InsertDriveFileIcon />
    // handleClick: () => { }
  }
]

const lists = [
  {
    title: 'Personal',
    // icon: <CircleIcon />,
    projects: ['french', 'spanish']
    // handleClick: () => { }
  },
  {
    title: 'Webdev',
    // icon: <StopIcon />,
    projects: ['papapal', 'masterform']
  }
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      paddingTop: 40
      // backgroundColor: "grey"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
      // marginTop: 20
    },
    drawerPaper: {
      width: drawerWidth
    },
    menu: {
      marginTop: 40
    },
    selected: {
      backgroundColor: theme.palette.grey[200]
    }
  })
)

const Dashboard = () => {
  const classes = useStyles()

  const [selected, setSelected] = useState('0')

  const [open, setOpen] = useState(true) // if screen > md

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  let i = 2

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
          <List className={classes.menu} key='top'>
            {drawerActions.map((item, index) => (
              <ListItem
                button
                key={item.title}
                id={index.toString()}
                className={
                  selected === index.toString() ? classes.selected : ''
                }
                onClick={e => setSelected(e.currentTarget.id)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </List>
          <Divider />
          {lists.map((list, listIndex) => {
            const projects = list.projects.map((item, itemIndex) => (
              <ListItem
                button
                key={`${item}-${itemIndex}`}
                id={i.toString()}
                className={
                  selected === (i++).toString() ? classes.selected : ''
                }
                onClick={e => setSelected(e.currentTarget.id)}
              >
                <ListItemIcon>
                  <DragIndicatorIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))
            return (
              <>
                <List
                  key={list.title}
                  subheader={
                    <ListSubheader>
                      <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                      >
                        {list.title} <MoreHorizIcon />
                      </Box>
                    </ListSubheader>
                  }
                >
                  {projects}
                </List>
                <Divider key={listIndex} />
              </>
            )
          })}
        </Drawer>
        <Container className={classes.main} maxWidth='md'>
          <Grid container spacing={4}>
            <Grid item key={0}>
              <Card />
            </Grid>
            <Grid item key={1}>
              <Card />
            </Grid>
            <Grid item key={2}>
              <Card />
            </Grid>
            <Grid item key={3}>
              <Card />
            </Grid>
            <Grid item key={4}>
              <Card />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Dashboard
