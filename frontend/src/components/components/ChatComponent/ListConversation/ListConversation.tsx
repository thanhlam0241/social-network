import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router'

import { Button } from '@mui/material'

import SearchBox from '../SearchConversation/SearchConversation'
import Conversation from '../Conversation/Conversation'

import { useAppSelector } from '~/hooks/storeHook'
import { useQuery } from '@tanstack/react-query'
import { getConversation } from '~/service/api/chat/chatApi'

import styles from './ListConversation.module.scss'
import classNames from 'classnames/bind'

import createSocket, { ServerToClientEvents, ClientToServerEvents } from '~/service/socket-client/socketClient'
import { Socket } from 'socket.io-client'

const cx = classNames.bind(styles)
const ListConversation = () => {
  const auth: any = useAppSelector((state) => state.auth)

  const [listConversation, setListConversation] = useState<any[]>([])

  const socket = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>()

  const {
    data: conversations,
    isLoading,
    error
  } = useQuery({
    queryKey: ['getConversation'],
    queryFn: () => getConversation(auth.token, 1),
    refetchOnWindowFocus: false
  })

  console.log(conversations)

  const navigate = useNavigate()

  const { id } = useParams()

  const [search, setSearch] = useState('')

  const [selected, setSelected] = useState(0)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (conversations) {
      setListConversation(conversations)
    }
  }, [conversations])

  useEffect(() => {
    function onConnect() {
      console.log('connected')
      setIsConnected(true)
    }
    function onDisconnect() {
      console.log('disconnected')
      setIsConnected(false)
    }
    socket.current = createSocket(auth.token)
    socket.current.on('connected', onConnect)
    socket.current.emit('setup', auth.id)

    socket.current.on('last-message', (data: any) => {
      console.log(data)
    })

    socket.current.on('disconnect', onDisconnect)

    return () => {
      socket?.current?.off('connected', onConnect)
      socket?.current?.off('disconnect', onDisconnect)
      socket?.current?.off('receive-message')
      socket?.current?.off('setup')
      socket?.current?.disconnect()
    }
  }, [auth.id])

  const clickToConversation = (id: number) => {
    setSelected(id)
    navigate(`/chat/${id}`)
  }

  return (
    <div className={!id ? cx('view-conversation') : cx('view-conversation-chat')}>
      <Button variant='outlined' onClick={() => navigate('/')}>
        GO BACK HOME
      </Button>
      <SearchBox onChange={setSearch} />
      <section className={cx('list-conversation')}>
        {isLoading && <div>Loading...</div>}
        {isLoading ||
          conversations?.length === 0 ||
          (auth.id &&
            listConversation
              //.filter((conversation:any) => conversation.name.toLocaleLowerCase().includes(search))
              .map((conversation: any) => {
                const otherParticipant =
                  conversation?.participants[0]?._id === auth.id
                    ? conversation?.participants[1]
                    : conversation?.participants[0]

                // const firstName = otherParticipant?.userInformation?.firstName
                // const lastName = otherParticipant?.userInformation?.lastName
                // let fullName = ''
                // if (!firstName || !lastName) {
                //   fullName = 'Unknown User'
                // } else {
                //   fullName = firstName + ' ' + lastName
                // }
                return (
                  <Conversation
                    key={conversation._id}
                    onClick={() => clickToConversation(conversation?._id)}
                    selected={selected === conversation?._id}
                    name={otherParticipant?.username}
                    avatar={otherParticipant?.userInformation?.avatar}
                    lastMessage={conversation?.lastMessage}
                  />
                )
              }))}
      </section>
    </div>
  )
}

export default ListConversation
