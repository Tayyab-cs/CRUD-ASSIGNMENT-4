const mongoose = require('mongoose');

module.exports = () => {

    mongoose.connect(process.env.DB_URI_LOCAL, { useNewUrlParser: true});

    const database = mongoose.connection;

    database.on('error', (error) => {
        console.log(error);
    });

    database.once('connected', () => {
        console.log('Database connected successfully.');
    })
}