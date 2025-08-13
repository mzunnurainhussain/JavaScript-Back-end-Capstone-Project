const express = require('express');
const router = express.Router();
const multer = require('multer');
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../models/db');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // make sure 'uploads' folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

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

// GET single item by ID
router.get('/api/secondchance/items/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const item = await db.collection('items').findOne({ _id: new ObjectId(req.params.id) });
        if (!item) return res.status(404).send("Item not found");
        res.json(item);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving item");
    }
});

// POST - Upload file & create item
router.post('/api/secondchance/items', upload.single('file'), async (req, res) => {
    try {
        const db = await connectToDatabase();
        const newItem = {
            name: req.body.name,
            category: req.body.category,
            filePath: req.file ? req.file.path : null
        };
        const result = await db.collection('items').insertOne(newItem);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating item");
    }
});

// DELETE item by ID
router.delete('/api/secondchance/items/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const result = await db.collection('items').deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).send("Item not found");
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting item");
    }
});

module.exports = router;
