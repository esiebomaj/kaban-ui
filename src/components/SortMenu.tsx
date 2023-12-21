import React, { ChangeEvent } from "react";

interface SortMenuProps {
  onSortChange: (sortOption: "priority" | "createdAt") => void;
  selectedSort: string;
}

const SortMenu: React.FC<SortMenuProps> = ({ onSortChange, selectedSort }) => {
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newSortOption = event.target.value as "priority" | "createdAt";
    onSortChange(newSortOption);
  };

  return (
    <div className="ml-5 flex justify-center ">
      <label className=" m-2 flex items-center" htmlFor="sortFilter">
        Sort By:
      </label>
      <select
        className="rounded bg-black px-2"
        id="sortFilter"
        value={selectedSort}
        onChange={handleSortChange}
      >
        <option value="createdAt">Created Date</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default SortMenu;
