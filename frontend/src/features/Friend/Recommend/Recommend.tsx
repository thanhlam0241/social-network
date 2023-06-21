import styles from './Recommend.module.scss'
import classNames from 'classnames/bind'

import FriendCard from '~/components/components/Friend/FriendCard'

const cx = classNames.bind(styles)

function Recommend() {
  return (
    <main className={cx('friend-recommend')}>
      <h2>Những người bạn có thể biết</h2>
      <ul className={cx('friend-recommend-content')}>
        <ul className={cx('friend-item')}>
          <FriendCard />
        </ul>
        <ul className={cx('friend-item')}>
          <FriendCard />
        </ul>
        <ul className={cx('friend-item')}>
          <FriendCard />
        </ul>
        <ul className={cx('friend-item')}>
          <FriendCard />
        </ul>
        <ul className={cx('friend-item')}>
          <FriendCard />
        </ul>
      </ul>
    </main>
  )
}

export default Recommend
