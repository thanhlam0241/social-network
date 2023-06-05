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
  // const { auth } = useAuth()
  // const dispatch = useAppDispatch()
  // const auth = useAppSelector((state) => state.auth)
  // console.log(auth)
  // const { data, isLoading } = useQuery({
  //   queryKey: ['check-auth'],
  //   queryFn: async () => {
  //     if (auth?.token) {
  //       return auth
  //     }
  //     const atk = Cookies.get('atk')
  //     if (atk) {
  //       const data: { _id: string; username: string; role: string } = jwt_decode(atk)
  //       if (data?.username && data?.role && data?._id) {
  //         return {
  //           id: data._id,
  //           username: data.username,
  //           role: data.role,
  //           token: atk
  //         }
  //       }
  //     } else {
  //       const rtk = Cookies.get('rtk')
  //       if (rtk) {
  //         const newAccessTokenResponse = await authenticateApi.GetNewToken(rtk)
  //         if (newAccessTokenResponse?.success) {
  //           Cookies.set('atk', newAccessTokenResponse.data.token)
  //           return {
  //             id: newAccessTokenResponse.data._id,
  //             username: newAccessTokenResponse.data.username,
  //             role: newAccessTokenResponse.data.role,
  //             token: newAccessTokenResponse.data.token
  //           }
  //         }
  //       }
  //     }
  //     return auth
  //   }
  // })

  // const navigate = useNavigate()

  // React.useEffect(() => {
  //   if (!auth?.token) {
  //     if (data?.token) {
  //       Cookies.set('atk', data.token)
  //       dispatch(setAuth(data))
  //     } else {
  //       navigate('/authenticate/login')
  //     }
  //   }
  // }, [])
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
