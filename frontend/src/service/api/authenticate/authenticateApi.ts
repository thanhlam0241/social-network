import axios from 'axios'
import { AccountGetNewTokenUrl, AccountLoginUrl, AccountLoginWithFaceIdUrl, AccountLogoutUrl } from '../const/url'
import config from '../const/configAxios'
import jwt_decode from 'jwt-decode'

import { AuthState } from '~/service/redux/slice/authSlice'
interface LoginAccountRequest {
  username: string
  password: string
}

class AuthenticateApi {
  async Login(data: LoginAccountRequest) {
    return await axios
      .post(AccountLoginUrl, data)
      .then((response) => {
        if (response?.status === 200) {
          const accessToken = response?.data?.accessToken
          const data: { _id: string; username: string; role: string } = jwt_decode(accessToken)
          if (data?.username && data?.role) {
            return {
              success: true,
              data: {
                auth: {
                  id: data._id,
                  token: accessToken,
                  username: data.username,
                  role: data.role,
                  loginFirstTime: true
                },
                refreshToken: response?.data?.refreshToken
              }
            }
          }
        } else {
          return {
            success: false,
            data: response
          }
        }
      })
      .catch((error) => {
        return error.response.data
      })
  }
  async LoginWithFaceId(imgBlobs: Blob[]) {
    const formdata = new FormData()
    for (let i = 0; i < imgBlobs.length; i++) {
      formdata.append('faces', imgBlobs[i], `${i + 1}.jfif`)
    }
    return await axios
      .post(AccountLoginWithFaceIdUrl, formdata)
      .then((response) => {
        if (response?.status === 200) {
          const accessToken = response?.data?.accessToken
          const data: { _id: string; username: string; role: string } = jwt_decode(accessToken)
          if (data?.username && data?.role) {
            return {
              success: true,
              data: {
                auth: {
                  id: data._id,
                  token: accessToken,
                  username: data.username,
                  role: data.role,
                  loginFirstTime: true
                },
                refreshToken: response?.data?.refreshToken
              }
            }
          }
        } else {
          return {
            success: false,
            data: response
          }
        }
      })
      .catch((error) => {
        return error.response.data
      })
  }
  async Logout(token: string | undefined, refToken: string | undefined) {
    if (!token || !refToken) {
      return {
        success: false,
        message: 'Token is null'
      }
    }
    return await axios
      .post(
        AccountLogoutUrl,
        {
          token: refToken
        },
        config(token)
      )
      .then((response) => {
        if (response?.status === 200) {
          return {
            success: true,
            message: 'Logout successfully'
          }
        } else {
          return {
            success: false,
            message: 'Logout failed'
          }
        }
      })
      .catch((error) => {
        console.log('Error: ', error)
        return {
          success: false,
          message: error
        }
      })
  }
  async GetNewToken(refreshToken: string) {
    return await axios
      .post(AccountGetNewTokenUrl, { token: refreshToken })
      .then((response) => {
        if (response?.status === 200) {
          const accessToken: string = response?.data?.accessToken
          const data: { _id: string; username: string; role: string } = jwt_decode(accessToken)
          if (data?.username && data?.role && data?._id) {
            return {
              success: true,
              data: {
                id: data._id,
                token: accessToken,
                username: data.username,
                role: data.role
              }
            }
          }
        } else {
          return {
            success: false,
            data: 'No thing'
          }
        }
      })
      .catch((error) => {
        return {
          success: false,
          data: error
        }
      })
  }
}

const authenticateApi = new AuthenticateApi()

export default authenticateApi
