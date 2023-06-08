import React from 'react'
import Header from '../Header/header'
import Sidebar from '../Sidebar/sidebar'
import styles from './DefaultLayout.module.scss'
import className from 'classnames/bind'
import { Outlet, useNavigate } from 'react-router-dom'

import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'

import authenticateApi from '~/service/api/authenticate/authenticateApi'
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { useAppSelector, useAppDispatch } from '~/hooks/storeHook'
import { setAuth } from '~/service/redux/slice/authSlice'

const cx = className.bind(styles)

function DefaultLayout() {
  return (
    <div className={cx('main-container')}>
      <Header />
      <div className={cx('div_body')}>
        <Sidebar />
        <div className={cx('div_content')}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
