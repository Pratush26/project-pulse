import { MongoClient, ServerApiVersion } from "mongodb";

let client;

function getClient() {
  if (!process.env.DB) {
    throw new Error("Please define the DB environment variable");
  }

  if (!client) {
    client = new MongoClient(process.env.DB, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }

  return client;
}

export async function connectDB() {
  try {
    const dbClient = getClient();
    return dbClient.db("project-pluse");
  } catch (err) {
    console.error("DB connection error", err);
    throw err;
  }
}