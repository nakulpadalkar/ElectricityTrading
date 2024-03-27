// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  fromHouseId: mongoose.Schema.Types.ObjectId,
  toHouseId: mongoose.Schema.Types.ObjectId,
  energyAmount: Number, // Amount of energy traded
  transactionTime: Date,
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
