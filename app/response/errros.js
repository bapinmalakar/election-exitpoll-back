'use strict';

const errorList = {
    'INTERNAL_SERVER': {
        'code': 'E_INTERNAL_SERVER_ERROR',
        'status': 500,
        'message': 'Problem in server try later!'
    },
    'DUPLICATE_RESOURCE': {
        'code': 'E_DUPLICACY_ERROR',
        'status': 409,
        'message': 'Resource already present'
    },
    'DATA_NOT_FOUND': {
        'code': 'E_NOT_FOUND_ERROR',
        'status': 404,
        'message': 'Data not found'
    },
    'USER_NOT_FOUND': {
        'code': 'E_USER_NOT_FOUND_ERROR',
        'status': 401,
        'message': 'Unauthorized User'
    },
    'DATA_FORMAT': {
        'code': 'E_INVALID_DATA',
        'status': 422,
        'message': 'Data is invalid'
    },
    'DATA_REQUIRED': {
        'code': 'E_DATA_MISSSING_ERROR',
        'status': 422,
        'message': 'Data required'
    },
    'CREDANTIAL_MISMATCH': {
        'code': 'E_CREDANTIAL_NOT_MATCH_ERROR',
        'status': 401,
        'message': 'Credantial details not matche'
    },
    'TOKEN_EXPIRE': {
        'code': 'E_TOKEN_EXPIRE_ERROR',
        'status': 401,
        'message': 'Token is expired'
    },
    'INVALID_PIN': {
        'code': 'E_PIN_MISMATCH_ERROR',
        'status': 401,
        'message': 'Pin not matche'
    }
}

module.exports ={
    getError(errorName) {
        return errorList[errorName];
    },
    createError(e, message = null, code = null, status = null) {
        let error = new Error();
        error.code = code || e.code;
        error.status = status || e.status;
        error.message = message || e.message;
        return error;
    }
}

