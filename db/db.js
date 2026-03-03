const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/corona_admin_db', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database Connected Successfully');
    } catch (error) {
        console.error('Error connecting to database', error.message);
    }
};

module.exports = db;
