import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'

import defaultAvatar from '~/assets/images/default_avatar.png'
import { AvatarUrl } from '~/service/api/const/url'

interface Props {
  name?: string
  image?: string
  viewProfile?: () => void
  removeFriend?: () => void
}

export default function MultiActionAreaCard({ name, image, viewProfile, removeFriend }: Props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          sx={{ objectFit: 'cover', objectPosition: 'center', height: 200 }}
          height='200'
          component='img'
          image={image ? `${AvatarUrl}${image}` : defaultAvatar}
          //image={image ? `https://i0.wp.com/gamingonphone.com/wp-content/uploads/2021/03/image-1.jpg` : defaultAvatar}
          alt='green iguana'
        />
        <CardContent>
          <Typography
            gutterBottom
            // variant='h5'
            sx={{
              fontSize: '1.5em',
              display: 'inline-block',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%'
            }}
            component='div'
          >
            {name || 'New User'}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant='outlined' sx={{ margin: '0 auto', width: '100%' }} size='small' color='primary'>
          Remove friend
        </Button>
      </CardActions>
    </Card>
  )
}
