import React, { useState, ReactNode, FormEvent } from "react";

interface AddProps {
  onSubmit: (title: string, label: string) => void;
  task?: any;
}

const AddTask = ({ onSubmit, task }: AddProps) => {
  const [data, setData] = useState(
    task || {
      title: "",
      label: "to-do",
    }
  );

  const handleChange = (e: any) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(data.title, data.label);
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <h4>Add new task</h4>
      <div className="mb-4 mt-5">
        {/* <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-600"
        >
          Title
        </label> */}
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          value={data.title}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md bg-black"
          required
        />
      </div>
      <div className="mb-4">
        {/* <label
          htmlFor="label"
          className="block text-sm font-medium text-gray-600"
        >
          Label
        </label> */}
        <select
          id="label"
          name="label"
          value={data.label}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md bg-black"
          required
        >
          <option value="to-do">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default AddTask;
