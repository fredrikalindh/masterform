import React from 'react'
import {
  Button,
  MenuItem,
  Menu,
  useMediaQuery,
  Container,
  Box
} from '@material-ui/core'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import ArrowDownIcon from '@material-ui/icons/ArrowDropDown'
import BlackButton from './BlackButton'

type Props = {
  title: string
  children: any
}

const Dropdown = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement, any>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))

  return (
    <Box onMouseEnter={handleMenu} display='inline'>
      <BlackButton
        // onClick={isMobile ? handleMenu : undefined}
        endIcon={<ArrowDownIcon />}
        aria-haspopup='true'
      >
        {props.title}
      </BlackButton>
      <Menu
        id='menu-appbar'
        // elevation={0}
        anchorEl={anchorEl}
        // anchorOrigin={{
        //   vertical: 'bottom',
        //   horizontal: 'center'
        // }}
        keepMounted
        // transformOrigin={{
        //   vertical: 'bottom',
        //   horizontal: 'center'
        // }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.children.map((node: any, index: number) => (
          <MenuItem onClick={handleClose} button key={index}>
            {node}
          </MenuItem>
        ))}
        {/* {props.children.map((node: any) => <MenuItem component={node} />)} */}
      </Menu>
    </Box>
  )
}

export default Dropdown
