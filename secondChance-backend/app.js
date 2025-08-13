const express = require('express');
const cors = require('cors');

const secondChanceItemsRoutes = require('./routes/secondChanceItemsRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', secondChanceItemsRoutes);
app.use('/', searchRoutes); // ✅ serves /api/secondchance/search

// Root route
app.get('/', (req, res) => {
    res.send('SecondChance API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
