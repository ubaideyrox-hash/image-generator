'use strict';

module.exports = {
    env: 'development',
    https: false,
    port: process.env.NODE_PORT || 9000,
    mongo: {
        uri: 'mongodb://127.0.0.1:27017/pisignage-server-dev' ,
        options: {useMongoClient: true}
    }
};