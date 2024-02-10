const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://admin:admin@shioyraj.ybxncvi.mongodb.net/todoapp';
//const MONGODB_URI = 'mongodb://127.0.0.1/todoapp';
async function connectToDatabase() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

module.exports = connectToDatabase;