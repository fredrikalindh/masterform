import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFileOutlined'

const useStyles = makeStyles({
  root: {
    maxWidth: 280
  }
})

export default function ImgMediaCard() {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt='Placeholder image'
          height='180'
          image='https://cdn.sanity.io/images/599r6htc/production/07cce9f0be376dd01542c9fd53c07c5721ab7fa5-750x366.gif?w=750&q=75&fit=max&auto=format&dpr=2'
          title='Placeholder image'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Untitled
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          Share
        </Button>
        <Button size='small' color='primary'>
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}
