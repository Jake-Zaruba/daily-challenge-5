const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//create todo

//get all todos

//get a todo

//update a todo

app.listen(5003, () => {
  console.log("server has started on port 5000");
});
