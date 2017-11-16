'use strict';
const admin = require('./../controller/admin');
const router = require('express').Router();

router.get('/testing', admin.testAdmin);
router.get('/all_candidate/:district', admin.allDistrictCandidate);
router.get('/:party/party_candidate/:district', admin.partyCandidate);
router.get('/dist_list', admin.distList);
router.get('/:district/get_candidate/:constituency', admin.constituencyCandidate);

router.post('/save_admin', admin.adminSave);
router.post('/:id/save_candidate', admin.addCandidate);
router.post('/:id/save_details', admin.saveMultiCandidate);

module.exports = router;