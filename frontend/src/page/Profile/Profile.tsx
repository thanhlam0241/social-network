import { Avatar, Background, MoreInformation } from '~/components/components/ProfileComponent'
import { Outlet } from 'react-router-dom'

function ProfilePage() {
  return (
    <header>
      <Background />
      <Avatar />
      <MoreInformation />
      <div style={{ width: '100%', height: '1000px', padding: '20px 20%' }}>
        <Outlet />
      </div>
    </header>
  )
}

export default ProfilePage
