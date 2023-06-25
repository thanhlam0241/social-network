import { useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import TaskItem from '../TaskItem/listItem'
import { Button, Backdrop, CircularProgress, FormControl, LinearProgress } from '@mui/material'

import styles from './TodoApp.module.scss'
import classNames from 'classnames/bind'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import DialogTodo from '../Dialog/index'
//api
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getTodoList, addNewTodo, updateTodo, deleteTodo, ITodo } from '~/service/api/todo/todoApi'
//redux
import { useAppSelector } from '~/hooks/storeHook'

const cx = classNames.bind(styles)

function TodoApp() {
  const auth: any = useAppSelector((state) => state.auth)

  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['getTodoList'],
    queryFn: () => getTodoList(auth.token),
    refetchOnWindowFocus: false
  })

  const [task, setTask] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [important, setImportant] = useState<string>('no')
  const [completed, setCompleted] = useState(false)

  const [open, setOpen] = useState<boolean>(false)

  const [todoNow, setTodoNow] = useState<ITodo>({
    id: '',
    title: '',
    description: '',
    important: false,
    completed: false
  })

  const [loading, setLoading] = useState<boolean>(false)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value)
  }
  const handleChange = (event: SelectChangeEvent) => {
    setImportant(event.target.value as string)
  }

  const resetAllField = () => {
    setTask('')
    setContent('')
    setImportant('no')
    setCompleted(false)
  }

  const changeImportant = async (important: boolean, id: string) => {
    setLoading(true)
    await updateTodo(auth.token, { important: !important }, id)
      .then(() => {
        queryClient.invalidateQueries(['getTodoList'])
        console.log('Update todo success fully')
      })
      .catch((err) => {
        alert('Update todo failed')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const changeCompleted = async (completed: boolean, id: string) => {
    setLoading(true)
    await updateTodo(auth.token, { completed: !completed }, id)
      .then(() => {
        queryClient.invalidateQueries(['getTodoList'])
        console.log('Update todo success fully')
      })
      .catch((err) => {
        alert('Update todo failed')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleAddTask = async () => {
    setLoading(true)
    const todo = {
      title: task,
      description: content,
      important: important === 'yes' ? true : false,
      completed: false
    }
    await addNewTodo(todo, auth.token)
      .then((res) => {
        queryClient.invalidateQueries(['getTodoList'])
        console.log('Add to do success fully')
        resetAllField()
      })
      .catch((err) => {
        console.log(err)
        alert('Add todo failed')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleOpenDialog = (todo: ITodo) => {
    if (todo?.id?.length !== 0) {
      setTodoNow(todo)
      setOpen(true)
    }
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  return (
    <div className={cx('todo-container')}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
      {auth.token && (
        <DialogTodo
          setLoading={setLoading}
          setOpen={setOpen}
          open={open}
          handleCloseDialog={handleCloseDialog}
          token={auth.token}
          todoNow={todoNow}
        />
      )}

      {isLoading && <LinearProgress />}
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
          <Button onClick={handleAddTask} variant='contained'>
            Add
          </Button>
        </div>
        <div className={cx('add-todo-more')}>
          <input
            className={cx('input-content-todo')}
            type='text'
            value={content}
            placeholder='Add content of the todo'
            onChange={(e) => setContent(e.target.value)}
            multiple
          />
          <FormControl variant='standard' sx={{ maxWidth: 60, width: 'auto' }}>
            <InputLabel sx={{ fontSize: 13 }} id='demo-simple-select-label'>
              Important
            </InputLabel>
            <Select
              sx={{ maxWidth: 60, width: 'auto' }}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={important}
              label='Important'
              onChange={handleChange}
            >
              <MenuItem value='yes'>Yes</MenuItem>
              <MenuItem value='no'>No</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {!isLoading && !error && data?.length > 0 && (
        <div className={cx('list-todo')}>
          {data?.length > 0 &&
            data.map((item: any) => (
              <TaskItem
                openDialog={() =>
                  handleOpenDialog({
                    id: item._id,
                    title: item.title,
                    description: item.description,
                    important: item.important,
                    completed: item.completed
                  })
                }
                changeImportant={() => changeImportant(item.important, item._id)}
                key={item._id}
                title={item.title}
                isCompleted={item.completed}
                important={item.important}
                content={item.description}
                changeCompleted={() => changeCompleted(item.completed, item._id)}
              />
            ))}
        </div>
      )}
      {isLoading && (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  )
}

export default TodoApp
