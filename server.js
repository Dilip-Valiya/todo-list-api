const express = require('express');
const bodyParser = require('body-parser');
const userService = require('./service/userService');
const taskService = require('./service/taskService');

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());

// Endpoint to get all users
app.get('/users', async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to add a new user
app.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = await userService.addUser(name, email);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error adding a new user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const users = await taskService.getTasks();
        res.json(users);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to add a new task
app.post('/tasks', async (req, res) => {
    try {
        const { title, description, user_id } = req.body;
        const newUser = await taskService.addTask(title, description, user_id);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error adding a new task:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
