import styles from './FriendPage.module.scss'
import classNames from 'classnames/bind'

import { Outlet } from 'react-router-dom'

import Header from './Header/Header'

const cx = classNames.bind(styles)

function FriendPage() {
  return (
    <main className={cx('friend-page')}>
      <Header />
      <div className={cx('content-friend-page')}>
        <Outlet />
      </div>
    </main>
  )
}

export default FriendPage
