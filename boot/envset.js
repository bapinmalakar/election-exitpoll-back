'use strict';
let prod = {
    FB_APP_ID: process.env.PROD_FACEBOOK_APP_ID,
    FB_SECRET: process.env.PROD_FACEBOOK_ACCOUNT_KIT,
    FB_VERSION: process.env.PROD_FB_VERSION,
    PORT: process.env.PORT || process.env.PROD_PORT,
    DB: process.env.PROD_DB_PATH
}
let dev = {
    FB_APP_ID: process.env.DEV_FACEBOOK_APP_ID,
    FB_SECRET: process.env.DEV_FACEBOOK_ACCOUNT_KIT,
    FB_VERSION: process.env.DEV_FB_VERSION,
    PORT: process.env.PORT || process.env.DEV_PORT,
    DB: process.env.DEV_DB_PATH
}
module.exports = () => {
    if (process.env.MODE == "DEV") {
        for (let key in dev)
            process.env[key] = dev[key];

    }
    else{
        for (let key in prod)
        process.env[key] = dev[key];
    }
}