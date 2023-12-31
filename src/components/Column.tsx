import Card from "./Card";
import { useDrop } from "react-dnd";
import { TaskType } from "../@types";

interface ColumnProps {
  label: string;
  items: TaskType[];
  handleDelete: (id: string, label: string) => void;
  handleEdit: (task: any, title: string, label: string) => void;
  handleReorder: (task: any, priority: number) => void;
  sortBy: string;
}

const Column = ({
  label,
  items,
  handleDelete,
  handleEdit,
  handleReorder,
  sortBy,
}: ColumnProps) => {
  const [{}, drop] = useDrop(
    () => ({
      accept: "CARD",
      drop: (x: TaskType) => {
        if (x.label !== label) return handleEdit(x, x.title, label);
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
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleReorder={handleReorder}
            sortBy={sortBy}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
