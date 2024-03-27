// simulations/energySimulation.js
const HouseData = require('../models/HouseData');
const Transaction = require('../models/Transactions');

const startEnergySimulation = () => {
  setInterval(async () => {
    // Your simulation logic here
  }, 60000); // Every 1 minute
};

module.exports = startEnergySimulation;
