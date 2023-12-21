import React, { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Moment from "react-moment";
import { Edit2, Trash2 } from "react-feather";
import AddTask from "./AddTask";
import { TaskType } from "../@types";

interface CardProps {
  task: TaskType;
  handleEdit: (task: TaskType, title: string, label: string) => void;
  handleDelete: (id: string, label: string) => void;
  handleReorder: (task: TaskType, priority: number) => void;
  sortBy: string;
}

const Card: React.FC<CardProps> = ({
  task,
  handleDelete,
  handleEdit,
  handleReorder,
  sortBy,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const dragRef = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: task,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "CARD",
      drop: (x: TaskType) => {
        if (x.label === task.label) {
          handleReorder(x, task.priority + 1);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [task]
  );

  drag(drop(dragRef));

  const toggleShowEdit = () => setShowEdit(!showEdit);

  const onEdit = (title: string, label: string) => {
    handleEdit(task, title, label);
    toggleShowEdit();
  };

  const onDelete = () => {
    handleDelete(task.id, task.label);
  };

  return (
    <div
      ref={sortBy === "priority" ? dragRef : null}
      className={`bg-zinc-900 p-2 mb-2 rounded shadow hover:border-2 ${
        isOver ? "border-t-2" : ""
      } ${isDragging ? "border-2" : ""}`}
    >
      <h4 className="font-bold text-left">{task.title}</h4>
      <p className="text-xs text-left">
        <Moment format="YYYY/MM/DD">{task.createdAt}</Moment>
      </p>
      <div className="flex space-x-5 mt-4">
        <button
          className="p-2 text-xs bg-black text-blue-500 hover:text-blue-700"
          onClick={toggleShowEdit}
        >
          <Edit2 size={11} />
        </button>

        <button
          className="p-2 bg-black text-xs text-red-500 hover:text-red-700"
          onClick={onDelete}
        >
          <Trash2 size={11} />
        </button>
      </div>
      <AddTask
        task={task}
        onSubmit={onEdit}
        onClose={toggleShowEdit}
        isOpen={showEdit}
      />
    </div>
  );
};

export default Card;
