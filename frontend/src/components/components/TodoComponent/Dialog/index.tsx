import {
  Button,
  FormControl,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem
} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { updateTodo, deleteTodo, ITodo } from '~/service/api/todo/todoApi'

import { useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'

interface DialogTodoProps {
  open: boolean
  handleCloseDialog: () => void
  todoNow?: ITodo
  setLoading: (value: boolean) => void
  setOpen: (value: boolean) => void
  token: string
}

export default function DialogTodo({ open, handleCloseDialog, todoNow, setLoading, setOpen, token }: DialogTodoProps) {
  const queryClient = useQueryClient()
  const titleRef = useRef<HTMLInputElement>()
  const contentRef = useRef<HTMLInputElement>()
  const importantRef = useRef<HTMLInputElement>()
  const completedRef = useRef<HTMLInputElement>()

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
        await updateTodo(token, todo, todoNow?.id)
          .then(() => {
            queryClient.invalidateQueries(['getTodoList'])
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

  const handleDeleteTask = async () => {
    setLoading(true)
    console.log(todoNow)
    if (todoNow?.id) {
      await deleteTodo(token, todoNow.id)
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

  return (
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
        <FormControl variant='standard' fullWidth>
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
        <FormControl variant='standard' fullWidth>
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
  )
}
