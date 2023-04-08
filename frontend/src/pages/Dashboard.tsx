import { useEffect } from "react"
import DraggableList from "../components/DraggableList"
import { loadingTodo } from '../features/userSlice'
import { useDispatch, useSelector } from "react-redux"

const Dashboard = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadingTodo())
  }, [])
  return (
    <div>
      <DraggableList />
    </div>
  )
}

export default Dashboard