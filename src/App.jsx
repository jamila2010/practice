import { useMutation, useQuery } from "@tanstack/react-query";
import { getData } from "./lib/requests";
import { queryClient } from "./main";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { addTodo, deleteTodo } from "./lib/requests";
import { toast } from "sonner";

function App() {
  const {
    data: todos,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getData,
  });

  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: async (todo) => {
      queryClient.setQueryData(["todos"], (oldTodos=[]) => {
       return [...oldTodos, todo];
      });
    },
  });

  const deleteMutation=useMutation({
    mutationFn:deleteTodo,
    onSuccess:async(_, variables)=>{
      const id= variables.id
      queryClient.setQueryData(["todos"], (oldTodos=[])=>{
        return oldTodos?.filter((todo)=>{
          return todo.id!==id
        })
      })
      toast.success("The todo deleted successfully!")
    }
  })

  const handleDelete=(id)=>{
    deleteMutation.mutate({id})
  }

  console.log(todos);
  return (
    <div>
      <TodoForm mutation={mutation} />
      <TodoList todos={todos} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
