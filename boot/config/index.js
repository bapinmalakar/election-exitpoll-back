'use strict';
require('./models')();
const db = require('./db');
const appSet = require('./appset');
const route = require('./route');
module.exports = async (app) => {
    try {
        await db(app);
        await appSet(app);
        app.use('/api', route);
        app.all('*', (req, res) => { res.status(404).send({ code: 404, msg: 'Not found', success: false }) })
        console.log('App Configuration Finish'.green);
        console.log('Facebook app id: ', process.env.FB_APP_ID);
        console.log('Facebook secret: ', process.env.FB_SECRET);
        console.log('Version: ', process.env.FB_VERSION);
        return app;
    }
    catch (err) {
        console.log('Structure configuration error '.red + err);
    }
}