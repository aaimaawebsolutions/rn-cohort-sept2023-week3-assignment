import { createSlice } from '@reduxjs/toolkit'  

const temp = [
    {id: 0, task: "Clean", status: false},
]

const todosSlice = createSlice({
  name: 'todos',
  initialState: temp,
  reducers: {
    todoAdded(state, action) {
      state.push({
        id: action.payload.id,
        task: action.payload.task,
        status: action.payload.status
      })
    },
    todoToggled(state, action) {
      const todo = state.find(todo => todo.id === action.payload)
      todo.completed = !todo.completed
    },
    todoDelete(state, action) {
      state.splice(action.payload.idx, 1);
    }
  }
})

export const { todoAdded, todoToggled, todoDelete } = todosSlice.actions
export default todosSlice.reducer