import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'

import defaultAvatar from '~/assets/images/default_avatar.png'

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
          component='img'
          image={image ? `http://localhost:3500/avatar/${image}` : defaultAvatar}
          alt='green iguana'
        />
        <CardContent>
          <Typography
            gutterBottom
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
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
        <Button
          sx={{
            display: 'block',
            maxWidth: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
          variant='text'
          color='primary'
        >
          Remove friend
        </Button>
      </CardActions>
    </Card>
  )
}
