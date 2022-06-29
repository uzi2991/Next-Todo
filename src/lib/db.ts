import { Db, MongoClient } from 'mongodb';

if (!process.env.MONGO_URI) {
  throw new Error('Please add mongo uri to .env');
}

const uri = process.env.MONGO_URI;

let cachedClient: MongoClient;
let cachedDB: Db;

export default async function connectToDB() {
  if (cachedClient && cachedDB) {
    return cachedDB;
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db();
  cachedClient = client;
  cachedDB = db;

  return cachedDB;
}
