// models/HouseData.js
const mongoose = require('mongoose');

// Define the schema
const houseSchema = new mongoose.Schema({
  lat: Number,
  lon: Number,
  solarGenerationPerMonth: Number,
  consumption: Number,
  // Add more fields as necessary
});

// Compile and export the model
const HouseData = mongoose.model('HouseData', houseSchema);

module.exports = HouseData;
