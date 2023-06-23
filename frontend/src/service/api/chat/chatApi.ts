import axios from 'axios'
import config from '../const/configAxios'

import { ConversationUrl, ConversationForUser, MessageUrl } from '../const/url'

export const getConversation = async (token: string, page: number) => {
  const res = await axios.get(ConversationForUser + `${page}`, config(token))
  return res.data
}

export const getMessagesInConversation = async (token: string, conversationId: string | undefined, page: number) => {
  const res = await axios.get(ConversationUrl + conversationId + `/messages/` + page, config(token))
  return res.data
}

export const sendMessage = async (token: string, conversationId: string | undefined, message?: string) => {
  const res = await axios.post(
    MessageUrl,
    {
      conversationId: conversationId,
      text: message || ''
    },
    config(token)
  )
  return res.data
}

export const deleteMessage = async (token: string, messageId: string) => {
  const res = await axios.delete(MessageUrl + messageId, config(token))
  return res.data
}
