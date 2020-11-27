import { API, graphqlOperation } from "aws-amplify"
import { createTodo, deleteTodo } from "./mutations"
import { listTodos } from "./queries"

export const getAllTodos = async () => {
  const res = await API.graphql(graphqlOperation(listTodos))
  return res.data.listTodos.items
}

export const addTodo = async (input) => API.graphql(graphqlOperation(createTodo, { input }))

export const removeTodo = async (id) => API.graphql(graphqlOperation(deleteTodo, { input: { id } }))