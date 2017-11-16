'use strict';
const express = require('express');
let app = express();
require('./envset')();
require('./config')(app);
require('colors');
module.exports = () => {
    app.listen(process.env.PORT || 3001, () => {
        console.log('SERVER START IN PORT'.red, process.env.PORT + ''.green);
    });
}