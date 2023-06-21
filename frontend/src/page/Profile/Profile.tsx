import { Avatar, Background, MoreInformation } from '~/components/components/ProfileComponent'
import { Outlet, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import styles from './Profile.module.scss'
import classNames from 'classnames/bind'
import PostPage from '../PostPage/PostPage'

const cx = classNames.bind(styles)

function ProfilePage() {
  const location = useLocation()
  const query = queryString.parse(location.search)
  console.log(query)
  const Element = query?.sk === 'about' ? <Outlet /> : <PostPage />
  if (query?.id) {
    return (
      <header>
        <Background id={query.id.toString()} />
        <Avatar id={query.id} />
        <MoreInformation />
        <div className={cx('profile_div_child')}>{Element}</div>
      </header>
    )
  } else {
    return <div style={{ width: '100%', height: '1000px', padding: '20px 20%' }}>Nothing</div>
  }
}

export default ProfilePage
