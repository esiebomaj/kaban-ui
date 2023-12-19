import React, { useState } from "react";
import Column from "./Column";
import { useQuery } from "@apollo/client";
import { GET_TASkS } from "../graphql/queries";

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

  const { loading, error, data: qData } = useQuery(GET_TASkS);
  console.log(qData);

  if (loading) return <p>Loading...</p>;

  if (error)
    return (
      <div className="mt-5 text-red-600">
        <p>{error.message}</p>
      </div>
    );

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
