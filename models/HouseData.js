// models/HouseData.js
const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  lat: Number,
  lon: Number,
  // Assuming these are average daily values; you might need more detailed time-based data
  solarGenerationPerMonth: Number, 
  consumption: Number,
  // Additional fields
  energyBalance: Number, // Current energy balance, can be positive (surplus) or negative (deficit)
});

const HouseData = mongoose.model('HouseData', houseSchema);
module.exports = HouseData;
