import HeaderApp from '~/components/components/TodoComponent/Header/headerApp'
import TodoApp from '~/components/components/TodoComponent/TodoPage/TodoApp'
import className from 'classnames/bind'
import styles from './main.module.scss'
import StarBorderIcon from '@mui/icons-material/StarBorder'
const cx = className.bind(styles)

function MainContent() {
  return (
    <div className={cx('main-page')}>
      <HeaderApp iconTitle={<StarBorderIcon />} title='My works' />
      <TodoApp />
    </div>
  )
}

export default MainContent
