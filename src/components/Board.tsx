import React, { useState } from "react";
import Column from "./Column";
import { useQuery, useMutation } from "@apollo/client";
import {
  ADD_TASK_MUTATION,
  GET_TASkS,
  DELETE_TASK_MUTATION,
  EDIT_TASK_MUTATION,
} from "../graphql/queries";
import Modal from "./Modal";
import AddTask from "./AddTask";

import { TaskType, BoardStateType, TasksByLabel } from "../@types";

const Board: React.FC = () => {
  const [data, setData] = useState<BoardStateType>({ tasks: {}, labels: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatTasks = (data: any) => {
    let tasks: TasksByLabel = {};
    for (let label of data.labels) {
      tasks[label] = data.tasks.filter((t: any) => t.label === label);
    }
    const formatedData = { ...data, tasks: tasks };
    setData(formatedData);
  };

  const { loading, error, refetch } = useQuery(GET_TASkS, {
    onCompleted: formatTasks,
  });
  const [addTaskMutation] = useMutation(ADD_TASK_MUTATION);
  const [deleteTaskMutation] = useMutation(DELETE_TASK_MUTATION);
  const [editTaskMutation] = useMutation(EDIT_TASK_MUTATION);

  const handleAddTask = async (title: string, label: string) => {
    try {
      const {
        data: {
          createTask: { task },
        },
      } = await addTaskMutation({ variables: { title, label } });

      console.log("Task added successfully:", task);

      // add to data in state
      setData({
        ...data,
        tasks: {
          ...data.tasks,
          [label]: [task, ...data.tasks[label]],
        },
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
    refetch();
    setIsModalOpen(false);
  };

  const handleEdit = async (
    task: TaskType,
    newTitle: string,
    newLabel: string
  ) => {
    try {
      const { data: resData } = await editTaskMutation({
        variables: { taskId: task.id, title: newTitle, label: newLabel },
      });

      // Check the result of the mutation
      if (resData?.editTask?.task) {
        const newTask = resData?.editTask?.task;
        // The task was edited successfully
        console.log("Edited sucessfully");
        const oldLabel = task.label;

        const oldLabelTasks = data.tasks[oldLabel].filter(
          (t) => t.id !== task.id
        );
        const newLabelTasks = [
          newTask,
          ...data.tasks[newLabel].filter((t) => t.id !== task.id),
        ];

        setData({
          ...data,
          tasks: {
            ...data.tasks,
            [oldLabel]: oldLabelTasks,
            [newLabel]: newLabelTasks,
          },
        });

        // Optionally, you can update the UI with the updated task data
      } else {
        // Handle the case where editing was not successful
        console.error(
          "Error editing task:",
          resData?.editTask?.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const handleDelete = async (id: string, label: string) => {
    try {
      const {
        data: {
          deleteTask: { success },
        },
      } = await deleteTaskMutation({
        variables: { taskId: id },
      });

      // Check the result of the mutation
      if (success) {
        // The task was deleted successfully
        console.log("Deleted success");
        setData({
          ...data,
          tasks: {
            ...data.tasks,
            [label]: data.tasks[label].filter((t) => t.id !== id),
          },
        });
      } else {
        // Handle the case where deletion was not successful
        console.error("couldnt delete");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (error)
    return (
      <div className="mt-5 text-red-600">
        <p>{error.message}</p>
      </div>
    );

  return (
    <div className="flex w-screen p-5 h-5/6">
      <div
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="absolute right-10 top-10 "
      >
        <button className="bg-black text-white">Add +</button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddTask onSubmit={handleAddTask} />
      </Modal>

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
