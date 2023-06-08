import StarOutlineIcon from '@mui/icons-material/StarOutline'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import SettingsIcon from '@mui/icons-material/Settings'
import styles from './listItem.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface TaskItemProps {
  title: string
  isCompleted: boolean
  important: boolean
  content: string
  id?: string
  openDialog?: () => void
  changeImportant: () => void
  changeCompleted?: () => void
}
function TaskItem({
  title,
  isCompleted,
  important,
  content,
  openDialog,
  changeImportant,
  changeCompleted
}: TaskItemProps) {
  return (
    <div className={cx('div_task-item')}>
      <div className={cx('task')}>
        {isCompleted ? (
          <TaskAltIcon
            onClick={changeCompleted}
            sx={{
              '&:hover': {
                color: 'var(--primary)',
                cursor: 'pointer'
              }
            }}
          />
        ) : (
          <RadioButtonUncheckedIcon
            onClick={changeCompleted}
            sx={{
              '&:hover': {
                color: 'var(--primary)',
                cursor: 'pointer'
              }
            }}
          />
        )}
        {/* <input className={cx('check-radio')} type='radio' defaultChecked={isCompleted} /> */}
        <div>
          <p style={isCompleted ? { color: '#414141', textDecoration: 'line-through' } : { color: '#414141' }}>
            {title}
          </p>
          <p>{content}</p>
        </div>
      </div>
      <div className={cx('important-check')}>
        <StarOutlineIcon
          onClick={changeImportant}
          sx={
            important
              ? {
                  color: 'var(--primary-color)',
                  '&:hover': {
                    color: '#000',
                    cursor: 'pointer'
                  }
                }
              : {
                  color: '#000',
                  '&:hover': {
                    color: 'var(--primary-color)',
                    cursor: 'pointer'
                  }
                }
          }
        />
        <SettingsIcon
          onClick={openDialog}
          sx={{
            color: '#000',
            '&:hover': {
              color: 'var(--primary-color)',
              cursor: 'pointer'
            }
          }}
        />
      </div>
    </div>
  )
}

export default TaskItem
