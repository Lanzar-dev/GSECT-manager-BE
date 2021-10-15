import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer = new MongoMemoryServer()

// Connect to db
export const connect = async () => {
const URI = await mongoServer.getUri()

// Disconnect from db and close connection
export const disconnectDB = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
}

// Cleat the db, and remove all data
export const clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for(const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}
}
