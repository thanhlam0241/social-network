import styles from './Interaction.module.scss'

import classNames from 'classnames/bind'

import angry from '~/assets/icons/angry_icon.png'
import haha from '~/assets/icons/haha-icon.png'
import like from '~/assets/icons/icon_like.jpg'
import love from '~/assets/icons/icon_heart.jpg'
import sad from '~/assets/icons/sad_icon.png'

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ReplyIcon from '@mui/icons-material/Reply'

const cx = classNames.bind(styles)

function Interaction() {
  return (
    <div className={cx('interaction-container')}>
      <div className={cx('interaction-emoji')}>
        <div className={'detail-emoji'}>
          <img className={cx('icon')} alt='icon' src={like} />
          <img className={cx('icon')} alt='icon' src={love} />
        </div>
        <p className={cx('people-interact-detail')}>You and 6 other people</p>
      </div>
      <div className={cx('interaction-comment-share')}>
        <span className={cx('action-detail')}>
          <ChatBubbleOutlineIcon />
          11
        </span>
        <span className={cx('action-detail')}>
          <ReplyIcon />1
        </span>
      </div>
    </div>
  )
}

export default Interaction
