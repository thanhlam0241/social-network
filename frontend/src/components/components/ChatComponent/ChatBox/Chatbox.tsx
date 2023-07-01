import { useRef, useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'

import Message from '../Message/Message'
import MessageBox from '../MessageBox/MessageBox'
import HeaderChat from '../HeaderChat/HeaderChat'

import { useAppSelector } from '~/hooks/storeHook'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getMessagesInConversation, sendMessage, deleteMessage, getConversationById } from '~/service/api/chat/chatApi'

//socket
import createSocket, { ServerToClientEvents, ClientToServerEvents } from '~/service/socket-client/socketClient'
import { Socket } from 'socket.io-client'

import styles from './Chatbox.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Message {
  sender: string
  text: string
}

const Chatbox = () => {
  const auth = useAppSelector((state) => state.auth)
  const { id } = useParams()
  const socket = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>()
  const divRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  const [isConnected, setIsConnected] = useState(false)
  const [chatMessages, setChatMessages] = useState<Message[]>([])

  const {
    data: messages,
    isLoading: loadingMessages,
    error: errorMessages
  } = useQuery(['messages', id], () => getMessagesInConversation(auth?.token, id, 1), {
    enabled: !!id,
    refetchOnWindowFocus: false
  })

  const {
    data: conversationInfor,
    isLoading: loadingConversation,
    error: errorConversation
  } = useQuery({
    queryKey: ['conversation', id],
    queryFn: () => getConversationById(auth?.token, id!),
    enabled: !!id,
    refetchOnWindowFocus: false
  })

  console.log('Is socket connected ? ', socket.current?.connected)

  useEffect(() => {
    if (messages) {
      setChatMessages(messages)
    }
  }, [messages])

  useEffect(() => {
    console.log('re-render')
    function onConnect() {
      console.log('connected')
      setIsConnected(true)
    }
    function onDisconnect() {
      console.log('disconnected')
      setIsConnected(false)
    }
    socket.current = createSocket()
    socket.current.connect()
    socket.current.on('connected', onConnect)
    //socket.current.emit('setup', { userId: auth.id })
    socket.current.emit('join-room', id)

    socket.current.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`)
    })

    socket.current.on('receive-message', (message: any) => {
      console.log('Message', message)
      setChatMessages((previous) => [...previous, message])
    })
    socket.current.on('disconnect', onDisconnect)

    return () => {
      if (socket?.current?.io._readyState) {
        socket?.current?.off('connected', onConnect)
        socket?.current?.off('disconnect', onDisconnect)
        socket?.current?.off('receive-message')
        socket?.current?.off('join-room')
        socket?.current?.disconnect()
      }
    }
  }, [auth.id, id])

  useEffect(() => {
    //console.log('re-render')
    if (endRef?.current) {
      endRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      })
    }
  }, [endRef, chatMessages])

  // useEffect(() => {
  //   if (socket.current?.connected) console.log('connected')
  //   else socket.current?.connect()
  //   socket.current?.emit('join-room', id)
  // }, [id, socket.current?.connected])

  const handleSendMessage = useCallback(
    (message: string) => {
      console.log(socket?.current)
      if (socket?.current?.connected) console.log('connected')
      else socket.current?.connect()
      if (socket.current) {
        socket.current.emit('send-message', {
          room: id,
          text: message,
          sender: auth.id
        })
      }
    },
    [id, auth.id]
  )

  return (
    <div className={cx('chat-container')}>
      {conversationInfor && <HeaderChat infor={conversationInfor.participants} />}
      <div ref={divRef} className={cx('messages-container')}>
        {conversationInfor &&
          chatMessages.length > 0 &&
          auth.id &&
          chatMessages.map((message, index) => {
            return (
              <Message
                key={index}
                isMine={message.sender === auth.id}
                text={message.text}
                avatar={
                  conversationInfor.participants.find((participant: any) => participant._id === message.sender)
                    ?.userInformation?.avatar
                }
              />
            )
          })}
        <div ref={endRef} style={{ height: '1px', backgroundColor: 'transparent' }}></div>
      </div>
      <MessageBox sendMessage={handleSendMessage} conversationId={id} />
    </div>
  )
}

export default Chatbox
