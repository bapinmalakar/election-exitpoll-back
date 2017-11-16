'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const District = new Schema({
    name: { type: String, unique: true, required: true, trim: true },
    state: {type: String, required: true}
}, {
        timestamps: true,
        autoIndex: true,
        versionKey: false
    });

module.exports = mongoose.model('District', District);