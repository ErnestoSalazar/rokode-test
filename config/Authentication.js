'use strict';
const   passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy;

const models = require('../models');

const Encryption = require('../util/Encryption');

const secret = require('../secrets/passportAuthSecret.json').tokenSecret;

passport.use(new LocalStrategy(
    {
        usernameField: 'name',
        passwordField: 'password',
        passReqToCallback: true
    },
    async function (req, name, password, callback) {
        password = Encryption.encrypt(password);

        const accessTicket = await models.AccessTicket.findOne({
            where: {
                name,
                password,
                ticketCode: req.body.accessTicket
            }
        });
        if (accessTicket === null)
            return callback(null, false);

        return callback(null, accessTicket);
    }
));


module.exports = {
    passport,
    secret
};