import React from "react";
import TaskCard from "./TaskCard";

const KanbanColumn = ({ title, tasks, fetchTasks }) => {
  return (
    <div className="flex-1 bg-gray-100 p-4 rounded shadow">
      <h3 className="text-lg font-bold text-gray-950 mb-4">{title}</h3>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} fetchTasks={fetchTasks} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
