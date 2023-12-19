import { useQuery, useMutation } from "@apollo/client";
import {
  ADD_TASK_MUTATION,
  GET_TASkS,
  DELETE_TASK_MUTATION,
  EDIT_TASK_MUTATION,
} from "../graphql/queries";
import { useState } from "react";
import { TaskType, BoardStateType, TasksByLabel } from "../@types";

const useTasks = () => {
  const [data, setData] = useState<BoardStateType>({ tasks: {}, labels: [] });

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

      if (resData?.editTask?.task) {
        const newTask = resData?.editTask?.task;
        console.log("Edited sucessfully");
        const oldLabel = task.label;
        console.log(oldLabel, newLabel, data);
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
      } else {
        console.error("Error editing task:");
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
  return {
    loading,
    error,
    refetch,
    handleAddTask,
    handleDelete,
    handleEdit,
    data,
  };
};

export default useTasks;
