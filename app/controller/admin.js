'use strict';
const response = require('../response/response');
const E = require('./../response/errros');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Candidate = mongoose.model('Candidate');
const District = mongoose.model('District');
const helper = require('./../helper');

module.exports = {
    async testAdmin(req, res) {
        try {
            response.ok(res, { msg: 'admin tested' });
        }
        catch (err) {
            response.errors(res, err);
        }
    },

    async adminSave(req, res) {
        try {
            if (!req.body.mobile)
                throw E.createError(E.getError('DATA_REQUIRED'));
            let data = await User.findOne({ mobile_number: req.body.mobile });
            if (data)
                throw E.createError(E.getError('DUPLICATE_RESOURCE'), 'User exist');
            let user = new User();
            user.mobile_number = req.body.mobile;
            user.name = req.body.name || '';
            user.role = 'ADMIN';
            await user.save();
            response.create(res, user);
        }
        catch (err) {
            response.errors(res, err);
        }
    },

    async addCandidate(req, res) {
        try {
            let admin = await User.findOne({ _id: req.params.id, role: 'ADMIN' });
            if (!admin)
                throw E.createError(E.getError('USER_NOT_FOUND'));
            if (!req.body.name || !req.body.city || !req.body.party)
                throw E.createError(E.getError('DATA_REQUIRED'));
            let candidate = new Candidate();
            candidate.name = req.body.name.toLowerCase().trim();
            candidate.district = req.body.district.toLowerCase().trim();
            candidate.constituency = req.body.constituency().toLowerCase().trim();
            candidate.party = req.body.party.toLowerCase().trim();
            await candidate.save();
            response.create(res, candidate);
        }
        catch (err) {
            response.errors(res, err);
        }
    },

    async saveMultiCandidate(req, res) {
        try {
            if (!req.body || !req.body.data)
                throw E.createError(E.getError('DATA_NOT_FOUND'));
            let admin = await User.findOne({ _id: req.params.id, role: 'ADMIN' });
            if (!admin)
                throw E.createError(E.getError('USER_NOT_FOUND'));
            let details = await Candidate.insertMany(req.body.data, { ordered: false });
            let distData = [];
            req.body.data.map(d => distData.push({ name: d.district, state: 'gujrat' }));
            let distDetails = await District.insertMany(distData, { ordered: false });
            response.create(res, { details, distDetails });
        }
        catch (err) {
            if (err.code != 'E_NOT_FOUND_ERROR' && err.code !== 'E_USER_NOT_FOUND_ERROR') {
                if (err.name) {
                    response.ok(res, { msg: 'Done' });
                }
                else {
                    let er = E.createError(E.getError('INTERNAL_SERVER'));
                    response.errors(res, er);
                }
            }
            else {
                response.errors(res, err);
            }
        }
    },

    async distList(req, res) {
        // List district of the state
        try {
            let data = [];
            data = await helper.listDist();
            response.ok(res, data);
        }
        catch (err) {
            response.errors(res, err);
        }
    },

    async constituencyCandidate(req, res) {
        //List candidate of a area
        try {
            let data = await helper.candidateList(req.params.district, req.params.constituency);
            response.ok(res, data);
        }
        catch (err) {
            response(res, err);
        }
    },

    async allDistrictCandidate(req, res) {
        //list all candidate of a district
        try {
            let data = await helper.allCandidate(req.params.district);
            response.ok(res, data);
        }
        catch (err) {
            response.errors(res, err);
        }
    },

    async partyCandidate(req, res) {
        //list candidate of a party of a district.
        try {
            let data = await helper.partyCandidate(req.params.party.toLowerCase(), req.params.district.toLowerCase());
            response.ok(res, data);
        }
        catch (err) {
            response.errors(res, err);
        }
    }
}