const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();

// MongoDB Atlas connection URI
const uri = 'mongodb+srv://nabi09122002:ngangela22@cluster0.zkkdnzz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'Question';
const collectionName = 'English';
let Api_json = [];  // Initialize Api_json as an array

async function readData() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        const query = {};  // Empty query to fetch all documents
        const cursor = await collection.find(query).toArray();

        cursor.forEach(document => {
            console.log(document);
            Api_json.push(document);
        });

    } finally {
        await client.close();
    }
}

app.listen(3000, () => {
    console.log('Node API app is running on port 3000');
});

app.get('/', async (req, res) => {
    try {
        await readData();
        res.json(Api_json);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
