import React, { useCallback } from 'react'

import styles from './Conversation.module.scss'
import classNames from 'classnames/bind'

import CircleIcon from '@mui/icons-material/Circle'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

const cx = classNames.bind(styles)

interface Conversationprops {
  idx?: number
  name?: string
  lastMessage?: string
  isActive?: boolean
  avatar?: string
  selected?: boolean
  onClick: () => void
}

export default function Conversation({
  idx,
  name,
  lastMessage,
  isActive,
  avatar,
  selected,
  onClick
}: Conversationprops) {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        onClick?.()
      }
    },
    [onClick]
  )
  return (
    <section
      role='button'
      onClick={() => {
        onClick()
      }}
      onKeyDown={handleKeyDown}
      tabIndex={idx}
      className={selected ? cx('conversation_item', 'active_conversation') : cx('conversation_item')}
    >
      <div className={cx('image-container')}>
        <img
          className={cx('chat-avatar')}
          src={
            avatar || 'https://lh3.googleusercontent.com/ogw/AOLn63GIHa9tjuXqbWnBLozu-DG8i2tCoLTKkhfrtCZ83A=s32-c-mo'
          }
          alt='avatar'
        />
        {isActive && <div className={cx('status-indicator')} />}
      </div>
      <span className={cx('name_chat')}>{name || 'Thanh Lam'}</span>
      <span className={cx('last-message')}>{lastMessage || 'Hello, How are you'}</span>
      <div className={cx('active-status')}>
        {isActive ? (
          <CircleIcon sx={{ color: '#448AFF', fontSize: 15 }} />
        ) : (
          <CheckCircleOutlineIcon sx={{ fontSize: 15 }} />
        )}
      </div>
    </section>
  )
}
