import styles from './Conversation.module.scss'
import classNames from 'classnames/bind'

import CircleIcon from '@mui/icons-material/Circle'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

const cx = classNames.bind(styles)

interface Conversationprops {
  name?: string
  lastMessage?: string
  isActive?: boolean
  avatar?: string
}

export default function Conversation({ name, lastMessage, isActive, avatar }: Conversationprops) {
  return (
    <section className={cx('conversation_item')}>
      <img
        className={cx('chat-avatar')}
        src={avatar || 'https://lh3.googleusercontent.com/ogw/AOLn63GIHa9tjuXqbWnBLozu-DG8i2tCoLTKkhfrtCZ83A=s32-c-mo'}
        alt='avatar'
      />
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
