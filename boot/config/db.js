'use strict';
let mongoose = require('mongoose');
require('colors');
const dbPath = process.env.DB;
module.exports = async (app) => {
    try {
        mongoose.Promise = global.Promise;
        if (process.env.MODE == 'DEV')
            mongoose.set('debug', true);
        mongoose.connect(dbPath, {
            useMongoClient: true
        });
        mongoose.connection.on('connected', () => {
            console.log('Database connection made in'.red + dbPath.green);
        });
        mongoose.connection.once('open', async () => {
            console.log('Connected to mongodb!'.green);
        });

        await mongoose.connection.on('error', function (err) {
            console.error('Mongoose default connection error: ' + err.red);
        });

        await mongoose.connection.on('disconnected', function () {
            console.log('Mongoose default connection disconnected'.red);
        });

        process.on('SIGINT', function () {
            mongoose.connection.close(function () {
                console.log('Mongoose default connection disconnected through app termination'.red);
                process.exit(0);
            });
        });
    }
    catch (err) {
        console.log('Database connection errror reason: ', err);
        throw new Error(err);
    }

}