import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import useForm from "../hooks/useForm";
import Swal from "sweetalert2";

const AddTaskModal = ({ handleModal, fetchTasks }) => {
  const initialValues = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    category: "Development",
    status: "Backlog",
  };

  const [form, handleChange, setForm] = useForm(initialValues);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/tasks", form);
      handleModal();
      fetchTasks();
      setForm(initialValues);

      Swal.fire("Berhasil!", "Task berhasil ditambahkan.", "success");
    } catch (error) {
      console.error("Error adding task:", error);
      Swal.fire("Error!", "Terjadi kesalahan saat menambahkan Task.", "error");
    }
  };
  return (
    <div className="modal modal-open">
      <form onSubmit={handleSubmit} className="modal-box">
        <h3 className="font-bold text-lg">Add Task</h3>
        <div className="form-control">
          <label className="label">Title</label>
          <input
            type="text"
            name="title"
            className="input input-bordered"
            value={form.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label className="label">Description</label>
          <CKEditor
            editor={ClassicEditor}
            data={form.description}
            onChange={(event, editor) => {
              const data = editor.getData();
              setForm({ ...form, description: data });
            }}
          />
        </div>

        <div className="form-control">
          <label className="label">Start Date</label>
          <input
            type="date"
            name="startDate"
            className="input input-bordered"
            value={form.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label className="label">End Date</label>
          <input
            type="date"
            name="endDate"
            className="input input-bordered"
            value={form.endDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label className="label">Tag</label>
          <select
            name="category"
            className="select select-bordered"
            value={form.category}
            onChange={handleChange}
          >
            <option>Development</option>
            <option>Testing</option>
            <option>Design</option>
          </select>
        </div>
        <div className="modal-action">
          <button type="button" className="btn" onClick={handleModal}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskModal;
