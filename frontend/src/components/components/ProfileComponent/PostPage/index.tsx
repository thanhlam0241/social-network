import styles from './PostPage.module.scss'

import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function PostsPage() {
  return <section className={cx('profile-post-page')}>Posts</section>
}

export default PostsPage
