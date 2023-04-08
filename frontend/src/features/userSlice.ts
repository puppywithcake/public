import { createSlice,createSelector,PayloadAction,createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit"
import axios from "axios"

const initialState: any = {
  todos: []
}

export const loadingTodo: any = (data) => async (dispatch) => {
  try {
    const {data} = await axios.post('/loading_todo', {token: localStorage.getItem('token')})
    console.log('loading todo:', data.user)
    if (data.user === null) {
      localStorage.removeItem('token')
    }

    dispatch(setTodos(data.user.todo))
  } catch (err: any) {
    throw new Error(err)
  }
}

export const updateTodo: any = (data) => async (dispatch) => {
  try {
    dispatch(setTodos(data))
    const response = await axios.post('/update_todo', {
      token: localStorage.getItem('token'),
      todo: data
    })
  } catch (err: any) {
    throw new Error(err)
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTodos (state, action) {
      state.todos = action.payload
    },
    sordDraggable(state, action) {
      state.todos.now = action.payload
    }
  }
})

export const { setTodos, sordDraggable } = userSlice.actions
export default userSlice.reducer
