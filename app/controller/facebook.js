'use strict';
const app_id = process.env.FB_APP_ID;
const api_version = process.env.FB_VERSION;
const app_secret = process.env.FB_SECRET;

let me_endpoint_base_url = 'https://graph.accountkit.com/v1.0/me';
let token_exchange_base_url = 'https://graph.accountkit.com/v1.0/access_token';
const Guid = require('guid');
const Request = require('request');
const Querystring = require('querystring');

let csrf_guid = Guid.raw();

module.exports = {
    csrfDetails: (req, res) => {
        try {
            const view = {
                appId: app_id,
                state: csrf_guid,
                version: api_version,
            };
            res.status(200).send(view);
        }
        catch (err) {
            console.log('Error is: ', err);
        }
    },

    loginFun: (request, response) => {
        if (request.body.csrf_nonce === csrf_guid) {
            var app_access_token = ['AA', app_id, app_secret].join('|');
            var params = {
                grant_type: 'authorization_code',
                code: request.body.code,
                access_token: app_access_token
                //appsecret_proof: app_secret
            };
            // exchange tokens
            let querystr = Querystring.stringify(params)
            var token_exchange_url = token_exchange_base_url + '?' + querystr;
            Request.get({ url: token_exchange_url, json: true }, function (err, resp, respBody) {
                var view = {
                    user_access_token: respBody.access_token,
                    expires_at: respBody.expires_at,
                    user_id: respBody.id,
                };
                // get account details at /me endpoint
                var me_endpoint_url = me_endpoint_base_url + '?access_token=' + respBody.access_token;
                Request.get({ url: me_endpoint_url, json: true }, function (err, resp, respBodyy) {
                    // send login_success.html
                    if (respBodyy.phone) {
                        view.method = "SMS"
                        view.identity = respBodyy.phone.number;
                    } else if (respBodyy.email) {
                        view.method = "Email"
                        view.identity = respBodyy.email.address;
                    }
                    response.json(view);
                });
            });
        }
        else {
            // login failed
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end("Something went wrong. :( ");
        }

    }
}