import React from 'react'
import { Box, Typography, TextField, Button, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import routes from './routes'
import Wrapper from '../components/Wrapper'
import ExpandableText from '../components/ExpandableText'
import { useForm } from 'react-hook-form'
import formErrorMessages from '../utils/formErrorMessages'

const Info = () => {
  const { register, errors, handleSubmit, reset } = useForm<{
    message: string
  }>()

  return (
    <Wrapper>
      <Typography paragraph variant='h5'>
        Contact Us
      </Typography>
      <form
        onSubmit={handleSubmit(vals => {
          console.log(vals)
          reset()
        })}
      >
        <TextField
          label='What do you want to ask?'
          name='message'
          variant='outlined'
          fullWidth
          inputRef={register({
            required: formErrorMessages.required
          })}
          error={!!errors.message}
          helperText={errors.message?.message || ' '}
        />
        <Button type='submit' color='primary' variant='outlined'>
          Send
        </Button>
      </form>
    </Wrapper>
  )
}

export default Info
