const {MongoClient} = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

const events = [
    {
        "dateOfBirth": "2024-05-08",
        "email": "frguh@jjf.fff",
        "fullName": "hghg",
        "origin": "friends"
    },
    {
        "dateOfBirth": "2024-05-08",
        "email": "frguhg@jjf.fff",
        "fullName": "fgg",
        "origin": "friends"
    }
];

async function seedDatabase() {
    try {
        await client.connect();
        console.log('Connected to database');
        const database = client.db('eventsdb');
        const collection = database.collection('participants');

        // Очистити колекцію перед додаванням нових даних
        await collection.deleteMany({});

        // Додати нові дані
        const result = await collection.insertMany(events);
        console.log(`${result.insertedCount} participants were added.`);
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

seedDatabase();
