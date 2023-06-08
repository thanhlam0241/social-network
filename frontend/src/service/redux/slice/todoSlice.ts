import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TodoState {
  id: any
  title: string
  description: string
  completed: boolean
  important: boolean
  dueDate: Date
}

const initialState: TodoState[] = []

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoState>) => {
      state.push(action.payload)
    },
    updateTodo: (state, action: PayloadAction<TodoState>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((todo) => todo.id === action.payload)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    resetTodo: (state) => {
      state = initialState
    }
  }
})

export const { addTodo, updateTodo, deleteTodo, resetTodo } = todoSlice.actions

export default todoSlice.reducer

export const todoAdapter = createEntityAdapter<TodoState>({
  selectId: (todo) => todo.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title)
})
