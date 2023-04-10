import dotenv from 'dotenv';
dotenv.config({ path: '../.env' })

import { MongoClient } from 'mongodb';

const mongodbURI = `mongodb://${process.env.MONGO_ROOT_USER}:${process.env.MONGO_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
const mongodbClient = new MongoClient(mongodbURI);

const dbName = `${process.env.MONGO_DB_NAME}`;
const colName = `${process.env.MONGO_DB_COLLECTION}`;

export async function connectToDatabase() {
    try {
        await mongodbClient.connect();
        console.log('Connected to MongoDB server');
        const db = mongodbClient.db(dbName);

        await checkIfCollectionExists(db, colName);
        
    } catch (err) {
        console.error("Could not connect to the database. Is the database server up and running?\n" + err);
    } finally {
        await mongodbClient.close();
        console.log('Disconnected from MongoDB server');
    }
}


async function checkIfCollectionExists(db, colName) {
    const colExists = await db.listCollections({ name: colName }).hasNext();
 
    if (colExists) {
      console.log(`Collection '${colName}' already exists`);
    } else {
      await db.createCollection(colName);
      console.log(`Created collection '${colName}'`);
    }
}