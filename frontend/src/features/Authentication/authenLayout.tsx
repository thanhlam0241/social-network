import { Outlet } from 'react-router-dom'
import styles from './authenLayout.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function AuthenticateLayout() {
  return (
    <div className={cx('authen-container')}>
      <Outlet />
    </div>
  )
}

export default AuthenticateLayout
