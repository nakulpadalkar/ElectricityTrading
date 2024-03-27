// routes/index.js

const express = require('express');
const router = express.Router();

const houseRoutes = require('./houseRoutes');
const transactionRoutes = require('./transactionRoutes');
// Import other route modules as needed

// Use the imported routes
router.use('/houses', houseRoutes);
router.use('/transactions', transactionRoutes);
// Use other routes as needed

module.exports = router;
