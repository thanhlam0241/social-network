/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import ButtonPopper from '~/components/components/ButtonPopper/ButtonPopper'

import className from 'classnames/bind'
import styles from './header.module.scss'
import Avatar from '@mui/material/Avatar'

import { baseUrl } from '~/service/api/const/url'

import Person2Icon from '@mui/icons-material/Person2'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import reactIcon from '~/assets/icons/react2.png'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'

import { useAppSelector, useAppDispatch } from '~/hooks/storeHook'
import { setAuth } from '~/service/redux/slice/authSlice'
import authenticateApi from '~/service/api/authenticate/authenticateApi'
import Cookies from 'js-cookie'

import { getAvatar, getUrlAvatar } from '~/service/api/information/informationApi'

import { useQuery } from '@tanstack/react-query'

import defaultAvatar from '~/assets/images/default_avatar.png'

const cx = className.bind(styles)

function Header() {
  const dispatch = useAppDispatch()

  const auth: any = useAppSelector((state) => state.auth)

  //console.log(auth)

  const searchBar = useRef<HTMLInputElement>(null)

  const [openPopper, setOpenPopper] = useState(false)

  const popperRef = useRef<HTMLDivElement>(null)

  const avatarRef = useRef<HTMLDivElement>(null)

  const { data: avatar } = useQuery(['avatar' + auth.id], async () => getAvatar(auth.id), {
    enabled: !!auth.id,
    refetchOnWindowFocus: false
  })

  const navigate = useNavigate()

  const handleClickAvatar = () => {
    setOpenPopper(!openPopper)
  }

  const [search, setSearch] = useState('')
  const handleSearch = (e: any) => {
    setSearch(e.target.value)
  }
  const clearSearch = () => {
    setSearch('')
  }
  const handleLogout = async () => {
    if (auth?.token) {
      const rtk = Cookies.get('rtk')
      const response = await authenticateApi.Logout(auth.token, rtk)
      if (response?.success) {
        Cookies.remove('atk')
        Cookies.remove('rtk')
        dispatch(setAuth({ id: '', token: '', username: '', role: '' }))
        navigate('/authenticate/login')
      }
    }
    Cookies.remove('atk')
    Cookies.remove('rtk')
    dispatch(setAuth({ id: '', token: '', username: '', role: '' }))
    navigate('/authenticate/login')
  }

  useEffect(() => {
    let handleClickOutside: any
    if (auth.id) {
      handleClickOutside = (event: MouseEvent) => {
        if (!popperRef.current?.contains(event.target as Node) && !avatarRef.current?.contains(event.target as Node)) {
          setOpenPopper(false)
        }
        if (!searchBar.current?.contains(event.target as Node)) {
          setSearch('')
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [auth.id])

  return (
    <div className={cx('header-main')}>
      <div>
        <img style={{ width: 40 }} src={reactIcon} alt='hello' />
      </div>
      <div className={cx('search')}>
        <input
          className={cx('search-input')}
          ref={searchBar}
          value={search}
          onChange={handleSearch}
          placeholder='Tìm kiếm'
          spellCheck={false}
        />
        <div className={cx('clear')}>
          {search.length > 0 && (
            <button style={{ backgroundColor: 'transparent' }} onClick={clearSearch}>
              <ClearIcon />
            </button>
          )}
        </div>
        <button className={cx('search-btn')}>
          <SearchIcon />
        </button>
      </div>
      <div ref={avatarRef} onMouseDown={handleClickAvatar} className={cx('div_avatar')}>
        <Avatar
          sx={{
            '&:hover': {
              cursor: 'pointer'
            }
          }}
          src={avatar?.url ? `${baseUrl}/${avatar.url}` : defaultAvatar}
          alt='Error'
        />
        {auth.token && openPopper && (
          <div ref={popperRef} className={cx('popper-avatar')}>
            <ButtonPopper onMouseDown={() => navigate('/profile')} text='Profile' icon={<Person2Icon />} />
            <ButtonPopper
              onMouseDown={() => navigate('/settings?tab=account')}
              text='Setting'
              icon={<SettingsIcon />}
            />
            <ButtonPopper onMouseDown={() => handleLogout()} text='Logout' icon={<LogoutIcon />} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
