// models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  fromHouseId: { type: mongoose.Schema.Types.ObjectId, ref: 'HouseData' },
  toHouseId: { type: mongoose.Schema.Types.ObjectId, ref: 'HouseData' },
  energyAmount: Number,
  transactionTime: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
