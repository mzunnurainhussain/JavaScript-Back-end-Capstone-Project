const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../models/db');

// GET all items
router.get('/api/secondchance/items', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const items = await db.collection('items').find({}).toArray();
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving items");
    }
});

// GET item by ID
router.get('/api/secondchance/items/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const item = await db.collection('items').findOne({ _id: new ObjectId(req.params.id) });
        if (!item) {
            return res.status(404).send("Item not found");
        }
        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving the item");
    }
});

module.exports = router;
