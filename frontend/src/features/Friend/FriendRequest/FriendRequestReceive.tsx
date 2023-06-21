import styles from './FriendRequest.module.scss'
import classNames from 'classnames/bind'

import FriendRequest from '~/components/components/Friend/FriendRequest'

const cx = classNames.bind(styles)

const data = [
  {
    id: '1',
    name: 'Nguyen Van A',
    avatar: 'https://picsum.photos/206',
    title: 'Friend request'
  },
  {
    id: '1',
    name: 'Nguyen Van B',
    avatar: 'https://picsum.photos/207',
    title: 'Friend request'
  },
  {
    id: '1',
    name: 'Nguyen Van C',
    avatar: 'https://picsum.photos/200',
    title: 'Friend request'
  },
  {
    id: '1',
    name: 'Nguyen Van D',
    avatar: 'https://picsum.photos/201',
    title: 'Friend request'
  },
  {
    id: '1',
    name: 'Nguyen Van E',
    avatar: 'https://picsum.photos/202',
    title: 'Friend request'
  }
]

function FriendRequestPage() {
  return (
    <main className={cx('friend-request')}>
      <h2>Friend requests to you</h2>
      <ul className={cx('friend-request-content')}>
        {data.map((item, index) => (
          <li key={index} className={cx('friend-item')}>
            <FriendRequest type='receive' name={item.name} avatar={item.avatar} title={item.title} />
          </li>
        ))}
      </ul>
    </main>
  )
}

export default FriendRequestPage
