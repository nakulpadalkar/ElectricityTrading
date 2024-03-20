// routes/api.js

const express = require('express');
const router = express.Router();
const SolarData = require('../models/solarData'); // Import the SolarData model

// POST /api/injectData
router.post('/injectData', async (req, res) => {
    try {
        // Extract data from the request body
        const dataToInject = req.body;

        // Validate and sanitize dataToInject here if needed

        // Insert data into MongoDB
        await SolarData.insertMany(dataToInject);

        res.status(201).json({ message: 'Data injected to MongoDB successfully' });
    } catch (error) {
        console.error('Error injecting data to MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
