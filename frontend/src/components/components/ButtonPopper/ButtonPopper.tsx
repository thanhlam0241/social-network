import styles from './ButtonPopper.module.scss'

import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface ButtonPopperProps {
  icon: any
  text: string
  onClick?: () => void
}

function ButtonPopper({ icon, text, onClick }: ButtonPopperProps) {
  return (
    <button onClick={onClick} className={cx('button_popper')}>
      {icon}
      <span>{text}</span>
    </button>
  )
}

export default ButtonPopper
