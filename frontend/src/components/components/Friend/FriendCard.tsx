import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
import defaultAvatar from '~/assets/images/default_avatar.jpg'

import { AvatarUrl } from '~/service/api/const/url'

interface Props {
  id?: string
  name?: string
  avatar?: string
  isSend?: boolean
  onClick?: () => void
}

export default function MultiActionAreaCard({ name, avatar, onClick, isSend }: Props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='200'
          image={avatar ? `${AvatarUrl}{avatar}` : defaultAvatar}
          alt='green iguana'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {name || 'New User'}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {!isSend ? (
          <Button
            onClick={onClick}
            sx={{ margin: '0 auto', width: '100%' }}
            variant='outlined'
            size='small'
            color='primary'
          >
            Send friend request
          </Button>
        ) : (
          <Button sx={{ margin: '0 auto', width: '100%' }} variant='outlined' size='small' color='secondary'>
            Cancel friend request
          </Button>
        )}
      </CardActions>
    </Card>
  )
}
