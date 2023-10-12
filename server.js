const express = require("express");
const bodyParser = require("body-parser");
const userService = require("./service/userService");
const taskService = require("./service/taskService");

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());

const handler = (result, res) => {
  if (result.status >= 200 && result.status < 400) {
    res.status(result.status).json(result.data);
  } else if (result.status >= 400 && result.status < 500) {
    res.status(result.status).json({ error: result.error });
  } else {
    console.error("Error from inner block:", result.error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

// Endpoint to get all users
app.get("/users", async (req, res) => {
  try {
    const result = await userService.getUsers();
    handler(result, res);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to get user by id
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.getUser(id);
    handler(result, res);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to add a new user
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await userService.addUser(name, email);
    handler(result, res);
  } catch (error) {
    console.error("Error adding a new user:", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
});

// Endpoint to edit an existing user details
app.put("/users/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const { id } = req.params;
    const result = await userService.editUser(name, email, id);
    handler(result, res);
  } catch (error) {
    console.error("Error editing a new user:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const result = await taskService.getTasks();
    handler(result, res);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to get task by id
app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await taskService.getTask(id);
    handler(result, res);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to add a new task
app.post("/tasks", async (req, res) => {
  try {
    const { title, description, user_id } = req.body;
    const result = await taskService.addTask(title, description, user_id);
    handler(result, res);
  } catch (error) {
    console.error("Error adding a new task:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to add a new task
app.put("/tasks/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;
    const result = await taskService.editTask(title, description, id);
    handler(result, res);
  } catch (error) {
    console.error("Error updating a task:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
