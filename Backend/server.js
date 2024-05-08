// Import required modules
const express = require("express");
const dotenv = require("dotenv");
const connectToDB = require("./configurations/connectMo_DB");
const Task = require("./dataModel/taskModel");
const taskRoutes = require("./routes/taskRoute")
const cors = require("cors")


// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use(cors(
  {
    origin : ["http://localhost:3000/","https://mers-task-manager.onrender.com/"]
  }
))
app.use("/api/tasks",taskRoutes);


// Define routes
app.get("/", (request, response) => {
  response.send("Home Page");
});




// Set the port
const PORT = process.env.PORT || 8000;

// Start the server function
const startServer = async () => {
  try {
    // Connect to the database
    await connectToDB();

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
    process.exit(1); // Exit the process with a failure code
  }
};

// Call the startServer function to start the application
startServer();
