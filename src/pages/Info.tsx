import React from 'react'
import { Box, Typography, TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import routes from './routes'
import Wrapper from '../components/Wrapper'
import AppBar from '../components/AppBar'
import { useForm } from 'react-hook-form'
import formErrorMessages from '../utils/formErrorMessages'

const Info = () => {
  const { register, errors, handleSubmit, reset } = useForm<{ email: string }>()

  return (
    <Wrapper>
      <Typography paragraph variant='h5'>
        My app is awesome
      </Typography>

      <Box mt={6}>
        <Typography paragraph>Do you want to know more?</Typography>
      </Box>
      <form
        onSubmit={handleSubmit(vals => {
          console.log(vals)
          reset()
        })}
      >
        <TextField
          label='Enter your email'
          name='email'
          variant='outlined'
          fullWidth
          inputRef={register({
            required: formErrorMessages.required
          })}
          error={!!errors.email}
          helperText={errors.email?.message || ' '}
        />
        <Button type='submit' color='primary'>
          Send
        </Button>
      </form>
    </Wrapper>
  )
}

export default Info
