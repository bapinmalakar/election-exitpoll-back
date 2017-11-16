'use strict';
const user = require('./../controller/user');
const router = require('express').Router();

router.get('/testing', user.testUser);
router.get('/:mobile/details', user.findUser);
router.get('/:mobile/update/:candidate/:val', user.updateVote);
router.get('/dist_list', user.listDist);
router.get('/list_conti/:district', user.listConti);
router.get('/:district/candidate_list/:constituency', user.candidateList);

router.post('/save', user.saveUser);


module.exports = router;