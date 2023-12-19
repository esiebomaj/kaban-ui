import React, { useState } from "react";
import Column from "./Column";
import AddTask from "./AddTask";
import useTasks from "../hooks/useTasks";

const Board: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { loading, error, handleAddTask, data, handleDelete, handleEdit } =
    useTasks();

  const toggleShowAddModal = () => setShowAddModal(!showAddModal);

  if (loading) return <p>Loading...</p>;

  if (error)
    return (
      <div className="mt-5 text-red-600">
        <p>{error.message}</p>
      </div>
    );

  return (
    <div className="flex w-screen p-5 h-5/6">
      <div onClick={toggleShowAddModal} className="absolute right-10 top-10 ">
        <button className="bg-black text-white">Add +</button>
      </div>

      <AddTask
        onSubmit={handleAddTask}
        isOpen={showAddModal}
        onClose={toggleShowAddModal}
      />

      {data.labels &&
        data.labels.map((col: string) => (
          <Column
            key={col}
            label={col}
            items={data.tasks[col]}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
    </div>
  );
};

export default Board;
