const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const playerRoutes = require("./routes/playerRoutes");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Configure CORS to allow all origins except localhost
const corsOptions = {
  origin: function (origin, callback) {
    // Allow all origins except localhost
    if (!origin || origin.includes("localhost")) {
      // Block localhost and return an error
      callback(new Error("Requests from localhost are not allowed"));
    } else {
      // Allow other origins
      callback(null, true);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // Define allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Define allowed headers
};

app.use(cors(corsOptions)); // Apply CORS middleware with the specified options

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", playerRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
