import axios from 'axios'
import { AccountLoginUrl, AccountLogoutUrl, AccountGetNewTokenUrl } from '../const/url'
import config from '../const/configAxios'
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'

interface LoginAccountRequest {
  username: string
  password: string
}

interface IAuth {
  username: string | undefined | null
  role: string | undefined | null
  token: string | undefined | null
}

class AuthenticateApi {
  Auth: IAuth
  constructor() {
    this.Auth = {
      username: '',
      token: '',
      role: ''
    }
    const atk = Cookies.get('atk')
    if (atk) {
      const data: { username: string; role: string } = jwt_decode(atk)
      if (data?.username && data?.role) {
        this.Auth = {
          username: data.username,
          role: data.role,
          token: atk
        }
      }
    } else {
      const rtk = Cookies.get('rtk')
      if (rtk) {
        axios
          .post(AccountGetNewTokenUrl, { token: rtk })
          .then((response) => {
            if (response.status === 200) {
              const accessToken: string = response?.data?.accessToken
              const data: { username: string; role: string } = jwt_decode(accessToken)
              if (data?.username && data?.role) {
                this.Auth = {
                  username: data.username,
                  role: data.role,
                  token: accessToken
                }
              }
            }
          })
          .catch((err) => {
            console.log('Error when get access token by refresh token', err)
            this.Auth = {
              username: '',
              token: '',
              role: ''
            }
          })
      } else {
        this.Auth = {
          username: '',
          token: '',
          role: ''
        }
      }
    }
  }
  isLogin() {
    return this.Auth?.username && this.Auth?.token && this.Auth?.role
  }
  getUsername() {
    return this.Auth?.username
  }
  getRole() {
    return this.Auth?.role
  }
  getAccessToken() {
    return this.Auth?.token
  }
  SetAccessToken(token: string) {
    const data: { username: string; role: string } = jwt_decode(token)
    if (data?.username && data?.role) {
      this.Auth = {
        username: data.username,
        role: data.role,
        token: token
      }
    }
  }
  async Login(data: LoginAccountRequest) {
    return await axios
      .post(AccountLoginUrl, data)
      .then((response) => {
        if (response?.status === 200) {
          const accessToken = response?.data?.accessToken
          const data: { username: string; role: string } = jwt_decode(accessToken)
          if (data?.username && data?.role) {
            this.Auth = {
              username: data.username,
              role: data.role,
              token: accessToken
            }
            return {
              success: true,
              data: {
                token: accessToken,
                refreshToken: response?.data?.refreshToken,
                username: data.username,
                role: data.role
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
        return error
      })
  }
  async Logout(token: string) {
    return await axios.post(AccountLogoutUrl, {}, config(token)).then((response) => {
      if (response?.data?.success) {
        this.Auth = {
          username: '',
          token: '',
          role: ''
        }
        return response.data
      } else {
        return response
      }
    })
  }
  async GetNewToken(refreshToken: string) {
    return await axios
      .post(AccountGetNewTokenUrl, config(refreshToken))
      .then((response) => {
        if (response?.status === 200) {
          const accessToken: string = response?.data?.accessToken
          const data: { username: string; role: string } = jwt_decode(accessToken)
          if (data?.username && data?.role) {
            return {
              success: true,
              data: {
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
        return error
      })
  }
}

const authenticateApi = new AuthenticateApi()

export default authenticateApi
