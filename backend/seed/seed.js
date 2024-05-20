const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

const events = [
  {
    "title": "Tech Conference 2024",
    "description": "A conference discussing the latest in tech trends.",
    "eventDate": "2024-06-15",
    "organizer": "Tech World Inc.",
  },
  {
    "title": "Health & Wellness Expo",
    "description": "Explore the latest in health and wellness.",
    "eventDate": "2024-07-20",
    "organizer": "Healthy Living Co."
  },
  {
    "title": "Marketing Summit",
    "description": "Strategies for effective digital marketing.",
    "eventDate": "2024-08-10",
    "organizer": "Marketing Pros"
  },
  {
    "title": "Startup Pitch Night",
    "description": "Pitch your startup to potential investors.",
    "eventDate": "2024-09-05",
    "organizer": "Startup Hub"
  },
  {
    "title": "AI & Machine Learning Workshop",
    "description": "Hands-on workshop on AI and machine learning.",
    "eventDate": "2024-10-12",
    "organizer": "AI Innovators"
  },
  {
    "title": "Blockchain Symposium",
    "description": "Understanding blockchain technology and its applications.",
    "eventDate": "2024-11-18",
    "organizer": "Blockchain Association"
  },
  {
    "title": "Financial Planning Seminar",
    "description": "Learn how to plan your finances effectively.",
    "eventDate": "2024-12-02",
    "organizer": "Finance Experts"
  },
  {
    "title": "Environmental Sustainability Conference",
    "description": "Discussing sustainable practices for a better future.",
    "eventDate": "2024-12-15",
    "organizer": "Green Earth"
  },
  {
    "title": "Cybersecurity Summit",
    "description": "Latest trends in cybersecurity and data protection.",
    "eventDate": "2024-12-30",
    "organizer": "Cyber Shield"
  },
  {
    "title": "E-commerce Expo",
    "description": "Exploring the future of online commerce.",
    "eventDate": "2024-01-20",
    "organizer": "E-commerce Group"
  },
  {
    "title": "Robotics Fair",
    "description": "Showcase of the latest in robotics technology.",
    "eventDate": "2024-02-15",
    "organizer": "Robotics Society"
  },
  {
    "title": "Digital Art Festival",
    "description": "Celebrating digital art and creativity.",
    "eventDate": "2024-03-10",
    "organizer": "Art & Tech"
  },
  {
    "title": "Global Education Summit",
    "description": "Improving education systems worldwide.",
    "eventDate": "2024-04-25",
    "organizer": "Education Leaders"
  },
  {
    "title": "Renewable Energy Expo",
    "description": "Exploring renewable energy solutions.",
    "eventDate": "2024-05-18",
    "organizer": "Energy Innovators"
  },
  {
    "title": "Fashion Week 2024",
    "description": "Showcasing the latest trends in fashion.",
    "eventDate": "2024-06-05",
    "organizer": "Fashion Forward"
  },
  {
    "title": "Gaming Convention",
    "description": "Celebrating video games and their culture.",
    "eventDate": "2024-07-10",
    "organizer": "Game On"
  },
  {
    "title": "Healthcare Technology Conference",
    "description": "Innovations in healthcare technology.",
    "eventDate": "2024-08-22",
    "organizer": "HealthTech"
  },
  {
    "title": "Music Festival",
    "description": "Enjoy live music performances from various artists.",
    "eventDate": "2024-09-15",
    "organizer": "Live Music Inc."
  },
  {
    "title": "Film Festival",
    "description": "Screening of independent and international films.",
    "eventDate": "2024-10-05",
    "organizer": "Cinema Lovers"
  },
  {
    "title": "Entrepreneurship Bootcamp",
    "description": "Intensive training for aspiring entrepreneurs.",
    "eventDate": "2024-11-11",
    "organizer": "Startup School"
  },
  {
    "title": "Tech Conference 2024",
    "description": "A conference discussing the latest in tech trends.",
    "eventDate": "2024-06-15",
    "organizer": "Tech World Inc."
  },
  {
    "title": "Health & Wellness Expo",
    "description": "Explore the latest in health and wellness.",
    "eventDate": "2024-07-20",
    "organizer": "Healthy Living Co."
  },
  {
    "title": "Marketing Summit",
    "description": "Strategies for effective digital marketing.",
    "eventDate": "2024-08-10",
    "organizer": "Marketing Pros"
  },
  {
    "title": "Startup Pitch Night",
    "description": "Pitch your startup to potential investors.",
    "eventDate": "2024-09-05",
    "organizer": "Startup Hub"
  },
  {
    "title": "AI & Machine Learning Workshop",
    "description": "Hands-on workshop on AI and machine learning.",
    "eventDate": "2024-10-12",
    "organizer": "AI Innovators"
  },
  {
    "title": "Blockchain Symposium",
    "description": "Understanding blockchain technology and its applications.",
    "eventDate": "2024-11-18",
    "organizer": "Blockchain Association"
  },
  {
    "title": "Financial Planning Seminar",
    "description": "Learn how to plan your finances effectively.",
    "eventDate": "2024-12-02",
    "organizer": "Finance Experts"
  },
  {
    "title": "Environmental Sustainability Conference",
    "description": "Discussing sustainable practices for a better future.",
    "eventDate": "2024-12-15",
    "organizer": "Green Earth"
  },
  {
    "title": "Cybersecurity Summit",
    "description": "Latest trends in cybersecurity and data protection.",
    "eventDate": "2024-12-30",
    "organizer": "Cyber Shield"
  },
  {
    "title": "E-commerce Expo",
    "description": "Exploring the future of online commerce.",
    "eventDate": "2024-01-20",
    "organizer": "E-commerce Group"
  },
  {
    "title": "Robotics Fair",
    "description": "Showcase of the latest in robotics technology.",
    "eventDate": "2024-02-15",
    "organizer": "Robotics Society"
  },
  {
    "title": "Digital Art Festival",
    "description": "Celebrating digital art and creativity.",
    "eventDate": "2024-03-10",
    "organizer": "Art & Tech"
  },
  {
    "title": "Global Education Summit",
    "description": "Improving education systems worldwide.",
    "eventDate": "2024-04-25",
    "organizer": "Education Leaders"
  },
  {
    "title": "Renewable Energy Expo",
    "description": "Exploring renewable energy solutions.",
    "eventDate": "2024-05-18",
    "organizer": "Energy Innovators"
  },
  {
    "title": "Fashion Week 2024",
    "description": "Showcasing the latest trends in fashion.",
    "eventDate": "2024-06-05",
    "organizer": "Fashion Forward"
  },
  {
    "title": "Gaming Convention",
    "description": "Celebrating video games and their culture.",
    "eventDate": "2024-07-10",
    "organizer": "Game On"
  },
  {
    "title": "Healthcare Technology Conference",
    "description": "Innovations in healthcare technology.",
    "eventDate": "2024-08-22",
    "organizer": "HealthTech"
  },
  {
    "title": "Music Festival",
    "description": "Enjoy live music performances from various artists.",
    "eventDate": "2024-09-15",
    "organizer": "Live Music Inc."
  },
  {
    "title": "Film Festival",
    "description": "Screening of independent and international films.",
    "eventDate": "2024-10-05",
    "organizer": "Cinema Lovers"
  },
  {
    "title": "Entrepreneurship Bootcamp",
    "description": "Intensive training for aspiring entrepreneurs.",
    "eventDate": "2024-11-11",
    "organizer": "Startup School"
  },
  {
    "title": "Tech Conference 2024",
    "description": "A conference discussing the latest in tech trends.",
    "eventDate": "2024-06-15",
    "organizer": "Tech World Inc."
  },
  {
    "title": "Health & Wellness Expo",
    "description": "Explore the latest in health and wellness.",
    "eventDate": "2024-07-20",
    "organizer": "Healthy Living Co."
  },
  {
    "title": "Marketing Summit",
    "description": "Strategies for effective digital marketing.",
    "eventDate": "2024-08-10",
    "organizer": "Marketing Pros"
  },
  {
    "title": "Startup Pitch Night",
    "description": "Pitch your startup to potential investors.",
    "eventDate": "2024-09-05",
    "organizer": "Startup Hub"
  },
  {
    "title": "AI & Machine Learning Workshop",
    "description": "Hands-on workshop on AI and machine learning.",
    "eventDate": "2024-10-12",
    "organizer": "AI Innovators"
  },
  {
    "title": "Blockchain Symposium",
    "description": "Understanding blockchain technology and its applications.",
    "eventDate": "2024-11-18",
    "organizer": "Blockchain Association"
  },
  {
    "title": "Financial Planning Seminar",
    "description": "Learn how to plan your finances effectively.",
    "eventDate": "2024-12-02",
    "organizer": "Finance Experts"
  },
  {
    "title": "Environmental Sustainability Conference",
    "description": "Discussing sustainable practices for a better future.",
    "eventDate": "2024-12-15",
    "organizer": "Green Earth"
  },
  {
    "title": "Cybersecurity Summit",
    "description": "Latest trends in cybersecurity and data protection.",
    "eventDate": "2024-12-30",
    "organizer": "Cyber Shield"
  },
  {
    "title": "E-commerce Expo",
    "description": "Exploring the future of online commerce.",
    "eventDate": "2024-01-20",
    "organizer": "E-commerce Group"
  },
  {
    "title": "Robotics Fair",
    "description": "Showcase of the latest in robotics technology.",
    "eventDate": "2024-02-15",
    "organizer": "Robotics Society"
  },
  {
    "title": "Digital Art Festival",
    "description": "Celebrating digital art and creativity.",
    "eventDate": "2024-03-10",
    "organizer": "Art & Tech"
  },
  {
    "title": "Global Education Summit",
    "description": "Improving education systems worldwide.",
    "eventDate": "2024-04-25",
    "organizer": "Education Leaders"
  },
  {
    "title": "Renewable Energy Expo",
    "description": "Exploring renewable energy solutions.",
    "eventDate": "2024-05-18",
    "organizer": "Energy Innovators"
  },
  {
    "title": "Fashion Week 2024",
    "description": "Showcasing the latest trends in fashion.",
    "eventDate": "2024-06-05",
    "organizer": "Fashion Forward"
  },
  {
    "title": "Gaming Convention",
    "description": "Celebrating video games and their culture.",
    "eventDate": "2024-07-10",
    "organizer": "Game On"
  },
  {
    "title": "Healthcare Technology Conference",
    "description": "Innovations in healthcare technology.",
    "eventDate": "2024-08-22",
    "organizer": "HealthTech"
  },
  {
    "title": "Music Festival",
    "description": "Enjoy live music performances from various artists.",
    "eventDate": "2024-09-15",
    "organizer": "Live Music Inc."
  },
  {
    "title": "Film Festival",
    "description": "Screening of independent and international films.",
    "eventDate": "2024-10-05",
    "organizer": "Cinema Lovers"
  },
  {
    "title": "Entrepreneurship Bootcamp",
    "description": "Intensive training for aspiring entrepreneurs.",
    "eventDate": "2024-11-11",
    "organizer": "Startup School"
  }
];

async function seedDatabase() {
  try {
    await client.connect();
    console.log('Connected to database');
    const database = client.db('eliftech');
    const collection = database.collection('events');

    // Очистити колекцію перед додаванням нових даних
    await collection.deleteMany({});

    // Додати нові дані
    const result = await collection.insertMany(events);
    console.log(`${result.insertedCount} events were added.`);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

seedDatabase();
