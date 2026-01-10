import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getData } from "./lib/requests";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { addTodo, deleteTodo, updateTodo } from "./lib/requests";
import { toast } from "sonner";
import { useState } from "react";

function App() {
  const queryClient = useQueryClient();
  const [updateData, setUpdateData] = useState(null);
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
      queryClient.setQueryData(["todos"], (oldTodos = []) => {
        return [...oldTodos, todo];
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: async (_, id) => {
      // const id = variables.id;
      queryClient.setQueryData(["todos"], (oldTodos = []) => {
        return oldTodos?.filter((todo) => {
          return todo.id !== id;
        });
      });
      toast.success("The todo deleted successfully!");
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: async (newTodo) => {
      queryClient.setQueryData(["todos"], (oldTodos = []) => {
        return oldTodos.map((todo) => {
          todo.id == newTodo.id ? newTodo : todo;
        });
      });
    },
  });

  // console.log(todos);
  return (
    <div>
      <TodoForm
        mutation={mutation}
        updateMutation={updateMutation}
        setUpdateData={setUpdateData}
        updateData={updateData}
      />
      <TodoList
        todos={todos}
        handleDelete={handleDelete}
        updateMutation={updateMutation}
        setUpdateData={setUpdateData}
        updateData={updateData}
      />
    </div>
  );
}

export default App;
