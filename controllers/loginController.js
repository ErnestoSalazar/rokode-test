'use strict';

const jwt = require('jsonwebtoken');

const {passport, secret} = require('../config/Authentication');

/**
 * {
 *      "name": string,
 *      "password": string,
 *      "accessTicket": string
 * }
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
const login = async (req, res, next) => {
    passport.authenticate('local', function(err, accessTicket, info) {
        if (err) return next(err);
        if (!accessTicket) {
            res.status(401).json({ status: 'error', code: 'unauthorized' });
        } else {
            const token = jwt.sign({id: accessTicket.id}, secret);
            res.json({
                message: 'welcome',
                token: token
            });
        }
    })(req, res, next);
};

module.exports = {
    login
};