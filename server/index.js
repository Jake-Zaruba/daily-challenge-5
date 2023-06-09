const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware

app.use(cors());
app.use(express.json());

//ROUTES-----------------

//create todo

app.post("/todos", async (req, res) => {
  try {
    const { description, is_complete } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description, is_complete) VALUES($1, $2) RETURNING *",
      [description, is_complete]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query(
      "SELECT * FROM todo ORDER BY todo_id ASC"
    );
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1, is_complete = NOT is_complete WHERE todo_id = $2",
      [description, id]
    );
    res.json("Todo was updated");
  } catch (err) {
    console.log(err.message);
  }
});

//complete a todo

app.patch("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateTodo = await pool.query(
      "UPDATE todo SET is_complete = NOT is_complete WHERE todo_id = $1",
      [id]
    );
    res.json("Todo was updated");
  } catch (err) {
    console.log(err.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo deleted");
  } catch (err) {
    console.log(err.message);
  }
});

//start server

app.listen(5003, () => {
  console.log("server has started on port 5003");
});
