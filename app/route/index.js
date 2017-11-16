'use strict';
const user = require('./user');
const admin = require('./admin');
const facebook = require('./facebook');
let router = require('express').Router();

router.use('/user', user);
router.use('/admin', admin);
router.use('/facebook', facebook);

module.exports = router;