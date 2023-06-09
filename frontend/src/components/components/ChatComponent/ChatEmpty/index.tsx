import styles from './ChatEmpty.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function ChatEmpty() {
  return <div className={cx('chat-empty')}>Please select the chat</div>
}

export default ChatEmpty
