import React from "react";

export default function Todo({
  title,
  id,
  deleteTask,
  completeTask,
  isComplete,
}) {
  const completedTaskStyle = {
    backgroundColor: "#bfffcc",
    // transition: "all 0.3s linear",
  };

  const completedTaskTitle = {
    textDecoration: "line-through",
  };

  return (
    <div className="todo-container">
      <h1 style={isComplete ? completedTaskTitle : null}>{title}</h1>
      <div className="btn-container">
        <button
          onClick={() => {
            completeTask(id);
          }}
          style={isComplete ? completedTaskStyle : null}
        >
          <ion-icon name="checkmark-outline"></ion-icon>
        </button>
        <button
          onClick={() => {
            deleteTask(id);
          }}
        >
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </div>
    </div>
  );
}
