const Task = require("../dataModel/taskModel");

const createTask = async (request, response) => {
  try {
    // Create a new task based on the request body
    const task = await Task.create(request.body);

    // Log the received request body to the console (for debugging)
    console.log("Received task data:", request.body);

    // Send back the newly created task as a JSON response with status code 200 (OK)
    response.status(200).json(task);
  } catch (error) {
    // Handle any errors that occur during task creation
    console.error("Error creating task:", error);
    response.status(500).json({ msg: "Internal Server Error" });
  }
};

// Get all the tasks

const getTasks = async (request, response) => {
  try {
    const tasks = await Task.find();

    if (!tasks || tasks.length === 0) {
      return response.status(404).json({ msg: "No tasks found" });
    }

    response.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    response.status(500).json({ msg: "Internal Server Error" });
  }
};

// Get Single Task

const getSingleTask = async (request, response) => {
  try {
    const { id } = request.params;

    const task = await Task.findById(id); //

    if (!task) {
      // If no task is found with the specified ID
      return response
        .status(404)
        .json({ msg: `Task not found with this Id :  ${id}` });
    }

    // Task found, return it as JSON response
    response.status(200).json(task);
  } catch (error) {
    // Handle any unexpected errors (e.g., database query error)
    response.status(500).json({ msg: error.message });
  }
};

// Delete Task

const deleteTask = async (request, response) => {
  try {
    const { id } = request.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return response
        .status(404)
        .json({ msg: `Task not found with this Id :  ${id}` });
    }

    response.status(200).send(`Task has been Deleted with Id : ${id}`);
  } catch (error) {
    response.status(500).json({ msg: error.message });
  }
};

// Update Task

const updateTask = async (request, response) => {
  try {
    const { id } = request.params;
    const task = await Task.findByIdAndUpdate({ 
        _id: id 
    }, request.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
        return response
          .status(404)
          .json({ msg: `Task not found with this Id :  ${id}` });
      }

    response.status(200).json(task);
  } catch (error) {
    response.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createTask: createTask,
  getTasks: getTasks,
  getSingleTask: getSingleTask,
  deleteTask,
  updateTask,
};


/*

const Task = require("../dataModel/taskModel");

const handleErrorResponse = (response, error) => {
  console.error("Error:", error);
  response.status(500).json({ msg: "Internal Server Error" });
};

const createTask = async (request, response) => {
  try {
    const task = await Task.create(request.body);
    console.log("Received task data:", request.body);
    response.status(200).json(task);
  } catch (error) {
    handleErrorResponse(response, error);
  }
};

const getTasks = async (request, response) => {
  try {
    const tasks = await Task.find();
    if (!tasks || tasks.length === 0) {
      return response.status(404).json({ msg: "No tasks found" });
    }
    response.status(200).json(tasks);
  } catch (error) {
    handleErrorResponse(response, error);
  }
};

const getSingleTask = async (request, response) => {
  try {
    const { id } = request.params;
    const task = await Task.findById(id);
    if (!task) {
      return response.status(404).json({ msg: `Task not found with Id: ${id}` });
    }
    response.status(200).json(task);
  } catch (error) {
    handleErrorResponse(response, error);
  }
};

const deleteTask = async (request, response) => {
  try {
    const { id } = request.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return response.status(404).json({ msg: `Task not found with Id: ${id}` });
    }
    response.status(200).send(`Task has been deleted with Id: ${id}`);
  } catch (error) {
    handleErrorResponse(response, error);
  }
};

const updateTask = async (request, response) => {
  try {
    const { id } = request.params;
    const task = await Task.findByIdAndUpdate(id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return response.status(404).json({ msg: `Task not found with Id: ${id}` });
    }
    response.status(200).json(task);
  } catch (error) {
    handleErrorResponse(response, error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getSingleTask,
  deleteTask,
  updateTask,
};


*/