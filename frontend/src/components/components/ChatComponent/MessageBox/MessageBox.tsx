import styles from './MessageBox.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default function MessageBox() {
  return (
    <section className={cx('message_box')}>
      <input type='text' className={cx('message_box_input')} placeholder='Type a message' />
      <button className={cx('message_box_button')}>Send</button>
    </section>
  )
}
