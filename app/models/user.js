'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
    mobile_number: { type: String, required: true, unique: true, trim: true, index: true },
    method: { type: String, default: '' },
    app_id: { type: String, default: '' },
    role: { type: String, enum: ['USER', 'ADMIN'], required: true },
    name: { type: String, default: '' },
    vote: [{
        id: { type: mongoose.Schema.ObjectId, ref: 'Candidate' },
        type: { type: String, enum: ['up', 'down'] }
    }]
}, {
        timestamps: true,
        autoIndex: true,
        versionKey: false
    });

module.exports = mongoose.model('User', User);