import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'

interface FriendRequestProps {
  type: 'send' | 'receive'
  name: string
  avatar: string
  onClick?: () => void
  title: string
}

export default function FriendRequest({ type, name, avatar, title }: FriendRequestProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component='img' height='200' image={avatar} alt='green iguana' />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant='outlined' sx={{ margin: '0 auto', width: '100%' }} size='small' color='primary'>
          {type === 'send' ? 'Cancel' : 'Accept'}
        </Button>
      </CardActions>
    </Card>
  )
}
