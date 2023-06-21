import axios from '../const/axios'
import config from '../const/configAxios'
import {
  MyAllFriendUrl,
  MyFriendRequestUrl,
  PeopleFriendRequestUrl,
  PeopleRecommendUrl,
  SendFriendRequestUrl,
  AcceptFriendRequestUrl,
  RejectFriendRequestUrl,
  CancelFriendRequestUrl
} from '../const/url'

export const getPeopleRecommend = async (token: string, page: number) => {
  const res = await axios.get(`${PeopleRecommendUrl}/${page}`, config(token))
  return res.data
}

export const getMyAllFriend = async (token: string, page: number) => {
  const res = await axios.get(MyAllFriendUrl + `/${page}`, config(token))
  return res.data
}

export const getMyFriendRequest = async (token: string, page: number) => {
  const res = await axios.get(MyFriendRequestUrl + `/${page}`, config(token))
  return res.data
}

export const getPeopleFriendRequest = async (token: string, page: number) => {
  const res = await axios.get(PeopleFriendRequestUrl + `/${page}`, config(token))
  return res.data
}

export const sendFriendRequest = async (token: string, data: { receiver: string; text: string }) => {
  const res = await axios.post(SendFriendRequestUrl, data, config(token))
  return res.data
}
export const acceptFriendRequest = async (token: string, sender: string) => {
  const res = await axios.post(AcceptFriendRequestUrl, { sender }, config(token))
  return res.data
}
export const cancelFriendRequest = async (token: string, sender: string) => {
  const res = await axios.post(CancelFriendRequestUrl, { sender }, config(token))
  return res.data
}
export const rejectFriendRequest = async (token: string, receiver: string) => {
  const res = await axios.post(RejectFriendRequestUrl, { receiver }, config(token))
  return res.data
}
