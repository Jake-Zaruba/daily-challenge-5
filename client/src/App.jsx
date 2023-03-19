import { useState } from "react";
import Todo from "./components/Todo";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  //?????
  const todoList = async () => {
    await fetch("http://localhost:5003/todos").then((res) =>
      res.json().then((data) => {
        data.map((item) => {
          return <div>{item}</div>;
        });
      })
    );
  };

  async function addTask() {
    if (!task) {
      return alert("Please enter a task");
    } else {
      const taskItem = {
        description: task,
        isComplete: false,
        id: Math.floor(Math.random() * 1000),
      };
      setTaskList((prev) => [...prev, taskItem]);
      const body = taskItem;
      const response = await fetch("http://localhost:5003/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      setTask("");
    }
  }

  function deleteTask(id) {
    const newArray = taskList.filter((item) => {
      return item.id !== id;
    });
    setTaskList(newArray);
  }

  function completeTask(id) {
    const newArray = taskList.map((item) => {
      if (item.id === id) {
        return { ...item, isComplete: !item.isComplete };
      }
      return item;
    });
    setTaskList(newArray);
  }

  return (
    <div className="App">
      <h1>Task List</h1>
      <div className="add-task-container">
        <input
          type="text"
          placeholder="Add Task"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
        />
        <button className="add-task-btn" onClick={() => addTask()}>
          Add
        </button>
      </div>
      <ul>
        {taskList.map((item) => {
          return (
            <li key={item.id}>
              {
                <Todo
                  title={item.description}
                  id={item.id}
                  deleteTask={deleteTask}
                  completeTask={completeTask}
                  isComplete={item.isComplete}
                />
              }
            </li>
          );
        })}
      </ul>
      {taskList.length === 0 && <h3>You're all caught up!</h3>}
    </div>
  );
}

export default App;
