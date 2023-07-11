import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginResponse } from '../type/authenticateType'
import jwt_decode from 'jwt-decode'
import type { RootState } from '../store'

import { baseUrl } from '../../api/const/url'

export const api = createApi({
  // Tương tự tên Slice khi tạo Slice thông thường
  reducerPath: 'api',

  // Cấu hình chung cho tất cả request
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Lấy ra token từ store nếu có
      const token = (getState() as RootState).auth.token

      // Nếu có token thì gán vào headers
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    }
  }),

  // Các endpoints (lệnh gọi request)
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `login`,
        method: 'POST',
        body: credentials
      }),
      transformResponse: (response: LoginResponse) => {
        const accessToken = response?.accessToken
        const data: { _id: string; username: string; role: string } = jwt_decode(accessToken)
        return {
          user: {
            id: data._id,
            username: data.username,
            role: data.role,
            token: accessToken
          },
          refreshToken: response?.refreshToken
        }
      }
    }),
    getAvatar: builder.query({
      query: (id: string) => ({
        url: `images/avatar/${id}`,
        method: 'GET'
      }),
      transformResponse: (response: { url: string; status: number }) => {
        return {
          ...response,
          url: baseUrl + response.url
        }
      }
    })
  })
})

export const { useLoginMutation, useGetAvatarQuery, usePrefetch } = api
