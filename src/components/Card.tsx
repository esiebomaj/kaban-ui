import React, { useState } from "react";
import { useDrag } from "react-dnd";
import Moment from "react-moment";
import { Edit2, Trash2 } from "react-feather";
import AddTask from "./AddTask";
import Modal from "./Modal";
import { TaskType } from "../@types";

interface CardProps {
  task: TaskType;
  handleEdit: (task: any, title: string, label: string) => void;
  handleDelete: (id: string, label: string) => void;
}

const Card: React.FC<CardProps> = ({ task, handleDelete, handleEdit }) => {
  const [showEdit, setShowEdit] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: task,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const toggleShowEdit = () => setShowEdit(!showEdit);

  const onEdit = (title: string, label: string) => {
    handleEdit(task, title, label);
    setShowEdit(false);
  };

  const onDelete = () => {
    handleDelete(task.id, task.label);
  };

  return (
    <div
      ref={drag}
      className={`bg-zinc-900 p-2 mb-2 rounded shadow hover:border-2 ${
        isDragging ? "border-2" : ""
      }`}
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

      <Modal isOpen={showEdit} onClose={toggleShowEdit}>
        <AddTask task={task} onSubmit={onEdit} />
      </Modal>
    </div>
  );
};

export default Card;
