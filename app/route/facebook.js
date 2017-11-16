'use strict';
const facebook = require('./../controller/facebook');
const router = require('express').Router();

router.get('/get-csrf', facebook.csrfDetails);
router.post('/sendcode', facebook.loginFun);

module.exports = router;