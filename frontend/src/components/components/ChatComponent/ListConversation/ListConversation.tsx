import { useState } from 'react'

import SearchBox from '../SearchConversation/SearchConversation'
import Conversation from '../Conversation/Conversation'

import styles from './ListConversation.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const listConversation = [
  {
    name: 'Hello World',
    avatar: 'https://preview.redd.it/vz7cyh4crvz61.jpg?auto=webp&s=46d8e83cc9f0e6434dbac85d595b16b31c4e8e8e',
    isActive: true,
    lastMessage: 'Hello. How old are you? Can you tell me how to download video'
  },
  {
    name: 'Thanh Lam',
    avatar: 'https://lh3.googleusercontent.com/ogw/AOLn63GIHa9tjuXqbWnBLozu-DG8i2tCoLTKkhfrtCZ83A=s32-c-mo',
    isActive: false,
    lastMessage: 'Thanks'
  },
  {
    name: 'Raiden Shogun',
    avatar: 'https://i.redd.it/l6odlw7t1ol71.jpg',
    isActive: false,
    lastMessage: 'I am the Raiden Shogun, Ei. Give me a sword'
  },
  {
    name: 'Kokomi',
    avatar: 'https://avatars.githubusercontent.com/u/102026640?v=4',
    isActive: false,
    lastMessage: 'I am Kokomi'
  },
  {
    name: 'Kujou Sara',
    avatar:
      'https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/kujou_sara/image.png?strip=all&quality=100&w=160',
    isActive: true,
    lastMessage: 'I am Kujou Sara'
  },
  {
    name: 'Kiana',
    avatar: 'https://i.pinimg.com/736x/af/8e/af/af8eaf0a29fb3df3919b7c6834e459a9.jpg',
    isActive: false,
    lastMessage: 'I am Kiana'
  },
  {
    name: 'Elysia',
    avatar:
      'https://cdn-img.thethao247.vn/origin_768x0/storage/files/haibui/2022/11/08/ngam-man-cosplay-elysia-trong-honkai-impact-cuc-ky-man-nhan-the-nay-bao-sao-beryl-khong-chon-ngay-lam-skin-cktg-215201.jpg',
    isActive: true,
    lastMessage: 'I am Elysia'
  },
  {
    name: 'Raiden Mei',
    avatar: 'https://avatarfiles.alphacoders.com/292/thumb-292954.png',
    isActive: false,
    lastMessage: 'I am Raiden Mei'
  },
  {
    name: 'Durandal',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgfKARxLkS_UOhkDp7KhGOlI8AQdHJaFgv0A&usqp=CAU',
    isActive: false,
    lastMessage: 'I am Durandal'
  },
  {
    name: 'Kallen',
    avatar: 'https://i1.sndcdn.com/avatars-zcqW3A33jwizb9My-mysP6w-t500x500.jpg',
    isActive: false,
    lastMessage: 'I am Kallen'
  },
  {
    name: 'Himeko',
    avatar: 'https://ih1.redbubble.net/image.2610516036.7337/mwo,x1000,ipad_2_snap-pad,750x1000,f8f8f8.jpg',
    isActive: false,
    lastMessage: 'I am Himeko'
  },
  {
    name: 'Yae Sakura',
    avatar: 'https://cdn.oneesports.gg/cdn-data/2022/02/HonkaiImpact3rd_YaeSakuraWallpaper-1024x576.webp',
    isActive: false,
    lastMessage: 'I am Yae Sakura'
  }
]

const ListConversation = () => {
  const [search, setSearch] = useState('')
  return (
    <div className={cx('view-conversation')}>
      <SearchBox onChange={setSearch} />
      <section className={cx('list-conversation')}>
        {listConversation
          .filter((conversation) => conversation.name.toLocaleLowerCase().includes(search))
          .map((conversation, index) => (
            <Conversation
              key={conversation?.name + index}
              name={conversation.name}
              avatar={conversation.avatar}
              isActive={conversation.isActive}
              lastMessage={conversation.lastMessage}
            />
          ))}
      </section>
    </div>
  )
}

export default ListConversation
