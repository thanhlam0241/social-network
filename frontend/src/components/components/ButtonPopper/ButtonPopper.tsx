import styles from './ButtonPopper.module.scss'

import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface ButtonPopperProps {
  icon: any
  text: string
  onMouseDown?: () => void
}

function ButtonPopper({ icon, text, onMouseDown }: ButtonPopperProps) {
  return (
    <button onMouseDown={onMouseDown} className={cx('button_popper')}>
      {icon}
      <span>{text}</span>
    </button>
  )
}

export default ButtonPopper
