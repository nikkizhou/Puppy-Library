import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { puppies?: mongoDB.Collection } = {}

export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(`${process.env.PUBLIC_URI}`);

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.PUBLIC_DATABASE);

  const puppiesCollection: mongoDB.Collection = db.collection(`${process.env.PUBLIC_COLLECTION_PUPPIES}`);
  collections.puppies = puppiesCollection;
 
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${puppiesCollection.collectionName}`);
}
