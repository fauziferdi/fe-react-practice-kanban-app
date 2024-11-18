import React, { useState, useEffect } from "react";
import KanbanColumn from "../components/KanbanColumn";
import Navbar from "../components/Navbar";
import AddTaskModal from "../components/AddTaskModal";
import axios from "axios";

const KanbanContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <Navbar handleModal={handleModal} />
      {isModalOpen && (
        <AddTaskModal handleModal={handleModal} fetchTasks={fetchTasks} />
      )}

      <div className="p-4">
        <div className="flex gap-3 p-4">
          <KanbanColumn
            title="Backlog"
            tasks={tasks.filter((task) => task.status === "Backlog")}
            fetchTasks={fetchTasks}
          />

          <KanbanColumn
            title="On Progress"
            tasks={tasks.filter((task) => task.status === "On Progress")}
            fetchTasks={fetchTasks}
          />

          <KanbanColumn
            title="Done"
            tasks={tasks.filter((task) => task.status === "Done")}
            fetchTasks={fetchTasks}
          />
        </div>
      </div>
    </div>
  );
};

export default KanbanContainer;
