import { useQuery, useMutation } from "@apollo/client";
import {
  ADD_TASK_MUTATION,
  GET_TASkS,
  DELETE_TASK_MUTATION,
  EDIT_TASK_MUTATION,
  REORDER_TASK_MUTATION,
} from "../graphql/queries";
import { useState, useEffect } from "react";
import { TaskType, BoardStateType, TasksByLabel } from "../@types";

const useTasks = (sortBy: string) => {
  const boardId = "123";
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
    variables: { boardId, sortBy },
  });

  useEffect(() => {
    refetch({ sortBy });
  }, [sortBy, boardId]);

  const [addTaskMutation] = useMutation(ADD_TASK_MUTATION);
  const [deleteTaskMutation] = useMutation(DELETE_TASK_MUTATION);
  const [editTaskMutation] = useMutation(EDIT_TASK_MUTATION);
  const [reorderTaskMutation] = useMutation(REORDER_TASK_MUTATION);

  const handleAddTask = async (title: string, label: string) => {
    try {
      const {
        data: {
          createTask: { task },
        },
      } = await addTaskMutation({ variables: { boardId, title, label } });

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
        variables: {
          boardId,
          taskId: task.id,
          title: newTitle,
          label: newLabel,
        },
      });

      if (resData?.editTask?.task) {
        const newTask = resData?.editTask?.task;

        console.log("Edited sucessfully");

        setData((prevData) => {
          const updatedTasks = { ...prevData.tasks };

          // Remove the task from the old label
          updatedTasks[task.label] = updatedTasks[task.label].filter(
            (t) => t.id !== task.id
          );

          // update the task in the new label
          updatedTasks[newLabel] = updatedTasks[newLabel].map((t) => {
            return t.id === task.id ? newTask : t;
          });

          if (task.label !== newLabel)
            updatedTasks[newLabel] = [newTask, ...updatedTasks[newLabel]];

          return {
            ...prevData,
            tasks: updatedTasks,
          };
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
      } = await deleteTaskMutation({ variables: { boardId, taskId: id } });

      if (success) {
        console.log("Deleted success");

        const updatedTasks = {
          ...data.tasks,
          [label]: data.tasks[label].filter((t) => t.id !== id),
        };

        setData({
          ...data,
          tasks: updatedTasks,
        });
      } else {
        console.error("couldnt delete");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleReorder = async (task: TaskType, priority: number) => {
    try {
      const { data: resData } = await reorderTaskMutation({
        variables: { boardId, taskId: task.id, priority },
      });

      if (resData?.reorderTask?.success) {
        console.log("Order updated sucessfully");

        const updatedTask = { ...task, priority };

        setData((prevData) => {
          const newTasks = prevData.tasks[task.label]
            .map((t) => {
              return t.id !== task.id ? t : updatedTask;
            })
            .sort((a, b) => b.priority - a.priority);

          return {
            ...prevData,
            tasks: {
              ...prevData.tasks,
              [task.label]: newTasks,
            },
          };
        });
      } else {
        console.error("Error editing task:");
      }
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  return {
    loading,
    error,
    refetch,
    handleAddTask,
    handleDelete,
    handleEdit,
    handleReorder,
    data,
  };
};

export default useTasks;
