import styles from './PostMedia.module.scss'

import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function PostMedia() {
  return (
    <main className={cx('post-media-container')}>
      <img
        className={cx('image-container')}
        src='http://localhost:3500/background/1686422656416-157674390.png'
        alt='post-media'
      />
    </main>
  )
}

export default PostMedia
