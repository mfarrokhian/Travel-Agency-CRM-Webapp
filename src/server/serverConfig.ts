export default {
    "MONGOLAB_URI": "mongodb://dmitry:dmitry1988@ds157667.mlab.com:57667/wingsforworld",
    "DEFAULT_CREDENTIALS": {
        "login": "dimonMX",
        "password": "dron1988"
    },
    "SITE_ID": "WFW",
    "ASSUMED_ADMIN_COOKIE_KEY": "_wfwa_",
    "COOKIE_SECRET": "FUCK_you-bitch",
    "HASHIDS_SALT": "Same_toYou",
    "BACK_UP_FILE_NAME": "rootAdmin.json",
    "BACK_UP_CREDENTIALS_FOR_ADMIN_REGISTRATION": "credentialsForAdminRegistration.json",

    "JWT_OPTIONS_FOR_ISSUE": {
        algorithm: "HS256",
        /**Only test purpose */
        expiresIn: "30000"
        /**end */
    },
    JWT_OPTIONS_FOR_VERIFICATION: {
        algorithms: "HS256"
    },

    SECRET_JWT: "FUckOff",
    COOKIE_JWT_NAME: "_xt",
    JWT_MAX_AGE: 1000000,



    SESSION_TOKEN_NAME: "_st"
};