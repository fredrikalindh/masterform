import React, { useState } from 'react'
import { Box, List, ListItem } from '@material-ui/core'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import ArrowDownIcon from '@material-ui/icons/ArrowDropDown'
import BlackButton from './BlackButton'

type Props = {
  title: string
  children: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      boxShadow: 'none',
      border: '3px solid black',
      borderRadius: 0,
      // position: "relative",
      marginTop: 10
    },
    root: {
      paddingBottom: 20
      // overflow: "display"
    },
    menu: {
      position: 'absolute',
      border: '3px solid black',
      width: '100%',
      minWidth: 150,
      left: -20,
      right: 0,
      // padding: 10,
      listStyle: 'none'
    },
    hidden: {
      display: 'none'
    }
  })
)

const Dropdown = (props: Props) => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)

  const handleMenu = (event: React.MouseEvent<HTMLElement, any>) => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))

  return (
    <Box
      onMouseEnter={handleMenu}
      onMouseLeave={() => setOpen(false)}
      display='inline'
      position='relative'
      className={classes.root}
    >
      <BlackButton
        // onClick={isMobile ? handleMenu : undefined}
        endIcon={<ArrowDownIcon />}
        aria-haspopup='true'
      >
        {props.title}
      </BlackButton>
      <Box className={open ? classes.menu : classes.hidden}>
        <List>
          {props.children.map((node: any, index: number) => (
            <ListItem onClick={handleClose} key={index}>
              {node}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}

export default Dropdown
