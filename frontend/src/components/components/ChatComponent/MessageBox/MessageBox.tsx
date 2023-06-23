import { useState } from 'react'

import styles from './MessageBox.module.scss'
import classNames from 'classnames/bind'

import AddCircleIcon from '@mui/icons-material/AddCircle'
import PhotoIcon from '@mui/icons-material/Photo'
import GifBoxIcon from '@mui/icons-material/GifBox'
import SendIcon from '@mui/icons-material/Send'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
const cx = classNames.bind(styles)

interface Props {
  conversationId?: string
  sendMessage?: any
}

export default function MessageBox({ sendMessage }: Props) {
  const [message, setMessage] = useState<string>('')

  const handleSendMessage = () => {
    if (sendMessage) {
      sendMessage(message)
      setMessage('')
    }
  }

  const handleKeyDown = (e: any) => {
    if (message && e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <section className={cx('message_box')}>
      <span className={cx('action-message-box')}>
        <AddCircleIcon />
      </span>
      <aside className={cx('input-message-area')}>
        <aside className={cx('input-message-area-action')}>
          <PhotoIcon />
          <GifBoxIcon />
        </aside>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          type='text'
          className={cx('message_box_input')}
          placeholder='Type a message'
        />
      </aside>
      <span className={cx('message_box_button')}>
        {message.length > 0 ? <SendIcon sx={{ cursor: 'pointer' }} onClick={handleSendMessage} /> : <ThumbUpIcon />}
      </span>
    </section>
  )
}
