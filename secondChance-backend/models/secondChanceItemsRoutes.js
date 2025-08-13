const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../models/db');

// Example route to get items
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase(); // required line
        const items = await db.collection('items').find({}).toArray();
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving items");
    }
});

module.exports = router;
