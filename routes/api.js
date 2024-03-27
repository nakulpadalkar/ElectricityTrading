// routes/api.js

const express = require('express');
const cors = require('cors');
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

// GET /api/energyData - New endpoint for fetching energy data
router.get('/energyData', async (req, res) => {
    try {
        // Fetch the energy data from your database
        // You may want to adjust the query to suit your data structure and requirements
        const energyData = await SolarData.find({}).sort({ _id: -1 }).limit(100); // Example: Get the latest 100 records

        // Format the data as needed for your frontend
        // This might include aggregating, filtering, or transforming the data
        // For simplicity, the example below assumes the data is already in a suitable format
        const formattedData = energyData.map(item => ({
            time: item.time, // Adjust field names based on your actual schema
            generation: item.generation,
            consumption: item.consumption,
        }));

        res.json(formattedData);
    } catch (error) {
        console.error('Error fetching energy data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

