const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT)
        console.log('DB connected successfully');
    } catch (err) {
        console.error('DB connection error:', err);
    }
};

module.exports = connectToDB;
