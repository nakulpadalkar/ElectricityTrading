// server.js or app.js
const express = require('express');
const mongoose = require('mongoose');
const HouseData = require('./models/HouseData'); // Import your model

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// MongoDB connection
mongoose.connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Example route to insert data into the database
app.post('/api/houses', async (req, res) => {
  try {
    const newHouse = new HouseData(req.body);
    const savedHouse = await newHouse.save();
    res.status(201).json(savedHouse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// More routes and logic here...

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
