import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { Button } from '@mui/material'

import SearchBox from '../SearchConversation/SearchConversation'
import Conversation from '../Conversation/Conversation'

import { useAppSelector } from '~/hooks/storeHook'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getConversation } from '~/service/api/chat/chatApi'

import styles from './ListConversation.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const listConversation = [
  {
    id: 1,
    name: 'Hello World',
    avatar: 'https://preview.redd.it/vz7cyh4crvz61.jpg?auto=webp&s=46d8e83cc9f0e6434dbac85d595b16b31c4e8e8e',
    isActive: true,
    lastMessage: 'Hello. How old are you? Can you tell me how to download video'
  },
  {
    id: 2,
    name: 'Thanh Lam',
    avatar: 'https://preview.redd.it/9gpooij6ixo71.png?auto=webp&s=268a45883db013702bbbfe8f3c8b401dbbdca12e',
    isActive: false,
    lastMessage: 'Thanks'
  },
  {
    id: 3,
    name: 'Raiden Shogun',
    avatar: 'https://i.redd.it/l6odlw7t1ol71.jpg',
    isActive: false,
    lastMessage: 'I am the Raiden Shogun, Ei. Give me a sword'
  },
  {
    id: 4,
    name: 'Kokomi',
    avatar: 'https://avatars.githubusercontent.com/u/102026640?v=4',
    isActive: false,
    lastMessage: 'I am Kokomi'
  },
  {
    id: 5,
    name: 'Kujou Sara',
    avatar:
      'https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/kujou_sara/image.png?strip=all&quality=100&w=160',
    isActive: true,
    lastMessage: 'I am Kujou Sara'
  },
  {
    id: 6,
    name: 'Kiana',
    avatar: 'https://i.pinimg.com/736x/af/8e/af/af8eaf0a29fb3df3919b7c6834e459a9.jpg',
    isActive: false,
    lastMessage: 'I am Kiana'
  },
  {
    id: 7,
    name: 'Elysia',
    avatar:
      'https://cdn-img.thethao247.vn/origin_768x0/storage/files/haibui/2022/11/08/ngam-man-cosplay-elysia-trong-honkai-impact-cuc-ky-man-nhan-the-nay-bao-sao-beryl-khong-chon-ngay-lam-skin-cktg-215201.jpg',
    isActive: true,
    lastMessage: 'I am Elysia'
  },
  {
    id: 8,
    name: 'Raiden Mei',
    avatar: 'https://avatarfiles.alphacoders.com/292/thumb-292954.png',
    isActive: false,
    lastMessage: 'I am Raiden Mei'
  },
  {
    id: 9,
    name: 'Durandal',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgfKARxLkS_UOhkDp7KhGOlI8AQdHJaFgv0A&usqp=CAU',
    isActive: false,
    lastMessage: 'I am Durandal'
  },
  {
    id: 10,
    name: 'Kallen',
    avatar: 'https://i1.sndcdn.com/avatars-zcqW3A33jwizb9My-mysP6w-t500x500.jpg',
    isActive: false,
    lastMessage: 'I am Kallen'
  },
  {
    id: 11,
    name: 'Himeko',
    avatar: 'https://ih1.redbubble.net/image.2610516036.7337/mwo,x1000,ipad_2_snap-pad,750x1000,f8f8f8.jpg',
    isActive: false,
    lastMessage: 'I am Himeko'
  },
  {
    id: 12,
    name: 'Yae Sakura',
    avatar: 'https://cdn.oneesports.gg/cdn-data/2022/02/HonkaiImpact3rd_YaeSakuraWallpaper-1024x576.webp',
    isActive: false,
    lastMessage: 'I am Yae Sakura'
  }
]

const ListConversation = () => {
  const auth: any = useAppSelector((state) => state.auth)

  const {
    data: conversations,
    isLoading,
    error
  } = useQuery({
    queryKey: ['getConversation'],
    queryFn: () => getConversation(auth.token, 1),
    refetchOnWindowFocus: false
  })

  const navigate = useNavigate()

  const { id } = useParams()

  const [search, setSearch] = useState('')

  const [selected, setSelected] = useState(0)

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
        {/* {listConversation
          .filter((conversation) => conversation.name.toLocaleLowerCase().includes(search))
          .map((conversation, index) => (
            <Conversation
              idx={conversation.id}
              onClick={() => clickToConversation(conversation.id)}
              selected={selected === conversation.id}
              key={conversation?.name + index}
              name={conversation.name}
              avatar={conversation.avatar}
              isActive={conversation.isActive}
              lastMessage={conversation.lastMessage}
            />
          ))} */}
        {isLoading && <div>Loading...</div>}
        {isLoading ||
          conversations?.length === 0 ||
          conversations?.map((conversation: any) => {
            const otherParticipantIdx = conversation.participants.find(
              (participant: any) => participant._id !== auth.id
            )
            const otherParticipant = conversation.participants[otherParticipantIdx]
            const firstName = otherParticipant?.userInformation.firstName
            const lastName = otherParticipant?.userInformation.lastName
            let fullName = ''
            if (!firstName || !lastName) {
              fullName = 'Unknown User'
            } else {
              fullName = firstName + ' ' + lastName
            }
            return (
              <Conversation
                key={conversation._id}
                onClick={() => clickToConversation(conversation?._id)}
                selected={selected === conversation?._id}
                name={fullName}
                avatar={otherParticipant?.avatar}
              />
            )
          })}
      </section>
    </div>
  )
}

export default ListConversation
