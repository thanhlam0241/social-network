import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'
import authenticateApi from '../../api/authenticate/authenticateApi'

export interface AuthState {
  id: string
  username: string
  token: string
  role: string
  loginFirstTime?: boolean
}

const initialState: AuthState = {
  id: '',
  username: '',
  token: '',
  role: '',
  loginFirstTime: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: () => {
    const atk = Cookies.get('atk')
    const rtk = Cookies.get('rtk')
    if (atk) {
      const data: { _id: string; username: string; role: string } = jwt_decode(atk)
      if (data?.username && data?.role && data?._id) {
        return {
          id: data._id,
          username: data.username,
          role: data.role,
          token: atk,
          loginFirstTime: false
        }
      }
    } else if (rtk) {
      if (rtk) {
        authenticateApi
          .GetNewToken(rtk)
          .then((response) => {
            if (response && response?.success) {
              const data: { _id: string; username: string; role: string } = jwt_decode(response.data.token)
              if (data?.username && data?.role && data?._id) {
                return {
                  id: data._id,
                  username: data.username,
                  role: data.role,
                  token: response.data.token,
                  loginFirstTime: false
                }
              }
            }
          })
          .catch((error) => {
            return initialState
          })
      }
    }
    return initialState
  },
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.id = action.payload.id
      state.username = action.payload.username
      state.token = action.payload.token
      ;(state.role = action.payload.role), (state.loginFirstTime = action.payload.loginFirstTime)
    }
  }
})

export const { setAuth } = authSlice.actions

export default authSlice.reducer
