import React from 'react'
import './Todo.css'
import { useState , useRef, useEffect } from 'react'
import {IoMdDoneAll} from 'react-icons/io'
import {FiEdit} from 'react-icons/fi'
import {MdDelete} from 'react-icons/md'


function Todo() {

  const[todo,setTodo]=useState('')
  const[todos,setTodos]=useState([])
  const[editId,setEditID]=useState(0)

  
  const addTodo = () =>{
   if(todo !== ''){
    setTodos([...todos,{list:todo , id:Date.now() , status:false }])
    console.log(todos);
    setTodo('')
   }
   if(editId){
    const editTodo = todos.find((to)=>to.id == editId)
    const updateTodo = todos.map((tod)=>tod.id === editTodo.id
    ? (tod = {id : tod.id , list :todo })
    : (tod = {id : tod.id , list :tod.list}))
    setTodos(updateTodo)
    setEditID(0)
    setTodo('')
   }
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


  const onComplete = (id) =>{
    let complete = todos.map((datas)=>{
      if(datas.id === id){
        return ({...datas, status: !datas.status})
      }
      return datas
    })
    setTodos(complete)
  }


  const onEdit = (id) =>{
    const editTodo = todos.find((details)=>details.id === id)
    console.log('edit id'+editTodo.list);
    setTodo(editTodo.list)
    setEditID(editTodo.id)
  }

  return (
    <div className='container'>
        <h2>TODO APP</h2>
        <form className='form-group' onSubmit={handleSubmit}>
            <input type="text" value={todo} ref={inputRef} placeholder='ENTER YOUR TODO' className='form-control' onChange={(event)=>setTodo(event.target.value)} />
            <button onClick={addTodo}>{editId ? 'EDIT' : 'ADD'}</button>
        </form>
        <div className='list'>
            <ul>
                {
                  todos.map((item)=>(
                    <li className='list-items'>
                      <div className='list-item-list' id={item.status ? 'list-item' : ''}>{item.list}</div>
                    <span>
                      <IoMdDoneAll 
                        className='list-item-icons' 
                        id='complete'
                        title='Complete'
                        onClick={()=>onComplete(item.id)} 
                        />
                      <FiEdit 
                        className='list-item-icons'
                        id='edit'
                        title='Edit'
                        onClick={()=>onEdit(item.id)}  
                        />
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