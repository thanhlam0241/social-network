import { useRef, useEffect } from 'react'

import Message from '../Message/Message'
import MessageBox from '../MessageBox/MessageBox'
import HeaderChat from '../HeaderChat/HeaderChat'

import styles from './Chatbox.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Chatbox = () => {
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log('re-render')
    if (divRef?.current?.lastElementChild) {
      divRef.current.lastElementChild.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      })
    }
  }, [divRef])
  return (
    <div className={cx('chat-container')}>
      <HeaderChat />
      <div ref={divRef} className={cx('messages-container')}>
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
