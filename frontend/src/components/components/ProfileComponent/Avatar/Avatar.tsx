import styles from './Avatar.module.scss'
import { useState } from 'react'

import default_avatar from '~/assets/images/default_avatar.jpg'
import CreateIcon from '@mui/icons-material/Create'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

import { baseUrl } from '~/service/api/const/url'

import { Snackbar, Alert } from '@mui/material'

import { getAvatar, getUrlAvatar, updateAvatar } from '~/service/api/information/informationApi'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '~/hooks/storeHook'

import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface AvatarProps {
  id: string
}

function Avatar({ id }: AvatarProps) {
  const auth = useAppSelector((state) => state.auth)
  const queryClient = useQueryClient()

  const [success, setSuccess] = useState(false)

  const [expandPeople, setExpandPeople] = useState(false)

  const { data: avatar } = useQuery(['avatar' + (id || auth.id)], async () => getAvatar(id || auth.id), {
    enabled: !!id,
    refetchOnWindowFocus: false
  })

  const handleFileInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files ? event.target?.files[0] : null
    if (file) {
      const formdata = new FormData()
      formdata.append('image', file)
      await updateAvatar(auth?.token, formdata)
        .then(() => {
          setSuccess(true)
        })
        .catch((err) => {
          console.log(err)
          alert(err)
        })
        .finally(() => {
          queryClient.invalidateQueries(['avatar' + auth.id])
        })
    }
  }

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setSuccess(false)
  }

  const handleExpandPeople = () => {
    setExpandPeople(!expandPeople)
  }

  return (
    <section className={cx('avatar-information-container')}>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
          Update avatar successfully
        </Alert>
      </Snackbar>
      <div className={cx('avar_information')}>
        <div className={cx('avatar-container')}>
          <img className={cx('avatar')} src={avatar?.url ? `${baseUrl}/${avatar?.url}` : default_avatar} alt='Avatar' />
          {id === auth.id && (
            <div className={cx('change_avatar')}>
              <label className={cx('input-file')} htmlFor='upload-photo-avatar'>
                <input
                  style={{ display: 'none' }}
                  id='upload-photo-avatar'
                  name='upload-photo-avatar'
                  type='file'
                  multiple={false}
                  onChange={handleFileInput}
                />
                <CameraAltIcon />
              </label>
            </div>
          )}
        </div>
        <div className={cx('information')}>
          <div className={cx('profile_infor')}>
            <h1 className={cx('profile-name')}>{auth?.username}</h1>
            <div className={cx('profile_number_friends')}>14 friends</div>
            <div className={cx('profile-friends-list')}>
              <img className={cx('friend-avatar')} src={default_avatar} alt='Avatar' />
              <img className={cx('friend-avatar')} src={default_avatar} alt='Avatar' />
              <img className={cx('friend-avatar')} src={default_avatar} alt='Avatar' />
              <img className={cx('friend-avatar')} src={default_avatar} alt='Avatar' />
              <img className={cx('friend-avatar')} src={default_avatar} alt='Avatar' />
            </div>
          </div>
          <div className={cx('information_more')}>
            {id === auth.id ? (
              <button className={cx('profile-button')}>
                <CreateIcon />
                <span>Edit profile</span>
              </button>
            ) : (
              <button className={cx('profile-button')}>
                <PersonAddIcon />
                <span>Add friend</span>
              </button>
            )}
            <button onClick={handleExpandPeople} className={cx('profile-button')}>
              {expandPeople ? <ExpandMoreIcon /> : <ExpandLessIcon />}{' '}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Avatar
