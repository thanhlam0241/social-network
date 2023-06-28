import styles from './HeaderChat.module.scss'
import classNames from 'classnames/bind'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import VideocamIcon from '@mui/icons-material/Videocam'
import InfoIcon from '@mui/icons-material/Info'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

import default_avatar from '~/assets/images/default_avatar.png'
import { AvatarUrl } from '~/service/api/const/url'

import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)

interface HeaderChatProps {
  infor?: any
}

function HeaderChat({ infor }: HeaderChatProps) {
  console.log(infor)
  const navigate = useNavigate()
  return (
    <div className={cx('header-chat')}>
      <section className={cx('chat-infor')}>
        <button onClick={() => navigate('/chat')} className={cx('return-button')}>
          <KeyboardBackspaceIcon />
        </button>
        <img
          className={cx('chat-avatar')}
          src={infor[0]?.userInformation?.avatar ? `${AvatarUrl}${infor[0]?.userInformation?.avatar}` : default_avatar}
          alt='avatar'
        />
        <p>{infor[0]?.username}</p>
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
