import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'

import defaultAvatar from '~/assets/images/default_avatar.png'

interface FriendRequestProps {
  type: 'send' | 'receive'
  name: string
  avatar: string
  onAccept?: any
  onReject?: any
  title: string
  onCancel?: any
}

export default function FriendRequest({ type, name, avatar, title, onAccept, onReject, onCancel }: FriendRequestProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='200'
          image={avatar ? `http://localhost:3500/avatar/${avatar}` : defaultAvatar}
          alt='green iguana'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {name || 'Unknown user'}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {type === 'receive' && (
          <Button
            onClick={onReject}
            variant='outlined'
            sx={{ margin: '0 auto', width: '100%' }}
            size='small'
            color='primary'
          >
            Reject
          </Button>
        )}
        {type === 'receive' ? (
          <Button
            onClick={onAccept}
            variant='outlined'
            sx={{ margin: '0 auto', width: '100%' }}
            size='small'
            color='primary'
          >
            Accept
          </Button>
        ) : (
          <Button
            onClick={onCancel}
            variant='outlined'
            sx={{ margin: '0 auto', width: '100%' }}
            size='small'
            color='primary'
          >
            Cancel
          </Button>
        )}
      </CardActions>
    </Card>
  )
}
