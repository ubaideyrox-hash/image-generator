'use strict';

module.exports = {
    env: 'production',
    https: false,
    port: process.env.NODE_PORT || 8000,
    mongo: {
        uri: 'mongodb://127.0.0.1:27017/pisignage-digispot',
        options: {useMongoClient: true}
    }
};