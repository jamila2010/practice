import { FaTrash } from "react-icons/fa"


function TodoList({todos, handleDelete}) {
  return (
    <div className="flex flex-col gap-4 mt-10">
      {todos?.map(({title, id,})=>{
       return <div key={id} className="border px-3 rounded py-2 mx-auto w-200 flex justify-between">
        <h1>Task: {title} </h1>
        <button onClick={()=>{handleDelete()}} className="cursor-pointer active:text-red-700 active:rotate-20 hover:rotate-25 ">  <FaTrash /></button>
       </div>
      })}
    </div>
  )
}

export default TodoList
