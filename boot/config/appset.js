'use strict';
const bodyparser = require('body-parser');
const cors = require('cors');

module.exports = (app)=>{
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: false }));
    app.use(cors());
    return app;
}