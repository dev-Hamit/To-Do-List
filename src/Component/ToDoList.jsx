import React from "react";

const TodoList = ({ todos, toggleTodo, deleteTodo }) => {
  return (
    <div
      className="card shadow-sm p-3 d-flex flex-column h-100"
      style={{
        maxWidth: "auto",
        margin: "0 auto",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "20px",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5), 0 0 10px rgba(0,255,255,0.2) inset",
        color: "#fff",

      }}
    >
      <h4
        className="mb-3 text-center mt-5"
        style={{
          color: "rgba(4, 12, 12, 1)",
          textShadow: "0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff",
        }}
      >
        📋 Todo List
      </h4>

      {todos.length === 0 ? (
        <p
          className="text-center"
          style={{
            color: "#0a0b09ff",
            fontStyle: "italic",
            textShadow: "0 0 3px #0ff",
          }}
        >
          No todos found. Add some tasks!
        </p>
      ) : (
        <ul
          className="list-group"
          style={{ background: "transparent", border: "none", padding: 0 }}
        >
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                borderRadius: "12px",
                marginBottom: "10px",
                border: "1px solid rgba(49, 194, 194, 0.3)",
                color: todo.completed ? "#888" : "#fff",
                boxShadow: todo.completed
                  ? "0 0 5px rgba(255,255,255,0.1)"
                  : "0 0 8px #0ff, 0 0 15px #0ff inset",
              }}
            >
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "#888" : "#fff",
                  fontWeight: "900",
                  textShadow: todo.completed ? "none" : "0 0 2px #0ff",
                  color: "#000",
                }}
              >
                {todo.title}
              </span>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  className="btn btn-success btn-sm"
                  style={{
                    boxShadow:
                      "0 0 4px rgba(71 117, 117, 1), 0 0 8px #0f0, 0 0 12px #0f0 inset",
                  }}
                  onClick={() => toggleTodo(todo._id)}
                >
                  {todo.completed ? "↩️" : "✅"}
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  style={{
                    boxShadow:
                      "0 0 4px rgba(71 117, 117, 1), 0 0 8px #f00, 0 0 12px #f00 inset",
                  }}
                  onClick={() => deleteTodo(todo._id)}
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
