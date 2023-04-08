import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {
  updateTodo
} from '../features/userSlice'

const AddItem = () => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const todos = useSelector((state: any) => state.userSlice.todos)
  const add = (e) => {
    if (e.key === 'Enter') {
      const obj = {
        id: (+new Date()).toString(),
        title: value,
        context: '',
        completed: false,
        history: [],
        branches: []
      }
      let copy = JSON.parse(JSON.stringify(todos))
      copy.now.push(obj)
      setValue('')
      dispatch(updateTodo(copy))
    }
  }
  return (
    <div className='add'>
      <input 
        type="text" 
        value={value} 
        onChange={(e) => {setValue(e.target.value)}} 
        onKeyDown={add} 
      />
    </div>
  )
}

export default AddItem