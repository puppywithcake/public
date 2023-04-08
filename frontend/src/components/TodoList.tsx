import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import {
  updateTodo
} from '../features/userSlice'

export default function TodoList({elem}: any) {
  const todos = useSelector((state: any) => state.userSlice.todos)
  const [active, setActive]: any = useState({id: null})
  const [his, setHis] = useState({id: null})
  const dispatch = useDispatch()
  const handleClick= (e,elem) => {
    setActive(elem) 
  }
  const title = (e, id) => {
    e.preventDefault()
    const text = e.currentTarget.innerText
    let copy = JSON.parse(JSON.stringify(todos))
    copy.now.map((n) => {
      if (n.id === id) {
        n.title = text
      }
    })
    dispatch(updateTodo(copy))
  }
  const text = (e, id) => {
    e.preventDefault()
    const text = e.currentTarget.innerHTML
    console.log(text)
    let copy = JSON.parse(JSON.stringify(todos))
    copy.now.map((n) => {
      if (n.id === id) {
            n.context= text
          }
        })
        dispatch(updateTodo(copy))
  }
    const del = (id) => {
      let n = prompt('точно удалить?')
      if (n === null) {
        return
      }
      let copy = JSON.parse(JSON.stringify(todos))
      copy.now = copy.now.filter((item) => item.id != id)
      dispatch(updateTodo(copy))
    }
    const nextIteration = (e, elem) => {
      let n = prompt('новое название, старое уйдет в комит, сохранив context')
      const oldTitle = elem.title 
      const newTitle = n

      let copy = JSON.parse(JSON.stringify(todos))
      copy.now.map((item) => {
        if (item.id === elem.id) {
          item.title = newTitle
          item.history.unshift(oldTitle)
        }
      })
      dispatch(updateTodo(copy))
      setHis({id: null})
      setActive({id: null})
      // dispatch(addActiveItem({id: null}))
    }
    const close = () => { 
      setHis({id: null})
      setActive({id: null})
    }
  const doneCheck = (id) => {
    let copy = JSON.parse(JSON.stringify(todos))
    copy.now.map((n) => {
      if (n.id === id) {
        n.completed = !n.completed
        // n.context= text
      }
    })
    dispatch(updateTodo(copy))
    setActive({id: null})
  }
  return (
    <div>
      {active.id != elem.id ? <div>
        <div
          onDoubleClick={(e) => handleClick(e, elem)}
        >
          {elem.completed ? 
              <div className='done'>
                {elem.title}
              <span className='elem-history'>{elem.history.length === 0 ? false : elem.history.length}</span>
                </div> 
            : 
            <div>
              {elem.title}
              <span className='elem-history'>{elem.history.length === 0 ? false : elem.history.length}</span>
              </div>
          }
        </div>
      </div> : <div>
        <span className='title' contentEditable suppressContentEditableWarning={true} onInput={(e) => title(e, elem.id)}>{active.title}</span>
        <div className='context' contentEditable suppressContentEditableWarning={true} onInput={(e) => text(e, elem.id)}>{active.context}</div>
        <button className='btn' onClick={e => doneCheck(elem.id)}>close branch</button>
        <button className='btn' onClick={e => del(elem.id)}>delete branch</button>
        <button className='btn' onClick={e => nextIteration(e, elem)}>next iteration</button>
        <button className='btn' onClick={close}>close</button>
        {elem.history.map((item, key) => (
          <li key={key}>- {item}</li>
        ))}
      </div>}
    </div>
  )
}
//   const handleChangeChk = (id) => {
//     let copy = JSON.parse(JSON.stringify(todos))
//     copy.now.map((n) => {
//       if (n.id === id) {
//         n.completed = !n.completed
//       }
//     })
//     dispatch(updateTodo(copy))
//   }
//   const doneCheck = (id) => {
//     let copy = JSON.parse(JSON.stringify(todos))
//     copy.now.map((n) => {
//       if (n.id === id) {
//         n.completed = !n.completed
//         // n.context= text
//       }
//     })
//     dispatch(updateTodo(copy))
//     setActive({id: null})
//   }

//   return (
//     <div>
//       {active.id != elem.id ?
//       <div>
//         <label className='checkbox types'>
//           <input 
//             type='checkbox'
//             defaultChecked={elem.completed}
//             onChange={() => handleChangeChk(elem.id)} 
//           />
//           <span 
//             className='indicator'
//           ></span>
//         </label>
//         <span
//           onDoubleClick={(e) => handleClick(e, elem)}
//         >
//           {elem.title}
//           <span className='elem-history'>{elem.history.length === 0 ? false : elem.history.length}</span>
//         </span>
//         </div>
//         : <div>
//           <label className='checkbox types'>
//           <input 
//             type='checkbox'
//             defaultChecked={elem.completed}
//             onChange={() => handleChangeChk(elem.id)} 
//           />
//           <span 
//             className='indicator'
//           ></span>
//         </label>
//           <span className='title' contentEditable suppressContentEditableWarning={true} onInput={(e) => title(e, elem.id)}>{active.title}</span>
//           <div className='context' contentEditable suppressContentEditableWarning={true} onInput={(e) => text(e, elem.id)}>{active.context}</div>
//           {/* <button className='btn' onClick={e => doneCheck(elem.id)}>готово</button> */}
//           <button className='btn' onClick={e => del(elem.id)}>удалить</button>
//           {elem.history.map((item, key) => (
//              <li key={key}>- {item}</li>
//           ))}
//         </div> }
//     </div>
//   )
// }