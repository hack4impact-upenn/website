import { MongoClient } from 'mongodb';

// MongoDB connection string - replace with your actual connection string
// You should use environment variables for this in production
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'Hack4ImpactUPenn';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userInfo, quizAnswers, recommendedProject } = req.body;

  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db(MONGODB_DB);

    // Save data to quizResponses collection
    const result = await db.collection('quizResponses').insertOne({
      userInfo,
      quizAnswers,
      recommendedProject,
      timestamp: new Date(),
    });

    await client.close();

    res.status(200).json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ success: false, message: 'Failed to save quiz data' });
  }
}
