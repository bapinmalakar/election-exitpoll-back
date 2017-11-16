'use strict';
const router = require('express').Router();
const routes = require('./../../app/route');


router.use((req, res, next) => {
    res._json = res.json;
    res.json = (data) => {
        data['api'] = "Gujart election";
        res._json(data);
    }
    next();
});

router.use('/election', routes);
module.exports = router;