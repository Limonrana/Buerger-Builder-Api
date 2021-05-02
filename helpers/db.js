const mongoose = require('mongoose');

const DB = process.env.MONGODB_SERVER.replace('<PASSWORD>', process.env.DB_PASSWORD);

const init = () => {
    mongoose
        .connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .catch((err) => {
            console.error(`error${err.stack}`);
        });

    mongoose.connection.on('open', () => {
        console.log('connected to database!');
    });
};

module.exports = init;
