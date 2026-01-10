import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { addTodo } from "../lib/requests";

function TodoForm({ mutation, updateMutation, updateData, setUpdateData }) {
  const { register, watch, formState, reset, handleSubmit, setValue } =
    useForm();
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (updateData) {
      setValue("title", updateData.title);
    }
  }, [updateData]);

  const submit = async (todo) => {
    if (updateData) {
      updateMutation.mutate({
        id: updateData.id,
        updatedTodo: todo,
      });
    } else {
      mutation.mutate({ ...todo, userId: 1 });
    }
    setUpdateData(null);
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="mx-auto w-150 mt-4 flex flex-col gap-3 "
    >
      <label htmlFor="title" className="">
        Todo:
      </label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Enter new todo"
        className="border rounded w-100 px-2 py-1"
        {...register("title", { required: "Todo is required!" })}
      />
      <p className="text-red-700"> {errors.title?.message}</p>
     <div className="flex items-center mx-auto ml-3 gap-3 w-90 ">
       {updateData && (
        <button
          type="button"
          onClick={()=>{
            setUpdateData(null)
            reset()
          }}
          className="w-full border px-3 py-1 cursor-pointer rounded bg-blue-200 text-white "
        >
         Cancel
        </button>
      )}
      <button className="border px-3 py-1 cursor-pointer rounded bg-blue-200 text-white w-full  ">
        {isSubmitting ? "Loading..." : updateData ? "Edit" : "Add"}
      </button>
     </div>
    </form>
  );
}

export default TodoForm;
