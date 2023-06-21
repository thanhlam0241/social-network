import styles from './Tag.module.scss'

import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface TagProps {
  children: string
}

function Tag({ children }: TagProps) {
  return <span className={cx('tag')}>#{children}</span>
}

export default Tag
