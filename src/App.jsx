import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(false)

   const handleAdd = ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLS()
   }

   const handleChange = (e)=>{
    setTodo(e.target.value)
   }

   const handleCheckbox = (e)=>{
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id===id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
   }

   const handleDelete = (e, id) =>{
    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
    saveToLS()
   }

   const handleEdit = (e, id)=>{
    let t = todos.filter(item=>{
      return item.id===id
    })
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
    saveToLS()
   }

   const toggleFinished = (e)=>{
    setShowFinished(!showFinished)
   }

   const saveToLS = ()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
   }

   useEffect(() => {
     let todostring = localStorage.getItem("todos")
     if (todostring){
      let todos = JSON.parse(todostring)
      setTodos(todos)
     }
   }, []) 
   
  return (
    <>
      <Navbar/>

      <div className='w-1/2 min-h-[600px] mx-auto my-10 bg-violet-300 rounded-xl py-4 px-8 flex flex-col gap-8'>
        <div className='text-center text-xl'>Your Todos</div>

        <div className='flex gap-4 justify-center'>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-xl p-2'/>
          <button onClick={handleAdd} disabled={todo.length<1} className='bg-green-700 rounded-xl py-2 px-2 text-white'>Save</button>
        </div>

        <div className='flex gap-4'>
          <input onChange={toggleFinished} type="checkbox" name="" checked={showFinished}/>
          <h1>Show Finished</h1>
        </div>

        <hr />
        
        <div className="todos flex flex-col gap-4">
          {todos.map(item=>{
            return (showFinished || !item.isCompleted) && <div className="todo flex gap-4 items-center">
            <input name={item.id} onChange={handleCheckbox} checked={item.isCompleted} type="checkbox" id="" />
            <div className={item.isCompleted?"line-through":""}><div className='text-wrap min-w-[270px]'>{item.todo}</div></div>
            <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-blue-500 rounded-xl py-2 px-2 text-white'><FaEdit /></button>
            <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-red-500 rounded-xl py-2 px-2 text-white'><RiDeleteBin6Fill /></button>  
          </div>
          })}
                    
        </div>
      </div>
    </>
  )
}

export default App
