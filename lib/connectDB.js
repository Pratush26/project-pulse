import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.DB) throw new Error("Please define the DB environment variable");

const client = new MongoClient(process.env.DB, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let isConnected = false;

export async function connectDB() {
  try {
    // if (!isConnected) {
    //   await client.connect();
    //   isConnected = true;
    //   console.log("MongoDB connected");
    // }

    return client.db("project-pluse");
  } catch (err) {
    console.error("DB connection error", err);
    throw err;
  }
}