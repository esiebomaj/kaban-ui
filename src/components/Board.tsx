import React, { useState } from "react";
import Column from "./Column";
import AddTask from "./AddTask";
import useTasks from "../hooks/useTasks";
import SortMenu from "./SortMenu";

const Board: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>("createdAt");

  const {
    loading,
    error,
    handleAddTask,
    data,
    handleDelete,
    handleEdit,
    handleReorder,
  } = useTasks(selectedSort);

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
      <div className="absolute right-10 top-10 flex">
        <button onClick={toggleShowAddModal} className="bg-black text-white">
          Add +
        </button>
        <SortMenu
          selectedSort={selectedSort}
          onSortChange={(s: string) => setSelectedSort(s)}
        />
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
            handleReorder={handleReorder}
            sortBy={selectedSort}
          />
        ))}
    </div>
  );
};

export default Board;
