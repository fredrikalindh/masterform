import React from 'react'
import { Box, Typography, Grid } from '@material-ui/core'
// import { Switch, Route, Redirect } from 'react-router-dom'
// import routes from './routes'
// import Signin from '../components/Signin'
// import HomeBar from '../components/HomeBar'
import { useSetRecoilState } from 'recoil'
import { loginDialogState } from '../state'

import BlackButton from '../components/BlackButton'

const Home = () => {
  const setLoginDialog = useSetRecoilState(loginDialogState)

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      pb={10}
    >
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Typography variant='h2'>
          Minds meeting minds is how great ideas meet the world
        </Typography>
        <BlackButton
          variant='contained'
          size='large'
          onClick={() => setLoginDialog({ open: true, signIn: false })}
        >
          Try for free
        </BlackButton>
      </Box>
      <Box py={10}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant='caption' gutterBottom>
              Design
            </Typography>
            <Typography variant='h3' gutterBottom>
              Design without silos
            </Typography>
            <Typography>
              Built for the web, Figma is collaborative by nature. Plus, it is
              packed with design features you already love and unique inventions
              like the arc tool, vector networks, and auto layout.
            </Typography>
            <BlackButton variant='outlined' size='large'>
              Try for free
            </BlackButton>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              minHeight={300}
              height='100%'
              style={{ backgroundColor: 'blue' }}
            />
          </Grid>
        </Grid>
      </Box>
      {/* <Box width="100%" height={500} style={{ backgroundColor: "blue" }} my={5} /> */}
    </Box>
  )
}

export default Home
