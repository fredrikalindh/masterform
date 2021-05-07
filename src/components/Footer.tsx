import React from 'react'

import Grid from '@material-ui/core/Grid'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'

import ListSubheader from '@material-ui/core/ListSubheader'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'

import { Github as GitHubIcon } from 'mdi-material-ui'
import { Instagram as InstagramIcon } from 'mdi-material-ui'
import { DevTo as DevToIcon } from 'mdi-material-ui'
import { Linkedin as LinkedinIcon } from 'mdi-material-ui'

type ListItemData = {
  title: string
  to: string
  icon?: JSX.Element
}

type ListTitleData = {
  title: string
  links: ListItemData[]
}

const FooterContent: ListTitleData[] = [
  {
    title: 'Social',
    links: [
      {
        title: 'Instagram',
        to: 'https://instagram.com/fredrikalindh',
        icon: <InstagramIcon />
      },
      {
        title: 'Github',
        to: 'https://github.com/fredrikalindh',
        icon: <GitHubIcon />
      },
      {
        title: 'Dev.to',
        to: 'https://dev.to/fredrikalindh',
        icon: <DevToIcon />
      },
      {
        title: 'Linkedin',
        to: 'https://www.linkedin.com/in/fredrika-l-a17439102/',
        icon: <LinkedinIcon />
      }
    ]
  },
  {
    title: 'Explore',
    links: [
      {
        title: 'Pricing',
        to: '/pricing'
        // icon: null
      },
      {
        title: 'Terms of use',
        to: 'termsofuse'
        // icon: null
      },
      {
        title: 'Contact',
        to: '/contact'
        // icon: null
      }
    ]
  },
  {
    title: 'Resources',
    links: [
      {
        title: 'Blog',
        to: '/blog'
        // icon: null
      },
      {
        title: 'Careers',
        to: '/careers'
        // icon: null
      },
      {
        title: 'About us',
        to: '/about'
        // icon: null
      }
    ]
  }
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100vw',
      // padding: "50px 20px",
      bottom: 0,
      // marginTop: 150,
      [theme.breakpoints.up('sm')]: {
        position: 'absolute'
      }
      // minHeight: 200
    },
    linkList: {
      listStyle: 'none'
    }
  })
)

const Footer = () => {
  const classes = useStyles()
  // const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))
  // if (isMobile) return null;

  return (
    <Box
      width='100vw'
      py={2}
      px={2}
      className={classes.root}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Grid container spacing={1}>
        {FooterContent.map(column => (
          <Grid item xs={6} sm={4}>
            <List subheader={<ListSubheader>{column.title}</ListSubheader>}>
              {column.links.map((link: any) => (
                <ListItem
                  button
                  key={link.title}
                  component={Link}
                  href={link.to}
                >
                  {link.icon && <ListItemIcon>{link.icon}</ListItemIcon>}
                  <ListItemText primary={link.title} />
                </ListItem>
              ))}
            </List>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Footer
