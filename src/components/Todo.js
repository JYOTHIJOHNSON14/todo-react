import React from 'react'
import './Todo.css'
import { useState , useRef, useEffect } from 'react'
import {IoMdDoneAll} from 'react-icons/io'
import {FiEdit} from 'react-icons/fi'
import {MdDelete} from 'react-icons/md'


function Todo() {

  const[todo,setTodo]=useState('')
  const[todos,setTodos]=useState([])
  
  const addTodo = () =>{
    setTodos([...todos,{list:todo , id:Date.now() }])
    console.log(todos);
    setTodo('')
  }


  const handleSubmit = (e) =>{
      e.preventDefault();
  }

  const inputRef = useRef('null')

  useEffect(()=>{
    inputRef.current.focus()
  })


  const onDelete = (id) =>{
    setTodos(todos.filter((data)=> data.id !== id))
  }

  return (
    <div className='container'>
        <h2>TODO APP</h2>
        <form className='form-group' onSubmit={handleSubmit}>
            <input type="text" value={todo} ref={inputRef} placeholder='ENTER YOUR TODO' className='form-control' onChange={(event)=>setTodo(event.target.value)} />
            <button onClick={addTodo}>ADD</button>
        </form>
        <div className='list'>
            <ul>
                {
                  todos.map((item)=>(
                    <li className='list-items'>
                      <div className='list-item-list'>{item.list}</div>
                    <span>
                      <IoMdDoneAll className='list-item-icons' id='complete'title='Complete' />
                      <FiEdit className='list-item-icons' id='edit'title='Edit' />
                      <MdDelete 
                        className='list-item-icons' 
                        id='delete' 
                        title='Delete'
                        onClick={()=>onDelete(item.id)}
                      />
                    </span>
                    </li>
                  ))
                }
            </ul>
        </div>
    </div>
  )
}

export default Todo