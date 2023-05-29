import styles from './Message.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface MessageProps {
  isMine?: boolean
}

export default function Message({ isMine }: MessageProps) {
  return (
    <section
      className={
        isMine ? cx('message_container', 'message-container-mine') : cx('message_container', 'message-container-other')
      }
    >
      {!isMine && (
        <img
          className={cx('message-avatar')}
          src='https://lh3.googleusercontent.com/ogw/AOLn63GIHa9tjuXqbWnBLozu-DG8i2tCoLTKkhfrtCZ83A=s32-c-mo'
          alt='avatar'
        />
      )}
      <span className={isMine ? cx('message-item', 'message_item_mine') : cx('message-item', 'message_item_other')}>
        Message Item Hello World, Welcome to my chat box, Good morning, good afternon
        {/* {!isMine && <p className={cx('message-nickname')}>Thanh lam</p>} */}
      </span>
    </section>
  )
}
