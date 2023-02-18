require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
// const reviewRoutes = require("./routes/reviewRoutes");


// Create server
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(`proccessing ${req.method} request to ${req.path}`);
  next();
});

// Create Routes
// app.use("/api/v1/users", userRoutes);


// Start Server
const port = process.env.PORT || 5000;
const run = async () => {
  try {
    // Connect to MongoDB database (via Mongoose)
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Start server; listen to requests on port
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

run();