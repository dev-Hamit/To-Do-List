import React, { useState } from "react";

const ToDoAdd = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      await addTodo(title); 
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Failed to add todo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="card shadow-sm p-2 d-flex flex-column h-100 bg-transparent"
      style={{
        maxWidth: "auto",
        margin: "0 auto",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: "15px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
        color: "#fff",
        backgroundColor: "rgba(255, 255, 255, 0.20)",
      }}
    >
      <h4 className="card-title text-center mb-3 mt-5 neon-h1">📝 Add a New Task</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control form-control-lg neon-input mt-5"
            placeholder="Enter your task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.20)",
              color: "#1d1010ff",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)"
            }}
          />
        </div>
        <button
          type="submit"
          className="mt-3 w-100 btn-outline-secondary btn-ring"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default ToDoAdd;
