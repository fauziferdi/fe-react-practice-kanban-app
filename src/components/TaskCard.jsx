import React from "react";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";
import Swal from "sweetalert2";

const TaskCard = ({ task, fetchTasks }) => {
  const handleStatusChange = async (newStatus) => {
    try {
      await axios.patch(`http://localhost:3000/tasks/${task.id}`, {
        status: newStatus,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDeleteTask = async () => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/tasks/${task.id}`);
          fetchTasks();
          Swal.fire("Terhapus!", "Task Anda telah dihapus.", "success");
        } catch (error) {
          console.error("Error deleting task:", error);
          Swal.fire("Error!", "Terjadi kesalahan saat menghapus task.");
        }
      }
    });
  };

  return (
    <div className="card bg-base-100 shadow-md relative">
      <button
        className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
        onClick={handleDeleteTask}
      >
        <IoMdCloseCircle size={30} />
      </button>
      <div className="card-body">
        <h2 className="card-title">{task.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: task.description }} />
        <div className="badge badge-outline">{task.category}</div>
        <div className="text-sm text-gray-500 mt-2">
          {task.startDate} - {task.endDate}
        </div>
        <div className="card-actions justify-end mt-4">
          {task.status !== "Backlog" && (
            <button
              className="btn btn-sm btn-outline"
              onClick={() => handleStatusChange("Backlog")}
            >
              Backlog
            </button>
          )}
          {task.status !== "On Progress" && (
            <button
              className="btn btn-sm btn-outline"
              onClick={() => handleStatusChange("On Progress")}
            >
              On Progress
            </button>
          )}
          {task.status !== "Done" && (
            <button
              className="btn btn-sm btn-outline"
              onClick={() => handleStatusChange("Done")}
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
