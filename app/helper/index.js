'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Candidate = mongoose.model('Candidate');
const District = mongoose.model('District');
const E = require('./../response/errros');
module.exports = {
    async listDist() {
        try {
            let city = [];
            return await District.find({ state: 'gujrat' }).select({ name: 1, state: 1 });
        }
        catch (err) {
            throw E.createError(E.getError('INTERNAL_SERVER'));
        }
    },
    async candidateList(district, constituency) {
        try {
            return await Candidate.find({ state: 'gujrat', district, constituency });
        }
        catch (err) {
            throw E.createError(E.getError('INTERNAL_SERVER'));
        }
    },
    async allCandidate(district) {
        try {
            return await Candidate.find({ state: 'gujrat', district });
        }
        catch (err) {
            throw E.createError(E.getError('INTERNAL_SERVER'));
        }
    },
    async partyCandidate(party, district) {
        try {
            return await Candidate.find({ state: 'gujrat', party, district })
        }
        catch (err) {
            throw E.createError(E.getError('INTERNAL_SERVER'));
        }
    },
    async listConti(district) {
        try {
            return await Candidate.distinct('constituency', { district: district });
        }
        catch (err) {
            throw E.createError(E.getError('INTERNAL_SERVER'));
        }
    }
}