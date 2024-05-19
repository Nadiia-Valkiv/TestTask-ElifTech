const express = require('express');
const {MongoClient, ObjectId} = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;
const uri = 'mongodb+srv://NadiiaValkiv:rM6xVqeWtgKl96aZ@eliftech.dmzbltd.mongodb.net/eventsdb?retryWrites=true&w=majority&appName=ElifTech';
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json()); // Додайте цей рядок для парсингу JSON тіла запитів

app.get('/api/events', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('eliftech');
        const collection = database.collection('events');

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
    } finally {
        await client.close();
    }
});

// Маршрут для додавання учасника до події
app.post('/api/events/:id/participants', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('eliftech');
        const collection = database.collection('events');
        const eventId = req.params.id;
        const participant = req.body;

        const result = await collection.updateOne(
            {_id: new ObjectId(eventId)},
            {$push: {participants: participant}}
        );

        if (result.modifiedCount === 0) {
            res.status(404).send('Event not found');
        } else {
            res.status(201).send('Participant added');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding participant');
    } finally {
        await client.close();
    }
});

app.get('/api/events/:id', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('eliftech');
        const collection = database.collection('events');
        const eventId = req.params.id;

        const event = await collection.findOne({_id: new ObjectId(eventId)});

        if (!event) {
            res.status(404).send('Event not found');
        } else {
            res.json(event);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching event');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
