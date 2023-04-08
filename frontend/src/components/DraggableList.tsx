import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { updateTodo } from "../features/userSlice"
import TodoList from './TodoList'
import AddItem from './AddItem'

const DraggableList = () => {
  const todos = useSelector((state: any) => state.userSlice.todos)
  const dispatch = useDispatch()

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items: any = reorder(
      todos.now,
      result.source.index,
      result.destination.index
    )

    const copyTodo = JSON.parse(JSON.stringify(todos))
    copyTodo.now = JSON.parse(JSON.stringify(items))
    dispatch(updateTodo(copyTodo))
  }

  return (
    <div>
      <AddItem />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {(todos.now != undefined) ? todos.now.map((item, index) => (
                <Draggable  key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <TodoList elem={item} />
                    </div>
                  )}
                </Draggable>
              )) : <h1>Loading...</h1>}
              {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    </div>
  )
}

export default DraggableList

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 1.5;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  padding: '5px 5px',
  fontSize: '17px',
  // margin: '5px 0',
  // color: 'rgb(206	206	206	)',


  // change background colour if dragging
  //71	63	62	
  // background: isDragging ? "rgb(59	59	59	)" : "none",
  // borderRadius: isDragging ?  '3px' : '3px',

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  // background: isDraggingOver ? "#fff" : "#fff",
  padding: grid,
  // margin: '0 1rem',
  marginTop: '1rem'
});