import React, { useState, useRef, useEffect } from "react";
import ToDoAdd from "./Component/ToDoAdd";
import ToDoList from "./Component/ToDoList";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const leftPanelRef = useRef();
  const [isResizing, setIsResizing] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch todos from backend
  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Add todo (POST request + fetch updated list)
  const addTodo = async (title) => {
    try {
      await axios.post(API_URL, { title });
      fetchTodos(); // fetch updated list
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Failed to add todo");
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Toggle completed
  const toggleTodo = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  // Window resize check
  useEffect(() => {
    const handleResizeWindow = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResizeWindow);
    return () => window.removeEventListener("resize", handleResizeWindow);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      const leftOffset = leftPanelRef.current.getBoundingClientRect().left;
      let newWidth = e.clientX - leftOffset;
      if (newWidth < 200) newWidth = 200;
      if (newWidth > 600) newWidth = 600;
      leftPanelRef.current.style.width = newWidth + "px";
    };

    const handleMouseUp = () => setIsResizing(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  // Initial fetch
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div
      className="bg-transparent"
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        height: "90vh",
        width: isMobile ? "90%" : "900px",
        margin: "50px auto",
        color: "#ab3030ff",
        backgroundColor: "rgba(255, 255, 255, 0.20)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: "15px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.37)"
      }}
    >
      {/* Left Panel */}
      <div
        className="bg-transparent"
        ref={leftPanelRef}
        style={{
          width: isMobile ? "100%" : "350px",
          minWidth: isMobile ? "100%" : "250px",
          borderRight: isMobile ? "none" : "2px solid rgba(255,255,255,0.2)",
          borderBottom: isMobile ? "2px solid rgba(255,255,255,0.2)" : "none",
          overflow: "auto",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderRadius: "10px",
          margin: "10px"
        }}
      >
        <ToDoAdd addTodo={addTodo} /> {/* pass addTodo here */}
      </div>

      {/* Divider */}
      {!isMobile && (
        <div
          style={{
            width: "6px",
            cursor: "col-resize",
            background: "rgba(255,255,255,0.2)"
          }}
          onMouseDown={() => setIsResizing(true)}
        ></div>
      )}

      {/* Right Panel */}
      <div
        className="bg-transparent"
        style={{
          flexGrow: 1,
          overflow: "auto",
          width: isMobile ? "100%" : "auto",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderRadius: "10px",
          margin: "10px"
        }}
      >
        <ToDoList
          todos={todos}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      </div>
    </div>
  );
};

export default App;
