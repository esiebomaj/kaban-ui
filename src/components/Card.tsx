import React from "react";
import { useDrag } from "react-dnd";

interface CardProps {
  title: string;
  id: number;
}

const Card: React.FC<CardProps> = ({ title, id }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: { title, id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-zinc-${isDragging ? 800 : 900} p-2 mb-2 rounded shadow`}
    >
      <h4 className="font-bold text-left">{title + id}</h4>
      <p className="text-xs text-left">2/12/2023</p>
    </div>
  );
};

export default Card;
