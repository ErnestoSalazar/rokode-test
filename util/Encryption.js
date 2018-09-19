'use strict';

const CryptoJS = require('./sha3');

const encrypt = (value) => {
    return CryptoJS.SHA3(value).toString();
};

module.exports = {encrypt};