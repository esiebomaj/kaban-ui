import React from "react";
import Card from "./Card";
import { useDrop } from "react-dnd";

interface ColumnProps {
  title: string;
  items: any[];
  moveTocol: (item: any, col: string) => void;
}

const Column: React.FC<ColumnProps> = ({ title, items, moveTocol }) => {
  const [{}, drop] = useDrop(
    () => ({
      accept: "CARD",
      drop: (x) => {
        console.log(x);
        moveTocol(x, title);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  return (
    <div ref={drop} className="flex-1 bg-black m-5 rounded-xl h-full">
      <h2 className="text-xl font-bold mb-4 pb-0 pt-5">{title}</h2>
      <div className="overflow-y-scroll p-4 pt-0 board-column h-4/5">
        {items.map((item) => (
          <Card key={item.id} title={item.title} id={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Column;
