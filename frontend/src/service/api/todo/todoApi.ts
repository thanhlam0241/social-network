import axios from 'axios'
import config from '../const/configAxios'
import { TodoGetAllUrl } from '../const/url'

export interface ITodo {
  id: string
  title: string
  description: string
  important: boolean
  completed: boolean
}

export const getTodoList = async (token: string) => {
  const response = await axios.get(TodoGetAllUrl, config(token))
  return response.data
}

export const addNewTodo = async (todo: any, token: string) => {
  const response = await axios.post(TodoGetAllUrl, todo, config(token))
  return response.data
}

export const updateTodo = async (token: string, todo: any, id: string) => {
  const response = await axios.put(TodoGetAllUrl + `/${id}`, todo, config(token))
  return response.data
}

export const deleteTodo = async (token: string, todoId: string) => {
  const response = await axios.delete(`${TodoGetAllUrl}/${todoId}`, config(token))
  return response.data
}
