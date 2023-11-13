const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/LoginRegisterDatabase');
        console.log('Connected to MongoDb');
    }
    catch (error) {
        console.log(error);
    }
}
module.exports = connectDB;