'use strict';
const response = require('../response/response');
const E = require('./../response/errros');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Candidate = mongoose.model('Candidate');
const District = mongoose.model('District');
const helper = require('../helper');
module.exports = {
    async testUser(req, res) {
        try {
            response.ok(res, { msg: 'user tested' });
        }
        catch (err) {
            response.errors(res, err);
        }
    },
    async findUser(req, res) {
        try {
            let data = await User.findOne({ mobile_number: req.params.mobile });
            if (data)
                response.ok(res, data);
            else
                response.ok(res, {});
        }
        catch (err) {
            response.errors(res, err);
        }
    },

    async saveUser(req, res) {
        try {
            if (!req.body || !req.body.mobile)
                throw E.createError(E.getError('DATA_REQUIRED'));
            let data = await User.findOne({ mobile_number: req.body.mobile });
            if (data)
                response.ok(res, data);
            else {
                let user = new User();
                user.mobile_number = req.body.mobile;
                user.method = req.body.method;
                user.app_id = req.body.appId || '';
                user.name = req.body.name || '';
                user.role = 'USER';
                await user.save();
                response.create(res, user);
            }

        }
        catch (err) {
            response.errors(res, err);
        }
    },

    async updateVote(req, res) {
        try {
            let user = await User.findOne({ mobile_number: req.params.mobile });
            if (!user)
                throw E.createError(E.getError('USER_NOT_FOUND', 'User not exist'));
            let candidate = await Candidate.findOne({ _id: req.params.candidate });
            if (!candidate)
                throw E.createError(E.getError('DATA_NOT_FOUND'));
            candidate.vote = candidate.vote + parseInt(req.params.val);
            await candidate.save();
            let type = parseInt(req.params.val) == 1 ? 'up' : 'down';
            let voteIndex = user.vote.findIndex(d => d.id.toString() == candidate._id);
            let data;
            if (voteIndex == -1) {
                data = await User.findOneAndUpdate({ _id: user._id }, { $push: { vote: { id: candidate._id, type: type } } }, { new: true });
            }
            else {
                user.vote[voteIndex].type = type;
                data = await user.save();
            }
            response.update(res, { candidate, data });
        }
        catch (err) {
            response.errors(res, err);
        }
    },

    async listDist(req, res) {
        try {
            let dist = [];
            dist = await helper.listDist();
            response.ok(res, dist);
        }
        catch (err) {
            response.errors(res, err);
        }
    },

    async listConti(req, res) {
        try {
            console.log('Inside:: ', req.params.district);
            let data = await helper.listConti(req.params.district);
            return response.ok(res, data);
        }
        catch (err) {
            response.errors(res, err);
        }
    },

    async candidateList(req, res) {
        try {
            let candidate = [];
            candidate = await helper.candidateList(req.params.district, req.params.constituency);
            response.ok(res, candidate);
        }
        catch (err) {
            response.errors(res, err);
        }
    }
}