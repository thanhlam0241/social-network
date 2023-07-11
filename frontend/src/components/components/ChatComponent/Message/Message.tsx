import styles from './Message.module.scss'
import classNames from 'classnames/bind'

import default_avatar from '~/assets/images/default_avatar.jpg'
import { AvatarUrl } from '~/service/api/const/url'

const cx = classNames.bind(styles)

interface MessageProps {
  isMine?: boolean
  text?: string
  avatar?: string
}

export default function Message({ text, isMine, avatar }: MessageProps) {
  return (
    <section
      className={
        isMine ? cx('message_container', 'message-container-mine') : cx('message_container', 'message-container-other')
      }
    >
      {!isMine && (
        <img className={cx('message-avatar')} src={avatar ? `${AvatarUrl}${avatar}` : default_avatar} alt='avatar' />
      )}
      <span className={isMine ? cx('message-item', 'message_item_mine') : cx('message-item', 'message_item_other')}>
        {text || 'Default message'}
        {/* {!isMine && <p className={cx('message-nickname')}>Thanh lam</p>} */}
      </span>
    </section>
  )
}
