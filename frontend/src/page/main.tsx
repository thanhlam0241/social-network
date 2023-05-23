import HeaderApp from './Header/headerApp';
import TodoApp from './Main/TodoApp';
import className from 'classnames/bind';
import styles from './main.module.scss';
import StarBorderIcon from '@mui/icons-material/StarBorder';
const cx = className.bind(styles);

function MainContent() {
  return (
    <div className={cx('main-page')}>
      <HeaderApp iconTitle={<StarBorderIcon />} title='Hello world' />
      <TodoApp />
    </div>
  );
}

export default MainContent;
