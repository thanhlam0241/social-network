import styles from './CommentPost.module.scss'
import classNames from 'classnames/bind'
import {
  useState
  // , useEffect, useRef
} from 'react'
// import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
// import ReplyIcon from '@mui/icons-material/Reply'

import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import GifIcon from '@mui/icons-material/Gif'
import SendIcon from '@mui/icons-material/Send'

const cx = classNames.bind(styles)

function CommentPost() {
  const [text, setText] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  return (
    <div className={cx('comment-post')}>
      <span className={cx('comment-post-viewmore')}>View more comments</span>
      <div className={cx('comment-post-input')}>
        <div className={cx('comment-post-user')}>
          <img className={cx('comment-post-avatar')} src='https://picsum.photos/200/300' alt='avatar' />
        </div>
        <div className={text.length > 0 ? cx('comment-post-text-media') : cx('comment-post-text-media-focus')}>
          <textarea
            onChange={handleChange}
            rows={text.length > 0 ? 2 : 1}
            className={cx('comment-post-text')}
            placeholder='Write a comment...'
          />
          <div className={cx('input-more')}>
            <div className={cx('icon-container')}>
              <SentimentSatisfiedAltIcon />
              <CameraAltIcon />
              <GifIcon />
            </div>
            {text.length > 0 && <SendIcon sx={{ cursor: 'pointer' }} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentPost
