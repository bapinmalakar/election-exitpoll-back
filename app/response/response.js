'use strict';
const E = require('./errros');
module.exports = {
    ok(res, data) {
        res.status(200).send({ data: data, success: true, type: 'ok' });
    },
    update(res, data) {
        res.status(200).send({ data: data, success: true, type: 'update' });
    },
    create(res, data) {
        res.status(200).send({ data: data, success: true, type: 'created' });
    },
    deleted(res, data) {
        res.status(200).send({ data: data, success: true, type: 'deleted' });
    },
    errors(res, err) {
        let er;
        let errConst = ['E_PIN_MISMATCH_ERROR', 'E_TOKEN_EXPIRE_ERROR', 'E_CREDANTIAL_NOT_MATCH_ERROR', 'E_DATA_MISSSING_ERROR', 'E_INVALID_DATA'
            , 'E_USER_NOT_FOUND_ERROR', 'E_NOT_FOUND_ERROR', 'E_DUPLICACY_ERROR', 'E_INTERNAL_SERVER_ERROR'];
        if (err.status) {
            let inx = errConst.findIndex(d => d == err.status);
            if (inx == -1) {
                er = E.createError(E.getError('INTERNAL_SERVER'));
            }
            else
                er = err;
        }
        else{
            er = E.createError(E.getError('INTERNAL_SERVER'));
        }
        res.status(er.status).send({
            error: {
                code: er.code,
                message: er.message
            },
            success: false
        });
    }
}