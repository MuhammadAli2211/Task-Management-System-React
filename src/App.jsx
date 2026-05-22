import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const savedTasks =
      JSON.parse(localStorage.getItem("tasks")) || [];

    setTasks(savedTasks);
  }, []);

  const saveToLocal = (updatedTasks) => {
    setTasks(updatedTasks);

    localStorage.setItem(
      "tasks",
      JSON.stringify(updatedTasks)
    );
  };

  const addTask = () => {
    if (!task.trim()) {
      alert("Please enter task title");
      return;
    }
    if (dueDate) {
    const today = new Date();
    const selectedDate = new Date(dueDate);

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("❌ Due date cannot be in the past!");
      return;
    }
  }

    if (editId) {
      const updatedTasks = tasks.map((item) =>
        item.id === editId
          ? {
              ...item,
              task,
              description,
              dueDate,
            }
          : item
      );

      saveToLocal(updatedTasks);

      setEditId(null);
    } else {
      const newTask = {
        id: Date.now(),
        task,
        description,
        dueDate,
      };

      saveToLocal([...tasks, newTask]);
    }

    setTask("");
    setDescription("");
    setDueDate("");
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter(
      (item) => item.id !== id
    );

    saveToLocal(filteredTasks);
  };

  const editTask = (item) => {
    setTask(item.task);
    setDescription(item.description);
    setDueDate(item.dueDate);
    setEditId(item.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="app">


      <nav className="navbar">
        <div className="logo">
          <span>✓</span>
          Task Management System
        </div>

        <div className="task-count">
          {tasks.length} Tasks
        </div>
      </nav>

      {/* MAIN */}

      <div className="container">

        {/* FORM */}

        <div className="task-form">

          <div className="form-header">
            <h2>
              {editId
                ? "Update Task"
                : "Create New Task"}
            </h2>

          </div>

          <div className="input-group">
            <label>Task Title</label>

            <input
              type="text"
              placeholder="Enter task title"
              value={task}
              onChange={(e) =>
                setTask(e.target.value)
              }
            />
          </div>

          <div className="input-group">
            <label>Description</label>

            <textarea
              rows="4"
              placeholder="Write task details"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            ></textarea>
          </div>

          <div className="input-group">
            <label>Due Date</label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
            />
          </div>

          <button
            className="submit-btn"
            onClick={addTask}
          >
            {editId
              ? "Save Changes"
              : "Add Task"}
          </button>

        </div>

        {/* TASKS */}

        <div className="tasks-section">

          <div className="section-header">
            <h2>Tasks List</h2>
            <br />

          </div>

          {tasks.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                📋
              </div>

              <h3>No Tasks Yet</h3>

              <p>
                Create your first task to get started
              </p>

            </div>

          ) : (

            <div className="tasks-grid">

              {tasks.map((item) => (

                <div
                  key={item.id}
                  className="task-card"
                >

                  <div className="card-top"></div>

                  <div className="task-content">

                    <h3>{item.task}</h3>

                    <p>
                      {item.description ||
                        "No description added"}
                    </p>

                  </div>

                  <div className="task-footer">

                    <span className="date">

                      {item.dueDate
                        ? new Date(
                            item.dueDate
                          ).toLocaleDateString()
                        : "No Date"}

                    </span>

                    <div className="actions">

                      <button
                        className="edit-btn"
                        onClick={() =>
                          editTask(item)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteTask(item.id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default App;