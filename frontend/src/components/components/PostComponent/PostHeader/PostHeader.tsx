import styles from './PostHeader.module.scss'
import { useState } from 'react'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function Post() {
  return (
    <header className={cx('post-header')}>
      <section className={cx('poster-and-post-info')}>
        <div className={cx('poster')}>
          <img
            className={cx('poster-image')}
            src='http://localhost:3500/avatar/1686426738875-834258115.jpg'
            alt='avatar'
          />
        </div>
        <div className={cx('post-information')}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>Thanh Lam</span>
          <p style={{ fontSize: 12, fontWeight: 300 }}>1 hours ago</p>
        </div>
      </section>
      <button className={cx('post-setting')}>
        <MoreHorizIcon />
      </button>
    </header>
  )
}

export default Post
