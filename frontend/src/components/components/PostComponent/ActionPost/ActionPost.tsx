import styles from './ActionPost.module.scss'
import classNames from 'classnames/bind'

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ReplyIcon from '@mui/icons-material/Reply'

const cx = classNames.bind(styles)

function ActionPost() {
  return (
    <div className={cx('action-post')}>
      <button className={cx('button-action-post')}>
        <ThumbUpAltIcon />
        Like
      </button>
      <button className={cx('button-action-post')}>
        <ChatBubbleOutlineIcon />
        Comment
      </button>
      <button className={cx('button-action-post')}>
        <ReplyIcon />
        Share
      </button>
    </div>
  )
}

export default ActionPost
