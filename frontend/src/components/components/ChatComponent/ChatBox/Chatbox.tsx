import { Box } from '@mui/material'
import Message from '../Message/Message'
import MessageBox from '../MessageBox/MessageBox'
import HeaderChat from '../HeaderChat/HeaderChat'

import styles from './Chatbox.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Chatbox = () => {
  return (
    <div className={cx('chat-container')}>
      <HeaderChat />
      <div className={cx('messages-container')}>
        <Message isMine />
        <Message />
        <Message />
        <Message />
        <Message isMine />
        <Message />
        <Message />
        <Message isMine />
        <Message />
        <Message />
        <Message isMine />
        <Message />
        <Message />
        <Message isMine />
        <Message />
      </div>
      <MessageBox />
    </div>
  )
}

export default Chatbox
