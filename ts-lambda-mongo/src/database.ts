import mongoose from 'mongoose';

let conn: typeof mongoose | null = null;

export const connectDatabase = async () => {
    if (conn == null) {
        console.log('Creating new database connection...');
        conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://host.docker.internal:27017/ts-lambda-mongo', {
            serverSelectionTimeoutMS: 5000
        });
        return conn;
    }
    console.log('Connection already established, reusing existing connection');
    return conn;
};
