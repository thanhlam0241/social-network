import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarRateIcon from '@mui/icons-material/StarRate';
import styles from './listItem.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
interface TaskItemProps {
  title: string;
  isCompleted: boolean;
  important: boolean;
}
function TaskItem({ title, isCompleted, important }: TaskItemProps) {
  return (
    <div className={cx('div_task-item')}>
      <div className={cx('task')}>
        {isCompleted ? <TaskAltIcon /> : <RadioButtonUncheckedIcon />}
        <p style={isCompleted ? { color: '#414141', textDecoration: 'line-through' } : { color: '#414141' }}>{title}</p>
      </div>
      <div className={cx('important-check')}>{important ? <StarRateIcon /> : <StarOutlineIcon />}</div>
    </div>
  );
}

export default TaskItem;
