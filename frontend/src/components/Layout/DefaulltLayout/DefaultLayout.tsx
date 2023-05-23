import React from 'react'
import Header from '../Header/header'
import Sidebar from '../Sidebar/sidebar'
import styles from './DefaultLayout.module.scss'
import className from 'classnames/bind'
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '~/hooks/useAuth'
const cx = className.bind(styles)

function DefaultLayout() {
  const { auth } = useAuth()
  const navigate = useNavigate()
  React.useEffect(() => {
    if (!auth?.token) {
      navigate('/authenticate/login')
    }
  }, [auth, navigate])
  return (
    <div className={cx('main-container')}>
      <Header />
      <div className={cx('div_body')}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default DefaultLayout
