import styles from './HeaderFriend.module.scss'
import classNames from 'classnames/bind'

import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PeopleIcon from '@mui/icons-material/People'
import { useState } from 'react'

import { NavLink, useLocation } from 'react-router-dom'

const cx = classNames.bind(styles)

function Header() {
  const location = useLocation()
  const [value, setValue] = useState(() => {
    if (location.pathname === '/friends/recommend') return 0
    if (location.pathname === '/friends/request-receive') return 1
    if (location.pathname === '/friends/request-send') return 2
    if (location.pathname === '/friends/all') return 3
    return 0
  })
  const handleChange = (v: number) => {
    setValue(v)
  }
  return (
    <header className={cx('header-friend-page')}>
      <h1 className={cx('header-page-title')}>Friend</h1>
      <div className={cx('header-list')}>
        <NavLink
          onClick={() => handleChange(0)}
          to='/friends/recommend'
          className={
            value === 0
              ? cx('header-list-item', 'header-list-item-active')
              : cx('header-list-item', 'header-list-item-no-active')
          }
        >
          <PersonAddIcon />
          <span className={cx('friend-header-nav')}>Recommend</span>
        </NavLink>
        <NavLink
          to='/friends/request-receive'
          onClick={() => handleChange(1)}
          className={
            value === 1
              ? cx('header-list-item', 'header-list-item-active')
              : cx('header-list-item', 'header-list-item-no-active')
          }
        >
          <PersonAddIcon />
          <span className={cx('friend-header-nav')}>Friend requests to you</span>
        </NavLink>
        <NavLink
          to='/friends/request-send'
          onClick={() => handleChange(2)}
          className={
            value === 2
              ? cx('header-list-item', 'header-list-item-active')
              : cx('header-list-item', 'header-list-item-no-active')
          }
        >
          <PersonAddIcon />
          <span className={cx('friend-header-nav')}>Friend requests sent</span>
        </NavLink>
        <NavLink
          to='/friends/all'
          onClick={() => handleChange(3)}
          className={
            value === 3
              ? cx('header-list-item', 'header-list-item-active')
              : cx('header-list-item', 'header-list-item-no-active')
          }
        >
          <PeopleIcon />
          <span className={cx('friend-header-nav')}>All friends</span>
        </NavLink>
      </div>
    </header>
  )
}

export default Header
