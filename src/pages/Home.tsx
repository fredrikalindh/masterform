import React from 'react'
import { Box, Typography, TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import routes from './routes'
import Wrapper from '../components/Wrapper'
import AppBar from '../components/AppBar'
import { useForm } from 'react-hook-form'
import formErrorMessages from '../utils/formErrorMessages'

const Home = () => {
  const { register, errors, handleSubmit, reset } = useForm<{ name: string }>()

  return (
    <>
      <Wrapper>
        <Typography paragraph variant='h5'>
          Welcome to your new app!
        </Typography>

        <Box mt={6}>
          <Typography paragraph>
            This is an example form using react-hook-form
          </Typography>
        </Box>
        <form
          onSubmit={handleSubmit(vals => {
            console.log(vals)
            reset()
          })}
        >
          <TextField
            label='Enter your name'
            name='name'
            variant='outlined'
            fullWidth
            inputRef={register({
              required: formErrorMessages.required
            })}
            error={!!errors.name}
            helperText={errors.name?.message || ' '}
          />
          <Button type='submit' color='primary'>
            Next
          </Button>
        </form>
      </Wrapper>
    </>
  )
}

export default Home
