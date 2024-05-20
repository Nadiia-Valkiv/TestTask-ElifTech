const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URL;

if (!uri) {
    console.error('MONGO_URL environment variable is not defined.');
    process.exit(1);
}

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

let database, collection;

client.connect()
    .then(() => {
        database = client.db('eliftech');
        collection = database.collection('events');
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });

app.get('/api/events', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const skip = (page - 1) * pageSize;
        const totalCount = await collection.countDocuments();

        const events = await collection.find({})
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const response = {
            totalCount: totalCount,
            currentPage: page,
            pageSize: pageSize,
            totalPages: Math.ceil(totalCount / pageSize),
            events: events
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching events');
    }
});

app.post('/api/events/:id/participants', async (req, res) => {
    try {
        const eventId = req.params.id;
        const participant = req.body;

        const result = await collection.updateOne(
            { _id: new ObjectId(eventId) },
            { $push: { participants: participant } }
        );

        if (result.modifiedCount === 0) {
            res.status(404).send('Event not found');
        } else {
            res.status(201).send('Participant added');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding participant');
    }
});

app.get('/api/events/:id', async (req, res) => {
    try {
        const eventId = req.params.id;

        const event = await collection.findOne({ _id: new ObjectId(eventId) });

        if (!event) {
            res.status(404).send('Event not found');
        } else {
            res.json(event);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching event');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
