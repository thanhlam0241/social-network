import AddIcon from '@mui/icons-material/Add'
import React, { useState } from 'react'
import TaskItem from '~/components/components/TaskItem/listItem'
import { Button } from '@mui/material'
import styles from './TodoApp.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function TodoApp() {
  const [task, setTask] = useState('')
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value)
  }
  return (
    <div className={cx('todo-container')}>
      <div className={cx('add-todo-container')}>
        <div className={cx('add-todo')}>
          <div className={cx('add-todo-first')}>
            <AddIcon
              sx={{
                '&:hover': {
                  cursor: 'pointer'
                }
              }}
            />
            <input
              className={cx('input-todo')}
              value={task}
              onChange={handleInput}
              type='text'
              placeholder='Add a task'
            />
          </div>
          <Button variant='contained'>Add</Button>
        </div>
        <div className={cx('add-todo-more')}></div>
      </div>
      <div className={cx('list-todo')}>
        <TaskItem title='Quet nha' isCompleted={true} important={false} />
        <TaskItem title='Quet cau thang' isCompleted={false} important={true} />
      </div>
    </div>
  )
}

export default TodoApp
