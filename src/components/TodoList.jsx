import { FaEdit, FaTrash } from "react-icons/fa";

function TodoList({
  todos,
  handleDelete,
  updateData,
  setUpdateData,
  updateMutation,
}){

  console.log(todos)
  return (
    <div className="flex flex-col gap-4 mt-10">
      {todos?.map(({ title, id }) => {
        return (
          <div
            key={id}
            className="border px-3 rounded py-2 mx-auto w-200 flex justify-between"
          >
            <h1>Task: {title} </h1>
          <div className="ml-auto flex gap-2 ">
              <button
              onClick={() => {
                handleDelete(id);
              }}
              className="cursor-pointer active:text-red-700 active:rotate-20 hover:rotate-25 "
            >
              {" "}
              <FaTrash />
            </button>
            <button
              onClick={() => {
                setUpdateData({ id, title });
              }}
              className=" w-4 cursor-pointer hover:rotate-12 hover:text-amber-600 active:text-amber-700 mt-2 text-[20px]  "
            >
              {" "}
              <FaEdit />
            </button>
          </div>
          </div>
        );
      })}
    </div>
  );
}

export default TodoList;
