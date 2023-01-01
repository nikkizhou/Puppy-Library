import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { puppies?: mongoDB.Collection } = {}

export async function connectToDatabase() {
  dotenv.config();
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(`${process.env.MONGODB_URI}`);

  try {
    await client.connect();
    const db: mongoDB.Db = client.db(process.env.PUBLIC_DATABASE);
    const puppiesCollection: mongoDB.Collection = db.collection(`${process.env.PUBLIC_COLLECTION_PUPPIES}`);
    collections.puppies = puppiesCollection;
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${puppiesCollection.collectionName}`);
    return {puppies:puppiesCollection}
    
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit();
    
  } finally {
    new mongoDB.MongoClient(process.env.MONGODB_URI as string).close()
  }
}
