import React, { useState } from "react";
import Column from "./Column";

const Board: React.FC = () => {
  const [data, setData] = useState({
    cols: ["To Do", "In Progress", "Blocked", "Done"],
    items: {
      "To Do": [
        { id: 1, title: "New task activated" },
        { id: 2, title: "New task activated" },
      ],
      "In Progress": [
        { id: 3, title: "New task activated" },
        { id: 4, title: "New task activated" },
        { id: 5, title: "New task activated" },
        { id: 6, title: "New task activated" },
      ],
      Blocked: [],
      Done: [{ id: 7, title: "New task activated" }],
    },
  });
  const moveTocol = (item: any, col: string) => {
    setData({
      ...data,
      items: { ...data.items, [col]: [...data.items[col], item] },
    });
  };

  return (
    <div className="flex w-screen p-5 h-5/6">
      {data.cols.map((col: string) => (
        <Column
          key={col}
          title={col}
          items={data.items[col]}
          moveTocol={moveTocol}
        />
      ))}
    </div>
  );
};

export default Board;
