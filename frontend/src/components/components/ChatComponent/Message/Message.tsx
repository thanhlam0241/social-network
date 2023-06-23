import styles from './Message.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface MessageProps {
  isMine?: boolean
  text?: string
}

export default function Message({ text, isMine }: MessageProps) {
  console.log(text, isMine)
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
        {text || 'Default message'}
        {/* {!isMine && <p className={cx('message-nickname')}>Thanh lam</p>} */}
      </span>
    </section>
  )
}
