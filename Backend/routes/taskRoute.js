const express = require("express");
const Task = require("../dataModel/taskModel");
const router = express.Router();
const { createTask, getTasks, getSingleTask, deleteTask, updateTask } = require("../controllers/taskController");


// Route to create a new task
router.post("/", createTask);

// GET /api/tasks - Retrieve all tasks
router.get("/", getTasks);

// Get Single Task
router.get("/:id", getSingleTask);

// Delete Task
router.delete("/:id", deleteTask);

// Update Task
router.put("/:id", updateTask);


// router.route to compress uppar wale methods....
module.exports = router;
