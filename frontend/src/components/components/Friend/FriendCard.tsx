import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'

interface Props {
  name: string
  avatar?: string
}

export default function MultiActionAreaCard({ name, avatar }: Props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='200'
          image='http://localhost:3500/avatar/1686426738875-834258115.jpg'
          alt='green iguana'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Lizard
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button sx={{ margin: '0 auto', width: '100%' }} variant='outlined' size='small' color='primary'>
          Send friend request
        </Button>
      </CardActions>
    </Card>
  )
}
