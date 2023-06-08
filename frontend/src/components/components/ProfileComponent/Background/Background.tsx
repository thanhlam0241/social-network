import styles from './Background.module.scss'
import { useState } from 'react'
import CameraAltIcon from '@mui/icons-material/CameraAlt'

import { Snackbar, Alert } from '@mui/material'

import { getBackground, getUrlBackground, updateBackground } from '~/service/api/information/informationApi'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { useAppSelector } from '~/hooks/storeHook'

import defaultBackground from '~/assets/images/default_background.jpg'

import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function Background() {
  const auth = useAppSelector((state) => state.auth)

  const queryClient = useQueryClient()

  const [success, setSuccess] = useState(false)

  const { data: background } = useQuery(['background' + auth.id], async () => getBackground(auth.id))

  const handleFileInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files ? event.target?.files[0] : null
    if (file) {
      const formdata = new FormData()
      formdata.append('image', file)
      await updateBackground(auth.token, formdata)
        .then(() => {
          setSuccess(true)
        })
        .catch((err) => {
          console.log(err)
          alert(err)
        })
        .finally(() => {
          queryClient.invalidateQueries(['background' + auth.id])
        })
    }
  }

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setSuccess(false)
  }

  return (
    <section className={cx('background_container')}>
      <section className={cx('image_container_background')}>
        <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
            Update background successfully
          </Alert>
        </Snackbar>
        <img
          loading='lazy'
          className={cx('background_image')}
          src={background?.url ? getUrlBackground(background?.url) : defaultBackground}
          alt='background'
        />
        <div className={cx('button_change_background')}>
          <label className={cx('input-file')} htmlFor='upload-photo'>
            <input
              style={{ display: 'none' }}
              id='upload-photo'
              name='upload-photo'
              type='file'
              multiple={false}
              onChange={handleFileInput}
            />
            <CameraAltIcon />
            Change background
          </label>
        </div>
      </section>
    </section>
  )
}

export default Background
