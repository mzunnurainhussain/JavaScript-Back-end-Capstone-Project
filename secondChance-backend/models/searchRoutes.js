const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../models/db');

// GET /api/secondchance/search?category=CategoryName
router.get('/api/secondchance/search', async (req, res) => {
    try {
        const category = req.query.category;
        if (!category) {
            return res.status(400).json({ error: "Category query parameter is required" });
        }

        const db = await connectToDatabase();
        const results = await db.collection('items').find({ category: category }).toArray();

        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error filtering items by category");
    }
});

module.exports = router;
