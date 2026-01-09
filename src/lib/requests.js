import { axiosInstance } from "./axios"


export const getData=async ()=>{
   const res=await axiosInstance.get("/todos")
   return res.data.slice(0,10)
}

export const addTodo= async(newTodo)=>{
    const res =await axiosInstance.post("/todos", newTodo )
    return res.data
}

export const deleteTodo=async({id})=>{
    const res = await axiosInstance.delete(`/todos/${id}`)
    return res.data
}