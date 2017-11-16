'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const District = require('./district');
const E = require('../response/errros');

let Candidate = new Schema({
    name: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    constituency: { type: String, required: true, trim: true },
    state: { type: String, default: 'gujrat', trim: true },
    party: { type: String, require: true, trim: true },
    image: { type: String, trim: true, default: '' },
    vote: { type: Number, default: 0 }
}, {
        timestamps: true,
        autoIndex: true,
        versionKey: false
    });
Candidate.pre('save', async function (next) {
    try {
        console.log( 'District:  ', this.district);
        const data = await District.findOne({ name: this.district });
        if (!data) {
            let distData = new District();
            distData.name = this.district;
            distData.state = 'gujrat';
            await distData.save();
        }
        next();
    }
    catch (err) {
        throw E.createError(E.getError('INTERNAL_SERVER'));
    }

});

module.exports = mongoose.model('Candidate', Candidate);