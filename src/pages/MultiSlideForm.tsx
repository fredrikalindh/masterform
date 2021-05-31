import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { useForm } from 'react-hook-form'
import formErrorMessages from '../utils/formErrorMessages'

import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

type AnswerTypes = 'string' | 'number' | 'date' | 'select'

interface Question {
  id: number
  title: string
  type: AnswerTypes
  min: number
  max: number
  required: boolean
  answer: string | null
}

interface FormData {
  backgroundColor: string
  textColor: string
  questions: Question[]
}

const formData: FormData = {
  backgroundColor: '#9085D3',
  textColor: '#fff',
  questions: [
    {
      id: 0,
      title: 'What application are you usually using for creating forms?',
      type: 'select',
      max: 1,
      min: 1,
      required: true,
      answer: null
    },
    {
      id: 1,
      title: 'Which feature would you like to see?',
      type: 'string',
      min: 1,
      max: 1,
      required: true,
      answer: null
    }
  ]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: formData.backgroundColor,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center'
      // padding: 20
    },
    backButton: {
      position: 'absolute',
      bottom: 20,
      left: 20
    },
    forwardButton: {
      position: 'absolute',
      bottom: 20,
      right: 20
    }
  })
)

const MultiSlideForm = () => {
  const classes = useStyles()

  const [index, setIndex] = useState(0)

  const { id, title, type, min, max, required } = formData.questions[index]

  const { register, errors, handleSubmit, reset } = useForm<{ name: string }>()

  // const answer: string | undefined = formData.answers[id];

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          {/* <Box display="flex" flexDirection="column" justifyContent="center"> */}
          <Box
            p={10}
            maxWidth='xs'
            display='flex'
            flexDirection='column'
            justifyContent='center'
          >
            {/* <Container maxWidth="sm"> */}

            <Typography variant='h4' className='' style={{ color: '#fff' }}>
              {title}
            </Typography>
            <form
              onSubmit={handleSubmit(vals => {
                console.log(vals)
                reset()
              })}
            >
              <TextField
                label='Type your answer here...'
                name='name'
                // variant='outlined'
                fullWidth
                inputRef={register({
                  required: formErrorMessages.required
                })}
                error={!!errors.name}
                helperText={errors.name?.message || ' '}
              />
            </form>
            <Typography variant='h5'>
              {index} / {formData.questions.length}{' '}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>

      <IconButton type='submit' color='primary' className={classes.backButton}>
        <ArrowLeftIcon />
      </IconButton>
      <IconButton
        type='submit'
        color='primary'
        className={classes.forwardButton}
      >
        <ArrowRightIcon />
      </IconButton>
    </div>
  )
}

export default MultiSlideForm
