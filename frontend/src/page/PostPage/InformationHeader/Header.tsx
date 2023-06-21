import styles from './Header.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function Header() {
  return (
    <header className={cx('profile-header')}>
      <h2>Introduction</h2>
    </header>
  )
}

export default Header
