import React, { useState, useRef } from 'react'
import Paper from '@material-ui/core/Paper'
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
import Typography from '@material-ui/core/Typography'

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
import TextField from '@material-ui/core/TextField'

const drawerWidth = 250

const drawerActions = [
  {
    title: 'Background Color',
    value: '#000'
  },
  {
    title: 'Text Color',
    value: '#fff'
  },
  {
    title: 'Font',
    value: 'Poppins'
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
    },
    paper: {
      height: '75vh',
      width: '75vw',
      padding: '20%',
      backgroundColor: theme.palette.primary.main,
      display: 'flex',
      // alignItems: "center",
      // justifyContent: "center",
      color: '#fff',
      flexDirection: 'column'
    }
  })
)

const EditFile = () => {
  const classes = useStyles()

  const [selected, setSelected] = useState('0')

  const [open, setOpen] = useState(true) // if screen > md

  return (
    <>
      <AppBar />
      <Box display='flex'>
        <Container className={classes.main}>
          <Paper className={classes.paper}>
            {/* <Box display="flex" flexDirection="column" justifyContent="center" > */}
            <Typography variant='h3' gutterBottom>
              This is la question?
            </Typography>
            <TextField
              id='answer'
              label='Type your answer here...'
              // value={}
              // onChange={}
              // fullWidth
            />
            {/* </Box> */}
          </Paper>
        </Container>
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='right'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <List
            className={classes.menu}
            key='top'
            subheader={<ListSubheader>Styling</ListSubheader>}
          >
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
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
      </Box>
    </>
  )
}

export default EditFile
