import Header from './InformationHeader/Header'
import AddPost from '~/components/components/PostComponent/AddPost/AddPost'
import FilterPost from '~/components/components/PostComponent/FilterPost/FilterPost'
import Post from '~/components/components/PostComponent/Post/Post'

import styles from './PostPage.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function PostPage() {
  return (
    <div className={cx('post-page')}>
      <Header />
      <main className={cx('post-area')}>
        <AddPost />
        <FilterPost />
        {/* <Post />
        <Post />
        <Post /> */}
      </main>
    </div>
  )
}

export default PostPage
