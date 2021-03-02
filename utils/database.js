import { MongoClient } from "mongodb";

const { MONGODB_URI, MONGODB_DB } = process.env
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true });
  const db = await client.db(MONGODB_DB);

  cachedDb = db;
  return db;
}