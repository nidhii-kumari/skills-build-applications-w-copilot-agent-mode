import mongoose from 'mongoose';
export function getConnectionString() {
    return process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
}
export async function connectDatabase() {
    try {
        await mongoose.connect(getConnectionString());
        console.log('Connected to octofit_db');
        return mongoose.connection;
    }
    catch (error) {
        console.error('Error connecting to octofit_db:', error);
        throw error;
    }
}
mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
export default mongoose.connection;
