import { useState } from 'react'
import Header from '../Header/header'
import Sidebar from '../Sidebar/sidebar'
import styles from './DefaultLayout.module.scss'
import className from 'classnames/bind'
import { Outlet, useLocation } from 'react-router-dom'

const cx = className.bind(styles)

function DefaultLayout() {
  const location = useLocation()
  const [open, setOpen] = useState(() => {
    if (location.pathname === '/') return true
    return false
  })
  return (
    <div className={cx('main-container')}>
      <Header />
      <div className={cx('div_body')}>
        <Sidebar open={open} location={location} setOpen={setOpen} />
        <div className={cx('div_content')}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
