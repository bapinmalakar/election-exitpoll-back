'use strict';
module.exports = () => {
    let schemaList = [];
    schemaList.push(require('./../../app/models/user'));
    schemaList.push(require('./../../app/models/district'));
    schemaList.push(require('./../../app/models/candidate'));
    return schemaList;
}