import dotenv from 'dotenv';
import { mongoose } from 'mongoose';
dotenv.config({ path: '../.env' })

const mongodbURI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`;

export const connectToDatabase = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(mongodbURI, {
            user: `${process.env.MONGO_ROOT_USER}`,
            pass: `${process.env.MONGO_ROOT_PASSWORD}`,
            authSource: 'admin',
            useNewUrlParser: true
        });

        console.log('MongoDB is Connected...');
    } catch (err) {
        console.log("There was an issue connecting to MongoDB");
        console.error(err.message);
        process.exit(1);
    }
};