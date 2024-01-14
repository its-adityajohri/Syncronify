import mongoose from 'mongoose';

const uri = process.env.DB_URI;

async function connectToDatabase() {
    try {
        if (uri) {
            await mongoose.connect(uri);
            console.log('Connected to MongoDB');
        } else {
            throw new Error('DB_URI is undefined');
        }
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (err: any) {
        console.error('Error connecting to the database:');
        throw err;
    }
}

export default connectToDatabase;