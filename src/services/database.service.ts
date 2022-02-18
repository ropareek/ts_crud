// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import {Customer} from "../models/Customer";

// Global Variables
export const collections: { Customer?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase () {
    dotenv.config();
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient('mongodb://127.0.0.1:27017/ts_crud');
            
    await client.connect();
        
    const db: mongoDB.Db = client.db('ts_crud');
   
    const gamesCollection: mongoDB.Collection = db.collection('users');
 
  collections.Customer = gamesCollection;
       
         console.log(`Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`);
 }