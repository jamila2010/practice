import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { addTodo } from "../lib/requests";

function TodoForm({ mutation }) {
  const { register, watch, formState, reset, handleSubmit } = useForm();
  const { errors, isSubmitting } = formState;
  const submit = (todos) => {
    mutation.mutate({ ...todos, userId: 1 });
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
      <button className="border px-3 py-1 cursor-pointer rounded bg-blue-200 text-white w-40 mx-auto  ">
        Add
      </button>
    </form>
  );
}

export default TodoForm;
