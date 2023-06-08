import { useState, useRef, useEffect } from 'react'

import AddIcon from '@mui/icons-material/Add'
import TaskItem from '../TaskItem/listItem'
import { Button, Backdrop, CircularProgress, FormControl, LinearProgress } from '@mui/material'

import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import styles from './TodoApp.module.scss'
import classNames from 'classnames/bind'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
//api
import { useQuery } from '@tanstack/react-query'
import { getTodoList, addNewTodo, updateTodo, deleteTodo, ITodo } from '~/service/api/todo/todoApi'
//redux
import { useAppSelector } from '~/hooks/storeHook'
import { useQueryClient } from '@tanstack/react-query'

const cx = classNames.bind(styles)

function TodoApp() {
  const titleRef = useRef<HTMLInputElement>()
  const contentRef = useRef<HTMLInputElement>()
  const importantRef = useRef<HTMLInputElement>()
  const completedRef = useRef<HTMLInputElement>()

  const auth: any = useAppSelector((state) => state.auth)

  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery(['getTodoList'], () => getTodoList(auth.token))

  console.log(data)

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
    if (titleRef.current && contentRef.current && importantRef.current && completedRef.current) {
      titleRef.current.value = ''
      contentRef.current.value = ''
      importantRef.current.value = 'no'
      completedRef.current.checked = false
    }
  }

  const handleUpdateTask = async () => {
    if (titleRef.current && contentRef.current && importantRef.current && completedRef.current) {
      setLoading(true)
      const todo = {
        title: titleRef.current.value || '',
        description: contentRef.current.value || '',
        important: importantRef.current.value === 'yes' ? true : false,
        completed: completedRef.current.value === 'yes' ? true : false
      }
      if (todoNow && todoNow?.id) {
        await updateTodo(auth.token, todo, todoNow?.id)
          .then(() => {
            queryClient.invalidateQueries(['getTodoList'])
            resetAllField()
          })
          .catch((err) => {
            console.log(err)
            alert('Update todo failed')
          })
          .finally(() => {
            setLoading(false)
            setOpen(false)
          })
      }
    }
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

  const handleDeleteTask = async () => {
    setLoading(true)
    if (todoNow && todoNow?.id) {
      await deleteTodo(auth.token, todoNow.id)
        .then(() => {
          queryClient.invalidateQueries(['getTodoList'])
          console.log('Delete todo success fully')
        })
        .catch((err) => {
          console.log(err)
          alert('Delete todo failed')
        })
        .finally(() => {
          setLoading(false)
          setOpen(false)
        })
    }
  }

  const handleOpenDialog = (todo: ITodo) => {
    //console.log(titleRef.current, contentRef.current, importantRef.current, completedRef.current)
    if (todo?.id?.length !== 0) {
      setTodoNow(todo)
      setOpen(true)
      titleRef.current!.value = todo.title
      contentRef.current!.value = todo.description
      importantRef.current!.value = todo.important ? 'yes' : 'no'
      completedRef.current!.value = todo.completed ? 'yes' : 'no'
    }
  }

  const handleCloseDialog = () => {
    setOpen(false)
    //resetAllField()
  }

  return (
    <div className={cx('todo-container')}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Detail Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>If you want to change your todo, please fill all field and click update</DialogContentText>
          <TextField
            margin='dense'
            id='title'
            label='Title'
            type='text'
            inputRef={titleRef}
            fullWidth
            variant='standard'
            defaultValue={todoNow?.title}
          />
          <TextField
            margin='dense'
            id='content'
            label='Content'
            type='text'
            inputRef={contentRef}
            fullWidth
            variant='standard'
            defaultValue={todoNow?.description}
          />
          <FormControl variant='standard' sx={{ minWidth: 120 }}>
            <InputLabel id='important-label'>Important</InputLabel>
            <Select
              defaultValue={todoNow?.important ? 'yes' : 'no'}
              labelId='important-label'
              id='important'
              inputRef={importantRef}
              label='Important'
            >
              <MenuItem value='yes'>Yes</MenuItem>
              <MenuItem value='no'>No</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant='standard' sx={{ minWidth: 120, marginLeft: 10 }}>
            <InputLabel id='completed-label'>Is completed</InputLabel>
            <Select
              defaultValue={todoNow?.completed ? 'yes' : 'no'}
              labelId='completed-label'
              id='completed'
              inputRef={completedRef}
              label='Completed'
            >
              <MenuItem value='yes'>Yes</MenuItem>
              <MenuItem value='no'>No</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleUpdateTask()}>Update</Button>
          <Button onClick={() => handleDeleteTask()}>Delete</Button>
        </DialogActions>
      </Dialog>

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
          <FormControl variant='standard' sx={{ m: 1, minWidth: 50 }}>
            <InputLabel id='demo-simple-select-label'>Important</InputLabel>
            <Select
              sx={{ width: 60 }}
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
      {!isLoading && !error && data?.length > 0 ? (
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
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  )
}

export default TodoApp
