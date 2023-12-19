import React from "react";
import Card from "./Card";
import { useDrop } from "react-dnd";
import { TaskType } from "../@types";

interface ColumnProps {
  label: string;
  items: any[];
  handleDelete: (id: string, label: string) => void;
  handleEdit: (task: any, title: string, label: string) => void;
}

const Column: React.FC<ColumnProps> = ({
  label,
  items,
  handleDelete,
  handleEdit,
}) => {
  const [{}, drop] = useDrop(
    () => ({
      accept: "CARD",
      drop: (x: TaskType) => {
        console.log(x);
        handleEdit(x, x.title, label);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  return (
    <div ref={drop} className={`flex-1 bg-black m-5 rounded-xl h-full`}>
      <h2 className="text-xl font-bold mb-4 pb-0 pt-5">{label}</h2>
      <div className="overflow-y-scroll p-4 pt-0 board-column h-4/5">
        {items.map((item) => (
          <Card
            key={item.id}
            task={item}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
