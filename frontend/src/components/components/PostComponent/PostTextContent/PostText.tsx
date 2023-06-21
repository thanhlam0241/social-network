import styles from './PostText.module.scss'
import { useState } from 'react'
import Tag from '../Tag/Tag'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function PostText() {
  return (
    <main className={cx('post-text-content')}>
      <p>Hello World</p>
      <p>Hello World</p>
      <p>Hello World</p>
      <div className={cx('tag-container')}>
        <Tag>backend</Tag>
        <Tag>frontend</Tag>
      </div>
    </main>
  )
}

export default PostText
