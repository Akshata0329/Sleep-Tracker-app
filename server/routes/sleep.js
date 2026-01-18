const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../sleep_data.json');

// Helper to read data
const readData = () => {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            // Create if not exists
            fs.writeFileSync(DATA_FILE, '[]', 'utf8');
            return [];
        }
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data || '[]');
    } catch (err) {
        console.error("Error reading data file:", err);
        return [];
    }
};

// Helper to write data
const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (err) {
        console.error("Error writing data file:", err);
        return false;
    }
};

// GET all sleep logs
router.get('/', (req, res) => {
    try {
        const logs = readData();
        res.json(logs);
    } catch (err) {
        console.error("Error in GET /api/sleep:", err);
        res.status(500).json({ message: "Could not load data" });
    }
});

// POST a new sleep log
router.post('/', (req, res) => {
    try {
        const logs = readData();

        const newLog = {
            id: Date.now().toString(), // Simple ID
            date: req.body.date,
            sleep: req.body.sleep,
            wake: req.body.wake,
            hrs: req.body.hrs,
            createdAt: new Date().toISOString()
        };

        logs.push(newLog);

        if (writeData(logs)) {
            res.status(201).json(newLog);
        } else {
            res.status(500).json({ message: "Failed to save data" });
        }
    } catch (err) {
        console.error("Error in POST /api/sleep:", err);
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
