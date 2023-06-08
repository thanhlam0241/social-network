import axios from '../const/axios'
import config from '../const/configAxios'
import { configFormData } from '../const/configAxios'

export const getInformation = async (token: string) => {
  return await axios.get('/users/information', config(token))
}

export const updateInformation = async (token: string, data: any) => {
  return await axios.patch('/users/information', data, config(token))
}

export const updateAvatar = async (token: string, data: FormData) => {
  return await axios.post('/images/avatar', data, configFormData(token)).then((res) => {
    return res.data
  })
}

export const updateBackground = async (token: string, data: FormData) => {
  return await axios.post('/images/background', data, configFormData(token)).then((res) => {
    return res.data
  })
}

export const getAvatar = async (id: string) => {
  return await axios.get('/images/avatar/' + id).then((res) => {
    return res.data
  })
}

export const getBackground = async (id: string) => {
  return await axios.get('/images/background/' + id).then((res) => {
    return res.data
  })
}

export const getUrlBackground = (url: string) => {
  return axios.defaults.baseURL + '/' + url
}

export const getUrlAvatar = (url: string) => {
  return axios.defaults.baseURL + '/' + url
}
