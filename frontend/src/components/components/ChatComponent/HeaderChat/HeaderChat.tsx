import styles from './HeaderChat.module.scss'
import classNames from 'classnames/bind'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import VideocamIcon from '@mui/icons-material/Videocam'
import InfoIcon from '@mui/icons-material/Info'
const cx = classNames.bind(styles)

function HeaderChat() {
  return (
    <div className={cx('header-chat')}>
      <section className={cx('chat-infor')}>
        <img
          className={cx('chat-avatar')}
          src='https://lh3.googleusercontent.com/ogw/AOLn63GIHa9tjuXqbWnBLozu-DG8i2tCoLTKkhfrtCZ83A=s32-c-mo'
          alt='avatar'
        />
        <p>Thanh Lam</p>
      </section>
      <section className={cx('chat-action')}>
        <LocalPhoneIcon
          sx={{
            '&:hover': {
              cursor: 'pointer'
            }
          }}
        />
        <VideocamIcon
          sx={{
            '&:hover': {
              cursor: 'pointer'
            }
          }}
        />
        <InfoIcon
          sx={{
            '&:hover': {
              cursor: 'pointer'
            }
          }}
        />
      </section>
    </div>
  )
}

export default HeaderChat
