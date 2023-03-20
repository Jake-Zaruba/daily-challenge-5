import { useEffect, useState } from "react";
import Todo from "./components/Todo";

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  //GET TASKS

  const getTodos = async () => {
    const response = await fetch("http://localhost:5003/todos");
    const data = await response.json();
    setTaskList(data);
  };
  useEffect(() => {
    getTodos();
    console.log(taskList);
  }, []);

  //ADD TASK

  async function addTask() {
    if (!task) {
      return alert("Please enter a task");
    } else {
      const taskItem = {
        description: task,
        is_complete: false,
        // id: Math.floor(Math.random() * 1000),
      };
      const body = taskItem;
      setTaskList((prev) => [...prev, taskItem]);
      const response = await fetch("http://localhost:5003/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      getTodos();
      setTask("");
    }
  }

  //DELETE TASK

  async function deleteTask(id) {
    try {
      const deleteTodo = await fetch(`http://localhost:5003/todos/${id}`, {
        method: "DELETE",
      });
      getTodos();
    } catch (err) {
      console.error(err.message);
    }
  }

  //COMPLETE TASK

  async function completeTask(id) {
    try {
      const completeTodo = await fetch(`http://localhost:5003/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      getTodos();
    } catch (err) {
      console.error(err.message);
    }
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
            <li key={item?.todo_id}>
              {
                <Todo
                  title={item.description}
                  id={item.todo_id}
                  deleteTask={deleteTask}
                  completeTask={completeTask}
                  isComplete={item.is_complete}
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
