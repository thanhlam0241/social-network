import styles from './Post.module.scss'
import { useState } from 'react'

import PostHeader from '../PostHeader/PostHeader'
import PostText from '../PostTextContent/PostText'
import PostMedia from '../PostMedia/PostMedia'
import Interaction from '../InteractInformation/Interaction'

import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function Post() {
  return (
    <section className={cx('post-container')}>
      <PostHeader />
      <PostText />
      <PostMedia />
      <Interaction />
      <div>Action</div>
      <div>Comment container</div>
    </section>
  )
}

export default Post
