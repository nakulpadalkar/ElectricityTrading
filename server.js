require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database'); // Adjust the path as needed

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static('public')); // Serve static files

// Define routes here

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
