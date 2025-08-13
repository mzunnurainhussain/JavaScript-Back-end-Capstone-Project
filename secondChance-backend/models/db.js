const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect(); // required line
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }
}

module.exports = { connectDB, client };
