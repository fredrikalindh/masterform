import React from 'react'
import { Box, Typography, TextField, Button, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import routes from './routes'
import Wrapper from '../components/Wrapper'
import ExpandableText from '../components/ExpandableText'
import { useForm } from 'react-hook-form'
import formErrorMessages from '../utils/formErrorMessages'

const FAQData = [
  {
    title: 'Why should I join?',
    text: `First, learning a new language needs regular deliberate practice. In your everyday life, you don't have any occasion to speak the language you want to learn. Second, meeting new people is fun and enriching. You never know what may happen. Speak spanish with a Swedish Doctor, speak French with an Asian chef, speak Swedish with a South African entrepreneur.`
  },
  {
    title: 'What happens after the matching?',
    text: `When you match someone, you will receive an e-mail with the other person in copy. From there, it's your job to write, learn and grow.`
  },
  {
    title: 'What are our principles?',
    text: `Don't take yourself too seriously. Have a growth mindset. Practice deliberate learning. Write without a traductor. Don't worry about mistakes. Love mistakes and laugh at yourself. Keep the flow of writing, replacing unknown words with words in your own language. When you've finished you mark these words, look them up and then practice until next time. Use flashcards (i.e Anki) to practice.
    `
  }
]

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

      <Box py={10}>
        <Typography variant='h4' gutterBottom>
          FAQ
        </Typography>
        {FAQData.map((q, i) => (
          <>
            <ExpandableText key={i} title={q.title} text={q.text} />
            <Divider />
          </>
        ))}
      </Box>
    </Wrapper>
  )
}

export default Info
